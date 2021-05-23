export default function translate(path: string) {
  const travel = regexp =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res))

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)
  const payload = result === undefined

  return payload
}
