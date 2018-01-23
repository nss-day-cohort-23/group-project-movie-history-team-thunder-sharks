"use strict";
let $ = require("jquery");
let controller = require("./controller");
let fbUser = require('./apiKey');
let fbUrl = "https://thunder-sharks-movies.firebaseio.com/";

module.exports.addMovie = (movie) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${fbUrl}/movies.json`,
            method: "POST",
            data: JSON.stringify(movie)
        }).done( () => {
            resolve();
        });
    });
};

