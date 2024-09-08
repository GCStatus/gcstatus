import {
  Box,
  LinearProgress,
  List,
  ListItem,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useState } from 'react'
import { RegisterOptions } from 'react-hook-form'

import { Input } from '@/components'
import {
  calculatePasswordStrength as c,
  passwordRequirements,
} from '@/utils'

interface PasswordInputProps {
  getProps: (key: any, options?: RegisterOptions) => any
}

function PasswordInput(props: PasswordInputProps) {
  const { getProps } = props
  const [passwordStrength, setPasswordStrength] = useState<number>(0)
  const [passwordValue, setPasswordValue] = useState<string>('')
  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  const [passwordStrengthText, setPasswordStrengthText] = useState<{
    text: string
    color: string
  }>({ text: '', color: '' })
  const tooltipResponsive = useMediaQuery('(min-width: 1170px)')

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const strenghtMap: { [key: number]: { text: string; color: string } } =
      {
        0: { text: '', color: '' },
        1: { text: 'Bad', color: 'red' },
        2: { text: 'Still not good', color: 'red' },
        3: { text: 'Reasonable', color: 'yellow' },
        4: { text: 'Almost there...', color: 'yellow' },
        5: { text: 'Hell yeah!', color: 'green' },
      }

    const password = e.target.value
    const strenght = c(password)

    setPasswordValue(password)
    setPasswordStrength(strenght)
    setPasswordStrengthText(strenghtMap[strenght])
  }

  const handleFocus = () => setShowTooltip(true)
  const handleBlur = () => setShowTooltip(false)

  return (
    <Tooltip
      placement={tooltipResponsive ? 'right' : 'bottom-start'}
      open={showTooltip}
      disableFocusListener
      disableHoverListener
      disableTouchListener
      slotProps={{
        tooltip: {
          sx: {
            bgcolor: 'transparent',
          },
        },
      }}
      title={
        <Box
          sx={{
            p: 2,
            backgroundColor: 'rgb(13, 13, 13)',
            minWidth: tooltipResponsive ? '20rem' : '100%',
          }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Password Strength
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{ color: passwordStrengthText.color }}>
            {passwordStrengthText.text}
          </Typography>

          <LinearProgress
            variant="determinate"
            sx={{
              '& .MuiLinearProgress-colorPrimary': {
                bgcolor: 'rgb(57, 57, 57)',
              },
              '& .MuiLinearProgress-bar': {
                bgcolor: '#ff4d4d',
              },
              bgcolor: 'rgb(57, 57, 57)',
            }}
            value={(passwordStrength / passwordRequirements.length) * 100}
          />

          <Typography variant="body2" sx={{ mt: 2 }}>
            Your password must contain:
          </Typography>
          <List>
            {passwordRequirements.map((req) => (
              <ListItem key={req.label}>
                <Typography
                  variant="body2"
                  className={
                    req.test(passwordValue)
                      ? 'text-green-500'
                      : 'text-red-500'
                  }>
                  {req.label}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      }>
      <Box onFocus={handleFocus} onBlur={handleBlur}>
        <Input
          isFull
          type="password"
          label="Password"
          placeholder="Enter your password"
          customClass="text-white"
          {...getProps('password', {
            onChange: onPasswordChange,
          })}
        />
      </Box>
    </Tooltip>
  )
}

export default PasswordInput
