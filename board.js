'use strict';Object.defineProperty(exports, '__esModule', { value: true });var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();exports.testCoord = testCoord;exports.assertIsColor = assertIsColor;exports.otherColor = otherColor;exports.runAllTests = runAllTests;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError('Cannot call a class as a function');}}var assert = require('assert');

var S = 19;exports.S = S;
var S2 = S * S;exports.S2 = S2;

var go_xcoords = 'ABCDEFGHJKLMNOPQRST';var 

coord = (function () {
  function coord(x, y) {_classCallCheck(this, coord);
    assert(x >= 0 && x < S);
    assert(y >= 0 && y < S);
    this.xc = x;
    this.yc = y;}_createClass(coord, [{ key: 'isCoord', value: 
    function isCoord() {return true;} }, { key: 'x', value: 
    function x() {return this.xc;} }, { key: 'y', value: 
    function y() {return this.yc;} }, { key: 'equals', value: 
    function equals(o) {
      return this.xc == o.xc && 
      this.yc == o.yc;} }, { key: 'index', value: 
    function index() {
      return S * this.yc + this.xc;} }, { key: 'neighbours', value: 







    function neighbours() {
      var res = [];
      if (this.xc >= 1) 
      res.push(new coord(this.xc - 1, this.yc));
      if (this.xc < S - 1) 
      res.push(new coord(this.xc + 1, this.yc));
      if (this.yc >= 1) 
      res.push(new coord(this.xc, this.yc - 1));
      if (this.yc < S - 1) 
      res.push(new coord(this.xc, this.yc + 1));
      return res;} }, { key: 'toString', value: 
    function toString() {
      return go_xcoords[this.xc] + (this.yc + 1);} }], [{ key: 'fromIndex', value: function fromIndex(i) {return new coord(i % S, Math.floor(i / S));} }, { key: 'fromName', value: function fromName(nm) {var x = go_xcoords.indexOf(nm[0]);assert(x >= 0);var y = parseInt(nm.slice(1)) - 1;return new coord(x, y);} }]);return coord;})();exports.coord = coord;var 



coordSet = (function () {
  function coordSet(coords) {_classCallCheck(this, coordSet);
    this.set = new Set();var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
      for (var _iterator = coords[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var c = _step.value;
        assert(c.isCoord());
        this.set.add(c.index());}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator['return']) {_iterator['return']();}} finally {if (_didIteratorError) {throw _iteratorError;}}}}_createClass(coordSet, [{ key: 'clone', value: 

    function clone() {
      var res = new coordSet([]);var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {
        for (var _iterator2 = this.set[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var ci = _step2.value;
          res.set.add(ci);}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2['return']) {_iterator2['return']();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}
      return res;} }, { key: 'equals', value: 

    function equals(other) {var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {
        for (var _iterator3 = other.set[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var x = _step3.value;
          if (!this.set.has(x)) 
          return false;}} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3['return']) {_iterator3['return']();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}var _iteratorNormalCompletion4 = true;var _didIteratorError4 = false;var _iteratorError4 = undefined;try {
        for (var _iterator4 = this.set[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {var x = _step4.value;
          if (!other.set.has(x)) 
          return false;}} catch (err) {_didIteratorError4 = true;_iteratorError4 = err;} finally {try {if (!_iteratorNormalCompletion4 && _iterator4['return']) {_iterator4['return']();}} finally {if (_didIteratorError4) {throw _iteratorError4;}}}
      return true;} }, { key: 'toString', value: 
    function toString() {
      var xs = Array.
      from(this.set).
      map(function (c) {return coord.fromIndex(c).toString();});
      return '{' + xs.join(', ') + '}';} }, { key: 'size', value: 
    function size() {
      return this.set.size;} }, { key: 'add', value: 
    function add(coordidx) {
      this.set.add(coordidx);} }, { key: 'delete', value: 
    function _delete(coordidx) {
      this.set['delete'](coordidx);} }, { key: 'has', value: 
    function has(coordidx) {
      return this.set.has(coordidx);} }]);return coordSet;})();



function testCoord() {
  var a = new coord(3, 4);
  assert.equal(a.x(), 3);
  assert.equal(a.y(), 4);
  assert.equal(new coord(0, 0).index(), 0);
  assert.equal(new coord(18, 18).index(), S2 - 1);
  assert(new coordSet([new coord(6, 7), 
  new coord(7, 8)]).
  equals(new coordSet([new coord(6, 7), 
  new coord(7, 8)])));
  assert(!new coordSet([new coord(6, 7), 
  new coord(7, 8)]).
  equals(new coordSet([new coord(6, 7), 
  new coord(7, 9)])));
  assert(new coordSet(new coord(2, 5).neighbours()).
  equals(new coordSet([new coord(1, 5), 
  new coord(3, 5), 
  new coord(2, 4), 
  new coord(2, 6)])));

  assert.equal(new coord(0, 0).toString(), 'A1');
  assert.equal(new coord(6, 7).toString(), 'G8');
  assert.equal(new coordSet([new coord(2, 3), 
  new coord(3, 7)]).
  toString(), 
  "{C4, D8}");
  assert.deepEqual(new coord(0, 0), 
  coord.fromName("A1"));}var 



chain = (function () {
  function chain(stone, libs) {_classCallCheck(this, chain);
    if (stone) {// for clone support
      this.stones = new coordSet([stone]);
      this.libs = new coordSet(libs);} else 
    {
      this.stones = null;
      this.libs = null;}}_createClass(chain, [{ key: 'toString', value: 

    function toString() {
      return ['chain stones:', this.stones.toString(), 
      'libs:', this.libs.toString()].join(' ');} }, { key: 'clone', value: 

    function clone() {
      var res = new chain(false, false);
      res.stones = this.stones.clone();
      res.libs = this.libs.clone();
      return res;} }, { key: 'numStones', value: 

    function numStones() {
      return this.stones.size();} }, { key: 'numLibs', value: 
    function numLibs() {
      return this.libs.size();} }, { key: 'isDead', value: 
    function isDead() {
      return this.numLibs() == 0;} }, { key: 'addFrom', value: 
    function addFrom(ch) {var _iteratorNormalCompletion5 = true;var _didIteratorError5 = false;var _iteratorError5 = undefined;try {
        for (var _iterator5 = ch.stones.set[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {var s = _step5.value;
          this.stones.add(s);}} catch (err) {_didIteratorError5 = true;_iteratorError5 = err;} finally {try {if (!_iteratorNormalCompletion5 && _iterator5['return']) {_iterator5['return']();}} finally {if (_didIteratorError5) {throw _iteratorError5;}}}var _iteratorNormalCompletion6 = true;var _didIteratorError6 = false;var _iteratorError6 = undefined;try {
        for (var _iterator6 = ch.libs.set[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {var l = _step6.value;
          this.libs.add(l);}} catch (err) {_didIteratorError6 = true;_iteratorError6 = err;} finally {try {if (!_iteratorNormalCompletion6 && _iterator6['return']) {_iterator6['return']();}} finally {if (_didIteratorError6) {throw _iteratorError6;}}}} }, { key: 'takeAwayLib', value: 
    function takeAwayLib(lib) {
      this.libs['delete'](lib.index());} }, { key: 'addLib', value: 
    function addLib(lib) {
      this.libs.add(lib.index());} }, { key: 'hasLib', value: 
    function hasLib(lib) {
      return this.libs.has(lib.index());} }]);return chain;})();exports.chain = chain;


function testChain() {
  var x = coord.fromName('D5');
  var c = new chain(x, x.neighbours());
  // assert.equal(c.toString(),
  // 	       'chain stones: {D5} libs: {C5, E5, D4, D6}')
  function ac(cs, co) {
    assert(cs.set.has(coord.fromName(co).index()));}
  assert.equal(c.numStones(), 1);
  assert.equal(c.numLibs(), 4);
  ac(c.stones, 'D5');
  ac(c.libs, 'C5');
  ac(c.libs, 'D4');
  ac(c.libs, 'D6');
  ac(c.libs, 'E5');
  assert(!c.isDead());

  var y = coord.fromName('E5');
  var d = new chain(y, y.neighbours());

  c.takeAwayLib(y);
  d.takeAwayLib(x);

  c.addFrom(d);

  assert.equal(c.numStones(), 2);
  assert.equal(c.numLibs(), 6);
  assert(!c.isDead());
  ac(c.stones, 'D5');
  ac(c.stones, 'E5');
  ac(c.libs, 'C5');
  ac(c.libs, 'D4');
  ac(c.libs, 'D6');
  ac(c.libs, 'E4');
  ac(c.libs, 'E6');
  ac(c.libs, 'F5');}


function twoDigits(n) {
  if (n >= 1 && n <= 9) 
  return ' ' + n;else 
  return '' + n;}


var black = 0;exports.black = black;
var white = 1;exports.white = white;
var empty = 2;exports.empty = empty;

function assertIsColor(col) {
  assert(col === black || col === white);}

function otherColor(col) {
  assertIsColor(col);
  return black + white - col;}var 

board = (function () {
  function board() {_classCallCheck(this, board);
    // mapping coord index to parent coord index, union-find
    this.parents = new Map();
    // mapping coord index to chain
    this.chains = new Map();
    // field content
    this.fields = new Int8Array(S2);
    this.fields.fill(empty);}_createClass(board, [{ key: 'clone', value: 

    function clone() {
      var res = new board();
      res.fields = new Int8Array(this.fields);
      res.parents = new Map(this.parents);
      res.chains = new Map();var _iteratorNormalCompletion7 = true;var _didIteratorError7 = false;var _iteratorError7 = undefined;try {
        for (var _iterator7 = this.chains.keys()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {var co = _step7.value;
          res.chains.set(co, this.chains.get(co).clone());}} catch (err) {_didIteratorError7 = true;_iteratorError7 = err;} finally {try {if (!_iteratorNormalCompletion7 && _iterator7['return']) {_iterator7['return']();}} finally {if (_didIteratorError7) {throw _iteratorError7;}}}
      return res;} }, { key: 'place', value: 

    function place(col, co) {
      assertIsColor(col);
      assert(co.isCoord());
      var coidx = co.index();
      if (this.fields[coidx] != empty) {
        console.log('couldnt place at ' + co.toString());
        return false;}

      this.fields[coidx] = col;

      var ch = new chain(co, this.freeFieldsAround(co));
      this.chains.set(co.index(), ch);var _iteratorNormalCompletion8 = true;var _didIteratorError8 = false;var _iteratorError8 = undefined;try {

        for (var _iterator8 = co.neighbours()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {var n = _step8.value;
          if (this.fieldAt(n) !== empty) 
          this.takeAwayLib(n, co, col);}} catch (err) {_didIteratorError8 = true;_iteratorError8 = err;} finally {try {if (!_iteratorNormalCompletion8 && _iterator8['return']) {_iterator8['return']();}} finally {if (_didIteratorError8) {throw _iteratorError8;}}}var _iteratorNormalCompletion9 = true;var _didIteratorError9 = false;var _iteratorError9 = undefined;try {

        for (var _iterator9 = co.neighbours()[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {var n = _step9.value;
          if (this.fieldAt(n) === col) {
            this.ufAdd(n, co);}}} catch (err) {_didIteratorError9 = true;_iteratorError9 = err;} finally {try {if (!_iteratorNormalCompletion9 && _iterator9['return']) {_iterator9['return']();}} finally {if (_didIteratorError9) {throw _iteratorError9;}}}

      return true;} }, { key: 'ufAdd', value: 

    function ufAdd(a, b) {
      var ap = this.ufLookup(a);
      var bp = this.ufLookup(b);
      if (!ap.equals(bp)) {
        var ab = this.merge(ap, bp);
        if (ab != ap) 
        this.parents.set(ap.index(), ab);
        if (ab != bp) 
        this.parents.set(bp.index(), ab);}} }, { key: 'merge', value: 

    function merge(a, b) {
      var ach = this.chainAt(a);
      var bch = this.chainAt(b);
      if (ach.numStones() > bch.numStones()) {
        ach.addFrom(bch);
        this.chains['delete'](b.index());
        return a;} else 
      {
        bch.addFrom(ach);
        this.chains['delete'](a.index());
        return b;}} }, { key: 'fieldAt', value: 

    function fieldAt(co) {
      return this.fields[co.index()];} }, { key: 'isEmptyAt', value: 

    function isEmptyAt(co) {
      return this.fieldAt(co) === empty;} }, { key: 'isStoneAt', value: 

    function isStoneAt(co, col) {
      assert(col === white || col === black);
      return this.fieldAt(co) === col;} }, { key: 'freeFieldsAround', value: 

    function freeFieldsAround(co) {
      var res = [];var _iteratorNormalCompletion10 = true;var _didIteratorError10 = false;var _iteratorError10 = undefined;try {
        for (var _iterator10 = co.neighbours()[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {var n = _step10.value;
          if (this.isEmptyAt(n)) 
          res.push(n);}} catch (err) {_didIteratorError10 = true;_iteratorError10 = err;} finally {try {if (!_iteratorNormalCompletion10 && _iterator10['return']) {_iterator10['return']();}} finally {if (_didIteratorError10) {throw _iteratorError10;}}}
      return res;}

    // union-find
  }, { key: 'ufLookup', value: 
    function ufLookup(x) {
      var idx = x.index();
      if (this.parents.has(idx)) {
        var par = this.parents.get(idx);
        if (x.equals(par)) 
        return par;
        var res = this.ufLookup(par);
        if (!par.equals(res)) 
        this.parents.set(idx, res);
        return res;} else 

      return x;} }, { key: 'chainAt', value: 


    function chainAt(co) {
      var p = this.ufLookup(co);
      return this.chains.get(p.index());} }, { key: 'numLibsAt', value: 

    function numLibsAt(co) {
      return this.chainAt(co).numLibs();} }, { key: 'numStonesAt', value: 

    function numStonesAt(co) {
      return this.chainAt(co).numStones();}

    // take away one lib from the group at 'coord'
  }, { key: 'takeAwayLib', value: function takeAwayLib(coord, lib, takerCol) {
      var p = this.ufLookup(coord);
      var byOther = this.fieldAt(p) != takerCol;
      var ch = this.chainAt(p);
      if (ch) {
        ch.takeAwayLib(lib);
        if (byOther && ch.isDead()) 
        this.killGroup(p, takerCol);}} }, { key: 'killGroup', value: 

    function killGroup(p, takerCol) {
      var pidx = p.index();
      var ch = this.chains.get(pidx);
      this.chains['delete'](pidx);var _iteratorNormalCompletion11 = true;var _didIteratorError11 = false;var _iteratorError11 = undefined;try {
        for (var _iterator11 = ch.stones.set[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {var fidx = _step11.value;
          var f = coord.fromIndex(fidx);var _iteratorNormalCompletion12 = true;var _didIteratorError12 = false;var _iteratorError12 = undefined;try {
            for (var _iterator12 = f.neighbours()[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {var n = _step12.value;
              if (this.fieldAt(n) === takerCol) {
                var np = this.ufLookup(n);
                var och = this.chains.get(np.index());
                assert(och);
                och.addLib(f);}}} catch (err) {_didIteratorError12 = true;_iteratorError12 = err;} finally {try {if (!_iteratorNormalCompletion12 && _iterator12['return']) {_iterator12['return']();}} finally {if (_didIteratorError12) {throw _iteratorError12;}}}
          this.fields[f.index()] = empty;
          this.parents['delete'](fidx);}} catch (err) {_didIteratorError11 = true;_iteratorError11 = err;} finally {try {if (!_iteratorNormalCompletion11 && _iterator11['return']) {_iterator11['return']();}} finally {if (_didIteratorError11) {throw _iteratorError11;}}}} }, { key: 'toString', value: 

    function toString() {
      var p = '      ';
      var letters = 
      p + Array.from(go_xcoords).map(function (l) {return ' ' + l;}).join('');
      var border = 
      p + Array.from(go_xcoords).map(function (l) {return '==';}).join('');
      var lines = [];
      lines.push(letters);
      lines.push(border);
      for (var y = S - 1; y >= 0; y--) {
        var line = [];
        line.push(' ' + twoDigits(y + 1) + ' ||');
        for (var x = 0; x < S; x++) {
          line.push(' ');
          var t = this.fields[new coord(x, y).index()];
          assert(t === black || t === white || t === empty);
          line.push(['○', '●', ' '][t]);}

        line.push('|| ' + twoDigits(y + 1));
        lines.push(line.join(''));}

      lines.push(border);
      lines.push(letters);
      return lines.join('\n');} }, { key: 'iterateAllStones', value: 


    function iterateAllStones(f) {
      for (var i = 0; i < S2; i++) {
        var col = this.fields[i];
        if (col != empty) {
          f(col, coord.fromIndex(i));}}} }]);return board;})();exports.board = board;


function testBoard1() {
  var b = new board();
  var c3 = coord.fromName('C3');
  b.place(black, c3);
  assert.equal(4, b.numLibsAt(c3));

  var d3 = coord.fromName('D3');
  b.place(white, d3);
  assert.equal(3, b.numLibsAt(c3));
  assert.equal(3, b.numLibsAt(d3));

  var b3 = coord.fromName('B3');
  b.place(white, b3);
  assert.equal(2, b.numLibsAt(c3));

  var c2 = coord.fromName('C2');
  b.place(white, c2);
  assert.equal(1, b.numLibsAt(c3));

  var c4 = coord.fromName('C4');
  b.place(white, c4);
  assert(b.isEmptyAt(c3));
  assert(!b.parents.get(c3.index));}

function testBoard2() {
  var b = new board();
  b.place(black, coord.fromName('C1'));
  b.place(black, coord.fromName('D1'));
  b.place(black, coord.fromName('A1'));
  b.place(black, coord.fromName('A2'));

  assert.equal(b.numLibsAt(coord.fromName('C1')), 4);
  assert.equal(b.numLibsAt(coord.fromName('A1')), 3);
  assert.notEqual(b.ufLookup(coord.fromName('C1')), 
  b.ufLookup(coord.fromName('A1')));

  b.place(black, coord.fromName('B1'));
  // console.log(b.toString())

  assert.equal(b.ufLookup(coord.fromName('C1')), 
  b.ufLookup(coord.fromName('A1')));
  assert.equal(b.numLibsAt(coord.fromName('A1')), 5);

  var ch = b.chainAt(coord.fromName('A1'));
  ch.hasLib(coord.fromName('A3'));
  ch.hasLib(coord.fromName('B2'));
  ch.hasLib(coord.fromName('C2'));
  ch.hasLib(coord.fromName('D2'));
  ch.hasLib(coord.fromName('E1'));

  b.place(white, coord.fromName('A3'));
  b.place(white, coord.fromName('B2'));
  b.place(white, coord.fromName('C2'));
  b.place(white, coord.fromName('D2'));
  b.place(white, coord.fromName('E1'));
  // console.log(b.toString())
}

function testBoardClone() {
  var b = new board();
  b.place(black, coord.fromName('C1'));
  var c = b.clone();
  assert(c.numLibsAt(coord.fromName('C1')) == 3);}



function runAllTests() {
  testCoord();
  testChain();
  testBoard1();
  testBoard2();
  testBoardClone();
  console.log('board tests ok');}


// runAllTests()