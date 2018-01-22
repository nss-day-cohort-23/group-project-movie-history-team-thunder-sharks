"use strict";
let $ = require("jquery");
let controller = require("./controller");

// format movie data
module.exports.formatMovies = (data) => {
    let mdbMovies = [];
    let mbd = data.results;

    mbd.forEach(movie =>{
        mdbMovies.push(
            {
                id: movie.id,
                title: movie.title,
                poster:movie.poster_path,
                date: movie.release_date
            }
        
        );
    });
    return mdbMovies;
    
};
