import {
  Box,
  Checkbox,
  InputLabel,
  ListItemText,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from '@mui/material'
import { useState } from 'react'

interface OptionTypes {
  label: string | JSX.Element
  value: any
}

interface SelectProps {
  isFull?: boolean
  label?: string
  options: OptionTypes[]
  defaultValue?: any
  onChange?: (value: any) => void
  disabled?: boolean
  multiple?: boolean
  renderValue?: (selected: any) => any
}

function Select(props: SelectProps) {
  const {
    label,
    defaultValue,
    options,
    onChange,
    disabled,
    isFull,
    renderValue,
    multiple = false,
  } = props

  const [selected, setSelected] = useState<any>(
    multiple ? defaultValue || [] : defaultValue || '',
  )

  const handleChange = (event: SelectChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value)

    if (onChange) {
      onChange(event)
    }
  }

  return (
    <Box className={`flex flex-col ${isFull ? 'w-full' : 'w-auto'}`}>
      {label && (
        <InputLabel
          id={`${label}-label`}
          htmlFor={label}
          className="text-theme-red-900 font-semibold mb-2">
          {label}
        </InputLabel>
      )}
      <MuiSelect
        id={label}
        name={label}
        value={selected}
        multiple={multiple}
        disabled={disabled}
        onChange={handleChange}
        className={`max-h-[3.25rem] bg-transparent border border-gray-700 dark:text-white text-black rounded-full focus:outline-none focus:ring-2 focus:ring-theme-red-900 transition duration-300 ${isFull ? 'w-full' : 'w-auto'}`}
        renderValue={renderValue}>
        {options.map(({ label, value }) => (
          <MenuItem
            key={value}
            value={value}
            className="dark:bg-theme-dark-900 dark:text-white">
            {multiple ? (
              <>
                <Checkbox checked={selected.indexOf(value) > -1} />
                <ListItemText primary={label} />
              </>
            ) : (
              label
            )}
          </MenuItem>
        ))}
      </MuiSelect>
    </Box>
  )
}

export default Select
