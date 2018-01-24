"use strict";
let $ = require("jquery");
let controller = require("./controller");
let movieCard = require("../templates/movieCard.hbs");

module.exports.outputMovies = (mdbMovies) =>{
    let moviesObj = {mdbMovies};
    $('.movieContainer').empty();
    $('.movieContainer').append(movieCard(moviesObj));
};      

module.exports.toggleBtns = function(btn1,btn2){
    btn1.siblings(btn2).removeAttr('hidden');
    btn1.attr("hidden", "true");
};

module.exports.toggleLogBtns = function(btn1,btn2){
    btn1.siblings(btn2).removeClass('d-none');
    btn1.addClass('d-none');
};
