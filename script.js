let myobj = JSON.parse(localStorage.getItem('mytasks'))
if (myobj == null) {
    myobj = new Array()
}
let taskContainer = document.getElementById('taskContainer')
let input = document.getElementById("input")
let submit = document.getElementById("submit")
submit.addEventListener('click', addToDo)
const PENDING = -1
const REMOVED = 0
const FININSHED = 1
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let currObj = document.getElementById('currObj')

showTasks()

function addToDo() {
    let x = input.value
    if (x.trim() == null) {
        alert("Enter Something to add..")
        return;
    }
    let obj = new Object()
    obj.name = x;
    obj.status = PENDING
    myobj.push(obj)
    localStorage.setItem('mytasks', JSON.stringify(myobj))
    taskContainer.innerHTML = ""
    input.value=""
    showTasks()
}

function showTasks() {
    myobj.forEach((element, index) => {
        let div = document.createElement('div')
        let taskNameSpan = document.createElement('span')
        let controlsSpan = document.createElement('span')
        let doneCheck = document.createElement('input')
        let editButtonLabel = document.createElement('img')
        let deleteButtonLabel = document.createElement('img')
        let editButton = document.createElement('button')
        let deleteButton = document.createElement('button')
        div.setAttribute('id', `task-${index + 1}`)
        div.classList.add("taskRows")

        editButton.setAttribute('id', `edit-${index + 1}`)
        editButton.classList.add("btn")
        editButton.classList.add("btn-secondary")
        editButton.classList.add("btn-sm")
        editButton.classList.add("mx")


        editButtonLabel.setAttribute('src', 'img/edit-16.png')

        deleteButton.setAttribute('id', `remove-${index + 1}`)
        deleteButton.classList.add("btn")
        deleteButton.classList.add("btn-danger")
        deleteButton.classList.add("btn-sm")
        deleteButton.classList.add("mx")

        deleteButtonLabel.setAttribute('src', 'img/cross-16.png')

        doneCheck.setAttribute('id', `completed-${index + 1}`)
        doneCheck.setAttribute('type', 'checkbox')
        doneCheck.classList.add("check")
        doneCheck.classList.add("form-check-input")

        deleteButton.appendChild(deleteButtonLabel)
        editButton.appendChild(editButtonLabel)
        controlsSpan.appendChild(doneCheck)
        controlsSpan.appendChild(editButton)
        controlsSpan.appendChild(deleteButton)
        controlsSpan.classList.add("controls-span")
        taskNameSpan.innerText = element.name
        taskNameSpan.classList.add("task-text")
        div.appendChild(taskNameSpan)
        div.appendChild(controlsSpan)

        taskContainer.appendChild(div)
        let row = document.getElementById(`task-${index + 1}`)
        let completed = document.getElementById(`completed-${index + 1}`)
        let remove = document.getElementById(`remove-${index + 1}`)
        completed.addEventListener('change', function (e) {
            if (completed.checked)
                completedTask(element)
            else {
                pendingTask(element)
                row.classList.remove("finished")
                row.classList.add("pending")
            }
        });
        editButton.addEventListener('click', function () {
            modal.style.display = 'block'
            currObj.value = index
        })
        remove.addEventListener('click', function () {
            removeTask(element, index)
        });
        if (element.status == FININSHED) {
            row.classList.remove("pending")
            row.classList.add("finished")
            completed.checked = true
            editButton.disabled = true
            deleteButton.disabled = true
        }
        else {
            row.classList.remove("finished")
            row.classList.add("pending")
        }
    });
}

function removeTask(obj, ind) {
    obj.status = REMOVED
    myobj.splice(ind, 1)
    localStorage.setItem('mytasks', JSON.stringify(myobj))
    taskContainer.innerHTML = ""
    showTasks()
}


function completedTask(obj) {
    obj.status = FININSHED
    localStorage.setItem('mytasks', JSON.stringify(myobj))
    taskContainer.innerHTML = ""
    showTasks();
}


function pendingTask(obj) {
    obj.status = PENDING
    localStorage.setItem('mytasks', JSON.stringify(myobj))
    taskContainer.innerHTML = ""
    showTasks()
}
