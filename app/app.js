import * as MODEL from "./model.js";

var ingredCnt = 3;
var stepCnt = 3;
var signedIn = false;

let obj = {
  Recipes: [
    {
      id: 0,
      img: "images/recipe-pizza.jpg",
      name: "Supreme Pizza",
      description:
        "Make pizza night super duper out of this world with homemade pizza. This recipe is supreme with vegetables and two types of meat. Yum!",
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
      description:
        "Sink your teeth into a delicious restaurant-style, hamburger recipe made from lean beef. Skip the prepackaged patties and take the extra time to craft up your own, and that little extra effort will be worth it.",
      prepTime: "30 min",
      servings: "4",
      ingredients: ["ingred 1", "ingred 2"],
      steps: ["step", "step", "step", "step"],
    },
    {
      id: 2,
      img: "images/recipe-pilaf.jpg",
      name: "Chicken Biryani",
      description:
        "Chicken Biryani is a bold and flavorful Indian dish with crazy tender bites of chicken with bell peppers in a deliciously spiced and fragrant rice.",
      prepTime: "1h 15 min",
      servings: "6",
      ingredients: ["ingred 1", "ingred 2", "ingred 3"],
      steps: ["step", "step", "step", "step"],
    },
    {
      id: 3,
      img: "images/recipe-chowmein.jpg",
      name: "Ch. Chow Mein",
      description:
        "A great Chow Mein comes down to the sauce - it takes more than just soy sauce and sugar! Jam packed with a surprising amount of hidden vegetables, customize this Chicken Chow Mein recipe using your protein of choice!",
      prepTime: "20 min",
      servings: "4",
      ingredients: ["ingred 1", "ingred 2", "ingred 3"],
      steps: ["step", "step", "step", "step"],
    },
  ],
};

function logOut() {
  signedIn = false;
  toggleSignIn(signedIn);
}

function toggleSignIn(state) {
  if (state == true) {
    // console.log("signed in");
    $(".menu").append(`<li><a href="#userRecipes">Your Recipes</a></li>`);
    $("#loginBtn a").html(`Logout`);
    $("#loginBtn a").on("click", (e) => {
      logOut();
    });
  } else if (state == false) {
    // console.log("signed out");
    $(".menu").remove(`<li><a href="#userRecipes">Your Recipes</a></li>`);
    $("#loginBtn a").html(`Login`);
    $("#loginBtn a").on("click", (e) => {
      navToLogin();
    });
  }
}

function navToLogin() {
  MODEL.changePage("login", initURLListener);
}

function register() {
  //! add this to register
  // $("#navItems #navLinks").append(`<a href="#userRecipes">Your Recipes</a>`);
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
      };
      signedIn = true;
      console.log("SIGNED IN", signedIn);

      // push the user into the array of user objects
      allUsers.push(userObj);
      //console.log(allUsers);
      localStorage.setItem("User", JSON.stringify(allUsers));
      console.log(localStorage.getItem("User"));

      // clear the page values once it has been submitted
      $("#fName").val("");
      $("#lName").val("");
      $("#registerEmail").val("");
      $("#registerPassword").val("");

      //! BIG CHANGE
      MODEL.changePage("home", initURLListener);
      toggleSignIn(signedIn);

      // getUser();
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
    signedIn = true;

    // changeButton();

    $.each(allUsers, function (idx, user) {
      // console.log(user.firstName + " " + user.lastName);
      // $("#app").append(`<p>${user.firstName} ${user.lastName}</p>`);
      $("#createRecipeGreet").html(
        `Hey ${user.firstName}, create your recipe!`
      );
    });
    //TODO questionable
    $("#loginBtn").on("click", (e) => {
      MODEL.changePage("login", initURLListener);
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
      id: Date.now().toString(),
      img: "https://media.tenor.com/x8v1oNUOmg4AAAAd/rickroll-roll.gif",
      name: "",
      description: "",
      prepTime: "",
      servings: "",
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
    recipeObj.prepTime = recipeTotalTime;

    // get the recipe serving size
    var recipeServingSize = $(".generalDetails #recipeSS").val();
    console.log(recipeServingSize);
    recipeObj.servings = recipeServingSize;

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

    MODEL.changePage("home", initURLListener);
    Swal.fire("Nicely done!", "You created a new recipe!", "success");
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
                  <div class="recipe-title">
                    <a href="#viewRecipe/${idx}">${recipe.name}</a>
                  </div>
                    <p>${recipe.description}</p>
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

function loopUserRecipes() {
  let allRecipes = JSON.parse(localStorage.getItem("Recipe"));
  console.log("loopUserRecipes", allRecipes);

  $("#app .background .recipes").html(``);
  $("#app .background .recipe-title").append(
    `<h1>Hey, here are your recipes!</h1>`
  );
  $.each(allRecipes, (idx, recipe) => {
    console.log(recipe.prepTime);
    console.log(recipe.servings);
    $("#app .background .recipes").append(
      `<div class="recipe-box">
        <div class="recipe">
              <div class="recipe-img">
              <img src="../images/recipe-burger.jpg" alt="${recipe.name}">
              <div class="recipe-button">
                <a href="#viewUserRecipes/${idx}" class="button">View</a>
              </div>
              </div>
              <div class="recipe-textBox">
                  <div class="recipe-text">
                     <div class="recipe-title">
                    <a href="#viewRecipe/${idx}">${recipe.name}</a>
                  </div>
                      <p>${recipe.description}</p>
                      <div class="icon-text">
                          <div class="icon"><img src="../images/time.svg" alt="time"></div><p>${recipe.prepTime}</p>
                      </div>
                      <div class="icon-text">
                          <div class="icon"><img src="../images/servings.svg" alt="time"></div><p>${recipe.servings} servings</p>
                      </div>
                  </div>
              </div>
          </div>
          <div class="recipe-buttons">
              <a href="#editRecipe/${recipe.id}"  class="button"><div id="center-text">Edit Recipe</div></a>
              <button class="bigOlDelete">Delete</button>
          </div>
        </div>
      `
    );
    $(".bigOlDelete").on("click", (e) => {
      deleteRecipe(recipe.id, allRecipes);
    });
  });
}

// function test(recipes, recipeID) {
//   console.log("test", recipes, recipeID);
//   const idx = recipes.findIndex((recipe) => {
//     return recipe.id === recipeID;
//   });
//   console.log("ID", idx);
// }

//!fix
function deleteRecipe(recipeID, allRecipes) {
  // let allRecipes = JSON.parse(localStorage.getItem("Recipe"));
  const idx = allRecipes.findIndex((recipe) => {
    return recipe.id === recipeID;
  });
  allRecipes.splice(idx, 1);
  localStorage.setItem("Recipe", JSON.stringify(allRecipes));
  console.log("Delete");
  MODEL.changePage("viewUserRecipes", initURLListener);
  Swal.fire("Recipe Deleted!", "success");
}

//display recipe details on viewRecipe page
function displayRecipe(subpageID) {
  //console.log(subpageID);
  $("#app").html(``);
  let currentRecipe = obj.Recipes[subpageID];
  //console.log(currentRecipe);
  $("#app").append(
    `<div class="view-desc">
        <div class="recipeName"><p>${currentRecipe.name.toLowerCase()}</p></p></div>
        <img src="${currentRecipe.img}" alt="${currentRecipe.name}">
        <div class="recipe-desc">
            <h2>Description:</h2>
            <p>${currentRecipe.description}</p>
            <h2>Total Time:</h2>
            <p>${currentRecipe.prepTime}</p>
            <h2>Servings:</h2>
            <p>${currentRecipe.servings} servings</p>
        </div>
    </div>

    <div class="ingred-and-instructions">
        <h2>Ingredients:</h2>
        <ul id="ul">
        </ul>
        <h2>Instructions:</h2>
        <ol>
        </ol>
    </div>
    `
  );
  $("#app .ingred-and-instructions ul").html(``);
  $.each(currentRecipe.ingredients, (idx, ingred) => {
    console.log(ingred);
    $("#app .ingred-and-instructions ul").append(`<li>${ingred}</li>`);
  });

  $("#app .ingred-and-instructions ol").html(``);
  $.each(currentRecipe.steps, (idx, step) => {
    $("#app .ingred-and-instructions ol").append(`<li>${step}</li>`);
  });
}

function viewUserRecipes(subpageID) {
  //console.log(subpageID);
  $("#app").html(``);
  let recipes = JSON.parse(localStorage.getItem("Recipe"));
  let currentRecipe = recipes[subpageID];
  //console.log(currentRecipe);
  $("#app").append(
    `<div class="view-desc">
        <div class="recipeName"><p>${currentRecipe.name.toLowerCase()}</p></p></div>
        <img src="${currentRecipe.img}" alt="${currentRecipe.name}">
        <div class="recipe-desc">
            <h2>Description:</h2>
            <p>${currentRecipe.description}</p>
            <h2>Total Time:</h2>
            <p>${currentRecipe.prepTime}</p>
            <h2>Servings:</h2>
            <p>${currentRecipe.servings} servings</p>
        </div>
    </div>

    <div class="ingred-and-instructions">
        <h2>Ingredients:</h2>
        <ul id="ul">
        </ul>
        <h2>Instructions:</h2>
        <ol>
        </ol>
    </div>

    <div class="edit-button">
        <a href="#editRecipe/${currentRecipe.id}" class="button">Edit Recipe</a>
    </div>
    `
  );
  $("#app .ingred-and-instructions ul").html(``);
  $.each(currentRecipe.ingredients, (idx, ingred) => {
    console.log(ingred);
    $("#app .ingred-and-instructions ul").append(`<li>${ingred.ingred}</li>`);
  });

  $("#app .ingred-and-instructions ol").html(``);
  $.each(currentRecipe.steps, (idx, step) => {
    $("#app .ingred-and-instructions ol").append(`<li>${step.step}</li>`);
  });
}

function editRecipe(subpageID) {
  let recipes = JSON.parse(localStorage.getItem("Recipe"));
  console.log(recipes);
  let currentRecipe = {};
  // let currentRecipe = recipes[subpageID];

  recipes.forEach((recipe) => {
    console.log("SPID", subpageID);
    const index = recipes.indexOf(recipe);
    // console.log(index);
    currentRecipe = recipes[index];
    // console.log(currentRecipe);
    // curRecipe = currentRecipe;
  });

  // var currentRecipe = {};

  // console.log(currentRecipe);
  $("#app .createRecipeContent").append(`
  <div class="generalDetails">
        <a id="addImgButton" href="#createRecipe">Attach File</a>
        <input type="" id="recipeImage" placeholder="Add Recipe Image" />
        <input type="text" id="recipeName" placeholder="Recipe Name" value="${currentRecipe.name}"/>
        <input type="text" id="recipeDescription" placeholder="Recipe Description" value="${currentRecipe.description}" />
        <input type="text" id="recipeTT" placeholder="Recipe Total Time" value="${currentRecipe.prepTime}"/>
        <input type="text" id="recipeSS" placeholder="Recipe Serving Size" value="${currentRecipe.servings}"/>
    </div>

    <div id="recipeHeader">Enter Ingredients:</div>
    <div class="formHolder">
        <div class="ingred">
            <div class="addBtn">
                <p>+</p>
            </div>
        </div>

        <div id="recipeInstructionsHeader">Enter Instructions:</div>
        <div class="instructions">
            <div class="addSBtn">
                <p>+</p>
            </div>
        </div>
    </div>
    <input id="submitRecipe" type="submit" value="Update Recipe" />`);

  $.each(currentRecipe.ingredients, (idx, ingred) => {
    $("#app .createRecipeContent .formHolder .ingred").append(
      `<input type="text" id="ingred0" placeholder="Ingredient #1" value="${ingred.ingred}"/>`
    );
  });

  $.each(currentRecipe.steps, (idx, step) => {
    $("#app .createRecipeContent .formHolder .instructions").append(
      `<input type="text" id="recipeName" placeholder="Instruction #1" value="${step.step}"/>`
    );
  });

  saveRecipe(currentRecipe);
}

//! change routes
function changeRoute() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");
  let pageIDArray = pageID.split("/");
  pageID = pageIDArray[0];
  let subpageID = pageIDArray[1];
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
  } else if (pageID == "createRecipe" && signedIn == true) {
    MODEL.changePage(pageID, getUser);
  } else if (pageID == "login") {
    MODEL.changePage(pageID, getUser);
  } else if (pageID == "viewRecipe") {
    MODEL.changePage(pageID, displayRecipe, subpageID);
  } else if (pageID == "userRecipes") {
    MODEL.changePage(pageID, loopUserRecipes);
  } else if (pageID == "editRecipe") {
    MODEL.changePage(pageID, editRecipe, subpageID);
  } else if (pageID == "viewUserRecipes") {
    MODEL.changePage(pageID, viewUserRecipes, subpageID);
  }
}

//TODO could use addInput with modification
function saveRecipe(recipe) {
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
    let recipeObj = {
      id: Date.now().toString(),
      img: "https://media.tenor.com/x8v1oNUOmg4AAAAd/rickroll-roll.gif",
      name: "",
      description: "",
      prepTime: "",
      servings: "",
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
    recipeObj.prepTime = recipeTotalTime;

    // get the recipe serving size
    var recipeServingSize = $(".generalDetails #recipeSS").val();
    console.log(recipeServingSize);
    recipeObj.servings = recipeServingSize;

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

    console.log(recipe);
    console.log(recipeObj);
    allRecipes.push(recipeObj);
    console.log(allRecipes);
    allRecipes.splice(0, 1);
    localStorage.setItem("Recipe", JSON.stringify(allRecipes));

    MODEL.changePage("home", initURLListener);
    Swal.fire("Good job!", "You updated recipe!", "success");
  });
  // allRecipes.push(recipe);
  // localStorage.setItem("Recipe", JSON.stringify(allRecipes));
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
