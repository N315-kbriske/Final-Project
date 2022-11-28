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
  }
}
