'use strict'

console.log('ui.js loaded')

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
  if (ev.button === 2) onCellMarked(i, j)   
}




function onCellMarked(i, j) {
  var cell = gBoard[i][j]
  if (cell.isRevealed) return

  cell.isMarked = !cell.isMarked
  gGame.markedCount += cell.isMarked ? 1 : -1

  var elCell = getCellEl(i, j)
  if (cell.isMarked) {
    elCell.textContent = '🚩'
    elCell.classList.add('flag')
  } else {
    elCell.textContent = ''
    elCell.classList.remove('flag')
  }

  updateStatusBar()
}


function expandRevealFirstDegree(ci, cj) {
  console.log('expandRevealFirstDegree from', ci, cj)
  for (var i = ci - 1; i <= ci + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue
    for (var j = cj - 1; j <= cj + 1; j++) {
      if (j < 0 || j >= gBoard[0].length) continue
      if (i === ci && j === cj) continue

      var cell = gBoard[i][j]
      if (cell.isRevealed || cell.isMarked || cell.isMine) continue

      cell.isRevealed = true
      gGame.revealedCount++

      var el = getCellEl(i, j)
      el.classList.add('revealed')
      var cnt = cell.minesAroundCount
      el.textContent = cnt ? cnt : ''
    }
  }
}

function checkGameOver() {
  if (!gGame.isOn) return
  if (isWin()) {
    gGame.isOn = false
    document.getElementById('smileyBtn').textContent = '😎'
    alert('You win!')
  }
}

function isWin() {
  var total = gBoard.length * gBoard.length
  var safe = total - gLevel.MINES
  return gGame.revealedCount === safe
}

function getCellEl(i, j) {
  return document.getElementById('cell-' + i + '-' + j)
}

function updateStatusBar() {
  document.getElementById('flagsCount').textContent = gGame.markedCount
}
