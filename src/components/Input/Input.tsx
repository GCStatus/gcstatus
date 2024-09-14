import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  Ref,
  TextareaHTMLAttributes,
  useState,
} from 'react'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
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

  const baseClass = `px-4 py-2 rounded-md bg-transparent dark:text-white text-black placeholder-gray-400 focus:outline-none transition-colors duration-300 glowing-input ${
    isFull ? 'w-full' : 'w-auto'
  } ${error ? 'border-red-500 animate-shake' : 'border-zinc-600'} ${customClass} ${
    type === 'password' ? 'pr-12' : 'pr-4'
  }`

  return (
    <div className={`relative ${isFull ? 'w-full' : 'inline-block'}`}>
      {label && (
        <label
          htmlFor={label}
          className="block dark:text-white text-gray-600 font-semibold mb-1 break-words">
          {label}
        </label>
      )}

      <div className="relative flex items-center border border-zinc-600 rounded-md">
        {area ? (
          <textarea
            id={label}
            rows={rows}
            ref={ref as Ref<HTMLTextAreaElement>}
            className={`${baseClass} resize-y flex-grow`}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={label}
            ref={ref as React.Ref<HTMLInputElement>}
            type={type === 'password' && passVisible ? 'text' : type}
            className={baseClass}
            {...rest}
          />
        )}

        {type === 'password' && (
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute inset-y-0 right-0 flex items-center text-gray-500 dark:hover:text-white hover:text-gray-600 focus:outline-none p-2 transition-colors duration-300">
            {passVisible ? (
              <IoEyeOutline size={20} />
            ) : (
              <IoEyeOffOutline size={20} />
            )}
          </button>
        )}

        {icon && (
          <div className="flex items-center dark:text-white text-gray-500 p-2">
            {icon}
          </div>
        )}
      </div>

      {error && helperText && (
        <span className="text-red-500 flex justify-start mt-1 text-sm animate-fade-in">
          {helperText}
        </span>
      )}
    </div>
  )
}

export default forwardRef(Input)
