var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var client = new Twitter(keys);
var spotify = new Spotify({
    id: '58224358bcd048ba837ac560dc9011d6',
    secret: '90bbdd846b7a471abc36a91945956e17'
});

var input = process.argv[2];

if (input === "my-tweets") {
    var params = {
        screen_name: 'damien0587',
        count: 20,
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text + "\nCreated at: " + tweets[i].created_at + "\n");
        }
        if (error) {
            console.log(error);
        }
    });
} else if (input === "spotify-this-song") {
    var title = "The Sign Ace of Base";
    var tmp = "";
    if (process.argv[3]) {
        for (var i = 3; i < process.argv.length; i++) {
            tmp += process.argv[i] + " ";
        }

        title = tmp;
    }
    spotify.search({
        type: 'track',
        query: title
    }, function(err, data) {
        console.log("\nArtist: " + data.tracks.items[0].artists[0].name + "\n");
        console.log("Title: " + data.tracks.items[0].name + "\n");
        console.log("Album: " + data.tracks.items[0].album.name + "\n");
        console.log("Preview: " + data.tracks.items[0].preview_url);
        if (err) {
            return console.log('Error occurred: ' + err);
        }
    });
} else if (input === "movie-this") {

} else if (input === "do-what-it-says") {

} else console.log("Please enter a valid command.");