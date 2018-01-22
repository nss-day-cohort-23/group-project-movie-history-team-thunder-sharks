"use strict";
let $ = require("jquery");
let controller = require("./controller");
let movieCard = require("../templates/movieCard.hbs");

module.exports.outputMovies = (formattedMovies) =>{
    console.log('mbdMovies', formattedMovies);
    for (let i = 0; i < formattedMovies.length; i++) {
        
        $('.movieContainer').append(
        movieCard(formattedMovies[i]));
        
        // `<div class="movieCard"> 
        // <h2>${formattedMovies[i].title}</h2>
        // <h7></h7>
        // <br> 
        // <img src="https://image.tmdb.org/t/p/w500${formattedMovies[i].poster}" class="moviePoster" alt="No Movie Poster Available" width='260px' height='370px'>
        // <br>
        // <h2>${formattedMovies[i].title}</h2>
        // </div>`
    }
};