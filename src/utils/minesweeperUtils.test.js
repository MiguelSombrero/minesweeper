import {
  createBoardOf,
  enoughFlags,
  openAdjacentTilesAndIsMine,
  isWon,
  indexOutOfRange

} from './minesweeperUtils'

const mineReducer = (sum, current) => sum + current.filter(tile => tile.isMine).length
const openReducer = (sum, current) => sum + current.filter(tile => tile.isOpen).length

describe('test createBoardOf function', () => {
  test('creates board of right size', () => {
    const board1 = createBoardOf(9, 9, 10)
    const board2 = createBoardOf(16, 16, 40)
    const board3 = createBoardOf(16, 30, 99)

    expect(board1.length).toBe(9)
    expect(board2.length).toBe(16)
    expect(board3.length).toBe(16)
    expect(board1[0].length).toBe(9)
    expect(board2[0].length).toBe(16)
    expect(board3[0].length).toBe(30)
  })

  test('creates board with right amount of mines', () => {
    const board = createBoardOf(9, 9, 10)
    const mines = board.reduce(mineReducer, 0)
    expect(mines).toBe(10)
  })

  test('tiles holds all the fields', () => {
    const board = createBoardOf(9, 9, 10)
    const tile = board[0][0]

    expect(tile.value).toBeDefined()
    expect(tile.isOpen).toBeDefined()
    expect(tile.isFlagged).toBeDefined()
    expect(tile.isMine).toBeDefined()
  })
})

describe('test enoughFlags function', () => {
  test('returns true when flags match tile value', () => {
    const testBoard = [
      [
        { value: 0, isOpen: false, isFlagged: true, isMine: true },
        { value: 2, isOpen: false, isFlagged: false, isMine: false },
        { value: 0, isOpen: false, isFlagged: false, isMine: false }
      ],
      [
        { value: 0, isOpen: false, isFlagged: true, isMine: true },
        { value: 2, isOpen: false, isFlagged: false, isMine: false },
        { value: 0, isOpen: false, isFlagged: false, isMine: false }
      ]
    ]
    const isEnough = enoughFlags(0, 1, testBoard)
    expect(isEnough).toBeTruthy()
  })

  test('returns false when there is less flags than tile value', () => {
    const testBoard = [
      [
        { value: 0, isOpen: false, isFlagged: false, isMine: true },
        { value: 2, isOpen: false, isFlagged: false, isMine: false },
        { value: 0, isOpen: false, isFlagged: false, isMine: false }
      ],
      [
        { value: 0, isOpen: false, isFlagged: true, isMine: true },
        { value: 2, isOpen: false, isFlagged: false, isMine: false },
        { value: 0, isOpen: false, isFlagged: false, isMine: false }
      ]
    ]
    const isEnough = enoughFlags(0, 1, testBoard)
    expect(isEnough).toBeFalsy()
  })

  test('returns false when there is more flags than tile value', () => {
    const testBoard = [
      [
        { value: 0, isOpen: false, isFlagged: true, isMine: true },
        { value: 2, isOpen: false, isFlagged: false, isMine: false },
        { value: 0, isOpen: false, isFlagged: true, isMine: false }
      ],
      [
        { value: 0, isOpen: false, isFlagged: true, isMine: true },
        { value: 2, isOpen: false, isFlagged: false, isMine: false },
        { value: 0, isOpen: false, isFlagged: false, isMine: false }
      ]
    ]
    const isEnough = enoughFlags(0, 1, testBoard)
    expect(isEnough).toBeFalsy()
  })
})

describe('test openAdjacentTilesAndIsMine function', () => {
  test('opens all adjacent tiles if not mine and not flag', () => {
    const testBoard = [
      [
        { value: 0, isOpen: false, isFlagged: false, isMine: false },
        { value: 2, isOpen: false, isFlagged: false, isMine: false },
        { value: 0, isOpen: false, isFlagged: false, isMine: false }
      ],
      [
        { value: 0, isOpen: false, isFlagged: false, isMine: false },
        { value: 2, isOpen: false, isFlagged: false, isMine: false },
        { value: 0, isOpen: false, isFlagged: false, isMine: false }
      ],
      [
        { value: 0, isOpen: false, isFlagged: false, isMine: false },
        { value: 2, isOpen: false, isFlagged: false, isMine: false },
        { value: 0, isOpen: false, isFlagged: false, isMine: false }
      ]
    ]

    openAdjacentTilesAndIsMine(1, 1, testBoard)
    const openTiles = testBoard.reduce(openReducer, 0)
    expect(openTiles).toBe(9)
  })

  test('opens all non-flagged adjacent tiles if not mine', () => {
    const testBoard = [
      [
        { value: 1, isOpen: false, isFlagged: true, isMine: false },
        { value: 2, isOpen: false, isFlagged: true, isMine: false },
        { value: 1, isOpen: false, isFlagged: false, isMine: false }
      ],
      [
        { value: 1, isOpen: false, isFlagged: false, isMine: false },
        { value: 2, isOpen: false, isFlagged: false, isMine: false },
        { value: 1, isOpen: false, isFlagged: false, isMine: false }
      ],
      [
        { value: 1, isOpen: false, isFlagged: false, isMine: false },
        { value: 2, isOpen: false, isFlagged: false, isMine: false },
        { value: 1, isOpen: false, isFlagged: false, isMine: false }
      ]
    ]

    openAdjacentTilesAndIsMine(1, 1, testBoard)
    const openTiles = testBoard.reduce(openReducer, 0)
    expect(openTiles).toBe(7)
  })

  test('opens only adjacent tiles if not mine', () => {
    const testBoard = [
      [
        { value: 1, isOpen: false, isFlagged: false, isMine: false },
        { value: 2, isOpen: false, isFlagged: false, isMine: false },
        { value: 1, isOpen: false, isFlagged: false, isMine: false }
      ],
      [
        { value: 1, isOpen: false, isFlagged: false, isMine: false },
        { value: 2, isOpen: false, isFlagged: false, isMine: false },
        { value: 1, isOpen: false, isFlagged: false, isMine: false }
      ],
      [
        { value: 1, isOpen: false, isFlagged: false, isMine: false },
        { value: 2, isOpen: false, isFlagged: false, isMine: false },
        { value: 1, isOpen: false, isFlagged: false, isMine: false }
      ]
    ]

    openAdjacentTilesAndIsMine(2, 1, testBoard)
    const openTiles = testBoard.reduce(openReducer, 0)
    expect(openTiles).toBe(6)
  })

  test('returns false if no mines adjacent', () => {
    const testBoard = [
      [
        { value: 1, isOpen: false, isFlagged: true, isMine: true },
        { value: 2, isOpen: false, isFlagged: true, isMine: true },
        { value: 1, isOpen: false, isFlagged: false, isMine: true }
      ],
      [
        { value: 1, isOpen: false, isFlagged: false, isMine: false },
        { value: 2, isOpen: false, isFlagged: false, isMine: false },
        { value: 1, isOpen: false, isFlagged: false, isMine: false }
      ],
      [
        { value: 1, isOpen: false, isFlagged: false, isMine: false },
        { value: 2, isOpen: false, isFlagged: false, isMine: false },
        { value: 1, isOpen: false, isFlagged: false, isMine: false }
      ]
    ]

    const result = openAdjacentTilesAndIsMine(2, 1, testBoard)
    expect(result).toBeFalsy()
  })

  test('returns true if mines adjacent', () => {
    const testBoard = [
      [
        { value: 1, isOpen: false, isFlagged: false, isMine: true },
        { value: 2, isOpen: false, isFlagged: false, isMine: true },
        { value: 1, isOpen: false, isFlagged: false, isMine: false }
      ],
      [
        { value: 1, isOpen: false, isFlagged: false, isMine: false },
        { value: 2, isOpen: false, isFlagged: false, isMine: false },
        { value: 1, isOpen: false, isFlagged: false, isMine: false }
      ],
      [
        { value: 1, isOpen: false, isFlagged: false, isMine: false },
        { value: 2, isOpen: false, isFlagged: false, isMine: false },
        { value: 1, isOpen: false, isFlagged: false, isMine: false }
      ]
    ]

    const result = openAdjacentTilesAndIsMine(1, 2, testBoard)
    expect(result).toBeTruthy()
  })
})

describe('test isWon function', () => {
  test('returns true when all but mines tiles are open', () => {
    const testBoard = [
      [
        { value: 0, isOpen: true, isFlagged: false, isMine: false },
        { value: 2, isOpen: true, isFlagged: false, isMine: false },
        { value: 0, isOpen: false, isFlagged: false, isMine: true }
      ],
      [
        { value: 0, isOpen: true, isFlagged: false, isMine: false },
        { value: 2, isOpen: false, isFlagged: false, isMine: true },
        { value: 0, isOpen: true, isFlagged: false, isMine: false }
      ],
      [
        { value: 0, isOpen: false, isFlagged: false, isMine: true },
        { value: 2, isOpen: true, isFlagged: false, isMine: false },
        { value: 0, isOpen: true, isFlagged: false, isMine: false }
      ]
    ]

    const result = isWon(testBoard)
    expect(result).toBeTruthy()
  })

  test('returns false when all but mines tiles are not open', () => {
    const testBoard = [
      [
        { value: 0, isOpen: true, isFlagged: false, isMine: false },
        { value: 2, isOpen: true, isFlagged: false, isMine: false },
        { value: 0, isOpen: false, isFlagged: false, isMine: true }
      ],
      [
        { value: 0, isOpen: true, isFlagged: false, isMine: false },
        { value: 2, isOpen: false, isFlagged: false, isMine: true },
        { value: 0, isOpen: true, isFlagged: false, isMine: false }
      ],
      [
        { value: 0, isOpen: false, isFlagged: false, isMine: true },
        { value: 2, isOpen: false, isFlagged: false, isMine: false },
        { value: 0, isOpen: true, isFlagged: false, isMine: false }
      ]
    ]

    const result = isWon(testBoard)
    expect(result).toBeFalsy()
  })

  test('returns false when mined tile are open', () => {
    const testBoard = [
      [
        { value: 0, isOpen: true, isFlagged: false, isMine: false },
        { value: 2, isOpen: true, isFlagged: false, isMine: false },
        { value: 0, isOpen: false, isFlagged: false, isMine: true }
      ],
      [
        { value: 0, isOpen: true, isFlagged: false, isMine: false },
        { value: 2, isOpen: false, isFlagged: false, isMine: true },
        { value: 0, isOpen: true, isFlagged: false, isMine: false }
      ],
      [
        { value: 0, isOpen: true, isFlagged: false, isMine: true },
        { value: 2, isOpen: false, isFlagged: false, isMine: false },
        { value: 0, isOpen: true, isFlagged: false, isMine: false }
      ]
    ]

    const result = isWon(testBoard)
    expect(result).toBeFalsy()
  })
})

describe('test indexOutOfBounds function', () => {
  let testBoard = null

  beforeEach(() => {
    testBoard = [
      [
        { value: 0, isOpen: true, isFlagged: false, isMine: false },
        { value: 2, isOpen: true, isFlagged: false, isMine: false },
        { value: 0, isOpen: false, isFlagged: false, isMine: true }
      ],
      [
        { value: 0, isOpen: true, isFlagged: false, isMine: false },
        { value: 2, isOpen: false, isFlagged: false, isMine: true },
        { value: 0, isOpen: true, isFlagged: false, isMine: false }
      ],
      [
        { value: 0, isOpen: true, isFlagged: false, isMine: true },
        { value: 2, isOpen: false, isFlagged: false, isMine: false },
        { value: 0, isOpen: true, isFlagged: false, isMine: false }
      ]
    ]
  })

  test('return true is row is negative', () => {
    const result = indexOutOfRange(-1, 0, testBoard)
    expect(result).toBeTruthy()
  })

  test('return true is col is negative', () => {
    const result = indexOutOfRange(0, -1, testBoard)
    expect(result).toBeTruthy()
  })

  test('return true is row is over upper index', () => {
    const result = indexOutOfRange(3, 0, testBoard)
    expect(result).toBeTruthy()
  })

  test('return true is col is over upper index', () => {
    const result = indexOutOfRange(0, 3, testBoard)
    expect(result).toBeTruthy()
  })

  test('return false when index is in area', () => {
    const result1 = indexOutOfRange(2, 2, testBoard)
    const result2 = indexOutOfRange(0, 0, testBoard)
    expect(result1).toBeFalsy()
    expect(result2).toBeFalsy()
  })
})