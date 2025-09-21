'use strict'

console.log('board.js loaded')

function buildBoard(size) {
  console.log('Building board of size:', size)
  var board = []
  for (var i = 0; i < size; i++) {
    board[i] = []
    for (var j = 0; j < size; j++) {
      board[i][j] = {
        minesAroundCount: 0,
        isRevealed: false,
        isMine: false,
        isMarked: false,
        i: i,
        j: j
      }
    }
  }
  return board
}


function placeStaticMines(board) {
  console.log('Placing static mines')
  if (board[0] && board[0][0]) board[0][0].isMine = true
  if (board[1] && board[1][2]) board[1][2].isMine = true
}


function setMinesNegsCount(board) {
  console.log('Calculating neighbor counts')
  var size = board.length
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      board[i][j].minesAroundCount = countMineNeighbors(board, i, j)
    }
  }
}

function countMineNeighbors(board, ci, cj) {
  var count = 0
  for (var i = ci - 1; i <= ci + 1; i++) {
    if (i < 0 || i >= board.length) continue
    for (var j = cj - 1; j <= cj + 1; j++) {
      if (j < 0 || j >= board[0].length) continue
      if (i === ci && j === cj) continue
      if (board[i][j].isMine) count++
    }
  }
  if (count > 0) console.log('Cell (' + ci + ',' + cj + ') has ' + count + ' mine-neighbors')
  return count
}
