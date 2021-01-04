class Dom {
  constructor(selector) {
    this.$$listeners = {}
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text
      return this
    }

    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }

    return this.$el.textContent.trim()
  }


  get data() {
    return this.$el.dataset
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) {
    this.$$listeners[eventType] = callback
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  focus() {
    this.$el.focus()
    return this
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  id(parse) {
    if (parse) {
      const [row, column] = this.id().split(':')
      return {
        row: +row,
        column: +column
      }
    }
    return this.data.id
  }
  css(styles = {}) {
    Object
        .keys(styles)
        .forEach(key => this.$el.style[key] = styles[key])
  }
  removeClass(className) {
    this.$el.classList.remove(className)
    return this
  }

  addClass(className) {
    this.$el.classList.add(className)
    return this
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
