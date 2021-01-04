import {range} from '@core/utils'

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function matrix($target, $current) {
  const target = $target.id(true)
  const current = $current.id(true)

  const cols = range(current.column, target.column)
  const rows = range(current.row, target.row)
  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export function nextSelector(key, {column, row}) {
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break;

    case 'Tab':
    case 'ArrowRight':
      column++
      break;

    case 'ArrowLeft':
      column--
      break;

    case 'ArrowUp':
      row--
      break;
  }
  return `[data-id="${row}:${column}"]`
}
