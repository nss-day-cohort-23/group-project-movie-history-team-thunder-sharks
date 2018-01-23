"use strict";
let $ = require("jquery");
let controller = require("./controller");
let movieCard = require("../templates/movieCard.hbs");

module.exports.outputMovies = (mdbMovies) =>{
    console.log('mbdMovies', mdbMovies);
    for (let i = 0; i < mdbMovies.length; i++) {        
        $('.movieContainer').append(
            movieCard(mdbMovies[i]));
        
    }
};
