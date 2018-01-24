"use strict";

let $ = require("jquery");
let formatter = require("./formatter");
let fbFactory = require("./fbFactory");
let tmdb = require("./tmdb");
let output = require("./view");
let firebase = require('firebase');
let auth = require('./userFactory.js');
const _ = require('lodash');

fbFactory.listenToUserId();

// get value from users search and pass to ajax call

module.exports.getMovieData = (input) => {
    tmdb.getMovies(input)
    .then((tmdbMovies) => {
        fbFactory.searchMovies(input).then(fbMovies => {  
            // Get tmdb infomration on each movie from firebase
            let fbPromises = fbMovies.map(movie => {
                return tmdb.getMovie(movie);
            });
            Promise.all(fbPromises).then(fbMoviesWithPoster  => {

                // Format TMDB and Firebase movies as similar data
                fbMoviesWithPoster = formatter.formatMovies(fbMoviesWithPoster, 6);
                let formattedMovies = formatter.formatMovies(tmdbMovies.results, 6);

                // Combine TMDB movies and Firebase movies.
                formattedMovies = fbMoviesWithPoster.concat(formattedMovies);
                
                // Remove movie duplicate movies, favoring movies from Firebase
                formattedMovies = _.uniqBy(formattedMovies, 'id');
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
        });
    });
};

// event listeners

module.exports.activateListeners = () => {
    activateSearch();
    activateLoginButton();
    activateLogoutButton();
    addToWishlist();
    removeFromWishList();
    activateTab();

    $(".movieContainer").on("click", ".material-icons", function(){
        let stars = $(this).data("starid");
        let id = $(this).parent(".stars").data("movieid");

        let html = `<div class="stars" data-movieId="${id}">`;

        let blankStars = 10-stars;
        for(let i = 0; i < 10; i++){
            if(i < stars){
                html += `<i data-starId="${i+1}" class="material-icons">star</i>`;
            } else {
                html += `<i data-starId="${i+1}" class="material-icons">star_border</i>`;
            }
            if( i+1 === 5){
                html += `</br>`;
            }
        }
        html += `</div>`;

        $(this).parent(".stars").replaceWith(html);

        fbFactory.rateMovie(0, id, stars);
    });
};

// get value from users search 
const activateSearch = () => {
    $('#search').on('keypress', function (event) {
        if (event.keyCode === 13) {
            let input = $('#search').val();
            module.exports.getMovieData(input);
        }
    });
};

const activateLoginButton = () => {
    $('#btnLogin').click(function(){
        output.toggleBtns($(this),'#btnLogout');

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
                location.reload();
            });
    });
};

// Event Listner for user adding to watch list
const addToWishlist = () => {
    $(document).on("click", ".addWatchList", function () {
        //reveal delete, hide add
        output.toggleBtns($(this),'.deleteBtn');

        let movieId = $(this).parent().siblings("#movieID").text();
        let movieTitle = $(this).parent().siblings("h3").text();
        movieId = parseInt(movieId);
        let currentUser = firebase.auth().currentUser;
        let userMovie = {
            id: movieId,
            uid: currentUser.uid,
            rating: 0,
            title: movieTitle
        };
        fbFactory.addMovie(userMovie);
    });
};

//listener for removing from watchlist
const removeFromWishList = () => {
    $(document).on('click', '.deleteBtn', function(){
        output.toggleBtns($(this),'.addWatchList');

        let movieID = parseInt($(this).parent().siblings('#movieID').text());
        let uid = firebase.auth().currentUser.uid;
        fbFactory.getKeyByUidAndId(uid,movieID)
        .then(key=>{
            fbFactory.deleteMovie(key);
        });
    });
};

const activateTab = () => {
    $(".tabs").click(function(e) {
        $(".tabs").removeClass("active");
        $(e.currentTarget).addClass("active");
        let id = $(e.target).attr("id");
        if (id == "all") {
            $(".card.movie").show();
        } else {
            $(".card.movie").hide();
            if (id == "watched") {
                $(".card.movie.watched").show();
            } else if (id == "wishlist") {
                $(".card.movie.wishlist").show();
            } else if (id == "favorite") {
                $(".card.movie.favorite").show();
            }
        }
    });
};