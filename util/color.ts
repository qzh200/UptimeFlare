/**
 * Status color resolver for uptime bars and overall % badges.
 *
 * Light:   >99.9  deep green,  >99 light green,  >=95 amber,  <95 red
 * Darker:  same scheme but with stronger contrast for text.
 *
 * Values are HSL `hsl(var(--token))` references so they automatically follow
 * the shoka light/dark theme defined in styles/theme.css.
 */
function getColor(percent: number | string, darker: boolean): string {
  percent = Number(percent)
  if (Number.isNaN(percent)) {
    return darker ? 'hsl(var(--muted-foreground))' : 'hsl(var(--muted))'
  }
  if (percent >= 99.9) {
    return darker ? 'hsl(var(--success))' : 'hsl(var(--success) / 0.85)'
  } else if (percent >= 99) {
    return darker ? 'hsl(var(--success) / 0.85)' : 'hsl(var(--success) / 0.55)'
  } else if (percent >= 95) {
    return 'hsl(var(--warning))'
  } else {
    return 'hsl(var(--destructive))'
  }
}

export { getColor }
