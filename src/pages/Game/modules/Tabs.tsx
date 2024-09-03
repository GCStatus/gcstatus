import { Fragment, ReactNode, useState } from 'react'

interface TabsProps {
  tabs: { tab: string; element: ReactNode }[]
}

function Tabs(props: TabsProps) {
  const { tabs } = props
  const [activeTab, setActiveTab] = useState<string>(tabs[0].tab)

  return (
    <>
      <div className="grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2">
        {tabs.map(({ tab }) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md text-white font-semibold transition-colors duration-300 break-words ${
              activeTab === tab
                ? 'bg-theme-red-900 shadow-lg hover:bg-red-700'
                : 'bg-zinc-900 hover:bg-zinc-800'
            }`}
            onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tabs
          .filter(({ tab }) => tab === activeTab)
          .map(({ tab, element }) => (
            <Fragment key={tab}>
              <div className="animate-slide-in">{element}</div>
            </Fragment>
          ))}
      </div>
    </>
  )
}

export default Tabs
