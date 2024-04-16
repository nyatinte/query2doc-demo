import type { ComponentProps, FC, ReactNode } from 'react'
import { cva } from 'styled-system/css'
import { Flex, styled } from 'styled-system/jsx'
import { Badge } from './Badge'

const badgeCardStyle = cva({
  base: {
    height: 'fit-content',
    minHeight: 'md',
    border: '1px solid black',
    padding: '4',
    borderRadius: 'md',
    flex: '1',
    shadow: 'sm',
  },
})

const BadgeCardContainer = styled('div', badgeCardStyle)

type BadgeCardProps = ComponentProps<typeof BadgeCardContainer> & {
  label: string
  badgeRightIcon?: ReactNode
}
export const BadgeCard: FC<BadgeCardProps> = (props) => {
  const { label, children, ...rest } = props
  return (
    <BadgeCardContainer {...rest}>
      <Flex mb="4" justifyContent="space-between" alignItems="center">
        <Badge variant="outline">{props.label}</Badge>
        {props.badgeRightIcon}
      </Flex>
      {children}
    </BadgeCardContainer>
  )
}
