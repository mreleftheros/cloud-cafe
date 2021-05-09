const cafeForm = document.getElementById("cafeForm");
const cafeList = document.getElementById("cafeList");
let cafes = [];

// event listeners
window.addEventListener("DOMContentLoaded", generateHTMLTemplate);
cafeForm.addEventListener("submit", submitCafeForm);
cafeList.addEventListener("click", removeCafe);

//helper function to display cafes
function displayCafes() {
  console.log(cafes);
}

// submit form function
function submitCafeForm(e) {
  e.preventDefault();
  let newCafe = cafeForm.addCafe.value;
  let newCafeCity = cafeForm.addCity.value;

  //check if value of addCafe is empty and add to array
  if(newCafe && newCafeCity)
    cafes.push({cafe: newCafe, city: newCafeCity});
  else if(newCafe)
  cafes.push({cafe: newCafe});

  //clear form
  cafeForm.reset();
  generateHTMLTemplate();
}

// function to generate HTML list template
function generateHTMLTemplate() {
  //empty list
  cafeList.innerHTML = "";

  //iterate each cafe to generate template
  cafes.forEach(cafe => {
    //create elements
    const liElement = document.createElement("li");
    const contentDivElement = document.createElement("div");
    const cafeSpanElement = document.createElement("span");
    const cafeSpanTextNode = document.createTextNode(cafe.cafe);
    const citySpanElement = document.createElement("span");
    const citySpanTextNode = cafe.city ? document.createTextNode(cafe.city) : document.createTextNode("");
    const trashSpanElement = document.createElement("span");
    const trashSpanTextNode = document.createTextNode("X");

    //add classes and attributes
    liElement.classList.add("main__cafe-list-item");
    contentDivElement.classList.add("main__cafe-list-item-content");
    cafeSpanElement.classList.add("main__cafe-list-item-content-cafe");
    citySpanElement.classList.add("main__cafe-list-item-content-city");
    trashSpanElement.classList.add("main__cafe-list-item-trash");
    trashSpanElement.classList.add("trash");

    //append elements
    cafeSpanElement.appendChild(cafeSpanTextNode);
    citySpanElement.appendChild(citySpanTextNode);
    trashSpanElement.appendChild(trashSpanTextNode);
    contentDivElement.appendChild(cafeSpanElement);
    contentDivElement.appendChild(citySpanElement);
    liElement.appendChild(contentDivElement);
    liElement.appendChild(trashSpanElement);
    cafeList.appendChild(liElement);
  }) 
}

//function to remove cafe from array
function removeCafe(e) {
  //check if target is trash
  if(e.target.classList.contains("trash")) {
    let selectedCafe = e.target.parentElement.firstChild.firstChild.textContent;
    let index = cafes.findIndex(cafe => cafe.cafe === selectedCafe);
    
    //remove index from array and li
    cafes.splice(index, 1);
    e.target.parentElement.remove();

    //generate template
    generateHTMLTemplate();
  }
}