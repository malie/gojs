// recognize interesting things on the board
'use strict';Object.defineProperty(exports, '__esModule', { value: true });var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError('Cannot call a class as a function');}}var _board = require(


'./board');var _assert = require(
'assert');var _assert2 = _interopRequireDefault(_assert);

var ownedFieldB = 0;
var ownedFieldW = 1;
var eye1B = 2;
var eye1W = 3;
var eye2B = 4;
var eye2W = 5;
// ...
var LAST_PROP = eye2W;

function propToString(p) {
  return ['ownedFieldB', 'ownedFieldW', 
  'eye1B', 'eye1W', 
  'eye2B', 'eye2W'][p];}var 

interpreter = (function () {
  function interpreter(board) {_classCallCheck(this, interpreter);
    this.board = board;
    this.bits = new Int32Array(_board.S2);
    this.bits.fill(0);
    this.interpret();}_createClass(interpreter, [{ key: 'checkWhat', value: 

    function checkWhat(what) {
      (0, _assert2['default'])(typeof what === 'number');
      (0, _assert2['default'])(what >= 0);
      (0, _assert2['default'])(what <= LAST_PROP);} }, { key: 'get', value: 
    function get(what, f) {
      this.checkWhat(what);
      var mask = 1 << what;
      return (this.bits[f.index()] & mask) === mask;} }, { key: 'set_value', value: 
    function set_value(what, f, value) {
      this.checkWhat(what);
      if (value) 
      this.set(what, f);else 

      this.unset(what, f);} }, { key: 'set', value: 
    function set(what, f) {
      var bit = 1 << what;
      var idx = f.index();
      this.bits[idx] |= bit;} }, { key: 'unset', value: 
    function unset(what, f) {
      var bit = 1 << what;
      var idx = f.index();
      this.bits[idx] &= ~bit;}

    // an empty field is owned by a colour if the opponent
    // can't move there. This includes the case if she moves
    // there and is in atari. Also, this excludes ko!
  }, { key: 'ownedFields', value: function ownedFields() {
      var b = this.board;
      for (var y = 0; y < _board.S; y++) {
        for (var x = 0; x < _board.S; x++) {
          var f = new _board.coord(x, y);
          if (!b.isEmptyAt(f)) 
          continue;
          var ns = f.neighbours();
          for (var col = _board.black; col <= _board.white; col++) {
            if (ns.length == 2) 
            this.set_value(ownedFieldB + col, f, 
            b.isStoneAt(ns[0], col) || 
            b.isStoneAt(ns[1], col));else 
            if (ns.length == 3) 
            this.set_value(ownedFieldB + col, f, 
            atLeastTwoOfThree(
            b.isStoneAt(ns[0], col), 
            b.isStoneAt(ns[1], col), 
            b.isStoneAt(ns[2], col)));else 
            if (ns.length == 4) 
            this.set_value(ownedFieldB + col, f, 
            atLeastThreeOfFour(
            b.isStoneAt(ns[0], col), 
            b.isStoneAt(ns[1], col), 
            b.isStoneAt(ns[2], col), 
            b.isStoneAt(ns[3], col)));}}}} }, { key: 'interpret', value: 

    function interpret() {
      this.ownedFields();} }, { key: 'propsAt', value: 

    function propsAt(co) {
      (0, _assert2['default'])(co.isCoord());
      var b = this.bits[co.index()];
      var res = [];
      for (var p = 0; p <= LAST_PROP; p++) {
        if (b & 1 << p !== 0) 
        res.push(propToString(p));}
      return res;} }]);return interpreter;})();exports.interpreter = interpreter;


function atLeastTwoOfThree(a, b, c) {
  var sum = 0;
  sum += a ? 1 : 0;
  sum += b ? 1 : 0;
  sum += c ? 1 : 0;
  return sum >= 2;}

function atLeastThreeOfFour(a, b, c, d) {
  var sum = 0;
  sum += a ? 1 : 0;
  sum += b ? 1 : 0;
  sum += c ? 1 : 0;
  sum += d ? 1 : 0;
  return sum >= 3;}


function test1() {
  var b = new _board.board();
  var t = new interpreter(b);
  var co = new _board.coord(2, 2);
  (0, _assert2['default'])(!t.get(ownedFieldB, co));
  t.set(ownedFieldB, co, 1);
  (0, _assert2['default'])(t.get(ownedFieldB, co));}




function allTests() {
  test1();
  console.log('ok');}

allTests();