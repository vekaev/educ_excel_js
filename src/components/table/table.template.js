const CODES = {
  A: 65,
  Z: 90
}

function toColumn(content, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${content}
      <span class="col-resize" data-resize="col"></span>
    </div>
  `
}

function toCell(content = '', index) {
  return `
    <div class="cell" contenteditable="" data-col="${index}">
      ${content}
    </div>`
}

function createRow(content, number = 0) {
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${number ? number : ''}
        ${number ?
          '<span class="row-resize" data-resize="row"></span>' : '' } 
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 30) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  rows.push(createRow(cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('');

    rows.push(createRow(cells, i + 1))
  }

  return rows.join('')
}
