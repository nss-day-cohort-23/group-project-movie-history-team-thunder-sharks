"use strict";
let $ = require("jquery");
let controller = require("./controller");
let movieCard = require("../templates/movieCard.hbs");

module.exports.outputMovies = (mdbMovies) =>{
    let moviesObj = {mdbMovies};
    $('.movieContainer').empty();
    $('.movieContainer').append(movieCard(moviesObj));
};      

// module.exports.showBtn = ()

