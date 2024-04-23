export function idGenerator(): string {
  return Math.floor(Math.random() * 10000001).toString();
}
