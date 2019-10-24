module.exports = function (session) {
  let desktopID, usersRoleID, folderID, lastID, userID, conn = session.connection

  userID = conn.lookup('uba_user', 'ID', {expression: 'name', condition: 'equal', values: {code: 'user1'}})
  if (!userID) {
    console.info('\t\tcreate new `user1` user')
    userID = conn.insert({
      entity: 'uba_user',
      fieldList: ['ID'],
      execParams: {
        name: 'user1',
        firstName: 'hd',
        lastName: 'user',
        uPasswordHashHexa: nsha256('salt' + 'admin')  //after salt - pass
      }
    })
  }
  usersRoleID = conn.lookup('uba_role', 'ID', {
    expression: 'name',
    condition: 'equal',
    values: {name: 'asdt'}
  })
  if (!usersRoleID) {
    console.info('\t\tcreate new `asdt` role')
    usersRoleID = conn.insert({
      entity: 'uba_role',
      fieldList: ['ID'],
      execParams: {
        name: 'asdt',
        description: 'asdt role'
      }
    })
  }

  const checkUserInRole = conn.lookup('uba_userrole', 'ID',
    conn.Repository('uba_userrole').where('userID', '=', userID).where('roleID', '=', usersRoleID).ubRequest().whereList
  )
  if (!checkUserInRole) {
    conn.insert({
      entity: 'uba_userrole',
      execParams: {
        userID: userID,
        roleID: usersRoleID
      }
    })
  }

  desktopID = conn.lookup('ubm_desktop', 'ID', {
    expression: 'code',
    condition: 'equal',
    values: {code: 'astd_desktop'}
  })
  if (desktopID) {
    const checkRoleInDesktop = conn.lookup('ubm_desktop_adm', 'ID',
      conn.Repository('ubm_desktop_adm').where('instanceID', '=', desktopID).where('admSubjID', '=', usersRoleID).ubRequest().whereList
    )
    if (!checkRoleInDesktop) {
      conn.insert({
        entity: 'ubm_desktop_adm',
        execParams: {
          instanceID: desktopID,
          admSubjID: usersRoleID
        }
      })
    }

    lastID = conn.lookup('ubm_navshortcut', 'ID', {
      expression: 'code',
      condition: 'equal',
      values: {code: 'departments_shortcut'}
    })
    if (lastID) {
      var checkRoleInShortcut = conn.lookup('ubm_navshortcut_adm', 'ID',
        conn.Repository('ubm_navshortcut_adm').where('instanceID', '=', lastID).where('admSubjID', '=', usersRoleID).ubRequest().whereList
      )
      if (!checkRoleInShortcut) {
        conn.insert({
          entity: 'ubm_navshortcut_adm',
          execParams: {
            instanceID: lastID,
            admSubjID: usersRoleID
          }
        })
      }
    }

  }

//entity level security
  var checkCodeEls = conn.lookup('uba_els', 'ID',
    conn.Repository('uba_els').where('code', '=', 'ASTD_ASTD-ROLE-ACCESS').ubRequest().whereList
  )
  if (!checkCodeEls) {
    conn.insert({
      entity: 'uba_els',
      execParams: {
        code: 'ASTD_ASTD-ROLE-ACCESS',
        entityMask: 'astd_*',
        methodMask: '[iudas]*', //all crud
        ruleType: 'A',
        ruleRole: usersRoleID,
        description: 'Read and update astd model'
      }
    })
  }
}
