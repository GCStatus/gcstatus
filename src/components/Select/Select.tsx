import { Box } from '@mui/material'
import { ChangeEvent, useState } from 'react'

interface OptionTypes {
  label: string | JSX.Element
  value: any
}

interface SelectProps {
  isFull?: boolean
  label?: string
  options: OptionTypes[]
  defaultValue?: any
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
  disabled?: boolean
}

function Select(props: SelectProps) {
  const { label, defaultValue, options, onChange, disabled, isFull } =
    props
  const [selected, setSelected] = useState(
    defaultValue !== undefined ? defaultValue : '',
  )

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value)

    if (onChange) {
      onChange(event)
    }
  }

  return (
    <Box className={`flex flex-col ${isFull ? 'w-full' : 'w-auto'}`}>
      <label
        htmlFor={label}
        className="text-theme-red-900 font-semibold mb-2">
        {label}
      </label>
      <select
        id={label}
        name={label}
        value={selected}
        disabled={disabled}
        onChange={handleChange}
        className={`p-3 dark:bg-zinc-900 bg-transparent border border-gray-700 dark:text-white text-black rounded-full focus:outline-none focus:ring-2 focus:ring-theme-red-900 transition duration-300 ${isFull ? 'w-full' : 'w-auto'}`}>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </Box>
  )
}

export default Select
