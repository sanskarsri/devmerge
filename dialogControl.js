var span = document.getElementById("close");
let newInput= document.getElementById('newInput')
let update = document.getElementById('update')
update.addEventListener('click',updateInfo)
span.onclick = function() {
  modal.style.display = "none";
  newInput.value=""
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    newInput.value=""
  }
}
function updateInfo()
{
  let info = newInput.value;
  console.log(info)
  if(info.trim()==null)
  {
    alert("Enter some task..");
    return;
  }
  input.value=""
  console.log("CurrObj",currObj)
  let obj = myobj[currObj.value]
  obj.name = info
  localStorage.setItem('mytasks',JSON.stringify(myobj))
  taskContainer.innerHTML= ""
  modal.style.display="none"
  newInput.value=""
  showTasks()
}