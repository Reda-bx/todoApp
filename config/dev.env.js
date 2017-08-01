var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"https://arfkcpx7m7.execute-api.us-east-1.amazonaws.com/dev"'
})
