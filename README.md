# liri-node-app

### Overview

LIRI is a Language Interpretation and Recognition Interface.
This command line application can be run under node.js and takes one of the commands shown below:
concert-this  
spotify-this-song 
movie-this 
do-what-it-says

If the command is not one of these, an error message is displayed to the user.

concert-this takes an artist or band and uses axios to retrieve information from  the bands in town artist events api. The data returned is a list of venues, including name of venue, location and date of the event.

spotify-this-song takes a song or defaults to "The Sign". Information returned includes artist, song name, link to song and album.

movie-this takes a movie or defaults to "Mr. Nobody". It uses axios to retrieve information from IMDB and returns title, year, IMDB rating, Rotten Tomatoes rating, country, language, plot and actors.

do-what-it-says uses the fs node package and executes the command found in the random.txt file.

All output is logged to the user's console as well as written to the log.txt file.


### Dependencies

package.json lists the dependencies that will need to be installed prior to executing liri. This includes axios, dotenv, moment and node-spotify-api. The fs node package is also required.


### Images

Screen shot image of concert-this can be found at assets/Images/concertThis.JPG

Screen shot image of spotify-this-song can be found at assets/Images/spotifyThisSong.JPG

Screen shot image of movie-this can be found at assets/Images/movieThis.JPG

Screen shot image of do-what-it-says can be found at assets/Images/dowhatitsays.JPG



