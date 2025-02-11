export function consoleLog(value: any) {
  console.dir(value, { depth: Infinity, numericSeparator: true });
}
