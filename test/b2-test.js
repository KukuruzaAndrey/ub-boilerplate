module.exports = function (session) {
  'use strict'

  if (!session) {
    const { argv } = require('@unitybase/base')
    session = argv.establishConnectionFromCmdLineAttributes()
  }

  const conn = session.connection

  try {
    test()
  } catch (err) {
    printError(err)
  }

  function test () {
    console.info('Test is running...')

    conn.query({
      entity: 'em_test',
      method: 'testB2'
    })
  }

  function printError (err) {
    const errMessage = getErrorMessage(err)

    console.error(errMessage)
    console.error(err)
  }

  function getErrorMessage (err) {
    return err.message || String(err)
  }
}
