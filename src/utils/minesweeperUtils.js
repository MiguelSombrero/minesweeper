
export const createBoardOf = (rows, cols, mines) => {
  const newBoard = initializeArray(rows, cols)
  initializeMines(rows, cols, mines, newBoard)
  return newBoard
}

const initializeArray = (rows, cols) =>
  Array.from({ length: rows },
    () => Array.from({ length: cols },
      () =>  initialTile() ))

const initialTile = () => {
  return {
    value: 0,
    isOpen: false,
    isFlagged: false,
    isMine: false
  }
}

const initializeMines = (rows, cols, mines, board) => {
  let minesLeft = mines

  while (minesLeft > 0) {
    let row = generateIndex(rows)
    let col = generateIndex(cols)

    if (!isMine(row, col, board)) {
      board[row][col].isMine = true
      updateAdjacentMinesCount(row, col, board)
      minesLeft -= 1
    }
  }
}

const generateIndex = index => Math.floor(Math.random() * index)

const updateAdjacentMinesCount = (i, j, board) => {
  incrementValueIfNotOutOfBounds(i - 1, j - 1, board)
  incrementValueIfNotOutOfBounds(i + 1, j + 1, board)
  incrementValueIfNotOutOfBounds(i - 1, j + 1, board)
  incrementValueIfNotOutOfBounds(i + 1, j - 1, board)

  incrementValueIfNotOutOfBounds(i - 1, j, board)
  incrementValueIfNotOutOfBounds(i + 1, j, board)
  incrementValueIfNotOutOfBounds(i, j - 1, board)
  incrementValueIfNotOutOfBounds(i, j + 1, board)
}

const incrementValueIfNotOutOfBounds = (row, col, board) => {
  if (!indexOutOfRange(row, col, board)) {
    board[row][col].value += 1
  }
}

export const notEnoughFlags = (i, j, board) => {
  let flags = 0

  for (let row = i - 1; row <= i + 1; row++) {
    for (let col = j - 1; col <= j + 1; col++) {
      if (!indexOutOfRange(row, col, board) && isFlag(row, col, board)) {
        flags += 1
      }
    }
  }

  if (flags < board[i][j].value) {
    return true
  }

  return false
}

export const cascadeEmptyTiles = (row, col, board) => {
  if (indexOutOfRange(row, col, board) || board[row][col].isOpen || isMine(row, col, board)) {
    return
  }

  board[row][col].isOpen = true

  if (isEmpty(row, col, board)) {
    cascadeEmptyTiles(row - 1, col - 1, board)
    cascadeEmptyTiles(row + 1, col + 1, board)
    cascadeEmptyTiles(row - 1, col + 1, board)
    cascadeEmptyTiles(row + 1, col - 1, board)

    cascadeEmptyTiles(row, col - 1, board)
    cascadeEmptyTiles(row - 1, col, board)
    cascadeEmptyTiles(row, col + 1, board)
    cascadeEmptyTiles(row + 1, col, board)
  }
}

export const indexOutOfRange = (row, col, board) =>
  row < 0 || col < 0 || row > board.length-1 || col > board[0].length-1

export const isWon = game => {
  const a = game.board.filter(row => !isEmptyArray(
    row.filter(isClosedNonMinedTile))
  )

  return isEmptyArray(a)
}

const isEmptyArray = array => array.length === 0
const isClosedNonMinedTile = tile => !tile.isOpen && !tile.isMine
const isEmpty = (row, col, board) => board[row][col].value === 0

export const isFlag = (row, col, board) => board[row][col].isFlagged
export const toggleFlag = (row, col, board) => board[row][col].isFlagged = !board[row][col].isFlagged
export const isMine = (row, col, board) => board[row][col].isMine
