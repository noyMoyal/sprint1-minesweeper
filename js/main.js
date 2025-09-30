'use strict'

console.log('main.js loaded')

var gTimerInterval = null

function onInit() {
  newGame()
}

function newGame() {
  gGame.isOn = true
  gGame.isFirstClick = true
  gGame.revealedCount = 0
  gGame.markedCount = 0
  gGame.secsPassed = 0
  if (gTimerInterval) {
    clearInterval(gTimerInterval)
    gTimerInterval = null
  }
  document.getElementById('time').textContent = gGame.secsPassed
  document.getElementById('smileyBtn').textContent = '😃'
  gBoard = buildBoard(gLevel.SIZE)
  renderBoard(gBoard)
}

function onRestart() {
  newGame()
}

function setLevel(levelKey) {
  var chosen = gLevels[levelKey]
  gLevel = { SIZE: chosen.SIZE, MINES: chosen.MINES }
  newGame()
}

function onCellClicked(i, j) {
  if (!gGame.isOn) return
  var cell = gBoard[i][j]
  if (cell.isRevealed || cell.isMarked) return
  if (gGame.isFirstClick) {
    gGame.isFirstClick = false
    placeRandomMines(gBoard, gLevel.MINES, i, j)
    setMinesNegsCount(gBoard)
    startTimer()
  }
  cell.isRevealed = true
  gGame.revealedCount++
  var elCell = getCellEl(i, j)
  elCell.classList.add('revealed')
  if (cell.isMine) {
    elCell.textContent = '💣'
    document.getElementById('smileyBtn').textContent = '🤯'
    gGame.isOn = false
    revealAllMines()
    stopTimer()
    alert('Boom 💣')
    return
  }
  var count = cell.minesAroundCount
  elCell.textContent = count ? count : ''
  if (count === 0) {
    expandReveal(i, j)
  }
  checkGameOver()
}

function startTimer() {
  if (gTimerInterval) return
  gTimerInterval = setInterval(function() {
    gGame.secsPassed++
    var el = document.getElementById('time')
    if (el) el.textContent = gGame.secsPassed
  }, 1000)
}

function stopTimer() {
  if (!gTimerInterval) return
  clearInterval(gTimerInterval)
  gTimerInterval = null
}
