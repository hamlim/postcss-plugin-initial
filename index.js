const postcss = require('postcss')
const cssInitials = require('css-initials')

module.exports = postcss.plugin('postcss-plugin-initial', (options = { replace: false, skipSupports: true }) => {
  return css => {
    css.walkRules(rule => {
      rule.walkDecls(decl => {
        if (decl.value.indexOf('initial') === -1) {
          return
        }
        if (
          options.skipSupports &&
          rule.parent &&
          rule.parent.type === 'atrule' &&
          rule.parent.name &&
          rule.parent.name.includes('supports') &&
          rule.parent.params.includes('initial')
        ) {
          return
        }
        const fallback = cssInitials[decl.prop]
        if (fallback === 'initial') {
          return
        }
        if (options.replace) {
          decl.replaceWith(decl.clone({ value: fallback }))
        } else {
          decl.cloneBefore({ value: fallback })
        }
      })
    })
  }
})
