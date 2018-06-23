module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'GraphQLProxyClient',
      externals: {
        react: 'React'
      }
    }
  }
}
