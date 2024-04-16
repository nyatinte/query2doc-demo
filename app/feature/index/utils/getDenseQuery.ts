export const getDenseQuery = ({
  query,
  pseudoDocument,
}: { query: string; pseudoDocument: string }) => {
  return `${query} [SEP] ${pseudoDocument}`
}
