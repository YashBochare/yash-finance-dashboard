/**
 * Integer Math Engine — all currency stored and calculated in cents.
 * Prevents floating-point errors in financial calculations.
 */

/** Convert a dollar string/number to integer cents */
export function toCents(dollars: string | number): number {
  const parsed = typeof dollars === 'string' ? parseFloat(dollars) : dollars
  if (isNaN(parsed)) return 0
  return Math.round(parsed * 100)
}

/** Convert integer cents to formatted dollar string */
export function formatCurrency(cents: number): string {
  const isNegative = cents < 0
  const absCents = Math.abs(cents)
  const dollars = (absCents / 100).toFixed(2)
  return isNegative ? `-$${dollars}` : `$${dollars}`
}

/** Sum an array of cent amounts */
export function sumCents(amounts: number[]): number {
  return amounts.reduce((acc, val) => acc + val, 0)
}
