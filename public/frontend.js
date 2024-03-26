
const addTask = document.querySelector(".addTask")
const newTask = document.querySelector(".newTask")
const cancel = document.querySelector(".cancel")

addTask.addEventListener("click", function (e) {
    e.preventDefault(); // prevents page reloading
    if (newTask.classList.contains("displayNone")) {
        newTask.classList.remove("displayNone")
    }
});

cancel.addEventListener("click", function (e) {
    e.preventDefault(); // prevents page reloading
    newTask.classList.add("displayNone")

});

    
document.querySelector('.sortBy').addEventListener('change', event => {
    event.preventDefault
    let tasksLi = document.querySelectorAll('.taskLi')
    let arrayTasksLi = Array.from(tasksLi)
    console.log(arrayTasksLi)

    if(document.querySelector('.priority').selected == true) {
        console.log("hello")
        let sortlist = arrayTasksLi.sort((b, a) => a.querySelector('.priorityValue').textContent - b.querySelector('.priorityValue').textContent);

        document.querySelector('.listTask').innerHTML = null
        for(let list of sortlist) {
            document.querySelector('.listTask').append(list)
        }       
    } else if (document.querySelector('.date').selected == true) {
        console.log('hi')
        let sortlist = arrayTasksLi.sort((a, b) => new Date(a.querySelector('.dateValue').textContent) - new Date(b.querySelector('.dateValue').textContent));

        document.querySelector('.listTask').innerHTML = null
        for(let list of sortlist) {
            document.querySelector('.listTask').append(list)
        } 
    }
})