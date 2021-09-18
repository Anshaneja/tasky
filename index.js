const taskContainer = document.querySelector(".task__container");
let globalTaskData = [];

const saveToLocalStorage = () => {
    localStorage.setItem("TaskyCA",JSON.stringify({card :globalTaskData}));
};
const addNewCard = () => {

    const taskData = {
        id: `${Date.now()}`,
        title: document.getElementById("tasktitle").value,
        image: document.getElementById("imageurl").value,
        type: document.getElementById("tasktype").value,
        description: document.getElementById("taskdescription").value
    };
    globalTaskData.push(taskData);

    saveToLocalStorage();

    const newCard = generateCard(taskData);
    taskContainer.insertAdjacentHTML("beforeend",newCard);

    document.getElementById("tasktitle").value ="";
    document.getElementById("imageurl").value = "";
    document.getElementById("tasktype").value = "";
    document.getElementById("taskdescription").value = "";
    return;
};


const loadExistingCards = () => {
    const taskData = JSON.parse(localStorage.getItem("TaskyCA"));
    if(!taskData) return;
    globalTaskData = taskData.card;

    globalTaskData.map((taskData) => {
        const newCard = generateCard(taskData);
        taskContainer.insertAdjacentHTML("beforeend",newCard);
    })
};

const deleteCard = (id) => {
    const removeTask = globalTaskData.filter((taskdata)=>{
        return taskdata.id !== id;
    });
    globalTaskData = removeTask;
    saveToLocalStorage();
    taskContainer.removeChild(document.getElementById(id));

};

const generateCard = (taskData) => {
    return `<div id= ${taskData.id} class="col-md-6 col-lg-4">
        <div class="card" >
            <div class="card-header d-flex justify-content-end ">
                <a href="#" class="btn btn-outline-info ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                </a>
                <a href="#" class="btn btn-outline-danger" name="${taskData.id}" onclick="deleteCard(this.name)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </a>
            </div>
            <img src= ${taskData.image} class="card-img-tcop m-3 mb-0 rounded" alt="bird">
            <div class="card-body">
            <h5 class="card-title">${taskData.title}</h5>
            <p class="card-text">${taskData.description}</p>
            <span class="badge bg-primary">${taskData.type}</span>
            </div>
            <div class="card-footer">
                <a href="#" class="btn btn-outline-primary">Open Task</a>
            </div>
        </div>
    </div>`;
};