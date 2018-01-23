"use strict";
let $ = require("jquery");
let controller = require("./controller");
let movieCard = require("../templates/movieCard.hbs");

module.exports.outputMovies = (formattedMovies) =>{
    console.log('mbdMovies', formattedMovies);
    for (let i = 0; i < formattedMovies.length; i++) {        
        $('.movieContainer').append(
        movieCard(formattedMovies[i]));
        
       
    }
};