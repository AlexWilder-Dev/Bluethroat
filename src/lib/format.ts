/** £13.50, £6, £2,800 */
export function price(n: number): string {
  const whole = Number.isInteger(n);
  return '£' + n.toLocaleString('en-GB', { minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: 2 });
}

export function plural(n: number, one: string, many = one + 's') {
  return `${n} ${n === 1 ? one : many}`;
}
