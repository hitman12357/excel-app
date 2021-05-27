import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []

    this.prepare()
  }

  /**
   * Возвращает шаблон компонента
   * @return {string}
   */
  toHTML() {
    return ''
  }

  // Уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // Подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  /**
   * Инициализируем компонент
   * Добавляем слушателей
   */
  init() {
    this.initDOMListeners()
  }

  /**
   * Удаляет компонент
   * Чистит слушатели
   */
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }

  /**
   * Настраивает компонент до init
   */
  prepare() {

  }
}
