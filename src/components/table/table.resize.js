import {$} from '@core/dom'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
  const type = $resizer.data.resize
  let value

  $resizer.css({
    [type === 'col' ? 'bottom' : 'right']: '-5000px'
  })

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({right: -delta + 'px'})
    } else if (type === 'row') {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({bottom: -delta + 'px'})
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    if (type === 'col') {
      $parent.css({
        width: value + 'px'
      })
      $root.findAll(`[data-col="${$parent.data.col}"]`)
      cells.forEach(el => el.style.width = value + 'px')
    } else if (type === 'row') {
      $parent.css({
        height: value + 'px'
      })
    }

    $resizer.css({
      right: 0,
      bottom: 0
    })
  }
}
