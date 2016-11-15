export const createNewName = (_names: string[], defaultName: string) => {
  const output = (n?: number): string => {
    return !n || n < 2
      ? defaultName
      : [defaultName, n].join(' ')
  }

  if (!_names) {
    return output()
  }

  const token = `%%${Date.now()}%%`
  const escapedDefaultName = defaultName.replace(/\s/g, token)

  const escape = (str: string) => {
    return str
      .replace(/\s/g, token)
      .split(escapedDefaultName)
      .map((v) => v.replace(new RegExp(token, 'g'), ' '))
      .join(escapedDefaultName)
  }

  const existsDefault = (escapedLabel: string): boolean => {
    return escapedLabel.includes(escapedDefaultName)
  }

  const getSerial = (escapedLabel: string): number => {
    const numPart = escapedLabel.split(' ').slice(1).join(' ')
    if (/\D/.test(numPart)) {
      return NaN
    }
    return parseInt(numPart, 10)
  }

  const calc = (names: string[]) => {
    return names
      .sort((a, b) => {
        if (escape(a) === escapedDefaultName) { return -1 }
        if (escape(b) === escapedDefaultName) { return  1 }
        return getSerial(escape(a)) - getSerial(escape(b))
      })
      .reduce((n, _name) => {
        const name = escape(_name)
        if (existsDefault(name)) {
          const serial = getSerial(name)
          const num = serial === 1  ? serial
            : isNaN(serial) ? 2
            : serial + 1
          if (n === 0 && num === 2) { return num }
          return num - n === 1 ? num : n
        }
        return n
      }, 0)
  }

  return output(calc(_names))
}
