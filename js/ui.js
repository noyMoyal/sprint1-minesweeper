'use strict'

console.log('ui.js loaded')

function renderBoard(board) {
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



function expandReveal(ci, cj) {
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
      if (cnt === 0) {
        expandReveal(i, j)
      }
    }
  }
}

function checkGameOver() {
  if (!gGame.isOn) return
  if (isWin()) {
    gGame.isOn = false
    document.getElementById('smileyBtn').textContent = '😎'
    stopTimer()
    alert('You win!')
  }
}

function isWin() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      var cell = gBoard[i][j]
      if (cell.isMine && !cell.isMarked) return false
      if (!cell.isMine && !cell.isRevealed) return false
    }
  }
  return true
}

function getCellEl(i, j) {
  return document.getElementById('cell-' + i + '-' + j)
}

function updateStatusBar() {
  document.getElementById('flagsCount').textContent = gGame.markedCount
  var t = document.getElementById('time')
  if (t) t.textContent = gGame.secsPassed
}

function revealAllMines() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      var cell = gBoard[i][j]
      if (cell.isMine) {
        var el = getCellEl(i, j)
        if (el) {
          el.textContent = '💣'
          el.classList.add('mine')
        }
      }
    }
  }
}
