import type { MetaFunction } from '@remix-run/cloudflare'
import { IndexPage } from '~/feature/index/page'

export const meta: MetaFunction = () => {
  return [
    { title: 'Query2Doc Demo' },
    { name: 'description', content: 'Query2Doc Unofficial Demo' },
  ]
}
export default IndexPage
