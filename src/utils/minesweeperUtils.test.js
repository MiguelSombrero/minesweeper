import { createBoardOf, enoughFlags } from './minesweeperUtils'

describe('test createBoardOf function', () => {
  test('creates board of right size', () => {
    const board = createBoardOf(9, 9, 10)

    expect(board.length).toBe(9)
    expect(board[0].length).toBe(9)
  })

  test('creates board with right amount of mines', () => {
    const board = createBoardOf(9, 9, 10)

    const reducer = (sum, current) => sum + current.filter(tile => tile.isMine).length
    const mines = board.reduce(reducer, 0)

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