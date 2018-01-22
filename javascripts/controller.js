"use strict";
let $ = require("jquery");
let formatter = require("./formatter");
let fbFactory = require("./fbFactory");
let movieFactory = require("./movieFactory");
let output = require("./output");
let interactions = require("./interactions");

// get value from users search and pass to ajax call
module.exports.getMovieData = (input) =>{
    movieFactory.getMovieName(input)
    .then((data) =>{
        let formattedMovies = formatter.formatMovies(data);
        output.outputMovies(formattedMovies); 
    });
    
 };


