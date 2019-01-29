require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
switch (action) {
    case "concert-this":
        var artistOrBand = "";
        if (process.argv.length > 3) {
            for (var i = 3; i < process.argv.length; i++) {
                artistOrBand = artistOrBand + " " + process.argv[i];
            }
        }
        artistOrBand = artistOrBand.trim();
        concertThis(artistOrBand);
        break;

    case "spotify-this-song":
        var songTitle = "";
        if (process.argv.length > 3) {
            for (var i = 3; i < process.argv.length; i++) {
                songTitle = songTitle + " " + process.argv[i];
            }
            songTitle = songTitle.trim();
        }

        else
            songTitle = "The Sign";
        spotifySong(songTitle);
        break;

    case "movie-this":
        var movieTitle = "";
        if (process.argv.length > 3) {
            for (var i = 3; i < process.argv.length; i++) {
                movieTitle = movieTitle + " " + process.argv[i];
            }
            movieTitle = movieTitle.trim();
        }

        else
            movieTitle = "Mr. Nobody";

        movieThis(movieTitle);
        break;

    case "do-what-it-says":
        doIt();
        break;

    default:
        myLogger("Incorrect command. Choices are concert-this, spotify-this-song, movie-this or do-what-it-says");
        break;
}

function concertThis(artist) {

    if (artist === "")
        myLogger("Need to input an artist");
    else {
        
        axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
            .then(function (response) {

                var numEvents = response.data.length;
                if (numEvents === 0)
                    myLogger("No events found for " + artist);
                else {


                    for (var i = 0; i < numEvents; i++) {
                        myLogger("* Name of the venue: " + response.data[i].venue.name);
                        if (response.data[i].venue.region === "")
                            myLogger("* Venue location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                        else
                            myLogger("* Venue location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
                        var formattedDate = moment(response.data[i].datetime).format("MM/DD/YYYY");
                        myLogger("* Date of the Event: " + formattedDate);
                        myLogger("\t\n")
                    }
                }
            })
            .catch(function (error) {
                myLogger(error);
            });

    }

}

function spotifySong(song) {

    spotify.search({ type: 'track', query: song }, function (err, data) {

        if (err) {
            return myLogger('Error occurred: ' + err);
        }


        var numSongs = data.tracks.items.length;

        for (var i = 0; i < numSongs; i++) {
            var songReturned = data.tracks.items[i].name;
            // Eliminate songs returned that don't match the name
            if (songReturned.toLowerCase().indexOf(song.toLowerCase()) !== -1) {

                myLogger("* Artist(s): " + data.tracks.items[i].artists[0].name);

                myLogger("* Song name: " + data.tracks.items[i].name);

                myLogger("* Link: " + data.tracks.items[i].external_urls.spotify);

                myLogger("* Album: " + data.tracks.items[i].album.name);
                myLogger("\t\n")
            }

        }
    })

}

function movieThis(movieTitle) {

    axios.get("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            myLogger("* Title: " + response.data.Title);
            myLogger("* Year: " + response.data.Year);
            myLogger("* IMDB Rating: " + response.data.imdbRating);

            for (var i = 0; i < response.data.Ratings.length; i++) {
                if (response.data.Ratings[i].Source === "Rotten Tomatoes") {
                    myLogger("* Rotten Tomatoes Rating: " + response.data.Ratings[i].Value);
                    break;
                }
            }

            myLogger("* Country: " + response.data.Country);
            myLogger("* Language: " + response.data.Language);
            myLogger("* Plot: " + response.data.Plot);
            myLogger("* Actors: " + response.data.Actors)

        })

        .catch(function (error) {
            myLogger(error);
        });

}

function doIt() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return myLogger(error);
        }



        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        var command = dataArr[0];
        switch (command) {
            case "concert-this":
                concertThis(dataArr[1]);
                break;
            case "spotify-this-song":
                spotifySong(dataArr[1]);
                break;

            case "movie-this":

                movieThis(dataArr[1]);
                break;
            default:
                myLogger("Incorrect command. Choices are concert-this, spotify-this-song, movie-this or do-what-it-says");
                break;
        }


    });
}

function myLogger(stringToLog) {
    console.log(stringToLog);
    fs.appendFileSync("log.txt", stringToLog + "\n", function (err) {

        // If an error was experienced we will log it.
        if (err) {
            console.log(err);
        }


    });
}
