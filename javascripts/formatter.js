"use strict";
let $ = require("jquery");
let controller = require("./controller");
let apiKey = require("./apiKey");

// format movie data
module.exports.formatMovies = (data, limit) => {

    let formattedMovies = [];

    let movies = data.slice(0, limit);

    movies.forEach((movie, index) => {
        let movieObj =
            {
                id: movie.id,
                title: movie.title,
                poster: movie.poster_path,
                date: movie.release_date.substring(0, 4),
                castList: "",
            };
            
            if (typeof movie.rating !== "undefined") {
                if (movie.rating >= 8) {
                    movieObj.class = "favorite";
                } else if (movie.rating === 0) {
                    movieObj.class = "wishlist";
                } else {
                    movieObj.class = "watched";
                }            
                let movieStars = [];
                for (let i = 0; i < 10; i++) {
                    if (i < movie.rating) {
                        movieStars.push({ star: true, number: i});
                    } else {
                        movieStars.push({ star: false, number: i });
                    }
                }
                movieStars.splice(5, 0, {blank: true});
                movieObj.rating = movieStars;
    
            } else {
                movie.class = "tmdb";
            }
            console.log('movie', movieObj);
        formattedMovies.push(movieObj);
    });
    return formattedMovies;
};
