const { transformSync } = require('@babel/core')

const code = `
    console.log('click')
    if (debug) {
      const a = 10
      const b = 20
      console.log(a + b)
    }
    function a(name="simon",age){
      console.log(name,age)
    }
`

const babelConfig = {
  plugins: ['./babelPlugin.js']
}
const output = transformSync(code, babelConfig)