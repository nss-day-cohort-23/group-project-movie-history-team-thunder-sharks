"use strict";

let $ = require("jquery");
let formatter = require("./formatter");
let fbFactory = require("./fbFactory");
let tmdb = require("./tmdb");
let output = require("./view");
let interactions = require("./interactions");

fbFactory.listenToUserId();

// get value from users search and pass to ajax call
module.exports.getMovieData = (input) =>{
    fbFactory.getMovies(input).then(movies => {console.log("searched", movies);});

    tmdb.getMovies(input)
    .then((data) =>{
        return formatter.formatMovies(data);
    })
    .then(mdbMovies => {
        output.outputMovies(mdbMovies); 
    });  
 };


