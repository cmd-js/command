var test = require('tape')
var command = require('./')
var name = require('cmd-name')
var use = require('cmd-use')

test('command()', function (t) {

  var fn1 = function () {}

  var c = command(
    name('test'),
    use(fn1)
  )

  t.equal(typeof c, 'function', 'returns a function')

  t.deepEqual(c(), {
    type: 'command',
    value: {
      alias: ['test'],
      'function': [fn1]
    },
    options: undefined
  }, 'basic execution')

  t.deepEqual(c({key: 'value'}), {
    type: 'command',
    value: {
      alias: ['test'],
      'function': [fn1]
    },
    options: {key: 'value'}
  }, 'with options')

  t.end()
})

test('combines multiple values', function (t) {

  var fn1 = function () {}
  var fn2 = function () {}
  var c = command(
    name('one'),
    name('two'),
    use(fn1),
    use(fn2)
  )

  t.deepEqual(c(), {
    type: 'command',
    value: {
      alias: ['one', 'two'],
      'function': [fn1, fn2]
    },
    options: undefined
  }, 'values')

  t.end()
})
