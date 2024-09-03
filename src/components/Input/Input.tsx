import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  useState,
} from 'react'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  type?: string
  placeholder?: string
  icon?: ReactNode
  isFull?: boolean
  helperText?: string
  area?: boolean
  customClass?: string
  label?: string
  rows?: number
}

function Input(
  {
    icon,
    isFull = false,
    area = false,
    type,
    error,
    label,
    rows = 4,
    helperText,
    customClass,
    ...rest
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const [passVisible, setPassVisible] = useState<boolean>(false)

  const toggleVisibility = () => {
    setPassVisible((prev) => !prev)
  }

  const baseClass = `px-4 py-2 rounded-md bg-transparent dark:text-white text-black placeholder-gray-400 focus:outline-none transition-colors duration-300 ${
    isFull ? 'w-full' : 'w-auto'
  } ${error ? 'border-red-500' : 'border-zinc-600'} ${customClass}`

  return (
    <div className={`relative ${isFull ? 'w-full' : 'inline-block'}`}>
      {label && (
        <label className="block dark:text-white text-gray-600 font-semibold mb-1">
          {label}
        </label>
      )}

      <div className="flex items-center border border-zinc-600 rounded-md">
        {area ? (
          <textarea
            rows={rows}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={`${baseClass} resize-y flex-grow`}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            type={type === 'password' && passVisible ? 'text' : type}
            className={`${baseClass} pr-12 flex-grow`}
            {...rest}
          />
        )}

        {type === 'password' && (
          <button
            type="button"
            onClick={toggleVisibility}
            className="flex items-center text-gray-500 hover:text-white focus:outline-none p-2">
            {passVisible ? (
              <IoEyeOutline size={20} />
            ) : (
              <IoEyeOffOutline size={20} />
            )}
          </button>
        )}

        {icon && (
          <div className="flex items-center text-gray-500 p-2">{icon}</div>
        )}
      </div>

      {error && helperText && (
        <span className="text-red-500 flex justify-start mt-1 text-sm">
          {helperText}
        </span>
      )}
    </div>
  )
}

export default forwardRef(Input)
