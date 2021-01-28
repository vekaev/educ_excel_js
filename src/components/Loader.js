import {$} from '@core/dom';

export function Loader() {
  const html = `
    <div class="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>`

  return $.create('div', 'loader').html(html)
}
