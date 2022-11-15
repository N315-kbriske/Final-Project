import * as MODEL from "./model.js";

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
  loopData();
});

let obj = {
  "Recipes":
  {
    image: "images/recipe-pizza.jpg",
    recipeTitle: "Supreme Pizza",
    desc: "Make pizza night super duper out of this world with homemade pizza. This recipe is supreme with vegetables and two types of meat. Yum!"
  }
};

//will output test when #browse is loaded, wont inject into div
function loopData(){
  $("#recipes").html(``);
  $.each(obj.Recipes, (idx, recipe) => {
        $("#recipes").append(
            ` <div class="recipe">
            <div class="recipe-img"><img src="${recipe.image}" alt="${recipe.recipeTitle}"></div>
            <div class="recipe-text">
                <h1>${recipe.recipeTitle}</h1>
                <p>${recipe.desc}</p>
            </div>
        </div>`
        );
    });
    console.log("test");
}