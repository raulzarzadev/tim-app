'use client'
import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import ErrorBoundary from './ErrorBoundary'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className="p-2 sm:p-4">
          <Typography component={'article'}>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

function BasicTabs({
  tabs = []
}: {
  tabs: { label: string; content: React.ReactNode }[]
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [value, setValue] = React.useState(0)
  React.useEffect(() => {
    searchParams.get('tab') &&
      setValue(JSON.parse(searchParams.get('tab') || '0'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    const params = new URLSearchParams()
    params.set('tab', JSON.stringify(value))
    router.replace(pathname + '?' + params, { scroll: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <ErrorBoundary componentName="BasicTabs">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            TabScrollButtonProps={{
              className: 'w-[25px]'
            }}
          >
            {tabs.map((tab, i) => (
              <Tab key={i} label={tab.label} {...a11yProps(i)} />
            ))}
          </Tabs>
        </ErrorBoundary>
      </Box>
      <ErrorBoundary componentName="BasicTabs-Panels">
        {tabs.map((tab, i) => (
          <CustomTabPanel key={i} value={value} index={i}>
            {tab.content}
          </CustomTabPanel>
        ))}
      </ErrorBoundary>
    </Box>
  )
}

export default BasicTabs
