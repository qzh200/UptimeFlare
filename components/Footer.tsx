import { Box, Text, Anchor } from '@mantine/core'
import { pageConfig } from '@/uptime.config'

export default function Footer() {
  const content = (
    <Box
      style={{
        textAlign: 'center',
        fontSize: 12,
        marginTop: 32,
        padding: '20px 16px 32px',
        color: 'hsl(var(--muted-foreground))',
      }}
    >
      <Text size="xs" mb={4}>
        {pageConfig.customFooterText ?? 'Open-source monitoring and status page powered by '}
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

  if (pageConfig.customFooter) {
    return <div dangerouslySetInnerHTML={{ __html: pageConfig.customFooter }} />
  }
  return content
}
