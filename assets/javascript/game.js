$(document).ready(function() {
    //GLOBAL VARIABLES
    //===============================
    let target = 0;
    let scorePossibilities = [3, 5, 7, 11];
    let picPossibilities = ["blueFlowerCrystal.jpg", "kyberCrystal.jpeg", "rainbowCrystal.jpeg", "smallBlueCrystal.jpeg", "universeClearCrystal.jpeg"];
    let score = 0;
    let wins = 0;
    let losses = 0;

    function prepareGame() {
        $("#crystals").empty();
        //load crystal images dynamically onto page
        for (let i = 0; i < scorePossibilities.length; i++) {
            //create image tag and add class ".crystal-image"
            const crystal = $("<img>");
            crystal.addClass("crystal-image");

            //just a confusing way to randomly select image from picPossibilities array
            const pic = picPossibilities[(Math.floor(Math.random() * 65536) % 13) % 5];

            //apply src and data-crystalValue attribute to newly created image tag
            crystal.attr({
                src: "./assets/images/" + pic,
                "data-crystalValue": scorePossibilities[Math.floor(Math.random() * scorePossibilities.length)]
            });
            //append to HTML div #crystals
            $("#crystals").append(crystal);
        }

        //when user clicks a crystal image, add points to her score 
        $(".crystal-image").on("click", function() {
            score += parseInt($(this).attr("data-crystalValue"));
            $("#score-points").text(`Score: ${ score } `);
    
            //if user has won/loss, increment appropriate counter and prepare HTML for next game
            if (score === target) {
                alert("Congratulations, you win");
                wins++;
                $("#wins").text(`Wins: ${ wins }`);
                resetGame();
                prepareGame();
            }
            if (score > target) {
                alert("I'm sorry, you went above the score needed to win. Please try again!");
                losses++;
                $("#losses").text(`Losses: ${ losses }`);
                resetGame();
                prepareGame();
            }
        });
    }

    function resetGame() {
        score = 0;
        $("#score-points").text(score);
        //target score will be a random number between 0-30 plus 10
        target = Math.floor(Math.random() * 30) + 10;
        $("#target-points").text(`Target: ${ target }`);

    }

    //prepare game for initial use
    prepareGame();
    resetGame();
});