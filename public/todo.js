const entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
}
const escapeHtml = string => String(string).replace(/[&<>"'`=\/]/g, s => entityMap[s])
let allTasks = []
let mapping = []

let checkbox = `<input type="checkbox" onchange="closefunc(this.parentElement)" checked/>`
let uncheckbox = `<input type="checkbox" onchange="closefunc(this.parentElement)" />`

let spanTag = `<span class="close" onclick="destroy(this.parentElement)">\u00D7</span>`
let des = `<span class ="updateBtn" onclick="updateDescription(this.parentElement)">Update description</span>`

function closefunc (element) {
  let status = !(allTasks[element.id].status)
  $.ajax({
    url: `/update/${mapping[element.id]}`,
    type: 'PUT',
    data: `description=${allTasks[element.id].description}&status=${status}`,
    success: function (result) {
      allTasks[element.id].status = status
      render(allTasks)
    }
  })
}

$('#addform').submit((e) => {
  e.preventDefault()
})

function newElement () {
  var description = document.getElementById('myInput').value
  description = escapeHtml(description)
  if (description === '') {
    alert('You must write something!')
  } else {
    $.ajax({
      url: '/write/' + description,
      type: 'POST',
      success: function (result) {
        allTasks.push({ id: result.id, description, status: false })
        render(allTasks)
      }
    })
  }
  document.getElementById('myInput').value = ''
}

function destroy (element) {
  element.style.display = 'none'
  $.ajax({
    url: `/destroy/${mapping[element.id]}`,
    type: 'DELETE',
    success: function (result) {
      allTasks.splice(element.id, 1)
      render(allTasks)
    }
  })
}

function updateDescription (element) {
  let newDescription = prompt('Enter the new task', allTasks[element.id].description)
  newDescription = escapeHtml(newDescription)
  let status = allTasks[element.id].status
  $.ajax({
    url: `/update/${mapping[element.id]}`,
    type: 'PUT',
    data: `description=${newDescription}&status=${status}`,
    success: function (result) {
      allTasks[element.id].description = newDescription
      render(allTasks)
    }
  })
}

function render (todos) {
  let row = todos.reduce((row, task, index) => {
    if (task.status)    { row += `<li id=${index} class="checked">${checkbox} <span   onclick="closefunc(this.parentElement)">${task.description}</span>${spanTag}${des}</li> ` }    else    { row += `<li id=${index} >${uncheckbox} <span  onclick="closefunc(this.parentElement)" >${task.description}</span>${spanTag}${des}</li> ` }
    mapping[index] = task.id
    return row
  }, '')

  document.getElementById('myUL').innerHTML = row
}

const tasks = function () {
  fetch('/read', {
    method: 'get'
  }).then(function (response) {
    response.json().then(function (tasks) {
      let row = tasks.reduce((row, task, index) => {
        allTasks[index] = task
      }, '')
      render(allTasks)
    })
  })
    .catch(function (err) {
      console.log(err)
    })
}

// render only completed tasks
function completed () {
  let allCompleted = allTasks.filter((task) => {
    return task.status
  })
  render(allCompleted)
}

// render only non completed tasks
function active () {
  let allActive = allTasks.filter((task) => {
    return (task.status === false)
  })
  render(allActive)
}

// renders all the task
function renderAll () {
  render(allTasks)
}

//  set all tasks as completed
function selectAll () {
  $.ajax({
    url: `/update/-1`,
    type: 'PUT',
    success: function (result) {
      allTasks = allTasks.map(({id, description}) => {
        return {
          id, description, status: true
        }
      })
      render(allTasks)
    }
  })
}
function unSelectAll () {
  $.ajax({
    url: `/update/-2`,
    type: 'PUT',
    success: function (result) {
      allTasks = allTasks.map(({id, description}) => {
        return {
          id, description, status: false
        }
      })
      render(allTasks)
    }
  })
}

// delete all completed tasks
function clearCompleted () {
  $.ajax({
    url: `/destroy/-1`,
    type: 'DELETE',
    success: function (result) {
      allTasks = allTasks.filter((task) => {
        return (task.status === false)
      })
      render(allTasks)
    }
  })
}
