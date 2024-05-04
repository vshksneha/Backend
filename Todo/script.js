let listDiv = document.querySelector("#task-list");
let addDiv = document.querySelector("#ask-add");
let textBox = document.querySelector("#task-input");
let addBtn = document.querySelector("#add-btn");
let clearBtn = document.querySelector("#remove-local");

let taskArr = [];
let lineArr = [];

addBtn.addEventListener("click", () => {
    if (textBox.value.trim() !== "") {
        addtask(textBox.value);
    } else {
        textBox.value = "";
    }
});

textBox.addEventListener('keypress', (e) => {
    if (e.key == "Enter") {
        if (textBox.value.trim() !== "") {
            addtask(textBox.value);
        } else {
            textBox.value = "";
        }
    }
})

function addtask(taskInfo, checkData) {
    let div = document.createElement("div");
    let inDiv = document.createElement("div");
    let checkbox = document.createElement("input");
    let para = document.createElement("p");
    let removeBtn = document.createElement("button");
    let editButton = document.createElement("button");

    div.classList.add("dynamic-div");
    inDiv.classList.add("inner-div");
    editButton.classList.add("editButton");
    editButton.innerHTML = "Edit";
    checkbox.type = "checkbox";
    para.innerText = taskInfo;
    para.style.wordBreak = "break-word";
    para.style.maxWidth = "430px";
    para.style.fontFamily = `"Exo 2", sans-serif`;
    removeBtn.setAttribute("class", "remove-btn");
    removeBtn.innerHTML = "X";

    checkbox.addEventListener("change", function () {
        i = taskArr.indexOf(para.innerText);
        if (this.checked) {
            para.style.textDecoration = "line-through";
            para.style.color = "grey";
            lineArr[i] = 1;
            localStorage.setItem("checkLine", JSON.stringify(lineArr));
        } else {
            para.style.textDecoration = "";
            para.style.color = "";
            lineArr[i] = 0;
            localStorage.setItem("checkLine", JSON.stringify(lineArr));
        }
    });

    //
    lineArr = JSON.parse(localStorage.getItem("checkLine")) || [];
    if (checkData) {
        i = taskArr.indexOf(para.innerText);
        checkbox.checked = true;
        para.style.textDecoration = "line-through";
        para.style.color = "grey";
        lineArr[i] = 1;
        localStorage.setItem("checkLine", JSON.stringify(lineArr));
    }

    removeBtn.addEventListener("click", () => {
        let index = taskArr.indexOf(para.innerText);
        taskArr.splice(index, 1);
        lineArr.splice(index, 1);
        localStorage.setItem("task", JSON.stringify(taskArr));
        localStorage.setItem("checkLine", JSON.stringify(lineArr));

        listDiv.removeChild(div);
    });

    //
    editButton.addEventListener("click", () => {
        inDiv.removeChild(para);
        let editInput = document.createElement("input");
        editInput.classList.add("editInput");
        editInput.type = "text";
        inDiv.append(editInput);

        editInput.addEventListener('keypress', (e) => {
            if (e.key == "Enter") {
                if (editInput.value.trim() !== "") {
                    let index = taskArr.indexOf(para.innerText);
                    para.innerText = editInput.value;
                    taskArr[index] = para.innerText;
                    localStorage.setItem("task", JSON.stringify(taskArr));
                    inDiv.removeChild(editInput);
                    inDiv.append(para);
                } else {
                    inDiv.removeChild(editInput);
                    inDiv.append(para);
                }
               
            }
        })
    })

    taskArr.push(para.innerText);
    lineArr.push(0);
    localStorage.setItem("task", JSON.stringify(taskArr));
    localStorage.setItem("checkLine", JSON.stringify(lineArr));

    inDiv.append(checkbox, para);
    div.append(inDiv, removeBtn, editButton);
    listDiv.appendChild(div);
    textBox.value = "";
}

clearBtn.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

window.addEventListener("load", localdata);

function localdata() {
    if (localStorage.getItem("task")) {
        userArr = JSON.parse(localStorage.getItem("task"));
        checkData = JSON.parse(localStorage.getItem("checkLine"));
        userArr.forEach((tasks, j) => {
            addtask(tasks, checkData[j]);
        })
    }
}