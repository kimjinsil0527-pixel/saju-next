export function maskEmail(email: string | null | undefined) {
  if (!email) return ''
  if (email.includes('***')) return email

  const [local, domain] = email.trim().split('@')
  if (!local || !domain) return maskIdentifier(email)

  const visibleLocal = local.slice(0, Math.min(2, local.length))
  const [domainName, ...suffixParts] = domain.split('.')
  const suffix = suffixParts.length > 0 ? `.${suffixParts.join('.')}` : ''
  const visibleDomain = domainName.slice(0, 1)

  return `${visibleLocal}${'*'.repeat(Math.max(3, local.length - visibleLocal.length))}@${visibleDomain}***${suffix}`
}

export function maskIdentifier(value: string | null | undefined) {
  if (!value) return ''
  if (value.includes('...')) return value

  const trimmed = value.trim()
  if (trimmed.length <= 8) return `${trimmed.slice(0, 2)}...`
  return `${trimmed.slice(0, 4)}...${trimmed.slice(-4)}`
}

export function displayName(name: string | null | undefined) {
  return name?.trim() || 'Unknown'
}
