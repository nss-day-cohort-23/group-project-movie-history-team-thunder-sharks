"use strict";
let $ = require("jquery");
let apiKey = require("./apiKey");

// promises TMDb search results for ${input}
module.exports.getMovies = (input) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${input}`
        }).done((data) => {
            resolve(data);
        }).fail((error) => {
            reject(error);
        });
    });
};




