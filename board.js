'use strict';Object.defineProperty(exports, '__esModule', { value: true });var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();exports.coordSetToString = coordSetToString;exports.coordArrayToString = coordArrayToString;exports.testCoord = testCoord;exports.assertIsColor = assertIsColor;exports.otherColor = otherColor;exports.runAllTests = runAllTests;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError('Cannot call a class as a function');}}var assert = require('assert');

var S = 19;exports.S = S;
var S2 = S * S;exports.S2 = S2;

var go_xcoords = 'ABCDEFGHJKLMNOPQRST';var 

coord = (function () {
  function coord(x, y) {_classCallCheck(this, coord);
    assert(x >= 0 && x < S);
    assert(y >= 0 && y < S);
    this.xc = x;
    this.yc = y;}























































  // This function expects an ordinary Set of coord indices...
  _createClass(coord, [{ key: 'isCoord', value: function isCoord() {return true;} }, { key: 'x', value: function x() {return this.xc;} }, { key: 'y', value: function y() {return this.yc;} }, { key: 'equals', value: function equals(o) {return o !== null && this.xc == o.xc && this.yc == o.yc;} }, { key: 'index', value: function index() {return S * this.yc + this.xc;} }, { key: 'neighbours', value: function neighbours() {var res = [];if (this.xc >= 1) res.push(new coord(this.xc - 1, this.yc));if (this.xc < S - 1) res.push(new coord(this.xc + 1, this.yc));if (this.yc >= 1) res.push(new coord(this.xc, this.yc - 1));if (this.yc < S - 1) res.push(new coord(this.xc, this.yc + 1));return res;} }, { key: 'diagonalNeighbours', value: function diagonalNeighbours() {var res = [];var xc = this.xc;var yc = this.yc;function p(dx, dy) {var x = xc + dx;var y = yc + dy;if (x >= 0 && x < S && y >= 0 && y < S) res.push(new coord(x, y));}p(-1, -1);p(1, -1);p(1, 1);p(-1, 1);return res;} }, { key: 'displace', value: function displace(dx, dy) {var x = this.xc + dx;var y = this.yc + dy;if (x >= 0 && x < S && y >= 0 && y < S) return new coord(x, y);else return null;} }, { key: 'toString', value: function toString() {return go_xcoords[this.xc] + (this.yc + 1);} }], [{ key: 'fromIndex', value: function fromIndex(i) {return new coord(i % S, Math.floor(i / S));} }, { key: 'fromName', value: function fromName(nm) {var x = go_xcoords.indexOf(nm[0]);assert(x >= 0);var y = parseInt(nm.slice(1)) - 1;return new coord(x, y);} }]);return coord;})();exports.coord = coord;function coordSetToString(set) {
  var ary = Array.from(set);
  ary.sort();
  var res = [];var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
    for (var _iterator = ary[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var e = _step.value;
      res.push(coord.fromIndex(e).toString());}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator['return']) {_iterator['return']();}} finally {if (_didIteratorError) {throw _iteratorError;}}}
  return res.join(', ');}

function coordArrayToString(ary) {
  var res = [];var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {
    for (var _iterator2 = ary[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var e = _step2.value;
      res.push(e.toString());}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2['return']) {_iterator2['return']();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}
  return res.join(', ');}var 


coordSet = (function () {
  function coordSet(coords) {_classCallCheck(this, coordSet);
    this.set = new Set();var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {
      for (var _iterator3 = coords[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var c = _step3.value;
        assert(c.isCoord());
        this.set.add(c.index());}} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3['return']) {_iterator3['return']();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}}_createClass(coordSet, [{ key: 'clone', value: 

    function clone() {
      var res = new coordSet([]);var _iteratorNormalCompletion4 = true;var _didIteratorError4 = false;var _iteratorError4 = undefined;try {
        for (var _iterator4 = this.set[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {var ci = _step4.value;
          res.set.add(ci);}} catch (err) {_didIteratorError4 = true;_iteratorError4 = err;} finally {try {if (!_iteratorNormalCompletion4 && _iterator4['return']) {_iterator4['return']();}} finally {if (_didIteratorError4) {throw _iteratorError4;}}}
      return res;} }, { key: 'equals', value: 

    function equals(other) {var _iteratorNormalCompletion5 = true;var _didIteratorError5 = false;var _iteratorError5 = undefined;try {
        for (var _iterator5 = other.set[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {var x = _step5.value;
          if (!this.set.has(x)) 
          return false;}} catch (err) {_didIteratorError5 = true;_iteratorError5 = err;} finally {try {if (!_iteratorNormalCompletion5 && _iterator5['return']) {_iterator5['return']();}} finally {if (_didIteratorError5) {throw _iteratorError5;}}}var _iteratorNormalCompletion6 = true;var _didIteratorError6 = false;var _iteratorError6 = undefined;try {
        for (var _iterator6 = this.set[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {var x = _step6.value;
          if (!other.set.has(x)) 
          return false;}} catch (err) {_didIteratorError6 = true;_iteratorError6 = err;} finally {try {if (!_iteratorNormalCompletion6 && _iterator6['return']) {_iterator6['return']();}} finally {if (_didIteratorError6) {throw _iteratorError6;}}}
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
    function addFrom(ch) {var _iteratorNormalCompletion7 = true;var _didIteratorError7 = false;var _iteratorError7 = undefined;try {
        for (var _iterator7 = ch.stones.set[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {var s = _step7.value;
          this.stones.add(s);}} catch (err) {_didIteratorError7 = true;_iteratorError7 = err;} finally {try {if (!_iteratorNormalCompletion7 && _iterator7['return']) {_iterator7['return']();}} finally {if (_didIteratorError7) {throw _iteratorError7;}}}var _iteratorNormalCompletion8 = true;var _didIteratorError8 = false;var _iteratorError8 = undefined;try {
        for (var _iterator8 = ch.libs.set[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {var l = _step8.value;
          this.libs.add(l);}} catch (err) {_didIteratorError8 = true;_iteratorError8 = err;} finally {try {if (!_iteratorNormalCompletion8 && _iterator8['return']) {_iterator8['return']();}} finally {if (_didIteratorError8) {throw _iteratorError8;}}}} }, { key: 'takeAwayLib', value: 
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
    this.fields.fill(empty);
    this.hasher = null;
    this.hash = 0;}_createClass(board, [{ key: 'initHasher', value: 

    function initHasher() {
      this.hasher = new hasher();
      this.hasher.updateBoardHash(this);} }, { key: 'clone', value: 

    function clone() {
      var res = new board();
      res.fields = new Int8Array(this.fields);
      res.parents = new Map(this.parents);
      res.chains = new Map();var _iteratorNormalCompletion9 = true;var _didIteratorError9 = false;var _iteratorError9 = undefined;try {
        for (var _iterator9 = this.chains.keys()[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {var co = _step9.value;
          res.chains.set(co, this.chains.get(co).clone());}} catch (err) {_didIteratorError9 = true;_iteratorError9 = err;} finally {try {if (!_iteratorNormalCompletion9 && _iterator9['return']) {_iterator9['return']();}} finally {if (_didIteratorError9) {throw _iteratorError9;}}}
      res.hasher = this.hasher;
      res.hash = this.hash;
      return res;} }, { key: 'canPlace', value: 

    function canPlace(col, co) {
      assertIsColor(col);
      assert(co.isCoord());
      var coidx = co.index();
      if (this.fields[coidx] != empty) 
      return false;
      var ocol = otherColor(col);var _iteratorNormalCompletion10 = true;var _didIteratorError10 = false;var _iteratorError10 = undefined;try {
        for (var _iterator10 = co.neighbours()[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {var n = _step10.value;
          var f = this.fields[n.index()];
          if (f === empty) 
          return true;
          var nl = this.numLibsAt(n);
          if (f === col && nl > 1) 
          return true;
          if (f === ocol && nl === 1) 
          return true;}} catch (err) {_didIteratorError10 = true;_iteratorError10 = err;} finally {try {if (!_iteratorNormalCompletion10 && _iterator10['return']) {_iterator10['return']();}} finally {if (_didIteratorError10) {throw _iteratorError10;}}}
      return false;} }, { key: 'isSelfAtari', value: 

    function isSelfAtari(col, co) {
      assertIsColor(col);
      assert(co.isCoord());
      var coidx = co.index();
      if (this.fields[coidx] != empty) 
      return null;
      var numEmpty = 0;
      var ns = co.neighbours();var _iteratorNormalCompletion11 = true;var _didIteratorError11 = false;var _iteratorError11 = undefined;try {
        for (var _iterator11 = ns[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {var n = _step11.value;
          if (this.fieldAt(n) == empty) {
            numEmpty++;
            if (numEmpty == 2) 
            return false;}}} catch (err) {_didIteratorError11 = true;_iteratorError11 = err;} finally {try {if (!_iteratorNormalCompletion11 && _iterator11['return']) {_iterator11['return']();}} finally {if (_didIteratorError11) {throw _iteratorError11;}}}var _iteratorNormalCompletion12 = true;var _didIteratorError12 = false;var _iteratorError12 = undefined;try {

        for (var _iterator12 = ns[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {var n = _step12.value;
          if (this.fieldAt(n) == col && 
          this.numLibsAt(n) >= 3) 
          return false;}} catch (err) {_didIteratorError12 = true;_iteratorError12 = err;} finally {try {if (!_iteratorNormalCompletion12 && _iterator12['return']) {_iterator12['return']();}} finally {if (_didIteratorError12) {throw _iteratorError12;}}}

      var libs = new Set();var _iteratorNormalCompletion13 = true;var _didIteratorError13 = false;var _iteratorError13 = undefined;try {
        for (var _iterator13 = ns[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {var n = _step13.value;
          if (this.fieldAt(n) == col) {var _iteratorNormalCompletion16 = true;var _didIteratorError16 = false;var _iteratorError16 = undefined;try {
              for (var _iterator16 = this.libsOfChainAt(n)[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {var l = _step16.value;
                if (l === coidx) continue;
                libs.add(l);
                if (libs.size >= 2) 
                return false;}} catch (err) {_didIteratorError16 = true;_iteratorError16 = err;} finally {try {if (!_iteratorNormalCompletion16 && _iterator16['return']) {_iterator16['return']();}} finally {if (_didIteratorError16) {throw _iteratorError16;}}}}}} catch (err) {_didIteratorError13 = true;_iteratorError13 = err;} finally {try {if (!_iteratorNormalCompletion13 && _iterator13['return']) {_iterator13['return']();}} finally {if (_didIteratorError13) {throw _iteratorError13;}}}var _iteratorNormalCompletion14 = true;var _didIteratorError14 = false;var _iteratorError14 = undefined;try {

        for (var _iterator14 = ns[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {var n = _step14.value;
          if (this.fieldAt(n) == empty) {
            libs.add(n.index());
            if (libs.size >= 2) 
            return false;}}

        // slightly wrong here:
        //    does not detect some snapbacks
      } catch (err) {_didIteratorError14 = true;_iteratorError14 = err;} finally {try {if (!_iteratorNormalCompletion14 && _iterator14['return']) {_iterator14['return']();}} finally {if (_didIteratorError14) {throw _iteratorError14;}}}var ocol = otherColor(col);var _iteratorNormalCompletion15 = true;var _didIteratorError15 = false;var _iteratorError15 = undefined;try {
        for (var _iterator15 = ns[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {var n = _step15.value;
          if (this.fieldAt(n) === ocol && 
          this.numLibsAt(n) === 1 && (
          this.numStonesAt(n) >= 2 || 
          libs.size >= 1)) 
          return false;}} catch (err) {_didIteratorError15 = true;_iteratorError15 = err;} finally {try {if (!_iteratorNormalCompletion15 && _iterator15['return']) {_iterator15['return']();}} finally {if (_didIteratorError15) {throw _iteratorError15;}}}

      return true;} }, { key: 'isKoMove', value: 

    function isKoMove(col, co) {
      assertIsColor(col);
      assert(co.isCoord());
      var coidx = co.index();
      assert(this.fields[coidx] === empty);
      var ocol = otherColor(col);
      var numKilled = 0;
      var numMine = 0;var _iteratorNormalCompletion17 = true;var _didIteratorError17 = false;var _iteratorError17 = undefined;try {
        for (var _iterator17 = co.neighbours()[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {var n = _step17.value;
          var f = this.fields[n.index()];
          if (f === empty) 
          return false;
          if (f === col) 
          return false;
          if (f === ocol) {
            var nl = this.numLibsAt(n);
            if (nl === 1) {
              var ns = this.numStonesAt(n);
              if (ns === 1) {
                numKilled++;
                if (numKilled >= 2) 
                return false;} else 
              if (ns > 1) 
              return false;}}}} catch (err) {_didIteratorError17 = true;_iteratorError17 = err;} finally {try {if (!_iteratorNormalCompletion17 && _iterator17['return']) {_iterator17['return']();}} finally {if (_didIteratorError17) {throw _iteratorError17;}}}
      return numKilled === 1;} }, { key: 'place', value: 

    function place(col, co) {
      assertIsColor(col);
      assert(co.isCoord());
      var coidx = co.index();
      if (this.fields[coidx] != empty) {
        console.log('couldnt place at ' + co.toString());
        return false;}

      var old = this.fields[coidx];
      this.fields[coidx] = col;
      if (this.hasher !== null) 
      this.hasher.fieldChanged(this, coidx, old, col);

      var ch = new chain(co, this.freeFieldsAround(co));
      this.chains.set(co.index(), ch);var _iteratorNormalCompletion18 = true;var _didIteratorError18 = false;var _iteratorError18 = undefined;try {

        for (var _iterator18 = co.neighbours()[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {var n = _step18.value;
          if (this.fieldAt(n) !== empty) 
          this.takeAwayLib(n, co, col);}} catch (err) {_didIteratorError18 = true;_iteratorError18 = err;} finally {try {if (!_iteratorNormalCompletion18 && _iterator18['return']) {_iterator18['return']();}} finally {if (_didIteratorError18) {throw _iteratorError18;}}}var _iteratorNormalCompletion19 = true;var _didIteratorError19 = false;var _iteratorError19 = undefined;try {

        for (var _iterator19 = co.neighbours()[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {var n = _step19.value;
          if (this.fieldAt(n) === col) {
            this.ufAdd(n, co);}}} catch (err) {_didIteratorError19 = true;_iteratorError19 = err;} finally {try {if (!_iteratorNormalCompletion19 && _iterator19['return']) {_iterator19['return']();}} finally {if (_didIteratorError19) {throw _iteratorError19;}}}

      return true;} }, { key: 'stonesKilledByPlacing', value: 

    function stonesKilledByPlacing(col, co) {
      assertIsColor(col);
      assert(co.isCoord());
      var coidx = co.index();
      if (this.fields[coidx] != empty) 
      return null;
      var ocol = otherColor(col);
      var res = null;var _iteratorNormalCompletion20 = true;var _didIteratorError20 = false;var _iteratorError20 = undefined;try {
        for (var _iterator20 = co.neighbours()[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {var n = _step20.value;
          var f = this.fields[n.index()];
          if (f === ocol && this.numLibsAt(n) === 1) {
            if (res === null) 
            res = new Set();var _iteratorNormalCompletion21 = true;var _didIteratorError21 = false;var _iteratorError21 = undefined;try {
              for (var _iterator21 = this.stonesOfChainAt(n)[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {var sidx = _step21.value;
                res.add(sidx);}} catch (err) {_didIteratorError21 = true;_iteratorError21 = err;} finally {try {if (!_iteratorNormalCompletion21 && _iterator21['return']) {_iterator21['return']();}} finally {if (_didIteratorError21) {throw _iteratorError21;}}}}}} catch (err) {_didIteratorError20 = true;_iteratorError20 = err;} finally {try {if (!_iteratorNormalCompletion20 && _iterator20['return']) {_iterator20['return']();}} finally {if (_didIteratorError20) {throw _iteratorError20;}}}
      return res;} }, { key: 'ufAdd', value: 

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
      var res = [];var _iteratorNormalCompletion22 = true;var _didIteratorError22 = false;var _iteratorError22 = undefined;try {
        for (var _iterator22 = co.neighbours()[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {var n = _step22.value;
          if (this.isEmptyAt(n)) 
          res.push(n);}} catch (err) {_didIteratorError22 = true;_iteratorError22 = err;} finally {try {if (!_iteratorNormalCompletion22 && _iterator22['return']) {_iterator22['return']();}} finally {if (_didIteratorError22) {throw _iteratorError22;}}}
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

      return x;} }, { key: 'chainRepresenter', value: 

    function chainRepresenter(co) {
      return this.ufLookup(co);} }, { key: 'chainAt', value: 

    function chainAt(co) {
      var p = this.ufLookup(co);
      return this.chains.get(p.index());} }, { key: 'numLibsAt', value: 

    function numLibsAt(co) {
      return this.chainAt(co).numLibs();} }, { key: 'numStonesAt', value: 

    function numStonesAt(co) {
      return this.chainAt(co).numStones();} }, { key: 'libsOfChainAt', value: 

    function libsOfChainAt(co) {
      return this.chainAt(co).libs.set;} }, { key: 'stonesOfChainAt', value: 

    function stonesOfChainAt(co) {
      return this.chainAt(co).stones.set;}

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
      this.chains['delete'](pidx);var _iteratorNormalCompletion23 = true;var _didIteratorError23 = false;var _iteratorError23 = undefined;try {
        for (var _iterator23 = ch.stones.set[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {var fidx = _step23.value;
          var f = coord.fromIndex(fidx);var _iteratorNormalCompletion24 = true;var _didIteratorError24 = false;var _iteratorError24 = undefined;try {
            for (var _iterator24 = f.neighbours()[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {var n = _step24.value;
              if (this.fieldAt(n) === takerCol) {
                var np = this.ufLookup(n);
                var och = this.chains.get(np.index());
                assert(och);
                och.addLib(f);}}} catch (err) {_didIteratorError24 = true;_iteratorError24 = err;} finally {try {if (!_iteratorNormalCompletion24 && _iterator24['return']) {_iterator24['return']();}} finally {if (_didIteratorError24) {throw _iteratorError24;}}}
          var old = this.fields[fidx];
          this.fields[fidx] = empty;
          if (this.hasher !== null) 
          this.hasher.fieldChanged(this, fidx, old, empty);

          this.parents['delete'](fidx);}} catch (err) {_didIteratorError23 = true;_iteratorError23 = err;} finally {try {if (!_iteratorNormalCompletion23 && _iterator23['return']) {_iterator23['return']();}} finally {if (_didIteratorError23) {throw _iteratorError23;}}}} }, { key: 'toString', value: 

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
          var emp = markedField(x, y) ? '·' : ' ';
          line.push(['○', '●', emp][t]);}

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


function markedField(x, y) {
  return (x == 3 || x == S - 1 - 3 || x == 9) && (
  y == 3 || y == S - 1 - 3 || y == 9);}

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

function testBoard3() {
  var b = new board();var _iteratorNormalCompletion25 = true;var _didIteratorError25 = false;var _iteratorError25 = undefined;try {
    for (var _iterator25 = 'B1,D1,A2,D2,A3,B3,C3,D3'.split(',')[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {var c = _step25.value;
      b.place(black, coord.fromName(c));}} catch (err) {_didIteratorError25 = true;_iteratorError25 = err;} finally {try {if (!_iteratorNormalCompletion25 && _iterator25['return']) {_iterator25['return']();}} finally {if (_didIteratorError25) {throw _iteratorError25;}}}var _iteratorNormalCompletion26 = true;var _didIteratorError26 = false;var _iteratorError26 = undefined;try {
    for (var _iterator26 = 'B2,C2,E1,E2,E3,E4,D4,C4,B4,A4'.split(',')[Symbol.iterator](), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {var c = _step26.value;
      b.place(white, coord.fromName(c));}} catch (err) {_didIteratorError26 = true;_iteratorError26 = err;} finally {try {if (!_iteratorNormalCompletion26 && _iterator26['return']) {_iterator26['return']();}} finally {if (_didIteratorError26) {throw _iteratorError26;}}}

  console.log(b.toString());

  assert(b.canPlace(black, coord.fromName('A1')));
  assert(b.canPlace(black, coord.fromName('C1')));}



function testBoardClone() {
  var b = new board();
  b.place(black, coord.fromName('C1'));
  var c = b.clone();
  assert(c.numLibsAt(coord.fromName('C1')) == 3);}var 


hasher = (function () {
  function hasher() {_classCallCheck(this, hasher);
    var n = 3 * 19 * 19;
    var hs = this.hashes = new Uint32Array(n);
    for (var i = 0; i < n; i++) 
    hs[i] = Math.floor(Math.random() * 0x100000000);}_createClass(hasher, [{ key: 'updateBoardHash', value: 

    function updateBoardHash(board) {
      var h = 0;
      for (var idx = 0; idx < 361; idx++) 
      h += this.hashes[3 * idx + board.fields[idx]];
      board.hash = h;} }, { key: 'fieldChanged', value: 

    function fieldChanged(board, index, old, theNew) {
      var b = 3 * index;
      board.hash += this.hashes[b + theNew] - this.hashes[b + old];} }]);return hasher;})();



function runAllTests() {
  testCoord();
  testChain();
  testBoard1();
  testBoard2();
  testBoardClone();
  testBoard3();
  console.log('board tests ok');}


// runAllTests()