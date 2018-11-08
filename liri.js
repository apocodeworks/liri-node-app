require("dotenv").config();

var Spotify = require('node-spotify-api');

let request = require("request");

let keys = require("./keys.js");

var moment = require('moment');

let fs = require("fs");

let song = process.argv[3];


function spotifySearch() {

    spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

        artist = data.tracks.items[0].artists[0].name;
        songName = data.tracks.items[0].name;
        album = data.tracks.items[0].album.name;
        preview = data.tracks.items[0].preview_url;
       
      console.log("\n ~~~~~~~~~~~~~~~~~~~~~~~ \nThe top result is: \n" + songName ); 
      console.log(artist);
      console.log(album);
      console.log(preview + "\n ~~~~~~~~~~~~~~~~~~~~~~~");
      });

}

let spotify = new Spotify(keys.spotify);

let command = process.argv[2];

// concert this
// "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"





if (command == "concert-this") {

    console.log("Concerting this")

let artist = process.argv[3];

let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

request(queryURL, function(error, response, body) {
  // console.log(response);
  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    let rawDate = JSON.parse(body)[0].datetime;

   let newDate = moment(rawDate).format( 'MM DD YYYY')
    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("\n~~~~~~~~\nPerforming at: " +JSON.parse(body)[0].venue.name)
    console.log(JSON.parse(body)[0].venue.city + ", " + JSON.parse(body)[0].venue.country)
    console.log(newDate + "\n~~~~~~~~");
  }
});

}else if ( command == "spotify-this-song") {

spotifySearch();
    
}else if ( command == "movie-this") {

    let movieName = process.argv[3]

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {


            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("\n~~~~~~~~~~\nMovie Title: " + JSON.parse(body).Title);
            console.log(JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating)
            console.log("RT Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Actors);
            console.log(JSON.parse(body).Plot);
            console.log("~~~~~~~~~~");

          }
      });
}else if ( command == "do-what-it-says" ) {


        fs.readFile("random.txt", "utf8", function(error, data) {
    
            // If the code experiences any errors it will log the error to the console.
            if (error) {
              return console.log(error);
            }
          
            // Then split it by commas (to make it more readable)
            var dataArr = data.split(",");
          
            // We will then re-display the content as an array for later use.
            console.log(dataArr);
    
            console.log(dataArr[0], dataArr[1]);

            if (dataArr[0] == "spotify-this-song") {

                song = dataArr[1];

                spotifySearch();
            }

          
          });
          
}