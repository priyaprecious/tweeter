$(document).ready(function () {
    // --- our code goes here ---
    $("#tweet-text").on("keyup", function () {
        const valLength = $(this).val().length
        const limit = 140
        const charLeft = limit - valLength;
        const counter = $(this).next().children()[1]
        $(counter).html(charLeft)
        if (charLeft < 0) {
            $(counter).css("color", "red")
        }
        else {
            $(counter).css("color", "black")
        }
    });
});