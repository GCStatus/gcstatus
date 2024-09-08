import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
} from '@mui/material'
import { useDispatch } from 'react-redux'

import { useSidebar } from '@/hooks'
import { toggle } from '@/store/sidebarSlice'

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
              sx={{
                '& .MuiSwitch-switchBase': {
                  color: '#ff4d4d',
                },
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#ff4d4d',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#ff4d4d',
                },
                '& .MuiSwitch-track': {
                  backgroundColor: '#ccc',
                },
              }}
            />
          }
          label="Floating sidebar enabled"
        />
      </FormGroup>
    </FormControl>
  )
}

export default SwitchSidebar
