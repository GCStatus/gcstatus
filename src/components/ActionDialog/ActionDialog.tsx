import { LoadingButton as Button } from '@mui/lab'
import {
  Alert,
  AlertProps,
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import {
  cloneElement,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import toast from 'react-hot-toast'
import { IoClose } from 'react-icons/io5'

export interface ActionDialogProps {
  children?: ReactNode
  successMessage?: string
  confirmAction: () => Promise<unknown> | void
  trigger: ReactElement
  confirmText?: string
  description?: string
  dialogProps?: DialogProps
  title: string
  isSuccess?: boolean
  isLoading?: boolean
  alert?: AlertProps
}

function ActionDialog(props: ActionDialogProps) {
  const {
    alert,
    children,
    confirmAction,
    confirmText = 'Confirm',
    description,
    dialogProps,
    title,
    trigger = <Button>Open</Button>,
    successMessage,
    isSuccess = false,
    isLoading = false,
  } = props

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (isSuccess) {
      if (successMessage) toast.success(successMessage)
      setOpen(false)
    }
  }, [isSuccess, successMessage])

  const handleConfirm = async () => {
    try {
      await confirmAction()
    } catch (e) {
      console.log(e)
      toast.error('Ops! Something went wrong.')
    }
  }

  return (
    <Box>
      {cloneElement(trigger, { onClick: handleOpen })}

      <Dialog
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
        TransitionProps={{
          onExited: () => setOpen(false),
        }}
        {...dialogProps}
        open={open}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
            transition: 'all 0.3s ease-in-out',
            transform: 'scale(0.95)',
            animation: 'scale-in 0.3s ease-in-out forwards',
            '@keyframes scale-in': {
              '0%': { transform: 'scale(0.95)', opacity: 0 },
              '100%': { transform: 'scale(1)', opacity: 1 },
            },
          },
        }}>
        <DialogTitle
          component="div"
          id="alert-dialog-title"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1,
          }}>
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
              transition: 'color 0.2s',
              '&:hover': {
                color: (theme) => theme.palette.grey[700],
              },
            }}>
            <IoClose />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {description && (
            <DialogContentText sx={{ mb: 3 }}>
              {description}
            </DialogContentText>
          )}
          {alert && <Alert {...alert} sx={{ mb: 2, borderRadius: 2 }} />}
          <Box mb={3}>{children}</Box>
          <Divider />
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            spacing={2}
            mt={3}>
            <Button
              onClick={handleClose}
              variant="outlined"
              color="error"
              sx={{
                flexGrow: 1,
                textTransform: 'uppercase',
              }}>
              Cancel
            </Button>

            <Button
              loading={isLoading}
              onClick={handleConfirm}
              variant="outlined"
              color="success"
              sx={{
                flexGrow: 1,
                textTransform: 'uppercase',
                minWidth: '150px',
                position: 'relative',
              }}>
              {confirmText}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default ActionDialog
