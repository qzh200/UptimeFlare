import { Box, Text, Anchor } from '@mantine/core'
import { pageConfig } from '@/uptime.config'

const defaultContent = (
  <Box
    style={{
      textAlign: 'center',
      fontSize: 12,
      padding: '24px 16px',
      color: 'hsl(var(--muted-foreground))',
    }}
  >
    <Text size="xs" mb={4}>
      Open-source monitoring and status page powered by{' '}
      <Anchor
        href="https://github.com/lyc8503/UptimeFlare"
        target="_blank"
        c="shoka.6"
        fw={600}
      >
        UptimeFlare
      </Anchor>
    </Text>
  </Box>
)

export default function Footer() {
  if (pageConfig.customFooter) {
    return <footer dangerouslySetInnerHTML={{ __html: pageConfig.customFooter }} />
  }
  return <footer>{defaultContent}</footer>
}
