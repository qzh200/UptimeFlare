import { Text, Tooltip } from '@mantine/core'
import { MonitorState, MonitorTarget } from '@/types/config'
import { IconAlertCircle, IconAlertTriangle, IconCircleCheck } from '@tabler/icons-react'
import DetailChart from './DetailChart'
import DetailBar from './DetailBar'
import { getColor } from '@/util/color'
import { maintenances } from '@/uptime.config'
import { useTranslation } from 'react-i18next'

export default function MonitorDetail({
  monitor,
  state,
}: {
  monitor: MonitorTarget
  state: MonitorState
}) {
  const { t } = useTranslation('common')

  if (!state.latency[monitor.id])
    return (
      <>
        <Text mt="sm" fw={700} style={{ fontSize: '1.05rem' }}>
          {monitor.name}
        </Text>
        <Text mt="sm" fw={700} c="dimmed">
          {t('No data available')}
        </Text>
      </>
    )

  let statusIcon =
    state.incident[monitor.id].slice(-1)[0].end === null ? (
      <IconAlertCircle
        style={{
          width: '1.25em',
          height: '1.25em',
          color: 'hsl(var(--destructive))',
          marginRight: '6px',
        }}
      />
    ) : (
      <IconCircleCheck
        style={{
          width: '1.25em',
          height: '1.25em',
          color: 'hsl(var(--success))',
          marginRight: '6px',
        }}
      />
    )

  // Hide real status icon if monitor is in maintenance
  const now = new Date()
  const hasMaintenance = maintenances
    .filter((m) => now >= new Date(m.start) && (!m.end || now <= new Date(m.end)))
    .find((maintenance) => maintenance.monitors?.includes(monitor.id))
  if (hasMaintenance)
    statusIcon = (
      <IconAlertTriangle
        style={{
          width: '1.25em',
          height: '1.25em',
          color: 'hsl(var(--warning))',
          marginRight: '6px',
        }}
      />
    )

  let totalTime = Date.now() / 1000 - state.incident[monitor.id][0].start
  let downTime = 0
  for (let incident of state.incident[monitor.id]) {
    downTime += (incident.end ?? Date.now() / 1000) - incident.start
  }

  const uptimePercent = (((totalTime - downTime) / totalTime) * 100).toPrecision(4)

  // Conditionally render monitor name with or without hyperlink based on monitor.url presence
  const monitorNameElement = (
    <Text mt="sm" fw={700} style={{ display: 'inline-flex', alignItems: 'center', fontSize: '1.05rem' }}>
      {monitor.statusPageLink ? (
        <a
          href={monitor.statusPageLink}
          target="_blank"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            color: 'hsl(var(--foreground))',
            textDecoration: 'none',
          }}
        >
          {statusIcon} {monitor.name}
        </a>
      ) : (
        <>
          {statusIcon} {monitor.name}
        </>
      )}
    </Text>
  )

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {monitor.tooltip ? (
          <Tooltip label={monitor.tooltip}>{monitorNameElement}</Tooltip>
        ) : (
          monitorNameElement
        )}

        <Text
          mt="sm"
          fw={700}
          style={{
            display: 'inline',
            color: getColor(uptimePercent, true),
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {t('Overall', { percent: uptimePercent })}
        </Text>
      </div>

      <DetailBar monitor={monitor} state={state} />
      {!monitor.hideLatencyChart && <DetailChart monitor={monitor} state={state} />}
    </>
  )
}
