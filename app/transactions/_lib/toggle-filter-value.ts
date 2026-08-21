export const toggleFilterValue = (
  current: string[] | undefined,
  value: string,
): string[] | undefined => {
  const selected = current ?? []
  const next = selected.includes(value)
    ? selected.filter((item) => item !== value)
    : [...selected, value]

  return next.length > 0 ? next : undefined
}
