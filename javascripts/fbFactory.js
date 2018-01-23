"use strict";

const $ = require("jquery");
const _ = require("lodash");
const controller = require("./controller");
const fbUser = require('./apiKey');
const fbConfig = require("./config/fb-config");

const fbUrl = "https://thunder-sharks-movies.firebaseio.com";
let userId = "";

module.exports.listenToUserId = () => {
    fbConfig.auth().onAuthStateChanged(function (user) {
        if (user) {
            userId = user.uid;
        }
    });
};

// Adds movie to firebase
module.exports.addMovie = (movie) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${fbUrl}/movies.json`,
            method: "POST",
            data: JSON.stringify(movie)
        }).done(() => {
            resolve();
        });
    });
};


// promises a list of all movies with a matching uid
const getMovies = uid => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${fbUrl}/movies.json?orderBy="uid"&equalTo="${uid}"`,
        }).done(movies => {
            resolve(movies);
        });
    });
};

// searches movies in firebase by title
module.exports.searchMovies = term => {
    return new Promise((resolve, reject) => {
        getMovies(userId).then(movies => {
            // Make object of objects an array
            movies = _.values(movies);

            // Filter objects on search term
            let filteredMovies = movies.filter(movie => {
                return movie.title.toLowerCase().indexOf(term.toLowerCase()) !== -1 && movie.uid === userId;
            });

            resolve(filteredMovies);
        });
    });
};

