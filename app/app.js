import * as MODEL from "./model.js";

var ingredCnt = 3;
var stepCnt = 3;

function initListener() {
  // step 1, add click listener to button
  $(".addSBtn").on("click", (e) => {
    // step 2, grab element and append new, MAKE SURE YOU CHANGE INGRED NUMBER AFTER APPEND
    $(".formHolder .steps").append(
      `<input type="text" id="ingred${stepCnt}" placeholder="Step #${
        stepCnt + 1
      }" />`
    );
    // step 3, add one to the count
    stepCnt++;
    console.log(stepCnt);
  });

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

  $("#submitBtn").on("click", (e) => {
    // create a new object
    let recipeObj = {
      description: "",
      steps: [],
      ingredients: [],
    };

    // always add preventDefault on submit buttons to keep it from moving pages
    e.preventDefault();
    $(".formHolder .steps input").each((idx, step) => {
      console.log(step.value);
      recipeObj.steps.push({ step: step.value });
    });
    $(".formHolder .ingred input").each((idx, ingred) => {
      console.log(ingred.value);
      recipeObj.ingredients.push({ ingred: ingred.value });
    });
    console.log(recipeObj);
  });
}

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
    MODEL.changePage(pageID);
  } else if (pageID == "login") {
    MODEL.changePage(pageID);
  }
}

function initURLListener() {
  $(window).on("hashchange", changeRoute);
  changeRoute();
}

$(document).ready(function () {
  initURLListener();
});
