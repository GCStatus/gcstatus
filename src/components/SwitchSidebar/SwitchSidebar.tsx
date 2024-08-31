import { useDispatch } from 'react-redux'

import { useSidebar } from '@/hooks'
import { toggle } from '@/store/sidebarSlice'
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
} from '@mui/material'

function SwitchSidebar() {
  const enabled = useSidebar()
  const dispatch = useDispatch()

  const handleToggleSidebar = (enabled: 'yes' | 'no') => {
    dispatch(toggle(enabled))
  }

  return (
    <FormControl component="fieldset" variant="standard" className="mt-4">
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={enabled === 'yes'}
              onChange={() =>
                handleToggleSidebar(enabled === 'yes' ? 'no' : 'yes')
              }
              name="enabled"
            />
          }
          label="Floating sidebar enabled"
        />
      </FormGroup>
    </FormControl>
  )
}

export default SwitchSidebar
