'use strict'

console.log('main.js loaded')

function onInit() {
  console.log('Game initialized')
  newGame()
}

function newGame() {
  console.log('Starting new game with level:', gLevel)
  gGame.isOn = true
  gGame.isFirstClick = true
  gGame.revealedCount = 0
  gGame.markedCount = 0
  gGame.secsPassed = 0
  document.getElementById('smileyBtn').textContent = '😃'

  gBoard = buildBoard(gLevel.SIZE)
  renderBoard(gBoard) 
}

function onRestart() {
  console.log('Restart button clicked')
  newGame()
}

function setLevel(levelKey) {
  console.log('Switching level to:', levelKey)
  var chosen = gLevels[levelKey]
  gLevel = { SIZE: chosen.SIZE, MINES: chosen.MINES }
  newGame()
}


function onCellClicked(i, j) {
  console.log('Left-click cell (' + i + ',' + j + ')')
  if (!gGame.isOn) return

  var cell = gBoard[i][j]
  if (cell.isRevealed || cell.isMarked) return


  if (gGame.isFirstClick) {
    gGame.isFirstClick = false
    placeRandomMines(gBoard, gLevel.MINES, i, j)
    setMinesNegsCount(gBoard)
  }


  cell.isRevealed = true
  gGame.revealedCount++

  var elCell = getCellEl(i, j)
  elCell.classList.add('revealed')


  if (cell.isMine) {
    elCell.textContent = '💣'
    console.log('BOOM! Mine clicked.')
 
    document.getElementById('smileyBtn').textContent = '🤯'
    gGame.isOn = false
    alert('Boom 💣')
    return
  }


  var count = cell.minesAroundCount
  elCell.textContent = count ? count : ''


  if (count === 0) {
 
    expandRevealFirstDegree(i, j)
  }

 
  checkGameOver()
}
