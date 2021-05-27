import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }

  init() {
    super.init()

    this.$formula = this.$root.find(`[data-id="formula-input"]`)

    this.$on('table:input', $cell => {
      this.$formula.text($cell.text())
    })

    this.$on('table:select', $cell => {
      this.$formula.text($cell.text())
    })
  }

  toHTML() {
    return `
      <div class="formula-info">fx</div>
      <div class="formula-input" contenteditable="true" 
        data-id="formula-input" spellcheck="false"></div>
    `;
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      event.stopPropagation()
      this.$emit('formula:done')
    }
  }
}
