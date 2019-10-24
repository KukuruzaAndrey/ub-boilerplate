const UB = require('@unitybase/ub')
const me = astd_department

function beforeHook (ctx) {
  const { execParams } = ctx.mParams
  const { name, address, phone } = execParams
  console.log(name)
  console.log(address)
  console.log(phone)
  if (!phone.startsWith('+')) {
    execParams.phone = `+${phone}`
  }
}

me.on('insert:before', beforeHook)

function afterHook (ctx) {
  const { execParams } = ctx.mParams
  const { phone, boss } = execParams
  if (!boss) return
  console.log(boss)
  const boss_user = UB.Repository('uba_user')
    .attrs('name','mi_modifyDate')
    .selectById(boss)

  if (boss_user.name === 'user1') {
    UB.DataStore('astd_department')
      .run('insert', {
        execParams: {
          name: 'test',
          phone: 'test'
        }
      })
  } else {
    UB.DataStore('uba_user')
      .run('update', {
        execParams: {
          ID: boss,
          uData: phone,
          mi_modifyDate: boss_user.mi_modifyDate
        }
      })
  }
}

me.on('insert:after', afterHook)
