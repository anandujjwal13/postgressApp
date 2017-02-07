const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://anandujjwal:lifeisawsm@localhost:5432/todoapp')

const todoApp = {
  read () {
    return sequelize.query('SELECT ID , DESCRIPTION , STATUS FROM tasks ORDER BY ID')
  },

  insert (description) {
    let query = `INSERT INTO tasks (DESCRIPTION , STATUS) VALUES ('${description}' ,false)`
    return sequelize.query(query)
  },

  update (id, description, status) {
    let query = `UPDATE tasks SET DESCRIPTION = '${description}' ,STATUS = ${status} WHERE ID = ${id}`
    return sequelize.query(query)
  },

  destroy (id) {
    let query = `DELETE FROM tasks WHERE ID = ${id}`
    return sequelize.query(query)
  }
}

module.exports = todoApp

// sequelize.query('SELECT * FROM projects WHERE status = :status ',
//   { replacements: { status: 'active' }, type: sequelize.QueryTypes.SELECT }
// ).then(function (projects) {
//   console.log(projects)
// })
