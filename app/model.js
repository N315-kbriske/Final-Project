export function changePage(pageID, callback, subpageID) {
  console.log(pageID);
  if (pageID == "" || pageID == "home") {
    $.get(`pages/home.html`, function (data) {
      // inject the data
      $("#app").html(data);
    });
  } else if (pageID == "browse") {
    $.get(`pages/browse.html`, function (data) {
      // inject the data
      $("#app").html(data);
      callback();
    });
  } else if (pageID == "createRecipe") {
    $.get(`pages/createRecipe.html`, function (data) {
      // inject the data
      $("#app").html(data);
      callback();
    });
  } else if (pageID == "login") {
    $.get(`pages/login.html`, function (data) {
      // inject the data
      $("#app").html(data);
      callback();
    });
  } else if (pageID == "viewRecipe") {
    $.get(`pages/viewRecipe.html`, function (data) {
      // inject the data
      $("#app").html(data);
      callback(subpageID);
    });
  } else if (pageID == "userRecipes"){
    $.get(`pages/userRecipes.html`, function(data){
      $("#app").html(data);
      callback();
    });
  } else if (pageID == "editRecipe") {
    $.get(`pages/editRecipe.html`, function (data) {
      // inject the data
      $("#app").html(data);
      callback(subpageID);
    })
  } else if (pageID == "viewUserRecipes") {
    $.get(`pages/viewRecipe.html`, function (data) {
      // inject the data
      $("#app").html(data);
      callback(subpageID);
    });
  }
}
