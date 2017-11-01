//Obtains the API keys for Twitter and Spotify from another file
var apiKeys = require("./keys.js");

/*Declaring all of the packages and APIs needed for this application: file writing, Twitter, Spotify, and omdb*/
var fs = require("fs");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var omdb = require('request');

/*Grabs the User entered arguments for which API to run and the query term, and stores them. Also initializes a requestData object that will store the API responses for appending into a log file*/
var processName = process.argv[2];
var query = process.argv[3];
var requestData = {};
requestData.process = processName;

/*Function doStuff takes in a process Name and a query term as its arguments. Based on the process Name that is input, the function will use the query term to call an API. The only API call that does not require a query term is Twitter. However, the user can input a number to limit the results. However, the max number of returnable results is 20.*/
function doStuff(processName, query){
	if(processName === 'spotify-this-song'){
		if(query === undefined){
			query = 'The Sign Ace';
		}
		var spotify = new Spotify({
			id: apiKeys.spotifyKeys.clientID,
			secret: apiKeys.spotifyKeys.clientSecret
		});
		spotify.search({type: 'track', query: query}, function(err, data){
			if(err){
				return console.log('Error ' + err);
			}
			requestData.artists = [];
			requestData.songName = data.tracks.items[0].name;
			requestData.url = data.tracks.items[0].external_urls.spotify;
			requestData.album = data.tracks.items[0].album.name;
			for (var i = 0; i < data.tracks.items[0].artists.length; i++){
				requestData.artists.push(data.tracks.items[0].artists[i].name);
				console.log("Artist: " + requestData.artists[i]);
			}
			console.log("Song: " + requestData.songName + "\nPreview Link: " + requestData.url + "\nAlbum: " + requestData.album);
			logData();
		})
	}
	else if(processName === 'my-tweets'){
		var userName = {screen_name: 'umerjrathore'};
		var twitter = new Twitter({
			consumer_key: apiKeys.twitterKeys.consumer_key,
			consumer_secret: apiKeys.twitterKeys.consumer_secret,
			access_token_key: apiKeys.twitterKeys.access_token_key,
			access_token_secret: apiKeys.twitterKeys.access_token_secret
		});
		twitter.get('statuses/user_timeline', userName, function(error, tweets, response){
			if(!error){
				var requestedTweets = parseInt(query);
				var numTweets = 0;
				/*The logic for the user defined number of Tweets checks if the user actually entered a query and, if they did, that it is actually a number. If the user did not enter a number, then the default return number of tweets is 20, unless the number of tweets in the returned request is less than 20, then the number of tweets to return is the length of the tweets array returned from the request. 

				If the user did input a number greater than 0, then it is checked against the length of the returned tweets array. If the tweets array's length is greater than the user requested number of tweets, then we know that we have enough tweets to show the user. Another additional check limits the total number of tweets shown to the user to be 20 or less. If the user inputs a number greater than the length of the tweets array, then, if the tweets array length is 20 or more, then the number of returned tweets is 20. If the tweets array length is less than 20, then the number of returned tweets is the length of the tweets array.*/
				if(query != undefined && requestedTweets != 'NaN' && requestedTweets > 0){
					if(tweets.length >= requestedTweets){
						if(requestedTweets < 20){
							numTweets = requestedTweets;
						}
						else{
							numTweets = 20;
						}
					}
					else if(tweets.length >= 20){
						numTweets = 20;
					}
					else{
						numTweets = tweets.length;
					}
				}
				else{
					if(tweets.length < 20){
						numTweets = tweets.length;
					}
					else{
						numTweets = 20;
					}
				}
				requestData.tweets = [];
				for (var i = 0; i < numTweets; i++){
					requestData.tweets.push(tweets[i].text)
					console.log("Tweet number " + (i+1) + ": " + requestData.tweets[i]);
				}
				logData();
			}
		})
	}
	else if(processName === 'movie-this'){
		if(query === undefined){
			query = "Mr. Nobody";
		}
		var movieName = query.split(" ").join("+");
		var omdbURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece"
		omdb(omdbURL, function(error, response, body){
			if (!error && response.statusCode === 200) {
				requestData.title = JSON.parse(body).Title;
				requestData.year = JSON.parse(body).Year;
				requestData.imdb = JSON.parse(body).Ratings[0].Value;
				requestData.rt = JSON.parse(body).Ratings[1].Value;
				requestData.country = JSON.parse(body).Country;
				requestData.language = JSON.parse(body).Language;
				requestData.plot = JSON.parse(body).Plot;
				requestData.actors = JSON.parse(body).Actors;
				console.log("Title: " + requestData.title + "\nRelease Year: " + requestData.year + "\nIMDB Rating: " + requestData.imdb + "\nRotten Tomato Score: " + requestData.rt + "\nProduction Country: " + requestData.country + "\nMovie Language: " + requestData.language + "\nActors: " + requestData.actors + "\nMovie Plot: " + requestData.plot);
				logData();
			}
		})
	}
	else{
		console.log("Please enter a valid command.");
	}
}

//Function that appends the requestData object to a log.txt file.
function logData(){
	fs.appendFile('log.txt', JSON.stringify(requestData), function(err){
		if(err){
			console.log(err);
		}
	})
}

/*This if statement checks if the user wants to read from the random.txt file. If so, that file will be read and it's contents will be passed into the doStuff function, which determines which API needs to be called based on the content of that file. If the user does not want to read from the random.txt file, then the doStuff function is run to determine which API to run based on the user input*/
if(processName === 'do-what-it-says'){
	fs.readFile('./random.txt', 'utf8', function(error, data){
		if(error){
			console.log(error);
		}
		/*random.txt must be written such that the process name and the query term are separated by a comma*/
		var randomArray = data.split(",");
		processName = randomArray[0];
		query = randomArray[1];
		doStuff(processName, query);
	})
}
else{
	doStuff(processName, query);
}