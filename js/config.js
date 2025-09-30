'use strict'

console.log('config.js: globals prepared')

var gBoard = []

var gLevels = {
  beginner: { SIZE: 4,  MINES: 2  },
  medium:   { SIZE: 8,  MINES: 14 },
  expert:   { SIZE: 12, MINES: 32 }
}

var gLevel = { SIZE: 4, MINES: 2 }

var gGame = {
  isOn: false,
  revealedCount: 0,
  markedCount: 0,
  secsPassed: 0,
  isFirstClick: true
}
