"use strict";
let $ = require("jquery");
let controller = require("./controller");

// format movie data
module.exports.formatMovie = (data) => {
   
    data.results.forEach(element => {
      let title =  element.title;
      console.log('title',title );
      let posterPath = element.poster_path;
      console.log('poster path',posterPath );
      let movieId = element.id;
      console.log('id',movieId );
     
       
    }); 
        
};
