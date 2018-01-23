"use strict";

let $ = require("jquery");
let formatter = require("./formatter");
let fbFactory = require("./fbFactory");
let tmdb = require("./tmdb");
let output = require("./view");
let interactions = require("./interactions");

// get value from users search and pass to ajax call
module.exports.getMovieData = (input) =>{
    tmdb.getMovies(input)
    .then((data) =>{
        return formatter.formatMovies(data);
    })
    .then(mdbMovies => {
        output.outputMovies(mdbMovies); 
    });  
 };


