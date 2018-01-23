"use strict";
let $ = require("jquery");
let apiKey = require("./apiKey");


// Get Movie Name
module.exports.getMovies = (input) =>{
    return new Promise((resolve,reject) =>{
    $.ajax({
        url:`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${input}`
    }).done((data) =>{
        resolve(data);
        console.log('user search',data );
    }).fail((error) =>{
        reject(error); 
        });
    });
};






