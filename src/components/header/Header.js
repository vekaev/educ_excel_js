import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom';
import {changeDocumentTitle} from '@/redux/actions';
import {defaultDocumentTitle} from '@/constants';
import {debounce} from '@core/utils';
import {ActiveRoute} from '@core/router/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().documentTitle || defaultDocumentTitle
    return `
      <input type="text" class="input" value="${title}">
      <div>
          <div class="button" data-button="remove">
            <i data-button="remove" class="material-icons">delete</i>
          </div>
          <div class="button" data-button="exit">
             <i class="material-icons" data-button="exit">exit_to_app</i>
          </div>
      </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeDocumentTitle($target.text()))
  }

  onClick(event) {
    const $target = $(event.target)

    if ($target.data.button === 'remove') {
      const decision = confirm('Are you sure you want to remove?')
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }
}
