let mapping = [];
const tasks = function () {
  fetch('/read', {
    method: 'get'
  }).then(function (response) {
    response.json().then(function (tasks) {
      let row = tasks.reduce((row, task, index) => {
        row += `<li>${task.description}</li> `
        mapping[index] = task.id
        return row
      }, '')
      document.getElementById('read').innerHTML = row
    })
  }).
    catch(function (err) {
      console.log(err)
    })
}

const destroy = function () {
  let taskNumber = document.getElementById('taskNumber').value
  taskNumber = escapeHtml(mapping[taskNumber - 1])
  $.ajax({
    url: '/destroy/' + taskNumber,
    type: 'DELETE',
    success: function (result) {
      tasks()
    }
  })
}

const post = function () {
  let postData = document.getElementById('postData').value
  postData = escapeHtml(postData)
  $.ajax({
    url: '/write/' + postData,
    type: 'POST',
    success: function (result) {
      tasks()
    }
  })
}

const update = function () {
  let updateData = document.getElementById('updateData').value
  updateData = escapeHtml(updateData)
  let updateId = document.getElementById('updateId').value
  updateId = escapeHtml(mapping[updateId - 1])
  $.ajax({
    url: '/update/' + updateId,
    type: 'PUT',
    data: { description : hfjf, status : gjhgjg},
    success: function (result) {
      tasks()
    }
  })
}

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