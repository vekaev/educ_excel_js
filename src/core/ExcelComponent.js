import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options) {
    super($root, options.listeners)
    this.name = options.name
    this.emitter = options.emitter
    this.unsubscribers = []
    this.prepare()
  }

  // Prepare our component before init
  prepare() {}

  // return component example
  toHTML() {
    return ''
  }

  // Subscribe at event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  // Inform listeners about event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // Initialize component
  // Add DOM listeners
  init() {
    this.initDOMListeners()
  }

  // Destroy component
  // Remove listeners
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
