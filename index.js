const postcss = require('postcss')
const cssInitials = require('css-initials')

module.exports = postcss.plugin('postcss-plugin-initial', ({ replace: false, skipSupports: true } = {}) => {
  return css => {
    css.walkRules(rule => {
      rule.walkDecls(decl => {
        if (decl.value.indexOf('initial') < 0) {
          return
        }
        if (
          opts.skipSupports &&
          rule.parent &&
          rule.parent.type === 'atrule' &&
          rule.parent.name &&
          rule.parent.name.includes('supports') &&
          rule.parent.params.includes('initial')
        ) {
          return
        }
        const fallback = initialValues[decl.prop] || 'initial'
        if (opts.replace) {
          decl.replaceWith(decl.clone({ value: fallback }))
        } else {
          decl.cloneBefore({ value: fallback })
        }
      })
    })
  }
})
