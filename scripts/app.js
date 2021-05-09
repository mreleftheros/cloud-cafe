const cafeForm = document.getElementById("cafeForm");
const cafeList = document.getElementById("cafeList");
const formMessage = document.getElementById("formMessage");

// event listeners
window.addEventListener("DOMContentLoaded", () => {
  db.collection("cafes").onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if(change.type === "added")
        renderCafe(change.doc);
      else if(change.type === "removed") {
        let li = cafeList.querySelector("[data-id=" + change.doc.id + "]");
        li.remove();
      }
    })
  })
});
cafeForm.addEventListener("submit", addCafe);
cafeList.addEventListener("click", removeCafe);

// submit form function
function addCafe(e) {
  e.preventDefault();
  let newCafe = cafeForm.addCafe.value;
  let newCafeCity = cafeForm.addCity.value;

  //check if value of addCafe is empty and add to db
  if(newCafe && newCafeCity) {
    db.collection("cafes").add({
      cafe: newCafe,
      city: newCafeCity
    }).then(msg => {
      formMessage.classList.add("show");
      formMessage.textContent = `ID ${msg.id} was added!`;
      setTimeout(() => {
        formMessage.classList.remove("show");
        formMessage.textContent = "";
      }, 3000)
    });
  }
  else if(newCafe) {
    db.collection("cafes").add({
     cafe: newCafe
    }).then(msg => {
      formMessage.classList.add("show");
      formMessage.textContent = `ID ${msg.id} was added!`;
      setTimeout(() => {
        formMessage.classList.remove("show");
        formMessage.textContent = "";
      }, 3000)
    });
  }

  //clear form
  cafeForm.reset();
}

// function to generate HTML list template
function renderCafe(cafe) {
  //create elements
  const liElement = document.createElement("li");
  const contentDivElement = document.createElement("div");
  const cafeSpanElement = document.createElement("span");
  const cafeSpanTextNode = document.createTextNode(cafe.data().cafe);
  const citySpanElement = document.createElement("span");
  const citySpanTextNode = cafe.data().city ? document.createTextNode(cafe.data().city) : document.createTextNode("");
  const trashSpanElement = document.createElement("span");
  const trashSpanTextNode = document.createTextNode("X");

  //add classes and attributes
  liElement.classList.add("main__cafe-list-item");
  liElement.setAttribute("data-id", cafe.id);
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
}

//function to remove cafe
function removeCafe(e) {
  //check if target is trash
  if(e.target.classList.contains("trash")) {
    let selectedCafe = e.target.parentElement;
    let id = selectedCafe.getAttribute("data-id");

    //remove from db and remove li
    db.collection("cafes").doc(id).delete();

    formMessage.textContent = `ID ${id} was removed!`;
    formMessage.classList.add("remove");
    setTimeout(() => {
      formMessage.classList.remove("remove");
      formMessage.textContent = "";
    }, 3000)
  }
}