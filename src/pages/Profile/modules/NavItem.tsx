import { ReactNode } from 'react'

interface NavItemProps {
  icon: ReactNode
  label: string
  active: boolean
  onClick: () => void
}

function NavItem(props: NavItemProps) {
  const { icon, label, active, onClick } = props

  return (
    <button
      className={`flex items-center gap-4 p-3 text-md rounded-lg transition-all duration-300 ${
        active
          ? 'dark:bg-zinc-900 text-theme-red-900 bg-zinc-100'
          : 'dark:hover:bg-zinc-800 hover:bg-zinc-100'
      }`}
      onClick={onClick}>
      {icon}
      {label}
    </button>
  )
}

export default NavItem
