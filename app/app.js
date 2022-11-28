import * as MODEL from "./model.js";

var ingredCnt = 3;
var stepCnt = 3;
var signedIn = false;

// if (signedIn == true) {
//   $("#loginBtn #login").html("Logout");
// } else {
//   $("#loginBtn #login").html("Login");
// }

let obj = {
  Recipes: [
    {
      id: 0,
      img: "images/recipe-pizza.jpg",
      name: "Supreme Pizza",
      desc: "Make pizza night super duper out of this world with homemade pizza. This recipe is supreme with vegetables and two types of meat. Yum!",
      prepTime: "1h 24 min",
      servings: "4",
      ingredients: [
        "1/4 batch pizza dough",
        "2 tablespoons Last-Minute Pizza Sauce",
        "10 slices pepperoni",
        "1 cup cooked and crumbled Italian sausage",
        "2 large mushrooms, sliced",
        "1/4 bell pepper, sliced",
        "1 tablespoon sliced black olives",
        "1 cup shredded mozzarella cheese",
      ],
      steps: [
        "Preheat the oven to 475°. Spray pizza pan with nonstick cooking or line a baking sheet with parchment paper.",
        "Flatten dough into a thin round and place on the pizza pan.",
        "Spread pizza sauce over the dough.",
        "Layer the toppings over the dough in the order listed.",
        "Bake for 8 to 10 minutes or until the crust is crisp and the cheese melted and lightly browned.",
      ],
    },
    {
      id: 1,
      img: "images/recipe-burger.jpg",
      name: "Classic Burger",
      desc: "Sink your teeth into a delicious restaurant-style, hamburger recipe made from lean beef. Skip the prepackaged patties and take the extra time to craft up your own, and that little extra effort will be worth it.",
      prepTime: "30 min",
      servings: "4",
      ingredients: ["ingred 1", "ingred 2"],
      steps: ["step", "step", "step", "step"],
    },
    {
      id: 2,
      img: "images/recipe-pilaf.jpg",
      name: "Chicken Biryani",
      desc: "Chicken Biryani is a bold and flavorful Indian dish with crazy tender bites of chicken with bell peppers in a deliciously spiced and fragrant rice.",
      prepTime: "1h 15 min",
      servings: "6",
      ingredients: ["ingred 1", "ingred 2", "ingred 3"],
      steps: ["step", "step", "step", "step"],
    },
    {
      id: 3,
      img: "images/recipe-chowmein.jpg",
      name: "Ch. Chow Mein",
      desc: "A great Chow Mein comes down to the sauce - it takes more than just soy sauce and sugar! Jam packed with a surprising amount of hidden vegetables, customize this Chicken Chow Mein recipe using your protein of choice!",
      prepTime: "20 min",
      servings: "4",
    },
  ],
};

// function loginRedirect() {
//   $("#loginBtn a").html("Logout");
//   //! might want to change this to be the current page
//   MODEL.changePage("home", initURLListener);
// }

function logOut() {
  // $(".logOut").on("click", function (e) {
  //   console.log("logout");

  alert("Thank you for signing out");
  signedIn = false;

  if (signedIn == false) {
    localStorage.setItem("User", "[]");
    localStorage.setItem("Recipe", "[]");
    $("#loginBtn a").html("Login");
    //! might want to change this to be the current page
    MODEL.changePage("home", initURLListener);
  }
}

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
      signedIn = true;

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
    // sets the button in the nav to logout
    // loginRedirect();
    $("#loginBtn a").html(`Logout`);
    // MODEL.changePage("home", initURLListener);

    $("#loginBtn").on("click", (e) => {
      logOut();
    });

    $.each(allUsers, function (idx, user) {
      // console.log(user.firstName + " " + user.lastName);
      $("#app").append(`<p>${user.firstName} ${user.lastName}</p>`);
      $("#createRecipeGreet").html(
        `Hey ${user.firstName}, create your recipe!`
      );
    });
    addInput();
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
      // alert("No recipes added yet");
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
      // alert("No people added yet");
    }
  } else {
    console.log("No localStorage");
  }
}

//loop through recipe data
function loopRecipes() {
  //console.log("test");
  $("#app .background .recipes").html(``);
  $.each(obj.Recipes, (idx, recipe) => {
    $("#app .background .recipes").append(
      `<div class="recipe">
            <div class="recipe-img"><img src="${recipe.img}" alt="${recipe.name}"></div>
            <div class="recipe-textBox">
                <div class="recipe-text">
                    <a href="#viewRecipe">${recipe.name}</a>
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

//display recipe details on viewRecipe page
function displayRecipe() {
  //console.log("display recipe");
  $("#app").html(``);
  $("#app").append(
    `<div class="view-desc">
        <div class="recipeName"><p>supreme pizza</p></div>
        <img src="../images/recipe-pizza.jpg" alt="pizza">
        <div class="recipe-desc">
            <h2>Description:</h2>
            <p>Make pizza night super duper out of this world with homemade pizza. This recipe is supreme with vegetables and two types
            of meat. Yum!</p>
            <h2>Total Time:</h2>
            <p>1h 24min</p>
            <h2>Servings:</h2>
            <p>4 servings</p>
        </div>
    </div>

    <div class="ingred-and-instructions">
        <h2>Ingredients:</h2>
        <ul>
            <li>1/4 batch pizza dough</li>
            <li>2 tablespoons Last-Minute Pizza Sauce</li>
            <li>10 slices pepperoni</li>
            <li>1 cup cooked and crumbled Italian sausage</li>
            <li>2 large mushrooms, sliced</li>
            <li>1/4 bell pepper, sliced</li>
            <li>1 tablespoon sliced black olives</li>
            <li>1 cup shredded mozzarella cheese</li>
        </ul>
        <h2>Instructions:</h2>
        <ol>
            <li>1. Preheat the oven to 475°. Spray pizza pan with nonstick cooking or line a baking sheet with parchment paper.</li>
            <li>2. Flatten dough into a thin round and place on the pizza pan.</li>
            <li>3. Spread pizza sauce over the dough.</li>
            <li>4. Layer the toppings over the dough in the order listed.</li>
            <li>5. Bake for 8 to 10 minutes or until the crust is crisp and the cheese melted and lightly browned.</li>
        </ol>
    </div>

    <div class="edit-button">
        <button>Edit Recipe</button>
    </div>
    `
  );
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
  } else if (pageID == "viewRecipe") {
    MODEL.changePage(pageID, displayRecipe);
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
