import * as MODEL from "./model.js";

var ingredCnt = 3;
var stepCnt = 3;

let obj = {
  Recipes: [
    {
      img: "images/recipe-pizza.jpg",
      name: "Supreme Pizza",
      desc: "Make pizza night super duper out of this world with homemade pizza. This recipe is supreme with vegetables and two types of meat. Yum!",
      prepTime: "1h 24 min",
      servings: "4",
    },
    {
      img: "images/recipe-burger.jpg",
      name: "Classic Burger",
      desc: "Sink your teeth into a delicious restaurant-style, hamburger recipe made from lean beef. Skip the prepackaged patties and take the extra time to craft up your own, and that little extra effort will be worth it.",
      prepTime: "30 min",
      servings: "4",
    },
    {
      img: "images/recipe-pilaf.jpg",
      name: "Chicken Biryani",
      desc: "Chicken Biryani is a bold and flavorful Indian dish with crazy tender bites of chicken with bell peppers in a deliciously spiced and fragrant rice.",
      prepTime: "1h 15 min",
      servings: "6",
    },
    {
      img: "images/recipe-chowmein.jpg",
      name: "Ch. Chow Mein",
      desc: "A great Chow Mein comes down to the sauce - it takes more than just soy sauce and sugar! Jam packed with a surprising amount of hidden vegetables, customize this Chicken Chow Mein recipe using your protein of choice!",
      prepTime: "20 min",
      servings: "4",
    },
  ],
};

function register() {
  $("#registerSubmit").on("click", (e) => {
    console.log("register");

    let allUsers = JSON.parse(localStorage.getItem("User"));

    // set the variables equal to the values in the input fields
    let fn = $("#fName").val();
    let ln = $("#lName").val();
    let rEmail = $("#registerEmail").val();
    let rPassword = $("#registerPassword").val();

    // if both inputs are not empty, then go ahead and return both, else send an alert to fill everything in
    if (fn != "" && ln != "" && rEmail != "" && rPassword != "") {
      let userObj = {
        firstName: fn,
        lastName: ln,
        email: rEmail,
        password: rPassword,
        state: true,
      };

      // push the user into the array of user objects
      allUsers.push(userObj);
      console.log(allUsers);
      localStorage.setItem("User", JSON.stringify(allUsers));
      console.log(localStorage.getItem("User"));

      // clear the page values once it has been submitted
      $("#fName").val("");
      $("#lName").val("");
      $("#registerEmail").val("");
      $("#registerPassword").val("");

      getUser();
    } else {
      alert("Enter both inputs please");
    }
  });

  // $("#loginSubmit").on("click", (e) => {
  //   console.log("login");
  //   //TODO revisit this to ensure that both login and register will work
  // });
}

//! This function runs whenever login page is opened
function getUser() {
  // get all names
  let allUsers = JSON.parse(localStorage.getItem("User"));
  console.log(allUsers);

  //! if there is a user signed in, then retrieve that user
  if (allUsers != "") {
    $.each(allUsers, function (idx, user) {
      console.log(user.firstName + " " + user.lastName);
      $("#app").append(`<p>${user.firstName} ${user.lastName}</p>`);
      $("#createRecipeGreet").html(
        `Hey ${user.firstName}, create your recipe!`
      );
    });
    //! if there is not a user, then allow the user to sign in or register
  } else {
    register();
    addInput();
  }
}

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

  if (localStorage) {
    let people = localStorage.getItem("User");
    if (people) {
      let persons = JSON.parse(localStorage.getItem("User"));
      console.log("persons");
    } else {
      localStorage.setItem("User", "[]");
      alert("No people added yet");
    }
  } else {
    console.log("No localStorage");
  }
}

//loop through recipe data
function loopRecipes() {
  //console.log("test");
  // $("#app .background .recipes").html(``);
  $.each(obj.Recipes, (idx, recipe) => {
    $("#app .background .recipes").append(
      `<div class="recipe">
            <div class="recipe-img"><img src="${recipe.img}" alt="${recipe.name}"></div>
            <div class="recipe-textBox">
                <div class="recipe-text">
                    <h1>${recipe.name}</h1>
                    <p>${recipe.desc}</p>
                    <div class="icon-text">
                        <div class="icon"><img src="../images/time.svg" alt="time"></div><p>${recipe.prepTime}</p>
                    </div>
                    <div class="icon-text">
                        <div class="icon"><img src="../images/servings.svg" alt="time"></div><p>${recipe.servings} servings</p>
                    </div>
                </div>
            </div>
        </div>`
    );
  });
}

//! change routes
function changeRoute() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");
  // console.log(hashTag + " " + pageID);
  if (pageID == "" || pageID == "home") {
    MODEL.changePage(pageID);
  } else if (pageID == "browse") {
    MODEL.changePage(pageID, loopRecipes);
    //   } else if (pageID == "account") {
    //     MODEL.changePage(pageID, initSubmitListener);
    //   } else if (pageID == "account" && signedIn == true) {
    //     MODEL.changePage("account-logout", initSubmitListener);
    //   } else {
    //     MODEL.changePage(pageID);
    //   }
  } else if (pageID == "createRecipe") {
    MODEL.changePage(pageID, getUser);
  } else if (pageID == "login") {
    MODEL.changePage(pageID, getUser);
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
