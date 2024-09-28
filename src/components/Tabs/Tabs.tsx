import { Box, Stack } from '@mui/material'
import {
  Dispatch,
  Fragment,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

interface TabsProps {
  spacing?: number
  tabs: { tab: string; element: ReactNode }[]
  setAssistantTab?: Dispatch<SetStateAction<string>>
}

function Tabs(props: TabsProps) {
  const { spacing = 0, tabs, setAssistantTab } = props
  const [activeTab, setActiveTab] = useState<string>(tabs[0].tab)

  return (
    <>
      <Box className="grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2">
        {tabs.map(({ tab }) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md text-white font-semibold transition-colors duration-300 break-words ${
              activeTab === tab
                ? 'bg-theme-red-900 shadow-lg hover:bg-red-700'
                : 'bg-zinc-900 hover:bg-zinc-800'
            }`}
            onClick={() => {
              setActiveTab(tab)
              if (setAssistantTab) setAssistantTab(tab)
            }}>
            {tab}
          </button>
        ))}
      </Box>

      <Box className="mt-4">
        {tabs
          .filter(({ tab }) => tab === activeTab)
          .map(({ tab, element }) => (
            <Fragment key={tab}>
              <Stack spacing={spacing} className="animate-slide-in">
                {element}
              </Stack>
            </Fragment>
          ))}
      </Box>
    </>
  )
}

export default Tabs
