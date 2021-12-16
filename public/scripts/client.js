/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
    // $("#submit-tweet").on("submit",onSubmit);

    const data = [
        {
            "user": {
                "name": "Newton",
                "avatars": "https://i.imgur.com/73hZDYK.png"
                ,
                "handle": "@SirIsaac"
            },
            "content": {
                "text": "If I have seen further it is by standing on the shoulders of giants"
            },
            "created_at": 1461116232227
        },
        {
            "user": {
                "name": "Descartes",
                "avatars": "https://i.imgur.com/nlhLi3I.png",
                "handle": "@rd"
            },
            "content": {
                "text": "Je pense , donc je suis"
            },
            "created_at": 1461113959088
        }
    ]
    const renderTweets = function (userData) {
        for (let tweet of userData) {
            //console.log(userData)
            const $newTweet = createTweetElement(tweet)
            // renderTweets(data);
            $("#tweet-container").prepend($newTweet)
        }
        // loops through tweets
        // calls createTweetElement for each tweet
        // takes return value and appends it to the tweets container
    }

    const createTweetElement = function (tweet) {
        console.log(tweet)
        let $tweethtml = `<article class="tweet-article">
      <header class="tweet-header">
    
        <div class="profile">
          <img src="${tweet.user.avatars}" />
          ${tweet.user.name}
        </div>
        <div class="watermark">
        ${tweet.user.handle}
        </div>
    
      </header>
      <div class="tweet-body">
        <p class="tweet-content">${tweet.content.text}</p>
    
      </div>
      <div class="divider">
    
      </div>
      <footer class="tweet-footer">
        <div class="timestamp">
        ${jQuery.timeago(tweet.created_at)}
        </div>
        <div>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
    
      </footer>
    </article>`

        return $tweethtml;
    }

    renderTweets(data);

    // const onSubmit = function(event) {
    $("#submit-tweet").on("submit", function (event) {
        event.preventDefault();
        console.log("typing");
        $.ajax("/tweets", { method: "POST", data: $("#submit-tweet").serialize() })
            .then((data) => {
                console.log("data", data);
            }).catch(err =>
                console.log("ERORR: ", err))


    });
});

    //  ${jQuery.timeago(Date.now())}