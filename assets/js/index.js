// Auto complete jQuery codes
/// <reference types="./@types/jquery" />

// for more pure js
"use strict";

// !=================> Global Variables  <=================  //

let root = document.getElementById("root");
let data = "";
const searchInputs = document.getElementById("searchInputs");
let submitBtn = "";
let nameInput = "";
let emailInput = "";
let phoneInput = "";
let ageInput = "";
let passwordInput = "";
let rePasswordInput = "";

// !=================> When start  <=================  //

$(function () {
  $("#innerLoading").fadeOut();
  getItems("").then($("body").css({ overflow: "auto" }));
});

// !=================> Events  <=================  //

$(".openCloseBar").on("click", function () {
  if ($(".openCloseBar").hasClass("fa-bars")) {
    openBar();
  } else {
    closeBar();
  }
});

// !=================> Functions  <=================  //

function openBar() {
  $(".animatedBar").animate({ width: "toggle" }, 500);
  $(".openCloseBar").removeClass("fa-bars");
  $(".openCloseBar").addClass("fa-x");
  for (let i = 0; i < 5; i++) {
    $("nav ul li")
      .eq(i)
      .animate({ top: 0 }, (i + 10) * 100);
  }
}

function closeBar() {
  $(".animatedBar").animate({ width: "toggle" }, 500);
  $("nav ul li").css({ top: 220 }, 500);
  $(".openCloseBar").removeClass("fa-x");
  $(".openCloseBar").addClass("fa-bars");
}

// *******  Get & Display data ****** //

// get data 
async function getItems(meal) {
  $("#loading").fadeIn(100);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
  );
  response = await response.json();
  displayMeals(response.meals);
  $("#loading").fadeOut(500);
}

// display data 
function displayMeals(item) {
  data = "";
  for (let i = 0; i < item.length; i++) {
    data += `
    <div class="col-md-3 text-white cursorPointer">
    <div onclick='getMealDetails(${item[i].idMeal})' class="content rounded-3 overflow-hidden position-relative">
      <img class="w-100" src=${item[i].strMealThumb} alt="" />
      <div class="layer">
        <h3 class="ps-2 pt-4">${item[i].strMeal}</h3>
      </div>
    </div>
  </div>
    `;
  }
  root.innerHTML = data;
}

// *******  details functions Get & Display  ****** //

// get details of meal
async function getMealDetails(idMeal) {
  $("#innerLoading").fadeIn(100);
  $("#searchInputs").html(``);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  );
  response = await response.json();
  displayMealDetails(response.meals[0]);
  $("#innerLoading").fadeOut(500);
}

// display details of meals
function displayMealDetails(mealData) {
  searchInputs.innerHTML = "";
  // for more description if founded
  let ingredients = ``;
  for (let i = 1; i <= 20; i++) {
    if (mealData[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        mealData[`strMeasure${i}`]
      } ${mealData[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = mealData.strTags?.split(",");
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
      <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  data = `
  <div class="col-md-4">
  <div class="content">
    <img class="rounded-3 w-100" src=${mealData.strMealThumb} alt="" />
    <h2 class="pt-2">${mealData.strMeal}</h2>
  </div>
</div>
<div class="col-md-8">
  <div class="content">
    <h2 class="py-2">Instructions</h2>
    <p>
    ${mealData.strInstructions}
    </p>
    <h3>Area: <span class="fw-light">${mealData.strArea}</span></h3>
    <h3>Category: <span class="fw-light">${mealData.strCategory}</span></h3>
    <h3>Recipes:</h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
    ${ingredients}
    </ul>
    <h3>Tags:</h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
    ${tagsStr}
    </ul>

    <a
    class="btn btn-success"
      href=${mealData.strSource}
      target="_blank"
      >Source</a
    >
    <a
    class="btn btn-danger"
      href=${mealData.strYoutube}
      target="_blank"
      >Youtube</a
    >
  </div>
</div>
  
  `;

  root.innerHTML = data;
}

// *******  Categories functions Get & Display  ****** //

// get Categories Meals
async function getCategoriesData() {
  closeBar()
  $("#innerLoading").fadeIn(100);
  $("#searchInputs").html(``);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  displayCategoriesMeals(response.categories);
  $("#innerLoading").fadeOut(500);
}

// display Categories Meals
function displayCategoriesMeals(item) {
  data = "";
  for (let i = 0; i < item.length; i++) {
    data += `
    <div class="col-md-3 cursorPointer">
    <div onclick='getCategoryMeals("${item[i].strCategory}")' class="content rounded-3 overflow-hidden position-relative">
      <img class="w-100" src=${item[i].strCategoryThumb}  />
      <div class="layer text-center p-2">
        <h3>${item[i].strCategory}</h3>
        <p class="fs-6">${item[i].strCategoryDescription}</p>
      </div>
    </div>
  </div>
    `;
  }
  root.innerHTML = data;
}

// get meals of category
async function getCategoryMeals(meals) {
  $("#innerLoading").fadeIn(100);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meals}`
  );
  response = await response.json();
  displayMeals(response.meals);
  $("#innerLoading").fadeOut(500);
}

// *******  Areas functions Get & Display  ****** //

// get Areas
async function getAreaData() {
  closeBar()
  $("#innerLoading").fadeIn(100);
  $("#searchInputs").html(``);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  $("#innerLoading").fadeOut(500);
  displayAreasData(response.meals);
}

// display Areas
function displayAreasData(item) {
  data = "";
  for (let i = 0; i < item.length; i++) {
    data += `
    <div class="col-md-3">
    <div
      onclick="getAreaMeals('${item[i].strArea}')"
      class="rounded-2 text-center cursor-pointer"
    >
      <i class="fa-solid fa-house-laptop fa-4x"></i>
      <h3>${item[i].strArea}</h3>
    </div>
  </div>
    `;
  }
  root.innerHTML = data;
}

// get meals of area
async function getAreaMeals(areaMeals) {
  $("#innerLoading").fadeIn(100);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaMeals}`
  );
  response = await response.json();
  displayMeals(response.meals);
  $("#innerLoading").fadeOut(500);
}

// *******  Ingredients functions Get & Display  ****** //

// get Ingredients
async function getIngredientsData() {
  closeBar()
  $("#innerLoading").fadeIn(100);
  $("#searchInputs").html(``);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();
  displayIngredients(response.meals);
  $("#innerLoading").fadeOut(500);
}

// display Ingredients
function displayIngredients(item) {
  data = "";
  for (let i = 0; i < item.length; i++) {
    data += `
    <div class="col-md-3">
    <div onclick="getIngredientsMeals('${item[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${item[i].strIngredient}</h3>
    </div>
</div>
    `;
  }
  root.innerHTML = data;
}

// get meals of Ingredients
async function getIngredientsMeals(ingredientsMeals) {
  $("#innerLoading").fadeIn(100);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientsMeals}`
  );
  response = await response.json();
  displayMeals(response.meals);
  $("#innerLoading").fadeOut(500);
}

// *******  display inputs search & search function ****** //
// display inputs
function showSearchInputs() {
  closeBar()
  $("#innerLoading").fadeIn(100);
  root.innerHTML = "";
  $("#searchInputs").html(
    `
    <div class="col-md-6">
      <input type="text" placeholder="Search by name ..." class=" text-white form-control bg-transparent " onkeyup="searchByName(this.value)">
    </div>
    <div class="col-md-6">
    <input type="text" placeholder="Search by First letter ..." maxlength="1" class=" text-white form-control bg-transparent " onkeyup="searchByFname(this.value)">
  </div>
    `
  );
  $("#innerLoading").fadeOut(500);
}

// get meals by name
async function searchByName(value) {
  root.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
  );
  response = await response.json();
  displayMeals(response.meals);
}

// get meals by first letter
async function searchByFname(value) {
  root.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`
  );
  response = await response.json();
  displayMeals(response.meals);
}

// *******  display Contact Us Form  ****** //
function showContactForm() {
  closeBar()
  $("#innerLoading").fadeIn(100);
  root.innerHTML = `
  <div class="contactUs min-vh-100 d-flex justify-content-center align-items-center">
  <div class="container w-75 text-center">
      <div class="row g-4">
          <div class="col-md-6">
              <input id="nameInput" onkeyup="nameValidationMessage()" type="text" class="form-control" placeholder="Enter your name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Special characters and numbers not allowed
              </div>
          </div>
          <div class="col-md-6">
              <input id="emailInput" onkeyup="emailValidationMessage()" type="email" class="form-control " placeholder="Enter your e-mail">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid *exemple@yyy.zzz
              </div>
          </div>
          <div class="col-md-6">
              <input id="phoneInput" onkeyup="phoneValidationMessage()" type="text" class="form-control " placeholder="Enter your phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid Phone Number
              </div>
          </div>
          <div class="col-md-6">
              <input id="ageInput" onkeyup="ageValidationMessage()" type="number" class="form-control " placeholder="Enter your age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age
              </div>
          </div>
          <div class="col-md-6">
              <input id="passwordInput" onkeyup="passwordValidationMessage()" type="password" class="form-control " placeholder="Enter your password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
              </div>
          </div>
          <div class="col-md-6">
              <input id="rePasswordInput" onkeyup="rePasswordValidationMessage()" type="password" class="form-control " placeholder="Re-Password">
              <div id="rePasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid re-password 
              </div>
          </div>
      </div>
      <button id="submitBtn" class="btn btn-outline-danger px-2 mt-3" disabled>Submit</button>
  </div>
</div>
  
  `
  $("#innerLoading").fadeOut(300);
  ;

  submitBtn = document.getElementById("submitBtn");
  nameInput = document.getElementById("nameInput");
  emailInput = document.getElementById("emailInput");
  phoneInput = document.getElementById("phoneInput");
  ageInput = document.getElementById("ageInput");
  passwordInput = document.getElementById("ageInput");
  rePasswordInput = document.getElementById("ageInput");
}

// !=================> Validations & Messages  <=================  //

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function rePasswordValidation() {
  return (
    document.getElementById("rePasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}

function nameValidationMessage() {
  if (nameValidation()) {
    document.getElementById("nameAlert").classList.replace("d-block", "d-none");
  } else {
    document.getElementById("nameAlert").classList.replace("d-none", "d-block");
  }
}

function emailValidationMessage() {
  if (emailValidation()) {
    document
      .getElementById("emailAlert")
      .classList.replace("d-block", "d-none");
  } else {
    document
      .getElementById("emailAlert")
      .classList.replace("d-none", "d-block");
  }
}

function phoneValidationMessage() {
  if (phoneValidation()) {
    document
      .getElementById("phoneAlert")
      .classList.replace("d-block", "d-none");
  } else {
    document
      .getElementById("phoneAlert")
      .classList.replace("d-none", "d-block");
  }
}

function ageValidationMessage() {
  if (ageValidation()) {
    document.getElementById("ageAlert").classList.replace("d-block", "d-none");
  } else {
    document.getElementById("ageAlert").classList.replace("d-none", "d-block");
  }
}

function passwordValidationMessage() {
  if (passwordValidation()) {
    document
      .getElementById("passwordAlert")
      .classList.replace("d-block", "d-none");
  } else {
    document
      .getElementById("passwordAlert")
      .classList.replace("d-none", "d-block");
  }
}

function rePasswordValidationMessage() {
  if (rePasswordValidation()) {
    document
      .getElementById("rePasswordAlert")
      .classList.replace("d-block", "d-none");
  } else {
    document
      .getElementById("rePasswordAlert")
      .classList.replace("d-none", "d-block");
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    rePasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}
