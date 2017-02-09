let entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHtml(string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}
let idMap = []
function mapTasks(task) {
  idMap = task.map((element) => {
    return element.id
  })
}
function outputList() {
  return fetch('/read', { method: 'get' })
    .then(function (response) {
      return response.json()
    })
    .then((tasks) => {
      const listElement = document.getElementById('taskList')
      tasks.forEach((task) => {
        let desc = escapeHtml(task.description)
        listElement.innerHTML += `<li>${desc}</li>`
      })
      mapTasks(tasks)
    })
    .catch(function (err) {
      console.log(err)
    })
}

function writeList(description) {
  let escapedDescription = escapeHtml(description)
  fetch(`/write/${escapedDescription}`, { method: 'post' })
    .then((response) => {
      return outputList()
    })
    .then()
    .catch(function (err) {
      console.log(err)
    })
}
function deleteTask(id) {
  let escapedId = escapeHtml(id)
  fetch(`/destroy/${idMap[escapedId - 1]}`, { method: 'delete' })
    .then((response) => {
      return outputList()
    })
    .then()
    .catch(function (err) {
      console.log(err)
    })
}