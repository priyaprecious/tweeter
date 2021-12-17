$(document).ready(function() {
    // --- our code goes here ---
    $("#tweet-text").on("keyup", function() {
        const valLength = $(this).val().length; // gets the number of characters entered
        const limit = 140; // total limit is 140 characters
        const charLeft = limit - valLength; // gets the number of characters left to be entered
        const counter = $(this).next().children()[1];
        $(counter).html(charLeft)
        if (charLeft < 0) {
            $(counter).css("color", "red"); // if the number of characters entered is more than 140 then change the color of the counter to red
        } else {
            $(counter).css("color", "black"); // if the number of characters entered is less than 140 then counter color will be black
        }
    });
});