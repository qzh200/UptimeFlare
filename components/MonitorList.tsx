import { MonitorState, MonitorTarget } from '@/types/config'
import { Accordion, Card, Center, Text, Box } from '@mantine/core'
import MonitorDetail from './MonitorDetail'
import { pageConfig } from '@/uptime.config'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function countDownCount(state: MonitorState, ids: string[]) {
  let downCount = 0
  for (let id of ids) {
    if (state.incident[id] === undefined || state.incident[id].length === 0) {
      continue
    }

    if (state.incident[id].slice(-1)[0].end === null) {
      downCount++
    }
  }
  return downCount
}

function getStatusTextColor(state: MonitorState, ids: string[]) {
  let downCount = countDownCount(state, ids)
  if (downCount === 0) {
    return 'hsl(var(--success))'
  } else if (downCount === ids.length) {
    return 'hsl(var(--destructive))'
  } else {
    return 'hsl(var(--warning))'
  }
}

export default function MonitorList({
  monitors,
  state,
}: {
  monitors: MonitorTarget[]
  state: MonitorState
}) {
  const { t } = useTranslation('common')
  const group = pageConfig.group
  const groupedMonitor = group && Object.keys(group).length > 0
  let content

  // Load expanded groups from localStorage
  const savedExpandedGroups = localStorage.getItem('expandedGroups')
  const expandedInitial = savedExpandedGroups
    ? JSON.parse(savedExpandedGroups)
    : Object.keys(group || {})
  const [expandedGroups, setExpandedGroups] = useState<string[]>(expandedInitial)
  useEffect(() => {
    localStorage.setItem('expandedGroups', JSON.stringify(expandedGroups))
  }, [expandedGroups])

  if (groupedMonitor) {
    content = (
      <Accordion
        multiple
        defaultValue={Object.keys(group)}
        variant="default"
        radius="md"
        value={expandedGroups}
        onChange={(values) => setExpandedGroups(values)}
        chevronPosition="right"
      >
        {Object.keys(group).map((groupName) => (
          <Accordion.Item key={groupName} value={groupName}>
            <Accordion.Control>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <div style={{ fontWeight: 600 }}>{groupName}</div>
                <Text
                  fw={500}
                  style={{
                    display: 'inline',
                    paddingRight: '5px',
                    color: getStatusTextColor(state, group[groupName]),
                  }}
                >
                  {group[groupName].length - countDownCount(state, group[groupName])}/
                  {group[groupName].length} {t('Operational')}
                </Text>
              </div>
            </Accordion.Control>
            <Accordion.Panel>
              {monitors
                .filter((monitor) => group[groupName].includes(monitor.id))
                .sort((a, b) => group[groupName].indexOf(a.id) - group[groupName].indexOf(b.id))
                .map((monitor) => (
                  <div
                    key={monitor.id}
                    style={{
                      padding: '8px 0',
                      borderTop: '1px solid hsl(var(--border))',
                    }}
                  >
                    <MonitorDetail monitor={monitor} state={state} />
                  </div>
                ))}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    )
  } else {
    content = (
      <Box>
        {monitors.map((monitor, idx) => (
          <div
            key={monitor.id}
            style={{
              padding: '12px 0',
              borderTop: idx === 0 ? 'none' : '1px solid hsl(var(--border))',
            }}
          >
            <MonitorDetail monitor={monitor} state={state} />
          </div>
        ))}
      </Box>
    )
  }

  return (
    <Center>
      <Card
        padding="lg"
        radius="md"
        withBorder
        ml="md"
        mr="md"
        mt="lg"
        mb="xl"
        style={{
          width: groupedMonitor ? '897px' : '865px',
          maxWidth: 'calc(100vw - 32px)',
        }}
      >
        {content}
      </Card>
    </Center>
  )
}
