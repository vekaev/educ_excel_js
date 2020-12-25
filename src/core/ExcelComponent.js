import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options) {
    super($root, options.listeners)
    this.name = options.name
  }
  // return component example
  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
  }
}
