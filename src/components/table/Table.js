import {$} from '@core/dom'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {
  shouldResize,
  isCell,
  matrix,
  nextSelector
} from '@/components/table/table.functions'
import {ExcelComponent} from '@core/ExcelComponent'
import {TableSelection} from '@/components/table/TableSelection'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  toHTML() {
    return createTable(20)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)

    this.$on('formula:input', text => {
      this.selection.getCurrent().text(text)
    })
    this.$on('formula:done', () => {
      this.selection.getCurrent().focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  onMousedown(event) {
    const $target = $(event.target)

    if (shouldResize($target)) {
      return resizeHandler(this.$root, event)
    }

    if (isCell($target)) {
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.getCurrent())
            .map(id => this.$root.find(`[data-id="${id}"]`))
        return this.selection.selectGroup($cells)
      }

      this.$emit('table:select', $target)
      return this.selection.select($target)
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowUp',
      'ArrowDown',
      'ArrowRight',
      'ArrowLeft'
    ]

    const {key} = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      event.stopPropagation()

      const $current = this.selection.getCurrent().getId()
      const next = nextSelector(key, $current)

      const $target = this.$root.find(next)
      this.selectCell($target)
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}


