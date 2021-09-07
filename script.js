const draggableList = document.getElementById("draggable-list");
const checkBtn = document.getElementById("check");

console.log(draggableList);
console.log(checkBtn);

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
  [...list].forEach((listElement, index) => {
    const listItem = document.createElement("li");
    listItem.setAttribute("data-index", index);

    listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <p class="list-element-name">${listElement}</p>
        <i class="fas fa-grip-lines"></i>
      </div>
    `;

    listItems.push(listItem);

    draggableList.appendChild(listItem);
  });
};

createList(spanishNumbers);
