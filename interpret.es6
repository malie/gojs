
// recognize interesting things on the board

import {board, S, S2, coord, black, white}
from './board'
import assert from 'assert'

const ownedFieldB = 0
const ownedFieldW = 1
const eye1B = 2
const eye1W = 3
const eye2B = 4
const eye2W = 5
// ...
const LAST_PROP = eye2W

function propToString(p) {
  return ['ownedFieldB', 'ownedFieldW',
	  'eye1B', 'eye1W',
	  'eye2B', 'eye2W'][p]}

export class interpreter {
  constructor(board) {
    this.board = board
    this.bits = new Int32Array(S2)
    this.bits.fill(0)
    this.interpret()
  }
  checkWhat(what) {
    assert(typeof what === 'number')
    assert(what >= 0)
    assert(what <= LAST_PROP)}
  get(what, f) {
    this.checkWhat(what)
    let mask = 1 << what;
    return (this.bits[f.index()] & mask) === mask}
  set_value(what, f, value) {
    this.checkWhat(what)
    if (value)
      this.set(what, f)
    else
      this.unset(what, f)}
  set(what, f) {
    let bit = 1 << what;
    let idx = f.index()
    this.bits[idx] |= bit}
  unset(what, f) {
    let bit = 1 << what;
    let idx = f.index()
    this.bits[idx] &= ~bit}

  // an empty field is owned by a colour if the opponent
  // can't move there. This includes the case if she moves
  // there and is in atari. Also, this excludes ko!
  ownedFields() {
    let b = this.board
    for (let y = 0; y < S; y++) {
      for (let x = 0; x < S; x++) {
	let f = new coord(x, y)
	if (!b.isEmptyAt(f))
	  continue
	let ns = f.neighbours()
	for (let col = black; col <= white; col++) {
	  if (ns.length == 2) 
	    this.set_value(ownedFieldB + col, f,
			   b.isStoneAt(ns[0], col)
			   || b.isStoneAt(ns[1], col))
	  else if (ns.length == 3) 
	    this.set_value(ownedFieldB + col, f,
			   atLeastTwoOfThree(
			     b.isStoneAt(ns[0], col),
			     b.isStoneAt(ns[1], col),
			     b.isStoneAt(ns[2], col)))
	  else if (ns.length == 4) 
	    this.set_value(ownedFieldB + col, f,
			   atLeastThreeOfFour(
			     b.isStoneAt(ns[0], col),
			     b.isStoneAt(ns[1], col),
			     b.isStoneAt(ns[2], col),
			     b.isStoneAt(ns[3], col)))}}}}
  
  interpret() {
    this.ownedFields()
  }
  propsAt(co) {
    assert(co.isCoord())
    let b = this.bits[co.index()]
    let res = []
    for (let p = 0; p <= LAST_PROP; p++)
      if (b & (1 << p) !== 0)
	res.push(propToString(p))
    return res}
}

function atLeastTwoOfThree(a, b, c) {
  let sum = 0;
  sum += a ? 1 : 0;
  sum += b ? 1 : 0;
  sum += c ? 1 : 0;
  return sum >= 2}

function atLeastThreeOfFour(a, b, c, d) {
  let sum = 0;
  sum += a ? 1 : 0;
  sum += b ? 1 : 0;
  sum += c ? 1 : 0;
  sum += d ? 1 : 0;
  return sum >= 3}


function test1() {
  let b = new board()
  let t = new interpreter(b)
  let co = new coord(2,2)
  assert(!t.get(ownedFieldB, co))
  t.set(ownedFieldB, co, 1)
  assert(t.get(ownedFieldB, co))
}



function allTests() {
  test1()
  console.log('ok')
}
allTests()
