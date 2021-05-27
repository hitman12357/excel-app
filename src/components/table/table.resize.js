import {$} from '@core/dom'

export const resizeHandler = ($root, event) => {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $resizer.data.resize

  const sideProp = type === 'col' ? 'bottom' : 'right'
  const coordsProp = type === 'col' ? 'right' : 'bottom'
  const coordsDimension = type === 'col' ? 'pageX' : 'pageY'
  const lengthProp = type === 'col' ? 'width' : 'height'

  let value

  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px'
  })

  document.onmousemove = e => {
    const delta = e[coordsDimension] - coords[coordsProp]
    value = coords[lengthProp] + delta
    $resizer.css({[coordsProp]: -delta + 'px'})
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    $parent.css({[lengthProp]: value + 'px'})

    if (type === 'col') {
      $root
          .findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => el.style.width = value + 'px')
    }

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0
    })
  }

  event.preventDefault()
  event.stopPropagation()
}
