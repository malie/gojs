let assert = require('assert')

export const S = 19
export const S2 = S*S

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
  equals(o) {
    return (this.xc == o.xc
	    && this.yc == o.yc)}
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
  diagonalNeighbours() {
    let res = []
    let xc = this.xc
    let yc = this.yc;
    function p(dx,dy) {
      let x = xc + dx
      let y = yc + dy
      if (x >= 0 && x < S && y >= 0 && y < S)
	res.push(new coord(x, y))}
    p(-1,-1)
    p(1,-1)
    p(1,1)
    p(-1,1)
    return res}
  
  displace(dx, dy) {
    let x = this.xc + dx
    let y = this.yc + dy
    if (x >= 0 && x < S && y >= 0 && y < S)
      return new coord(x, y)
    else
      return null}
  
  toString() {
    return go_xcoords[this.xc] + (this.yc+1)}
}


// This function expects an ordinary Set of coord indices...
export function coordSetToString(set) {
  var ary = Array.from(set)
  ary.sort()
  var res = []
  for (var e of ary)
    res.push(coord.fromIndex(e).toString())
  return res.join(', ')}

export function coordArrayToString(ary) {
  var res = []
  for (var e of ary)
    res.push(e.toString())
  return res.join(', ')}


class coordSet {
  constructor(coords) {
    this.set = new Set()
    for (let c of coords) {
      assert(c.isCoord())
      this.set.add(c.index())}}

  clone() {
    let res = new coordSet([])
    for (var ci of this.set) {
      res.set.add(ci)}
    return res}
  
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
  add(coordidx) {
    this.set.add(coordidx)}
  delete(coordidx) {
    this.set.delete(coordidx)}
  has(coordidx) {
    return this.set.has(coordidx)}
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
    if (stone) { // for clone support
      this.stones = new coordSet([stone])
      this.libs = new coordSet(libs)}
    else {
      this.stones = null
      this.libs = null}}
  
  toString() {
    return ['chain stones:', this.stones.toString(),
	    'libs:', this.libs.toString()].join(' ')}

  clone() {
    let res = new chain(false, false)
    res.stones = this.stones.clone()
    res.libs = this.libs.clone()
    return res}

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
  addLib(lib) {
    this.libs.add(lib.index())}
  hasLib(lib) {
    return this.libs.has(lib.index())}
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

export function assertIsColor(col) {
  assert(col === black || col === white)}

export function otherColor(col) {
  assertIsColor(col)
  return (black+white)-col}

export class board {
  constructor() {
    // mapping coord index to parent coord index, union-find
    this.parents = new Map() 
    // mapping coord index to chain
    this.chains = new Map()
    // field content
    this.fields = new Int8Array(S2)
    this.fields.fill(empty)}

  clone() {
    let res = new board();
    res.fields = new Int8Array(this.fields)
    res.parents = new Map(this.parents)
    res.chains = new Map()
    for (let co of this.chains.keys()) {
      res.chains.set(co, this.chains.get(co).clone())}
    return res}

  canPlace(col, co) {
    assertIsColor(col)
    assert(co.isCoord())
    let coidx = co.index()
    if (this.fields[coidx] != empty)
      return false
    let ocol = otherColor(col)
    for (var n of co.neighbours()) {
      let f = this.fields[n.index()]
      if (f === empty)
	return true
      let nl = this.numLibsAt(n)
      if (f === col && nl > 1)
	return true
      if (f === ocol && nl === 1)
	return true}
    return false}

  isKoMove(col, co) {
    assertIsColor(col)
    assert(co.isCoord())
    let coidx = co.index()
    assert(this.fields[coidx] === empty)
    let ocol = otherColor(col)
    let numKilled = 0
    let numMine = 0
    for (var n of co.neighbours()) {
      let f = this.fields[n.index()]
      if (f === empty)
	return false
      if (f === col)
	return false
      if (f === ocol) {
	var nl = this.numLibsAt(n)
	if (nl === 1) {
	  var ns = this.numStonesAt(n)
	  if (ns === 1) {
	    numKilled++
	    if (numKilled >= 2)
	      return false}
	  else if (ns > 1)
	    return false}}}
    return numKilled === 1}
  
  place(col, co) {
    assertIsColor(col)
    assert(co.isCoord())
    let coidx = co.index()
    if (this.fields[coidx] != empty) {
      console.log('couldnt place at ' + co.toString())
      return false}

    this.fields[coidx] = col
    
    let ch = new chain(co, this.freeFieldsAround(co))
    this.chains.set(co.index(), ch);

    for (let n of co.neighbours()) {
      if (this.fieldAt(n) !== empty)
	this.takeAwayLib(n, co, col)}

    for (let n of co.neighbours()) {
      if (this.fieldAt(n) === col) {
	this.ufAdd(n, co)}}

    return true}

  stonesKilledByPlacing(col, co) {
    assertIsColor(col)
    assert(co.isCoord())
    let coidx = co.index()
    if (this.fields[coidx] != empty)
      return null
    let ocol = otherColor(col)
    var res = null
    for (var n of co.neighbours()) {
      let f = this.fields[n.index()]
      if (f === ocol && this.numLibsAt(n) === 1) {
	if (res === null)
	  res = new Set()
	for (var sidx of this.stonesOfChainAt(n))
	  res.add(sidx)}}
    return res}
  
  ufAdd(a, b) {
    let ap = this.ufLookup(a)
    let bp = this.ufLookup(b)
    if (!ap.equals(bp)) {
      let ab = this.merge(ap, bp)
      if (ab != ap)
	this.parents.set(ap.index(), ab)
      if (ab != bp)
	this.parents.set(bp.index(), ab)}}
  
  merge(a, b) {
    let ach = this.chainAt(a)
    let bch = this.chainAt(b)
    if (ach.numStones() > bch.numStones()) {
      ach.addFrom(bch)
      this.chains.delete(b.index())
      return a}
    else {
      bch.addFrom(ach)
      this.chains.delete(a.index())
      return b}}
  
  fieldAt(co) {
    return this.fields[co.index()]}
  
  isEmptyAt(co) {
    return this.fieldAt(co) === empty}

  isStoneAt(co, col) {
    assert(col === white || col === black)
    return this.fieldAt(co) === col}

  freeFieldsAround(co) {
    let res = []
    for (let n of co.neighbours()) {
      if (this.isEmptyAt(n))
	res.push(n)}
    return res}

  // union-find
  
  ufLookup(x) {
    let idx = x.index();
    if (this.parents.has(idx)) {
      let par = this.parents.get(idx)
      if (x.equals(par))
      	return par
      let res = this.ufLookup(par)
      if (!par.equals(res))
	this.parents.set(idx, res)
      return res}
    else
      return x}

  
  chainAt(co) {
    let p = this.ufLookup(co)
    return this.chains.get(p.index())}
  
  numLibsAt(co) {
    return this.chainAt(co).numLibs()}

  numStonesAt(co) {
    return this.chainAt(co).numStones()}

  stonesOfChainAt(co) {
    return this.chainAt(co).stones.set}

  // take away one lib from the group at 'coord'
  takeAwayLib(coord, lib, takerCol) {
    let p = this.ufLookup(coord)
    let byOther = this.fieldAt(p) != takerCol
    let ch = this.chainAt(p)
    if (ch) {
      ch.takeAwayLib(lib)
      if (byOther && ch.isDead())
	this.killGroup(p, takerCol)}}

  killGroup(p, takerCol) {
    let pidx = p.index()
    let ch = this.chains.get(pidx);
    this.chains.delete(pidx)
    for (let fidx of ch.stones.set) {
      let f = coord.fromIndex(fidx)
      for (let n of f.neighbours()) {
	if (this.fieldAt(n) === takerCol) {
	  let np = this.ufLookup(n)
	  let och = this.chains.get(np.index())
	  assert(och)
	  och.addLib(f)}}
      this.fields[f.index()] = empty
      this.parents.delete(fidx)}}
  
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
	let emp = markedField(x,y) ? '\u00B7' : ' ';
	line.push(['○', '●', emp][t])
      }
      line.push('|| ' + twoDigits(y+1))
      lines.push(line.join(''))
    }
    lines.push(border)
    lines.push(letters)
    return lines.join('\n')}


  iterateAllStones(f) {
    for (var i = 0; i < S2; i++) {
      let col = this.fields[i];
      if (col != empty) {
	f(col, coord.fromIndex(i))}}}
}

function markedField(x,y) {
  return ((x == 3 || x == S-1-3 || x == 9)
	  && (y == 3 || y == S-1-3 || y == 9))}

function testBoard1() {
  let b = new board()
  let c3 = coord.fromName('C3');
  b.place(black, c3)
  assert.equal(4, b.numLibsAt(c3))

  let d3 = coord.fromName('D3');
  b.place(white, d3)
  assert.equal(3, b.numLibsAt(c3))
  assert.equal(3, b.numLibsAt(d3))

  let b3 = coord.fromName('B3');
  b.place(white, b3)
  assert.equal(2, b.numLibsAt(c3))

  let c2 = coord.fromName('C2');
  b.place(white, c2)
  assert.equal(1, b.numLibsAt(c3))

  let c4 = coord.fromName('C4');
  b.place(white, c4)
  assert(b.isEmptyAt(c3))
  assert(!b.parents.get(c3.index))}

function testBoard2() {
  let b = new board()
  b.place(black, coord.fromName('C1'))
  b.place(black, coord.fromName('D1'))
  b.place(black, coord.fromName('A1'))
  b.place(black, coord.fromName('A2'))
  
  assert.equal(b.numLibsAt(coord.fromName('C1')), 4)
  assert.equal(b.numLibsAt(coord.fromName('A1')), 3)
  assert.notEqual(b.ufLookup(coord.fromName('C1')),
		  b.ufLookup(coord.fromName('A1')))

  b.place(black, coord.fromName('B1'))
  // console.log(b.toString())
  
  assert.equal(b.ufLookup(coord.fromName('C1')),
	       b.ufLookup(coord.fromName('A1')))
  assert.equal(b.numLibsAt(coord.fromName('A1')), 5)
  
  let ch = b.chainAt(coord.fromName('A1'))
  ch.hasLib(coord.fromName('A3'))
  ch.hasLib(coord.fromName('B2'))
  ch.hasLib(coord.fromName('C2'))
  ch.hasLib(coord.fromName('D2'))
  ch.hasLib(coord.fromName('E1'))

  b.place(white, coord.fromName('A3'))
  b.place(white, coord.fromName('B2'))
  b.place(white, coord.fromName('C2'))
  b.place(white, coord.fromName('D2'))
  b.place(white, coord.fromName('E1'))
  // console.log(b.toString())
}

function testBoard3() {
  let b = new board()
  for (var c of 'B1,D1,A2,D2,A3,B3,C3,D3'.split(','))
    b.place(black, coord.fromName(c))
  for (var c of 'B2,C2,E1,E2,E3,E4,D4,C4,B4,A4'.split(','))
    b.place(white, coord.fromName(c))

  console.log(b.toString())

  assert(b.canPlace(black, coord.fromName('A1')))
  assert(b.canPlace(black, coord.fromName('C1')))
}


function testBoardClone() {
  let b = new board()
  b.place(black, coord.fromName('C1'))
  let c = b.clone()
  assert(c.numLibsAt(coord.fromName('C1')) == 3)
}


export function runAllTests() {
  testCoord()
  testChain()
  testBoard1()
  testBoard2()
  testBoardClone()
  testBoard3()
  console.log('board tests ok')
}

// runAllTests()
