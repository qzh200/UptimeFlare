import { Container, Group, Image, Text } from '@mantine/core'
import classes from '@/styles/Header.module.css'
import { pageConfig } from '@/uptime.config'
import { PageConfigLink } from '@/types/config'
import { useTranslation } from 'react-i18next'

export default function Header({ style }: { style?: React.CSSProperties }) {
  const { t } = useTranslation('common')
  const linkToElement = (link: PageConfigLink, i: number) => {
    return (
      <a
        key={i}
        href={link.link}
        target={link.link.startsWith('/') ? undefined : '_blank'}
        className={classes.link}
        data-active={link.highlight}
      >
        {link.label}
      </a>
    )
  }

  const links = [{ label: t('Incidents'), link: '/incidents' }, ...(pageConfig.links || [])]

  return (
    <header className={classes.header} style={style}>
      <Container size="md" className={classes.inner}>
        <a href={location.pathname == '/' ? 'https://blog.hoshiumi.xyz/' : '/'} className={classes.brand}>
          {pageConfig.logo ? (
            <Image
              src={pageConfig.logo}
              h={36}
              w={{ base: 120, sm: 160 }}
              fit="contain"
              alt="logo"
            />
          ) : (
            <Text className={classes.brandText}>
              {pageConfig.title || 'UptimeFlare'}
            </Text>
          )}
        </a>

        <Group gap={4} visibleFrom="sm">
          {links?.map(linkToElement)}
        </Group>

        <Group gap={4} hiddenFrom="sm">
          {links?.filter((link) => link.highlight || link.link.startsWith('/')).map(linkToElement)}
        </Group>
      </Container>
    </header>
  )
}
