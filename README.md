# PostCSS Plugin Initial

<img align="right" width="135" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="http://postcss.github.io/postcss/logo-leftp.png">

[PostCSS] plugin to fallback `initial` keyword.

```css
a {
  animation: initial;
  background: initial;
  white-space: initial;
}
p {
  background: url(/img1.png), url(/img2.png);
  background-repeat: initial no-repeat;
}
```

```css
a {
  animation: none 0s ease 0s 1 normal none running;
  animation: initial;
  background: transparent none repeat 0 0 / auto auto padding-box border-box scroll;
  background: initial;
  white-space: normal;
  white-space: initial;
}
p {
  background: url(/img1.png), url(/img2.png);
  background-repeat: repeat no-repeat;
}
```

## Options

### replace

Takes `boolean`.
Replace the `initial` with the fallback instead of adding it.
Default value: `false`.

### skipSupports

Takes `boolean`.
Doesn't change `initial` values when used within an `@supports` ruleset and the supports check includes the `initial` keyword:

```css
@supports (display: initial) {
  .class {
    /* Skipped if `skipSupports` is true */
    background-color: initial;
  }
}
```

Default value: `true`.

## Usage

```js
postcss([
  require('postcss-plugin-initial')({
    replace: true,
  }),
])
```

## [Changelog](./CHANGELOG.md)
