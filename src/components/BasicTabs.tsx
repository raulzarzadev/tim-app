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
  title = '',
  tabs = []
}: {
  title?: string
  tabs: { label: string; content: React.ReactNode; hidden?: boolean }[]
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [value, setValue] = React.useState(0)
  //debugger
  const tabName = `tab-${title}`
  React.useEffect(() => {
    searchParams.get(tabName) &&
      setValue(JSON.parse(searchParams.get(tabName) || '0'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    router.push(
      pathname + '?' + createQueryString(tabName, JSON.stringify(newValue)),
      { scroll: false }
    )
    setValue(newValue)
  }

  const tabsFixed = tabs.filter((t) => !t.hidden)

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <ErrorBoundary componentName="BasicTabs">
          <Tabs
            className="bg-slate-300"
            // orientation="vertical"
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
            {tabsFixed.map((tab, i) => (
              <Tab key={i} label={tab.label} {...a11yProps(i)} />
            ))}
          </Tabs>
        </ErrorBoundary>
      </Box>
      <ErrorBoundary componentName="BasicTabs-Panels">
        {tabsFixed.map((tab, i) => (
          <CustomTabPanel key={i} value={value} index={i}>
            {tab.content}
          </CustomTabPanel>
        ))}
      </ErrorBoundary>
    </Box>
  )
}

export default BasicTabs
