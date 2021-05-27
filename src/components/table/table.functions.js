export function shouldResize($target) {
  return $target.data.resize
}

export function isCell($target) {
  return $target.data.type === 'cell'
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, key) => key + start)
}

export function matrix($current, $target) {
  const target = $target.getId()
  const current = $current.getId()

  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export function nextSelector(key, {col, row}) {
  const MIN_VALUE = 0
  switch (key) {
    case 'ArrowDown':
    case 'Enter':
      row++
      break
    case 'ArrowUp':
      row = (row - 1 < MIN_VALUE) ? MIN_VALUE : row - 1
      break
    case 'ArrowRight':
    case 'Tab':
      col++
      break
    case 'ArrowLeft':
      col = (col - 1 < MIN_VALUE) ? MIN_VALUE : col - 1
      break;
  }

  return `[data-id="${row}:${col}"]`
}
