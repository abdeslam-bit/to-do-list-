let tasks = document.getElementById("content");

let myData = JSON.parse(localStorage.getItem('info')) || [];

function fillTaskOnThePage() {
    tasks.innerHTML = ""; 
    for (let task = 0; task < myData.length; task++) {
        tasks.innerHTML += `
            <div class="${myData[task].isDone ? 'assignementAfter' : 'assignment'} ">
                <div class="title">
                    <h2>${myData[task].title}</h2>
                    <span class="material-symbols-outlined">
                        calendar_month
                    </span>
                    <span class="date">${myData[task].date}</span>
                </div>
                
                <div class="btns">
                    <button onclick='deleteTask(${task})' class="circle delete">
                        <span class="material-symbols-outlined">
                            delete
                        </span>
                    </button>
                    ${myData[task].isDone ? `
                    <button onclick='checkTask(${task})' class="circle done donee">
                        <span class="material-symbols-outlined">
                            cancel
                        </span>
                    </button>
                        ` :
                        `
                    <button onclick='checkTask(${task})' class="circle done">
                        <span class="material-symbols-outlined">
                            check
                        </span>
                    </button>
                        `}

                    <button onclick='updateTask(${task})' class="circle update">
                        <span class="material-symbols-outlined">
                            edit
                        </span>
                    </button>
                </div>
            </div>
        `;
    }
    localStorage.setItem('info', JSON.stringify(myData));
}

function adding() {
    let message = prompt('Add New assignment');
    if(message != ""){
        let date = new Date();
        let DateNow = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
        let MyObjectList = {
            title: message,
            date: DateNow,
            isDone: false,
        };
        myData.push(MyObjectList);
    }
    fillTaskOnThePage();
}

function deleteTask(index) {
    let confirmation = confirm('Are you sure you want to delete this task?');
    if (confirmation) {
        myData.splice(index, 1);
    }
    fillTaskOnThePage();
}

function updateTask(index) {
    let newTitle = prompt('Enter the new name');
    if (newTitle) {
        myData[index].title = newTitle;
        fillTaskOnThePage();
    }
}

function checkTask(index) {
    myData[index].isDone = !myData[index].isDone; 
    fillTaskOnThePage();
}

fillTaskOnThePage();
