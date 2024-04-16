import * as Tabs from '~/components/ui/Tabs'
import { getDenseQuery } from '../index/utils/getDenseQuery'
import { getSparseQuery } from '../index/utils/getSparseQuery'

const tabOptions = [
  { id: 'dense', label: 'Dense' },
  { id: 'sparse', label: 'Sparse' },
] as const satisfies readonly { id: string; label: string }[]

export const QueryTab = ({
  query,
  pseudoDocument,
}: {
  query: string
  pseudoDocument: string | undefined
}) => {
  return (
    <Tabs.Root variant="enclosed" defaultValue="dense">
      <Tabs.List>
        {tabOptions.map((option) => (
          <Tabs.Trigger key={option.id} value={option.id}>
            {option.label}
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="dense">
        {pseudoDocument && getDenseQuery({ query, pseudoDocument })}
      </Tabs.Content>
      <Tabs.Content value="sparse">
        {pseudoDocument && getSparseQuery({ query, pseudoDocument })}
      </Tabs.Content>
    </Tabs.Root>
  )
}
