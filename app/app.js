import * as MODEL from "./model.js";

var ingredCnt = 3;
var stepCnt = 3;

function addInput() {
  // step 1, add click listener to button
  $(".addBtn").on("click", (e) => {
    // step 2, grab element and append new, MAKE SURE YOU CHANGE INGRED NUMBER AFTER APPEND
    $(".formHolder .ingred").append(
      `<input type="text" id="ingred${ingredCnt}" placeholder="Ingredient #${
        ingredCnt + 1
      }" />`
    );
    // step 3, add one to the count
    ingredCnt++;
    console.log(ingredCnt);
  });

  // step 1, add click listener to button
  $(".addSBtn").on("click", (e) => {
    // step 2, grab element and append new, MAKE SURE YOU CHANGE INGRED NUMBER AFTER APPEND
    $(".formHolder .instructions").append(
      `<input type="text" id="instructions${stepCnt}" placeholder="Instruction #${
        stepCnt + 1
      }" />`
    );
    // step 3, add one to the count
    stepCnt++;
    console.log(stepCnt);
  });

  let allRecipes = JSON.parse(localStorage.getItem("Recipe"));

  $("#submitRecipe").on("click", (e) => {
    // create a new object
    let recipeObj = {
      image: "",
      name: "",
      description: "",
      time: "",
      size: "",
      steps: [],
      ingredients: [],
    };

    // always add preventDefault on submit buttons to keep it from moving pages
    e.preventDefault();

    // get the recipe name
    var recipeName = $(".generalDetails #recipeName").val();
    console.log(recipeName);
    recipeObj.name = recipeName;

    // get the recipe description
    var recipeDescription = $(".generalDetails #recipeDescription").val();
    console.log(recipeDescription);
    recipeObj.description = recipeDescription;

    // get the recipe total time
    var recipeTotalTime = $(".generalDetails #recipeTT").val();
    console.log(recipeTotalTime);
    recipeObj.time = recipeTotalTime;

    // get the recipe serving size
    var recipeServingSize = $(".generalDetails #recipeSS").val();
    console.log(recipeServingSize);
    recipeObj.size = recipeServingSize;

    // get the ingredients
    $(".formHolder .ingred input").each((idx, ingred) => {
      console.log(ingred.value);
      recipeObj.ingredients.push({ ingred: ingred.value });
    });

    // get the instructions
    $(".formHolder .instructions input").each((idx, step) => {
      console.log(step.value);
      recipeObj.steps.push({ step: step.value });
    });
    console.log("consoled", recipeObj);
    allRecipes.push(recipeObj);
    localStorage.setItem("Recipe", JSON.stringify(allRecipes));
    console.log(localStorage.getItem("Recipe"));

    //TODO set the inputs back to empty
    // $("#firstName").val("");
    // $("#lastName").val("");
  });
}

function initSite() {
  if (localStorage) {
    let recipe = localStorage.getItem("Recipe");
    if (recipe) {
      let recipes = JSON.parse(localStorage.getItem("Recipe"));
      console.log("recipes");
    } else {
      localStorage.setItem("Recipe", "[]");
      alert("No recipes added yet");
    }
  } else {
    console.log("No localStorage");
  }
}

//loop through recipe data
function loopRecipes() {
  $("#app .background .recipes").html(``);
  // $.each(obj.recipes, (idx, recipe) =>{
  $("#app .background .recipes").append(
    `<div class="recipe">
            <div class="recipe-img"><img src="../images/recipe-pizza.jpg" alt="pizza"></div>
            <div class="recipe-textBox">
                <div class="recipe-text">
                    <h1>Supreme Pizza</h1>
                    <p>Make pizza night super
                        duper out of this world with
                        homemade pizza. This recipe
                        is supreme with vegetables
                        and two types of meat. Yum!</p>
                    <div class="icon-text">
                        <div class="icon"><img src="../images/time.svg" alt="time">1h 24min</div>
                    </div>
                    <div class="icon-text">
                        <div class="icon"><img src="../images/servings.svg" alt="time">4 servings</div>
                    </div>
                </div>
            </div>
        </div>`
  );
  // })F
}

//! change routes
function changeRoute() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");
  // console.log(hashTag + " " + pageID);
  if (pageID == "" || pageID == "home") {
    MODEL.changePage(pageID);
  } else if (pageID == "browse") {
    MODEL.changePage(pageID);
    //   } else if (pageID == "account") {
    //     MODEL.changePage(pageID, initSubmitListener);
    //   } else if (pageID == "account" && signedIn == true) {
    //     MODEL.changePage("account-logout", initSubmitListener);
    //   } else {
    //     MODEL.changePage(pageID);
    //   }
  } else if (pageID == "createRecipe") {
    MODEL.changePage(pageID, addInput);
  } else if (pageID == "login") {
    MODEL.changePage(pageID);
  }
}

function initURLListener() {
  $(window).on("hashchange", changeRoute);
  changeRoute();
}

$(document).ready(function () {
  // addInput();
  initSite();
  initURLListener();
});
