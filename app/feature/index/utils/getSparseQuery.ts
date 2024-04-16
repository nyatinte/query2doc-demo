export const getSparseQuery = ({
  query,
  pseudoDocument,
}: { query: string; pseudoDocument: string }) => {
  return `${Array(5).fill(query).join(' ')} ${pseudoDocument}`
}
