const cafeForm = document.getElementById("cafeForm");
let cafes = [];

// event listeners
cafeForm.addEventListener("submit", submitCafeForm);

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
  displayCafes();
}