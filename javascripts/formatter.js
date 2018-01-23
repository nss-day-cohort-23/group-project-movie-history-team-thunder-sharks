"use strict";
let $ = require("jquery");
let controller = require("./controller");
let apiKey = require("./apiKey");

// format movie data
module.exports.formatMovies = (data) => {
    return new Promise((resolve, reject) => {

        let mdbMovies = [];
        let mbd = data.results;
        let promArr =[];
        
        mbd.forEach((movie, index) =>{
            mdbMovies.push(
                {
                    id: movie.id,
                    title: movie.title,
                    poster: movie.poster_path,
                    date: movie.release_date,
                    castList: []
                }
            );
            let p = new Promise((resolve, reject) => {
                $.ajax({
                    url: `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`
                })
                .done(data => {
                    data.cast.slice(0,3).forEach(castMember => {
                        mdbMovies[index].castList.push(castMember.name);
                    });
                    resolve();
                })
                .fail(error => {
                    reject(error);
                });
            });
            promArr.push(p);
        });
        Promise.all(promArr)
        .then( () => {
            resolve(mdbMovies);
        })
        .catch(error => {
            reject(error);
        });  
    });
};
    