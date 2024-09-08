let unOrderList = document.getElementById("unOrderList");
let inputElement = document.getElementById("inputElement");
let addButton = document.getElementById("addButtonElement");
let saveButton = document.getElementById("SaveButton");

let TodoList;

function getLocalStorageValue() {
  let previousList = localStorage.getItem("TodoList");
  let previousListValue = JSON.parse(previousList);
  if (previousListValue === null) {
    return [];
  } else {
    return previousListValue;
  }
}
TodoList = getLocalStorageValue();
let count = TodoList.length;

saveButton.onclick = function () {
  localStorage.setItem("TodoList", JSON.stringify(TodoList));
};

function onStatusChange(checkboxId, labelId, TodoId) {
  let label = document.getElementById(labelId);
  let checkbox = document.getElementById(checkboxId);
  label.classList.toggle("checked");
  let findIndexNumbers = TodoList.findIndex(function (eachItem) {
    if ("todo" + eachItem.uniqueNo === TodoId) {
      return true;
    } else {
      return false;
    }
  });
  let listElement = TodoList[findIndexNumbers];
  if (listElement.isChecked === true) {
    listElement.isChecked = false;
  } else {
    listElement.isChecked = true;
  }
}

function onDeleteList(TodoId) {
  let deleteList = document.getElementById(TodoId);
  unOrderList.removeChild(deleteList);
  let findIndexNumber = TodoList.findIndex(function (eachItem) {
    if ("todo" + eachItem.uniqueNo === TodoId) {
      return true;
    } else {
      return false;
    }
  });
  TodoList.splice(findIndexNumber, 1);
}

function createAndAppendTodoList(Todo) {
  let TodoId = "todo" + Todo.uniqueNo;
  let checkboxId = "checkbox" + Todo.uniqueNo;
  let labelId = "label" + Todo.uniqueNo;

  let listContainer = document.createElement("li");
  listContainer.id = TodoId;
  listContainer.classList.add("d-flex");
  unOrderList.appendChild(listContainer);

  let inputEl = document.createElement("input");
  inputEl.id = checkboxId;
  inputEl.type = "checkbox";
  inputEl.checked = Todo.isChecked;
  inputEl.classList.add("check_box");
  listContainer.appendChild(inputEl);
  inputEl.onclick = function () {
    onStatusChange(checkboxId, labelId, TodoId);
  };

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label_container", "d-flex");
  listContainer.appendChild(labelContainer);

  let labelEl = document.createElement("label");
  labelEl.setAttribute("for", checkboxId);
  labelEl.classList.add("label_El");
  labelEl.textContent = Todo.text;
  labelEl.id = labelId;
  labelContainer.appendChild(labelEl);
  if (Todo.isChecked === true) {
    labelEl.classList.add("checked");
  }

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("text-center");
  labelContainer.appendChild(deleteIconContainer);
  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete_icon");
  deleteIconContainer.appendChild(deleteIcon);

  deleteIcon.onclick = function () {
    onDeleteList(TodoId);
  };
}

for (let Todo of TodoList) {
  createAndAppendTodoList(Todo);
}

function addNewTodoInList() {
  let inputValue = inputElement.value;

  let newTodo = {
    text: inputValue,
    uniqueNo: count + 1,
    isChecked: false,
  };

  if (inputElement.value === "") {
    return alert("Invalid Text");
  } else {
    TodoList.push(newTodo);
    createAndAppendTodoList(newTodo);
    inputElement.value = "";
  }
}
addButton.onclick = function () {
  addNewTodoInList();
};
