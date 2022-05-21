module.exports = ({ types }) => {
  return {
    visitor: {
      Identifier(path) {
        const isDebug = path.node.name === 'debug'
        const patentIsIf = types.isIfStatement(path.parentPath)
        if (isDebug && patentIsIf) {
          const stringVnode = types.StringLiteral('debug')
          path.replaceWith(stringVnode)
        }
      },
      StringLiteral(path) {
        const isDebug = path.node.value === 'debug'
        const patentIsIf = types.isIfStatement(path.parentPath)
        if (isDebug && patentIsIf) {
          if (process.env.NODE_ENV === 'production') {
            path.parentPath.remove()
          }
        }
      },
      'FunctionDeclaration|ArrowFunctionExpression'(path) {
        path.node.params.forEach((param, idx) => {
          if (param.type === 'AssignmentPattern') {
            const { start, end, left, right } = param
            path.node.params.splice(idx, 1)
            obj[left.name] = right.value
            path.node.params.unshift({
              type: "Identifier",
              start,
              end,
              name: left.name
            })
          }
        })
        for (const key in obj) {
          const value = obj[key]
          path.node.body.body.unshift({
            "type": "ExpressionStatement",
            "expression": {
              "type": "AssignmentExpression",
              "operator": "=",
              "left": {
                "type": "Identifier",
                "name": key
              },
              "right": {
                "type": "StringLiteral",
                "value": value
              }
            }
          })
        }

      }
    }
  }
}