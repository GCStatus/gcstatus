import * as AiIcons from 'react-icons/ai'
import * as CiIcons from 'react-icons/ci'
import * as FaIcons from 'react-icons/fa'
import * as IoIcons from 'react-icons/io5'
import * as MdIcons from 'react-icons/md'

const Icons = {
  ...IoIcons,
  ...FaIcons,
  ...MdIcons,
  ...AiIcons,
  ...CiIcons,
}

interface IconProps extends React.ComponentProps<'svg'> {
  name: keyof typeof Icons
}

function Icon(props: IconProps) {
  const { name, ...rest } = props

  const IconComponent = Icons[name]

  if (!IconComponent) {
    return <Icons.IoNotificationsOutline {...rest} />
  }

  return <IconComponent {...rest} />
}

export default Icon

export { Icons }
