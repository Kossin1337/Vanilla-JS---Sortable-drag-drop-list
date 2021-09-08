const draggableList = document.getElementById("draggable-list");
const checkBtn = document.getElementById("check");

const spanishNumbers = [
  "uno",
  "dos",
  "tres",
  "cuatro",
  "cinco",
  "seis",
  "siete",
  "ocho",
  "nueve",
  "diez",
];

/* place to store list items */
const listItems = [];

let dragStartIndex;

/* Insert list items into DOM */
const createList = (list) => {
  console.log("CREATING A LIST");
  [...list]
    .map((objectName) => ({ value: objectName, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((listElement, index) => {
      console.log(listElement);
      const listItem = document.createElement("li");
      listItem.classList.add("draggable-list-item");
      listItem.setAttribute("data-index", index);

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable-item" draggable="true">
          <p class="list-element-name">${listElement}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
    `;

      listItems.push(listItem);

      draggableList.appendChild(listItem);
    });

  addEventListeners();
};

/* EVENT LISNETERS FUNCTIONS */
function dragStart() {
  dragStartIndex = this.closest("li").getAttribute("data-index");
  console.log(dragStartIndex);
}

function dragOver(event) {
  event.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

/* FUNCTION TO CHECK ORDER */
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const itemValue = listItem
      .querySelector(".draggable-item")
      .innerText.trim();

    if (itemValue !== spanishNumbers[index]) {
      console.log("WRONG");
      listItem.classList.add("wrong");
    } else {
      console.log("RIGHT");
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

/* ADDIND EVENT LISTENERS */
const addEventListeners = () => {
  const draggables = document.querySelectorAll(".draggable-item");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((listItem) => {
    listItem.addEventListener("dragover", dragOver);
    listItem.addEventListener("drop", dragDrop);
    listItem.addEventListener("dragenter", dragEnter);
    listItem.addEventListener("dragleave", dragLeave);
  });
};

/* SWAP ITEMS */
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable-item");
  const itemTwo = listItems[toIndex].querySelector(".draggable-item");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

createList(spanishNumbers);

/* Check button */

checkBtn.addEventListener("click", checkOrder);
