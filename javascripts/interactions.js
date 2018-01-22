"use strict";
let $ = require("jquery");
let controller = require("./controller");


// get value from users search 
$('.search').on('keypress', function(){
    if (event.keyCode === 13) {
        let input = $('.search').val();
        controller.MovieData(input);
    }
});


