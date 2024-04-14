import { forwardRef } from 'react'
import { Stack } from 'styled-system/jsx'
import { FormLabel } from '../FormLabel'
import { Input, type InputProps } from '../Input'

type InputFieldProps = InputProps & {
  id: string
  label: string
}
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const { label, id, ...inputProps } = props

    return (
      <Stack>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <Input id={id} ref={ref} {...inputProps} />
      </Stack>
    )
  },
)
