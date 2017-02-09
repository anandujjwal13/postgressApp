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

const mapp = function () {
  $.ajax({
    url: '/read',
    type: 'GET',
    success: function (todos) {
      mapping = todos.map((todo, index) => {
        allTasks[index] = todo
        return todo.id
      })
    }
  })
}

let spanTag = `<span class="close" onclick="destroy(this.parentElement)">\u00D7</span>`
let des = `<span class ="updateBtn" onclick="updateDescription(this.parentElement)">Update description</span>`
const tasks = function () {
  fetch('/read', {
    method: 'get'
  }).then(function (response) {
    response.json().then(function (tasks) {
      let row = tasks.reduce((row, task, index) => {
        if (task.status)
          row += `<li id=${index} class="checked"> <span   onclick="closefunc(this.parentElement)">${task.description}</span>${spanTag}${des}</li> `
        else
          row += `<li id=${index} > <span  onclick="closefunc(this.parentElement)" >${task.description}</span>${spanTag}${des}</li> `
        mapping[index] = task.id
        return row
      }, '')

      document.getElementById('myUL').innerHTML = row
      mapp()
    })
  })
    .catch(function (err) {
      console.log(err)
    })
}



function closefunc(element) {
  let status = (allTasks[element.id].status) ? false : true
  $.ajax({
    url: `/update/${mapping[element.id]}`,
    type: 'PUT',
    data: `description=${allTasks[element.id].description}&status=${status}`,
    success: function (result) {
      console.log('closefunc')
      tasks()
    }
  })
}


function newElement() {

  var inputValue = document.getElementById('myInput').value
  inputValue = escapeHtml(inputValue)

  if (inputValue === '') {
    alert('You must write something!')
  } else {
    $.ajax({
      url: '/write/' + inputValue,
      type: 'POST',
      success: function (result) {

        tasks()
      }
    })

  }
  document.getElementById('myInput').value = ''
}


function destroy(element) {
  element.style.display = 'none'
  $.ajax({
    url: `/destroy/${mapping[element.id]}`,
    type: 'DELETE',
    success: function (result) {

      tasks()
    }
  })


}


function updateDescription(element) {
  let newDescription = prompt('Enter the new task', allTasks[element.id].description)
  newDescription = escapeHtml(newDescription)
  let status = allTasks[element.id].status
  $.ajax({
    url: `/update/${mapping[element.id]}`,
    type: 'PUT',
    data: `description=${newDescription}&status=${status}`,
    success: function (result) {
      console.log('closefunc')
      tasks()
    }
  })
}