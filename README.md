# LIRI Node Application

LIRI is a node application that allows users to search for movie and song information, as well as retrieve their latest tweets. 

## Getting Started

These instructions will help you get this app running on your machine. Follow the install instructions for more details. 

### Prerequisites

This installation guide assumes a basic knowledge of Node.js and API usage in JavaScript. Additionally, it assumes that [Node.js](https://nodejs.org/en/) is installed on your machine. 

### Installing

To get this project to work, clone the repository. Then, install the Spotify Node API and the Twitter API.

#### Node Spotify API

Sign-up for a Spotify account. Then, sign-up as a [developer](https://developer.spotify.com/my-applications/#!/). Once logged in, head to the [create application](https://developer.spotify.com/my-applications/#!/applications/create) page to register a new Spotify application. Once completed, you will see the 'client id' and 'client secret' that will be needed for Spotify API. 

Install the [Node package for Spotify](https://www.npmjs.com/package/node-spotify-api) via the following command:

```
npm install node-spotify-api

```

Follow the instructions from the npm page to get the API working. 

#### Twitter API

Sign-up for a Twitter account. Then, sign-up to create a new [Twitter APP](https://apps.twitter.com/app/new). Once the form is submitted, click on the 'Keys and Access Tokens' tab to get the 'consumer key' and 'consumer secret'.

Install the [Twitter package](https://www.npmjs.com/package/twitter) via the following command:

```
npm install twitter

```

Follow the instructions from the npm page to get the API working. 

#### OMDB API

No special installation is required for this API, as it works via the usual JavaScript method for sending API requests. An OMDB API key is included in the installation. 

## Usage and Examples

The application has 4 basic commands:

1. spotify-this-song: takes a song name as a query to the Spotify API. If no song is given, the default song is 'The Sign' by Ace of Base.
2. my-tweets: retrieves the last tweets from the user. The max number of tweets returned is 20, but the user can specify any number less than 20 to return. If the user does not provide a number, then the default is 20.
3. movie-this: takes a movie name as a query to the OMDB API. If no movie is given, the default movie is 'Mr. Nobody'. 
4. do-what-it-says: reads a random.txt file that has a specified command and query term. This is then fed back into the main liri.js application to determine which of the other 3 commands to run (Spotify, Twitter, or OMDB). 

The user must enter the commands as above (no quotations around the command). Additionally, the query term entered after the command must be surrounded by quotations. 

Once the API keys have been properly inserted into the code (and for Twitter, the linked username is entered), run the app via command line by navigating to the containing directory. 

### Spotify

To run the Spotify search, input the following into command line:

```
node liri.js spotify-this-song 'Forgot About Dre'

```

This returns relevant information about the song 'Forgot About Dre'.

### Twitter

The Twitter command can be run as below:

```
node liri.js my-tweets

```

This returns the latest 20 tweets from the user, or if the user has less than 20 tweets, all of the tweets.

Additionally, the user can specify how many tweets to return by the following:

```
node liri.js my-tweets 10

```

This returns the latest 10 tweets from the user, or if the user has less than 10 tweets, all of the user's tweets. 

### OMDB

The OMDB command can be run as below:

```
node liri.js movie-this 'Pulp Fiction'

```

This returns relevant information for the film 'Pulp Fiction'. 

### Do What it Says

The Do What it Says command can be run as below:

```
node liri.js do-what-it-says

```

This will read the random.txt file and search for a command and query in that file.

#### random.txt

In this file, you can input a search command for Spotify, Twitter, or OMDB, and then a query term surrounded by quotations. The command and query term must be separated by a comma (','). 