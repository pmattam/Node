var rockPaperScissors = function(throw1, throw2) {

    throw1.toLowerCase();
    throw2.toLowerCase();
    if (throw1 === 'rock' && throw2 === 'scissors') {
        return 'player 1';
    }
    if (throw1 === 'scissors' && throw2 === 'rock') {
        return 'player 2';
    }
    if (throw1 === 'scissors' && throw2 === 'paper') {
        return 'player 1';
    }
    if (throw1 === 'paper' && throw2 === 'scissors') {
        return 'player 2';
    }
    if (throw1 === 'paper' && throw2 === 'rock') {
        return 'player 1';
    }
    if (throw1 === 'rock' && throw2 === 'paper') {
        return 'player 2';
    }
    if (throw1 === throw2) {
        return 'draw';
    }

};

module.exports = rockPaperScissors;