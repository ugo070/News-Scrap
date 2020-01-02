$(document).ready(function() {
  //document.addEventListener("DOMContentLoaded", function(event) {
  const cardText = $(".card-text");
  //document.getElementsByClassName("card-text");
  console.log(cardText);
  for (i = 0; i < cardText.length; i = i + 1) {
    if (!cardText[i].innerHTML) {
      cardText[i].parentNode.remove();
    }
  }
  $(document).on("click", "button", function(event) {
    event.preventDefault();
    const name = $(this)
      .prev()
      .children()
      .children(".name")
      .val();
    const body = $(this)
      .prev()
      .children()
      .children(".body")
      .val();
    const article = $(this)
      .parent()
      .parent()
      .parent()
      .children(".card-header")
      .children(".card-title")
      .text();
    $.ajax({
      url: "/comment",
      method: "POST",
      data: { name: name, body: body, article: article }
    }).then(function(response) {
      console.log($(`.card-title[text=${article}]`));
      $(`.card-title[text=${article}]`)
        .parent()
        .parent()
        .parent()
        .children(".comments").append(`
            <div class="row">
              <div class="col">
                  <h6>${response.name}</h6>
              </div>
              <div class="col">
                  <p>${response.body}</p>
              </div>
            </div>`);
    });
  });
  //});
});
