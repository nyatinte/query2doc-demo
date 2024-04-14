import { type ReactNode, forwardRef } from 'react'
import { Flex, Stack } from 'styled-system/jsx'
import { FormLabel } from '../FormLabel'
import { Input, type InputProps } from '../Input'

type InputFieldProps = InputProps & {
  id: string
  label: string
  labelIcon?: ReactNode
}
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const { label, labelIcon, id, ...inputProps } = props

    return (
      <Stack>
        <Flex gap="2" alignItems="center">
          <FormLabel htmlFor={id}>{label}</FormLabel>
          {labelIcon}
        </Flex>
        <Input id={id} ref={ref} {...inputProps} />
      </Stack>
    )
  },
)
