import { Alert, List, Text, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconAlertTriangle } from '@tabler/icons-react'
import { MaintenanceConfig, MonitorTarget } from '@/types/config'
import { pageConfig } from '@/uptime.config'
import { useTranslation } from 'react-i18next'

/** Map a configured maintenance color to a Mantine color name. */
function resolveMantineColor(
  configured: string | undefined,
  upcoming: boolean,
  fallback: string,
): string {
  if (upcoming) return pageConfig.maintenances?.upcomingColor ?? 'gray'
  return configured || fallback
}

export default function MaintenanceAlert({
  maintenance,
  style,
  upcoming = false,
}: {
  maintenance: Omit<MaintenanceConfig, 'monitors'> & { monitors?: (MonitorTarget | undefined)[] }
  style?: React.CSSProperties
  upcoming?: boolean
}) {
  const { t } = useTranslation('common')
  const theme = useMantineTheme()
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`)

  return (
    <Alert
      icon={<IconAlertTriangle />}
      title={
        <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>
          {(upcoming ? t('Upcoming') + ' · ' : '') +
            (maintenance.title || t('Scheduled Maintenance'))}
        </span>
      }
      color={resolveMantineColor(maintenance.color, upcoming, 'yellow')}
      withCloseButton={false}
      variant="light"
      radius="md"
      style={{ margin: '16px auto 0 auto', ...style }}
    >
      <div
        style={{
          position: isDesktop ? 'absolute' : 'static',
          top: 10,
          right: 14,
          fontSize: '0.8rem',
          color: 'hsl(var(--muted-foreground))',
          textAlign: isDesktop ? 'right' : 'left',
        }}
      >
        <div>
          <b>{upcoming ? t('Scheduled for') : t('From')}:</b>{' '}
          {new Date(maintenance.start).toLocaleString()}
        </div>
        <div>
          <b>{upcoming ? t('Expected end') : t('To')}:</b>{' '}
          {maintenance.end
            ? new Date(maintenance.end).toLocaleString()
            : t('Until further notice')}
        </div>
      </div>

      <Text style={{ paddingTop: '4px', whiteSpace: 'pre-line' }}>{maintenance.body}</Text>
      {maintenance.monitors && maintenance.monitors.length > 0 && (
        <>
          <Text mt="xs" fw={600}>
            {t('Affected components')}
          </Text>
          <List size="sm" withPadding>
            {maintenance.monitors.map((comp, compIdx) => (
              <List.Item key={compIdx}>{comp?.name ?? t('MONITOR ID NOT FOUND')}</List.Item>
            ))}
          </List>
        </>
      )}
    </Alert>
  )
}
