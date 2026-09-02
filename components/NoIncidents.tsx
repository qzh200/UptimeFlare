import { Alert, Text } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

export default function NoIncidentsAlert({ style }: { style?: React.CSSProperties }) {
  const { t } = useTranslation('common')
  return (
    <Alert
      icon={<IconInfoCircle />}
      title={t('No incidents in this month')}
      color="gray"
      variant="light"
      radius="md"
      withCloseButton={false}
      style={{ margin: '16px auto 0 auto', ...style }}
    >
      <Text>{t('There are no incidents for this month')}</Text>
    </Alert>
  )
}
