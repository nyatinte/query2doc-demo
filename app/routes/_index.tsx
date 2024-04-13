import type { MetaFunction } from '@remix-run/cloudflare'
import { css } from 'styled-system/css'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  return (
    <div className={css({ fontSize: '2xl', fontWeight: 'bold' })}>
      Hello 🐼!
    </div>
  )
}
