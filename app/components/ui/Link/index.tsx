import { Link as RemixLink } from '@remix-run/react'
import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { link } from 'styled-system/recipes'

export const Link = styled(RemixLink, link)
export interface LinkProps extends ComponentProps<typeof Link> {}
