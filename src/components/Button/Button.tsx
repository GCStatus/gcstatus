import { Box, CircularProgress } from '@mui/material'
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isLoading?: boolean
  icon?: ReactNode
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      isLoading = false,
      icon,
      fullWidth = false,
      className = '',
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={`
          flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold text-white 
          transition-colors duration-300 disabled:bg-opacity-50 disabled:cursor-not-allowed
          ${fullWidth ? 'w-full' : 'w-auto'} 
          ${isLoading ? 'bg-theme-red-900' : 'bg-theme-red-900 hover:bg-red-700'} 
          ${className}
        `}
        disabled={isLoading}
        {...rest}>
        {isLoading ? (
          <Box className="flex items-center justify-center">
            <CircularProgress size={20} sx={{ color: 'white' }} />
          </Box>
        ) : (
          <>
            {icon && <span className="flex items-center">{icon}</span>}{' '}
            {children}
          </>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
