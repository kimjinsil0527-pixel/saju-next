'use server'

import { redirect } from 'next/navigation'
import { createAuthClient } from '@/lib/supabase/auth-server'
import { getSiteUrl } from '@/lib/supabase/auth-config'

export type AuthActionState = {
  error?: string
  success?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function readText(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

export async function signInAction(
  _state: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = readText(formData, 'email').toLowerCase()
  const password = readText(formData, 'password')

  if (!EMAIL_PATTERN.test(email) || !password) {
    return { error: 'Enter a valid email and password.' }
  }

  try {
    const supabase = await createAuthClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return { error: 'The email or password is incorrect.' }
    }
  } catch {
    return { error: 'Sign in is temporarily unavailable. Please try again.' }
  }

  redirect('/dashboard')
}

export async function signUpAction(
  _state: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = readText(formData, 'email').toLowerCase()
  const password = readText(formData, 'password')
  const confirmPassword = readText(formData, 'confirmPassword')
  const acceptedTerms = formData.get('terms') === 'on'

  if (!EMAIL_PATTERN.test(email)) {
    return { error: 'Enter a valid email address.' }
  }
  if (password.length < 8) {
    return { error: 'Use at least 8 characters for your password.' }
  }
  if (password !== confirmPassword) {
    return { error: 'The passwords do not match.' }
  }
  if (!acceptedTerms) {
    return { error: 'Please accept the Terms and Privacy Policy.' }
  }

  let accountReady = false

  try {
    const supabase = await createAuthClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${getSiteUrl()}/auth/confirm`,
      },
    })

    if (error) {
      return { error: 'We could not create the account. Please try again.' }
    }

    accountReady = Boolean(data.session)
  } catch {
    return { error: 'Sign up is temporarily unavailable. Please try again.' }
  }

  if (accountReady) redirect('/dashboard')

  return {
    success: 'Check your email and open the confirmation link to finish creating your account.',
  }
}

export async function forgotPasswordAction(
  _state: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = readText(formData, 'email').toLowerCase()

  if (!EMAIL_PATTERN.test(email)) {
    return { error: 'Enter a valid email address.' }
  }

  try {
    const supabase = await createAuthClient()
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${getSiteUrl()}/auth/confirm?next=/reset-password`,
    })
  } catch {
    // Keep the response generic so account existence is not disclosed.
  }

  return {
    success: 'If an account exists for that email, a password reset link has been sent.',
  }
}

export async function resetPasswordAction(
  _state: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const password = readText(formData, 'password')
  const confirmPassword = readText(formData, 'confirmPassword')

  if (password.length < 8) {
    return { error: 'Use at least 8 characters for your password.' }
  }
  if (password !== confirmPassword) {
    return { error: 'The passwords do not match.' }
  }

  try {
    const supabase = await createAuthClient()
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      return { error: 'This reset link is invalid or expired. Request a new one.' }
    }

    await supabase.auth.signOut()
  } catch {
    return { error: 'Password reset is temporarily unavailable.' }
  }

  redirect('/signin?reset=1')
}

export async function signOutAction() {
  try {
    const supabase = await createAuthClient()
    await supabase.auth.signOut()
  } finally {
    redirect('/')
  }
}
