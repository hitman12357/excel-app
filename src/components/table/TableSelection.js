export class TableSelection {
  static className = 'selected'

  constructor() {
    this._group = []
    this._current = null
  }

  getCurrent() {
    return this._current
  }

  select($el, range = false) {
    if (!range) {
      this.clear()
    }

    this._current = $el
    this._group.push($el)
    $el
        .focus()
        .addClassName(TableSelection.className)
  }

  selectGroup($els) {
    this.clear()
    this._group = $els
    this._group.forEach($el => this.select($el, true))
  }

  clear() {
    this._group.forEach(($el, key) => {
      $el.deleteClassName(TableSelection.className)
      this._group = []
    })
  }
}
