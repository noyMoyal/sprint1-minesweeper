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
  placeStaticMines(gBoard)      
  setMinesNegsCount(gBoard)

  console.log('Board after build:', gBoard)
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
