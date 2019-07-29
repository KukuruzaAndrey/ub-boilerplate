/* global em */
const UB = require('@unitybase/ub')

const me = em_test

me.entity.addMethod('testB2')


me.testB2 = function (ctxt) {
  console.log('test B2...')
    debugger


    const dataStore = UB.DataStore('em_test')
    console.log(dataStore)
    // dataStore.runSQL('SELECT name FROM trs_dealDocument WHERE id = 3000000012750;')
     dataStore.runSQL('SELECT 1234 as name;')

    const res = dataStore.get('name')

    console.log(res)
}