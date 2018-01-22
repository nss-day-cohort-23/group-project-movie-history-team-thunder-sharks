"use strict";
let $ = require("jquery");
let apiKey = require("./apiKey");
let controller = require("./controller");

// Get Movie Name
module.exports.getMovieName = (input) =>{
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

// Get Movie Poster
module.exports.getMoviePoster = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://api.themoviedb.org/3/movie/772?api_key=${apiKey}`
        }).done((data) => {
            resolve(data);
            console.log('movie image', data);


        }).fail((error) => {
            reject(error);

        });
    });
};
