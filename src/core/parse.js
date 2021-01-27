export function parse(value = '') {
  if (value.startsWith('=')) {
    try {
      return eval(value.slice(1))
    } catch (e) {
      console.warn('hello', e.message)
      return ''
    }
  }
  return value
}
