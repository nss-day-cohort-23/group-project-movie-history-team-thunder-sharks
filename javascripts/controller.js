"use strict";

let $ = require("jquery");
let formatter = require("./formatter");
let fbFactory = require("./fbFactory");
let tmdb = require("./tmdb");
let output = require("./view");
let firebase = require('firebase');
let auth = require('./userFactory.js');

fbFactory.listenToUserId();

// get value from users search and pass to ajax call

module.exports.getMovieData = (input) => {
    fbFactory.searchMovies(input).then(movies => {
        console.log("searched", movies);
    });

    tmdb.getMovies(input)
        .then((data) => {
            let formattedMovies = formatter.formatMovies(data);
            let castPromises = formattedMovies.map(movie => {
                return tmdb.getCastList(movie.id);
            });
            Promise.all(castPromises).then(casts => {
                formattedMovies.map((movie, index) => {
                    movie.castList = casts[index];
                });
                output.outputMovies(formattedMovies);
            });
        });
};

// event listeners

module.exports.activateListeners = () => {
    activateSearch();
    activateLoginButton();
    activateLogoutButton();
    addToWishlist();
};

// get value from users search 
const activateSearch = () => {
    $('.search').on('keypress', function (event) {
        if (event.keyCode === 13) {
            let input = $('.search').val();
            module.exports.getMovieData(input);
        }
    });
};

const activateLoginButton = () => {
    $('#btnLogin').click(() => {
        auth
            .authUser()
            .then(function (result) {
                // The signed-in user info.
                let user = result.user;
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    });
};

const activateLogoutButton = () => {
    $("#btnLogout").click(() => {
        auth.logout()
            .then(() => {
                console.log('logged out!', firebase.auth().currentUser);

            });
    });
};

// Event Listner for user adding to watch list
const addToWishlist = () => {
    $(document).on("click", ".addWatchList", function () {
        let movieId = $(this).siblings().val('movieID'),
            movieTitle = $(this).siblings(".title").text();

        movieId = parseInt(movieId[1].innerText);
        let currentUser = firebase.auth().currentUser;
        let userMovie = {
            movieId: movieId,
            uid: currentUser.uid,
            rating: 0,
            title: movieTitle
        };
        console.log("added!", userMovie);
        fbFactory.addMovie(userMovie);
    });
};


