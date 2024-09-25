import { User } from '@/types'

import { ChangeBasicsForm, ChangeEmailNicknameForm } from '../modules'

interface UpdateUserProps {
  user: User
}

function UpdateUser(props: UpdateUserProps) {
  const { user } = props

  return (
    <>
      <ChangeBasicsForm user={user} />
      <ChangeEmailNicknameForm user={user} />
    </>
  )
}

export default UpdateUser
