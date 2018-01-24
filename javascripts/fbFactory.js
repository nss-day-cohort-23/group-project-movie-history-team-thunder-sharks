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

// promises to add movie to firebase
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

// promises to delete movie with given key
module.exports.deleteMovie = (key)=>{
    return new Promise((resolve, reject)=>{
        $.ajax({
            url: `${fbUrl}/movies/${key}.json`,
            method: 'DELETE'
        })
        .done(data=>{
            resolve(data);
        })
        .catch(error => reject(error));
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

// promises key of firebase movie with given uid and movieId
module.exports.getKeyByUidAndId = (uid,movieId) =>{
    return new Promise((resolve, reject)=>{
        getMovies(uid)
        .then((list)=>{
            resolve(_.findKey(list,['id',movieId]));
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

// changes the rating of the movie with the given uid and id
    // assumption: number is an int between 1 and 10
module.exports.rateMovie = (uid, id, number) => {
    return new Promise((resolve, reject) => {
        module.exports.getKeyByUidAndId(userId, id).then(key => {
            $.ajax({
                type: "PATCH",
                url: `${fbUrl}/movies/${key}.json`,
                data: JSON.stringify({"rating": number})
            })
                .done(results => resolve(results))
                .fail(error => reject(error));
        });
    });
};