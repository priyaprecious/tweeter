/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

    const tweetsUrl = "http://localhost:8080/tweets";

    const escape = function(str) {
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    };

    const renderTweets = function(userData) {
        for (let tweet of userData) { // loops through tweets
            const $newTweet = createTweetElement(tweet) // calls createTweetElement for each tweet
            $("#tweet-container").prepend($newTweet) // takes return value and appends it to the tweets container
        }
    }

    const createTweetElement = function(tweet) {
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
        <p class="tweet-content">${escape(tweet.content.text)}</p>
    
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

    const loadTweets = function(url) {
        $.get(url, { dataType: "json" }).then(renderTweets);
        document.querySelector("#tweet-text").value = '';
        document.querySelector(".counter").innerHTML = 140;
    };





    $("#submit-tweet").submit(function(event) {
        event.preventDefault();
        const tweet = $('#tweet-text').val().length;
        if (tweet === 0) {
            window.alert("please enter a valid url");
        } else if (tweet > 140) {
            window.alert("tweet is greater than 140 characters");
        } else {
            $.ajax({
                type: "POST",
                url: `/tweets`,
                data: $('form').serialize()
            }).then(function() {
                loadTweets(tweetsUrl);
            });
        }
    });
    loadTweets(tweetsUrl);
});