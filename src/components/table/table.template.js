import {toInlineStyles} from '@core/utils';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index)
    }
  }
}

function toColumn({col, index, width}) {
  return `
    <div 
    class="column" 
    data-type="resizable" 
    data-col="${index}" 
    style="width: ${width}">
      ${col}
      <span class="col-resize" data-resize="col"></span>
    </div>
  `
}

function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState, col)
    const data = state.dataState[id] || ''
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]}
    )
    return `
      <div 
        class="cell" 
        contenteditable
        data-col="${col}"
        data-type="cell"
        data-id="${id}"
        data-value="${data}"
        style="${styles}; width: ${width}; "
      >${parse(data) || ''}</div>`
  }
}

function createRow(content, number = 0, state) {
  const height = getHeight(state, number)
  return `
    <div 
        class="row" 
        data-type="resizable" 
        data-row="${number}"
        style="height: ${height}"
        >
      <div class="row-info">
        ${number ? number : ''}
        ${number ?
    '<span class="row-resize" data-resize="row"></span>' : ''} 
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 30, state) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('');

  rows.push(createRow(cols, null, {}))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('');

    rows.push(createRow(cells, row + 1, state.rowState))
  }

  return rows.join('')
}
