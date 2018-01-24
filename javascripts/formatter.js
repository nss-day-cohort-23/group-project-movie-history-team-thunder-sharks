"use strict";
let $ = require("jquery");
let controller = require("./controller");
let apiKey = require("./apiKey");

// format movie data
module.exports.formatMovies = (data, limit) => {

    let formattedMovies = [];

    let movies = data.slice(0, limit);

    movies.forEach((movie, index) => {
        formattedMovies.push(
            {
                id: movie.id,
                title: movie.title,
                poster: movie.poster_path,
                date: movie.release_date.slice(0,4),
                castList: "",
                rating: movie.rating
            }
        );
    });
    return formattedMovies;
};
