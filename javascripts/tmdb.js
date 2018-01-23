"use strict";
let $ = require("jquery");
let apiKey = require("./apiKey");
const _ = require("lodash");

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

const getCast = movieId => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
        })
            .done(response => resolve(response.cast))
            .fail(error => reject(error));
    });
};

module.exports.getCastList = movieId => {
    return new Promise((resolve, reject) => {
        getCast(movieId).then(cast => {
            let names = cast.map(castMember => castMember.name);
            resolve(names.slice(0,3).join(", "));
        });
    });
};