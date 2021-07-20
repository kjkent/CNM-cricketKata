// Creates an array of 11 batters and fills their scores with 0. Creates variables for the current batters and the index of the next batter in line
let batters = new Array(11).fill(-1);
let batterSentOut = new Array(11).fill(false);
let currentBatters = [0,1];
batters[0] = 0;
batters[1] = 0;
let nextUp = 2;
let overcount = 0;
const scoreCardString = ".......111....3.4..6...1..11....2....3...W...11...1..2...33...44...W..W..1..2..1.22....1..1......1....11...111.....1.111..222.333...W...211..22.11....1...1...1...1...1..1..3...4....2...1....3...1....646421.3.222..111...333...444......1111...22..333.444............1...1...1.....11.22.WWW11.....1....11....1....1.W...W..1666..W";
//  Selectively parses numbers in scoreCardString into ints, leaving "." and "W" as strings, inputting all back into a mixed array.
let scoreCard = new Array(scoreCardString.length);
for (let i = 0; i < scoreCardString.length; i++) {
    if (scoreCardString[i] == "1" || scoreCardString[i] == "2" || scoreCardString[i] == "3" || scoreCardString[i] == "4" || scoreCardString[i] == "6") {
        scoreCard[i] = parseInt(scoreCardString[i]);
    } else {
        scoreCard[i] = scoreCardString[i];
    }

}

// Function startScoring iterates over the string, calling the functions that record scores, batter swaps and batter-outs, then prints the scores
const startScoring = () => {
    for (let i = 0; i < scoreCard.length; i++) {
        if (scoreCard[i] == 2 || scoreCard[i] == 4 || scoreCard[i] == 6) {
            addScore(scoreCard[i], currentBatters[0]);
        } else if (scoreCard[i] == 1 || scoreCard[i] == 3) {
            addScore(scoreCard[i], currentBatters[0]);
            swapBatter();
        } else if (scoreCard[i] == "W") {
            batterOut();
        }
        overcount++;
        if (overcount == 6) {
            swapBatter();
            overcount = 0;
        }
        console.log(batters.length);
    }
    printScores();
}

// addScore takes the score and the current batter and adds the current number of runs to the current batter's overall score in the array
const addScore = (score, batter) => {
    batters[batter] += score
}

// swapBatter swaps the two values in the array of currentBatter 
const swapBatter = () => {
    let tmp = currentBatters[0];
    currentBatters[0] = currentBatters[1];
    currentBatters[1] = tmp;
}

// batterOut marks the current batter as out, puts the next batter in line in the position of currentBatters[0] and increments nextUp
const batterOut = () => {
    batterSentOut[currentBatters[0]] = true;
    currentBatters[0] = nextUp;
    batters[nextUp] = 0;
    nextUp++;
}

// printScores converts the scoreCard array into a readable list of batter scores
const printScores = () => {
    for (let i = 0; i < batters.length; i++) {
        if(batters[i] == -1) {
            batters[i] = "-";
        };
        if (!batterSentOut[i]) {
            console.log(`Batsman ${i + 1}: ${batters[i]} not out`)
        } else {
            console.log(`Batsman ${i + 1}: ${batters[i]}`);
        }
    }
}

startScoring();