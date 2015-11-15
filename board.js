'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.testCoord = testCoord;
exports.runAllTests = runAllTests;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var assert = require('assert');

var S = 19;
var S2 = S * S;

var go_xcoords = 'ABCDEFGHJKLMNOPQRST';

var coord = (function () {
  function coord(x, y) {
    _classCallCheck(this, coord);

    assert(x >= 0 && x < S);
    assert(y >= 0 && y < S);
    this.xc = x;
    this.yc = y;
  }

  _createClass(coord, [{
    key: 'isCoord',
    value: function isCoord() {
      return true;
    }
  }, {
    key: 'x',
    value: function x() {
      return this.xc;
    }
  }, {
    key: 'y',
    value: function y() {
      return this.yc;
    }
  }, {
    key: 'index',
    value: function index() {
      return S * this.yc + this.xc;
    }
  }, {
    key: 'neighbours',
    value: function neighbours() {
      var res = [];
      if (this.xc >= 1) res.push(new coord(this.xc - 1, this.yc));
      if (this.xc < S - 1) res.push(new coord(this.xc + 1, this.yc));
      if (this.yc >= 1) res.push(new coord(this.xc, this.yc - 1));
      if (this.yc < S - 1) res.push(new coord(this.xc, this.yc + 1));
      return res;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return go_xcoords[this.xc] + (this.yc + 1);
    }
  }], [{
    key: 'fromIndex',
    value: function fromIndex(i) {
      return new coord(i % S, Math.floor(i / S));
    }
  }, {
    key: 'fromName',
    value: function fromName(nm) {
      var x = go_xcoords.indexOf(nm[0]);
      assert(x >= 0);
      var y = parseInt(nm.slice(1)) - 1;
      return new coord(x, y);
    }
  }]);

  return coord;
})();

exports.coord = coord;

var coordSet = (function () {
  function coordSet(coords) {
    _classCallCheck(this, coordSet);

    this.set = new Set();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = coords[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var c = _step.value;

        assert(c.isCoord());
        this.set.add(c.index());
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  _createClass(coordSet, [{
    key: 'equals',
    value: function equals(other) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = other.set[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var x = _step2.value;

          if (!this.set.has(x)) return false;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.set[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var x = _step3.value;

          if (!other.set.has(x)) return false;
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3['return']) {
            _iterator3['return']();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return true;
    }
  }, {
    key: 'toString',
    value: function toString() {
      var xs = Array.from(this.set).map(function (c) {
        return coord.fromIndex(c).toString();
      });
      return '{' + xs.join(', ') + '}';
    }
  }, {
    key: 'size',
    value: function size() {
      return this.set.size;
    }
  }, {
    key: 'add',
    value: function add(coord) {
      this.set.add(coord);
    }
  }, {
    key: 'delete',
    value: function _delete(coord) {
      this.set['delete'](coord);
    }
  }]);

  return coordSet;
})();

function testCoord() {
  var a = new coord(3, 4);
  assert.equal(a.x(), 3);
  assert.equal(a.y(), 4);
  assert.equal(new coord(0, 0).index(), 0);
  assert.equal(new coord(18, 18).index(), S2 - 1);
  assert(new coordSet([new coord(6, 7), new coord(7, 8)]).equals(new coordSet([new coord(6, 7), new coord(7, 8)])));
  assert(!new coordSet([new coord(6, 7), new coord(7, 8)]).equals(new coordSet([new coord(6, 7), new coord(7, 9)])));
  assert(new coordSet(new coord(2, 5).neighbours()).equals(new coordSet([new coord(1, 5), new coord(3, 5), new coord(2, 4), new coord(2, 6)])));

  assert.equal(new coord(0, 0).toString(), 'A1');
  assert.equal(new coord(6, 7).toString(), 'G8');
  assert.equal(new coordSet([new coord(2, 3), new coord(3, 7)]).toString(), "{C4, D8}");
  assert.deepEqual(new coord(0, 0), coord.fromName("A1"));
}

var chain = (function () {
  function chain(stone, libs) {
    _classCallCheck(this, chain);

    this.stones = new coordSet([stone]);
    this.libs = new coordSet(libs);
  }

  _createClass(chain, [{
    key: 'toString',
    value: function toString() {
      return ['chain stones:', this.stones.toString(), 'libs:', this.libs.toString()].join(' ');
    }
  }, {
    key: 'numStones',
    value: function numStones() {
      return this.stones.size();
    }
  }, {
    key: 'numLibs',
    value: function numLibs() {
      return this.libs.size();
    }
  }, {
    key: 'isDead',
    value: function isDead() {
      return this.numLibs() == 0;
    }
  }, {
    key: 'addFrom',
    value: function addFrom(ch) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = ch.stones.set[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var s = _step4.value;

          this.stones.add(s);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4['return']) {
            _iterator4['return']();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = ch.libs.set[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var l = _step5.value;

          this.libs.add(l);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5['return']) {
            _iterator5['return']();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    }
  }, {
    key: 'takeAwayLib',
    value: function takeAwayLib(lib) {
      this.libs['delete'](lib.index());
    }
  }]);

  return chain;
})();

exports.chain = chain;

function testChain() {
  var x = coord.fromName('D5');
  var c = new chain(x, x.neighbours());
  // assert.equal(c.toString(),
  // 	       'chain stones: {D5} libs: {C5, E5, D4, D6}')
  function ac(cs, co) {
    assert(cs.set.has(coord.fromName(co).index()));
  }
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
  ac(c.libs, 'F5');
}

function twoDigits(n) {
  if (n >= 1 && n <= 9) return ' ' + n;else return '' + n;
}

var black = 0;
exports.black = black;
var white = 1;
exports.white = white;
var empty = 2;

exports.empty = empty;

var board = (function () {
  function board() {
    _classCallCheck(this, board);

    // mapping coord index to parent coord index, union-find
    this.parents = new Map();
    // mapping coord index to chain
    this.chains = new Map();
    // field content
    this.fields = new Int8Array(S2);
    this.fields.fill(empty);
  }

  _createClass(board, [{
    key: 'place',
    value: function place(col, co) {
      assert(col == black || col == white);
      assert(co.isCoord());
      var coidx = co.index();
      if (this.fields[coidx] != empty) {
        console.log('couldnt place at ' + co.toString());
        return false;
      }

      this.fields[coidx] = col;
    }
  }, {
    key: 'toString',
    value: function toString() {
      var p = '      ';
      var letters = p + Array.from(go_xcoords).map(function (l) {
        return ' ' + l;
      }).join('');
      var border = p + Array.from(go_xcoords).map(function (l) {
        return '==';
      }).join('');
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
          line.push(['○', '●', ' '][t]);
        }
        line.push('|| ' + twoDigits(y + 1));
        lines.push(line.join(''));
      }
      lines.push(border);
      lines.push(letters);
      return lines.join('\n');
    }
  }]);

  return board;
})();

exports.board = board;

function testBoard() {
  var b = new board();
  b.place(black, coord.fromName('D4'));
  b.place(white, coord.fromName('C3'));
  b.place(black, coord.fromName('C4'));
  b.place(white, coord.fromName('D3'));
  b.place(black, coord.fromName('E3'));
  b.place(white, coord.fromName('E2'));
  b.place(black, coord.fromName('F2'));
  b.place(white, coord.fromName('F3'));
  console.log(b.toString());
}

function runAllTests() {
  testCoord();
  testChain();
  testBoard();
}

runAllTests();
