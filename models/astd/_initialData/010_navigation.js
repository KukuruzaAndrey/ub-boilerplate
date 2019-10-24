module.exports = session => {
  const { connection } = session

  let desktopID = connection.lookup('ubm_desktop', 'ID', {
    expression: 'code',
    condition: 'equal',
    values: { code: 'astd_desktop' }
  })

  if (!desktopID) {
    console.info('\t\tcreate new `astd` desktop')
    desktopID = connection.insert({
      entity: 'ubm_desktop',
      fieldList: ['ID'],
      execParams: {
        code: 'astd_desktop',
        caption: 'Astd'
      }
    })
  } else { //else display a message
    console.info('\t\tuse existed astd desktop')
  }

  let shortcutID = connection.lookup('ubm_navshortcut', 'ID', {
    expression: 'code',
    condition: 'equal',
    values: { code: 'departments_shortcut' }
  })
  if (!shortcutID) {
    console.log('\t\t\tcreate `Department` shortcut')
    shortcutID = connection.insert({
      fieldList: ['ID'],
      entity: 'ubm_navshortcut',
      execParams: {
        desktopID,
        code: 'departments_shortcut',
        caption: 'Департаменти',
        iconCls: 'fa fa-building-o',
        cmdCode: JSON.stringify({
          cmdType: 'showList',
          cmdData: { params: [{ entity: 'astd_department', fieldList: '*' }] }
        })
      }
    })
  } else {
    console.info('\t\tuse existed shortcut with code `departments_shortcut`', shortcutID)
  }
}