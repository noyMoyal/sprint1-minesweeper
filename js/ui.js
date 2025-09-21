'use strict'

console.log('ui.js loaded')

// Draw the board to the HTML table
function renderBoard(board) {
  console.log('Rendering board to HTML')
  var strHTML = ''
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < board[0].length; j++) {
      var cellId = 'cell-' + i + '-' + j
      strHTML +=
        '<td id="' + cellId + '"' +
        ' onmousedown="onCellMouseDown(event, ' + i + ', ' + j + ')">' +
        '</td>'
    }
    strHTML += '</tr>'
  }
  document.querySelector('.board').innerHTML = strHTML
  updateStatusBar()
}

function onCellMouseDown(ev, i, j) {
  console.log('Mouse down on cell (' + i + ',' + j + '), button: ' + ev.button)
  if (!gGame.isOn) return
  if (ev.button === 0) onCellClicked(i, j) 
}

function onCellClicked(i, j) {
  console.log('Left-click cell (' + i + ',' + j + ')')
  var cell = gBoard[i][j]
  if (cell.isRevealed) return

  cell.isRevealed = true
  gGame.revealedCount++

  var elCell = getCellEl(i, j)
  elCell.classList.add('revealed')

  if (cell.isMine) {
    elCell.textContent = '💣'
    console.log('BOOM! Mine clicked.')
    alert('Boom 💣')
    gGame.isOn = false
    return
  }

  var count = cell.minesAroundCount
  elCell.textContent = count ? count : ''

  
}

function getCellEl(i, j) {
  return document.getElementById('cell-' + i + '-' + j)
}

function updateStatusBar() {
  document.getElementById('flagsCount').textContent = gGame.markedCount
}
