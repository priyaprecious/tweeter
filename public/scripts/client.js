/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
    // URL to fetch tweets
    const tweetsUrl = "http://localhost:8080/tweets";

    // to prevent XSS attacks
    const escape = function(str) {
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    };

    // to render tweets
    const renderTweets = function(userData) {
        for (let tweet of userData) { // loops through tweets
            const $newTweet = createTweetElement(tweet); // calls createTweetElement for each tweet
            $("#tweet-container").prepend($newTweet); // takes return value and appends it to the tweets container
        }
    }

    // to create tweet element for each user input 
    // timeago library used to format date with "xxx" time ago
    const createTweetElement = function(tweet) {
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

    // to load the tweets by using the url provide at the top
    const loadTweets = function(url) {
        $.get(url, { dataType: "json" }).then(renderTweets);
        // text area will be set to empty
        document.querySelector("#tweet-text").value = '';
        // text counter will be set to 140
        document.querySelector(".counter").innerHTML = 140;
    };

    $("#submit-tweet").submit(function(event) {
        // event handler function to prevent default submit action
        event.preventDefault();
        const tweet = $('#tweet-text').val().length;
        // validate if textarea is empty
        if (tweet === 0) {
            $(".error-empty").slideDown('slow').hide(3500);
            // validate if character count is more than 140
        } else if (tweet > 140) {
            $(".error-long").slideDown('slow').hide(3500);
            // valid tweet will be added to data object through POST method
        } else {
            $.ajax({
                type: "POST",
                url: `/tweets`,
                data: $('form').serialize()
                    // without page refresh new tweets will be displayed
            }).then(function() {
                loadTweets(tweetsUrl);
            });
        }
    });
    loadTweets(tweetsUrl);
});