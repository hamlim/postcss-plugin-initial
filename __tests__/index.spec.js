import test from 'ava'
import postcss from 'postcss'
import plugin from '../index.js'

test('that it doesnt change css without initial', t => {
  t.plan(1)
  const input = `.class { color: red; }`
  return postcss(plugin)
    .process(input)
    .then(({ css }) => {
      t.is(css, `.class { color: red; }`)
    })
})

test('that it adds an extra declaration before the use of initial when using replace = false', t => {
  t.plan(1)
  const input = `.class { cursor: initial; }`
  return postcss(plugin)
    .process(input)
    .then(({ css }) => {
      t.is(css, `.class { cursor: auto; cursor: initial; }`)
    })
})

test('it skips corner cases', t => {
  t.plan(1)
  const input = `.class { color: initial; }`
  return postcss(plugin)
    .process(input)
    .then(({ css }) => {
      t.is(css, `.class { color: initial; }`)
    })
})

test('skips supports atrules', t => {
  t.plan(1)

  const input = `@supports (display: initial) { .class { color: red; } }`
  return postcss(plugin)
    .process(input)
    .then(({ css }) => {
      t.is(css, `@supports (display: initial) { .class { color: red; } }`)
    })
})

test('it does not skip supports atrules when configured', t => {
  t.plan(1)

  const input = `@supports (display: initial) { .class { display: initial; } }`
  return postcss([plugin({ skipSupports: false })])
    .process(input)
    .then(({ css }) => {
      t.is(css, `@supports (display: initial) { .class { display: inline; display: initial; } }`)
    })
})

test('it replaces the declration when configured', t => {
  t.plan(1)
  const input = `.class { cursor: initial; }`
  return postcss([plugin({ replace: true })])
    .process(input)
    .then(({ css }) => {
      t.is(css, `.class { cursor: auto; }`)
    })
})
