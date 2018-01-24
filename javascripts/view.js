"use strict";
let $ = require("jquery");
let controller = require("./controller");
let movieCard = require("../templates/movieCard.hbs");

module.exports.outputMovies = (mdbMovies) =>{
    mdbMovies.map(movie => {
        if(typeof movie.rating != 'undefined'){
            movie.deleteBtn = true;
        }else{
            movie.deleteBtn = false;
        }
        return movie;
    });
    let moviesObj = {mdbMovies};
    $('.movieContainer').empty();
    $('.movieContainer').append(movieCard({mdbMovies}));
    console.log(mdbMovies);
};      

module.exports.toggleBtns = function(btn1,btn2){
    btn1.siblings(btn2).removeClass('d-none');
    btn1.addClass('d-none');
};
