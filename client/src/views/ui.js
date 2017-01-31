var Films = require('../models/films');

var UI = function() {
  var films = new Films();
  // this.render(films);
  films.all(function(result) {
    this.render(result);
  }.bind(this));
}

UI.prototype = {
  createText: function(text, label) {
    var p = document.createElement('p');
    p.innerText = label + text;
    return p;
  },

  appendText: function(element, text, label) {
    var pTag = this.createText(text, label);
    element.appendChild(pTag);
  },

  createReview: function(li, review) {
    this.appendText(li, review.comment, 'Comment: ');
    this.appendText(li, review.rating, 'Rating: ');
    this.appendText(li, review.author, 'Author: ');
  },

    createForm: function(){
      var form = document.querySelector('form');

      var title = document.createElement('input');
          title.setAttribute("type", "text");
          title.setAttribute("placeholder", "Title:")

          var genre = document.createElement('input');
          genre.setAttribute("type", "text");
          genre.setAttribute("placeholder", "Genre:")

          var actors = document.createElement('input');
          actors.setAttribute("type", "text");
          actors.setAttribute("placeholder", "Actors:")

          var submit = document.createElement('input');
          submit.setAttribute("type", "submit");

      form.appendChild(title);
      form.appendChild(actors);
      form.appendChild(genre);
      form.appendChild(submit);

      form.onsubmit = function(event){
            // event.preventDefault();
            var data = {
              title: title.value,
              genre: genre.value,
              actors: actors.value
            }

            var jsonString = JSON.stringify(data);

            this.films.makePostRequest("/api/films", jsonString, function(){
              console.log(this.responseText);
            })
          }.bind(this);
        },

  render: function(films) {


    var container = document.getElementById('films');


    for (var film of films) {
      var li = document.createElement('li');
      this.appendText(li, film.title, 'Film: ');
      this.appendText(li, film.actors, 'Actors: ');
      this.appendText(li, film.genre, 'Genre: ');
      
      for (var review of film.reviews){
        this.createReview(li, review);
      }

      container.appendChild(li);
    }
    this.createForm();
  }
};

module.exports = UI;
