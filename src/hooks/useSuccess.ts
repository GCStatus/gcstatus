import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

function useSuccess(
  isSuccess: boolean,
  message?: string,
  onSuccess?: () => void,
) {
  useEffect(() => {
    if (isSuccess) {
      if (message) toast.success(message)
      if (onSuccess) onSuccess()
    }
  }, [isSuccess])
}

export default useSuccess
