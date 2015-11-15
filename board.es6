let assert = require('assert')

const S = 19
const S2 = S*S

const go_xcoords = 'ABCDEFGHJKLMNOPQRST'

export class coord {
  constructor(x,y) {
    assert(x >= 0 && x < S)
    assert(y >= 0 && y < S)
    this.xc = x
    this.yc = y}
  isCoord() { return true}
  x() { return this.xc }
  y() { return this.yc }
  index() {
    return S*this.yc + this.xc}
  static fromIndex(i) {
    return new coord(i%S, Math.floor(i/S))}
  static fromName(nm) {
    let x = go_xcoords.indexOf(nm[0])
    assert(x >= 0)
    let y = parseInt(nm.slice(1))-1
    return new coord(x, y)}
  neighbours() {
    let res = []
    if (this.xc >= 1)
      res.push(new coord(this.xc-1, this.yc))
    if (this.xc < S-1)
      res.push(new coord(this.xc+1, this.yc))
    if (this.yc >= 1)
      res.push(new coord(this.xc, this.yc-1))
    if (this.yc < S-1)
      res.push(new coord(this.xc, this.yc+1))
    return res}
  toString() {
    return go_xcoords[this.xc] + (this.yc+1)}
}


class coordSet {
  constructor(coords) {
    this.set = new Set()
    for (let c of coords) {
      assert(c.isCoord())
      this.set.add(c.index())}}
  equals(other) {
    for (let x of other.set) {
      if (!this.set.has(x))
	return false}
    for (let x of this.set) {
      if (!other.set.has(x))
	return false}
    return true}
  toString() {
    let xs = Array
	.from(this.set)
	.map(c => coord.fromIndex(c).toString())
    return '{' + xs.join(', ') + '}'}
  size() {
    return this.set.size}
  add(coord) {
    this.set.add(coord)}
  delete(coord) {
    this.set.delete(coord)}
}


export function testCoord() {
  let a = new coord(3,4)
  assert.equal(a.x(), 3)
  assert.equal(a.y(), 4)
  assert.equal(new coord(0,0).index(), 0)
  assert.equal(new coord(18,18).index(), S2-1)
  assert(new coordSet([new coord(6,7),
		       new coord(7,8)])
	 .equals(new coordSet([new coord(6,7),
			       new coord(7,8)])))
  assert(!new coordSet([new coord(6,7),
			new coord(7,8)])
	 .equals(new coordSet([new coord(6,7),
			       new coord(7,9)])))
  assert(new coordSet(new coord(2,5).neighbours())
	 .equals(new coordSet([new coord(1,5),
			       new coord(3,5),
			       new coord(2,4),
			       new coord(2,6)])))

  assert.equal(new coord(0,0).toString(), 'A1')
  assert.equal(new coord(6,7).toString(), 'G8')
  assert.equal(new coordSet([new coord(2,3),
			     new coord(3,7)])
	       .toString(),
	       "{C4, D8}")
  assert.deepEqual(new coord(0,0),
		   coord.fromName("A1"))
}


export class chain {
  constructor(stone, libs) {
    this.stones = new coordSet([stone])
    this.libs = new coordSet(libs)}
  toString() {
    return ['chain stones:', this.stones.toString(),
	    'libs:', this.libs.toString()].join(' ')}
  numStones() {
    return this.stones.size()}
  numLibs() {
    return this.libs.size()}
  isDead() {
    return this.numLibs() == 0}
  addFrom(ch) {
    for (let s of ch.stones.set)
      this.stones.add(s)
    for (let l of ch.libs.set)
      this.libs.add(l)}
  takeAwayLib(lib) {
    this.libs.delete(lib.index())}
  
}

function testChain() {
  let x = coord.fromName('D5')
  let c = new chain(x, x.neighbours());
  // assert.equal(c.toString(),
  // 	       'chain stones: {D5} libs: {C5, E5, D4, D6}')
  function ac(cs, co) {
    assert(cs.set.has(coord.fromName(co).index()))}
  assert.equal(c.numStones(), 1)
  assert.equal(c.numLibs(), 4)
  ac(c.stones, 'D5')
  ac(c.libs, 'C5')
  ac(c.libs, 'D4')
  ac(c.libs, 'D6')
  ac(c.libs, 'E5')
  assert(!c.isDead())

  let y = coord.fromName('E5')
  let d = new chain(y, y.neighbours());

  c.takeAwayLib(y)
  d.takeAwayLib(x)
  
  c.addFrom(d)

  assert.equal(c.numStones(), 2)
  assert.equal(c.numLibs(), 6)
  assert(!c.isDead())
  ac(c.stones, 'D5')
  ac(c.stones, 'E5')
  ac(c.libs, 'C5')
  ac(c.libs, 'D4')
  ac(c.libs, 'D6')
  ac(c.libs, 'E4')
  ac(c.libs, 'E6')
  ac(c.libs, 'F5')
}

function twoDigits(n) {
  if (n >= 1 && n <= 9)
    return ' ' + n
  else return '' + n}


export const black = 0
export const white = 1
export const empty = 2

export class board {
  constructor() {
    // mapping coord index to parent coord index, union-find
    this.parents = new Map() 
    // mapping coord index to chain
    this.chains = new Map()
    // field content
    this.fields = new Int8Array(S2)
    this.fields.fill(empty)
  }
  place(col, co) {
    assert(col == black || col == white)
    assert(co.isCoord())
    let coidx = co.index()
    if (this.fields[coidx] != empty) {
      console.log('couldnt place at ' + co.toString())
      return false}

    this.fields[coidx] = col
  }

  toString() {
    let p = '      '
    let letters =
	p + Array.from(go_xcoords).map(l => ' ' + l).join('')
    let border =
	p + Array.from(go_xcoords).map(l => '==').join('')
    let lines = []
    lines.push(letters)
    lines.push(border)
    for (let y = S-1; y >= 0; y--) {
      let line = []
      line.push(' ' + twoDigits(y+1) + ' ||')
      for (let x = 0; x < S; x++) {
	line.push(' ')
	let t = this.fields[new coord(x,y).index()];
	assert(t === black || t === white || t === empty)
	line.push(['○', '●', ' '][t])
      }
      line.push('|| ' + twoDigits(y+1))
      lines.push(line.join(''))
    }
    lines.push(border)
    lines.push(letters)
    return lines.join('\n')
  }
}

function testBoard() {
  let b = new board()
  b.place(black, coord.fromName('D4'))
  b.place(white, coord.fromName('C3'))
  b.place(black, coord.fromName('C4'))
  b.place(white, coord.fromName('D3'))
  b.place(black, coord.fromName('E3'))
  b.place(white, coord.fromName('E2'))
  b.place(black, coord.fromName('F2'))
  b.place(white, coord.fromName('F3'))
  console.log(b.toString())
}

export function runAllTests() {
  testCoord()
  testChain()
  testBoard()
}

runAllTests()
