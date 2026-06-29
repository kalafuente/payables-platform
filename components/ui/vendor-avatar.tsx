const PALETTES = [
  { bg: 'var(--color-blue-100)',   fg: 'var(--color-blue-600)' },
  { bg: 'var(--color-green-100)',  fg: 'var(--color-green-600)' },
  { bg: 'var(--color-amber-100)',  fg: 'var(--color-amber-600)' },
  { bg: 'var(--color-slate-200)',  fg: 'var(--color-slate-700)' },
  { bg: 'var(--color-yellow-200)', fg: 'var(--color-slate-800)' },
] as const

function hashName(name: string): number {
  let h = 0
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) & 0xffffff
  }
  return h
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

interface VendorAvatarProps {
  name: string
  size?: number
}

export function VendorAvatar({ name, size = 36 }: VendorAvatarProps) {
  const palette = PALETTES[hashName(name) % PALETTES.length]
  const initials = getInitials(name)
  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        minWidth: size,
        backgroundColor: palette.bg,
        color: palette.fg,
        fontSize: size * 0.36,
      }}
      className="inline-flex items-center justify-center rounded-lg font-semibold leading-none select-none"
    >
      {initials}
    </span>
  )
}
