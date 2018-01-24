"use strict";
let $ = require("jquery");
let controller = require("./controller");
let apiKey = require("./apiKey");

// format movie data
module.exports.formatMovies = (data, limit) => {

    let formattedMovies = [];

    let movies = data.slice(0, limit);

    movies.forEach((movie, index) => {
        let movieObj =
            {
                id: movie.id,
                title: movie.title,
                poster: movie.poster_path,
                date: movie.release_date,
                castList: ""
            }
        if (typeof movie.rating !== "undefined") {
            movieObj.rating = movie.rating;  
        }
        formattedMovies.push(movieObj);
    });
    return formattedMovies;
};
