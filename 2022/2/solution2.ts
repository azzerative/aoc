#!/usr/bin/env ts-node-esm
import fs from "fs";

function main() {
  const rounds = readInput().split("\n");
  let totalScore = 0;

  for (const round of rounds) {
    const [opp, outcome] = round.split(" ");
    if (
      !opp ||
      !outcome ||
      !Object.values(Opp).includes(opp) ||
      !Object.values(Outcome).includes(outcome)
    ) {
      throw new Error("Invalid input");
    }

    const outcomeScore = OutcomeScore.get(outcome);
    if (outcomeScore == null) {
      throw new Error("Invalid input");
    }

    let me;
    switch (outcome) {
      case Outcome.LOSE:
        if (opp === Opp.ROCK) me = Me.SCISSOR;
        else if (opp === Opp.PAPER) me = Me.ROCK;
        else if (opp === Opp.SCISSOR) me = Me.PAPER;
        else throw new Error("Invalid input");
        break;

      case Outcome.DRAW:
        if (opp === Opp.ROCK) me = Me.ROCK;
        else if (opp === Opp.PAPER) me = Me.PAPER;
        else if (opp === Opp.SCISSOR) me = Me.SCISSOR;
        else throw new Error("Invalid input");
        break;

      case Outcome.WIN:
        if (opp === Opp.ROCK) me = Me.PAPER;
        else if (opp === Opp.PAPER) me = Me.SCISSOR;
        else if (opp === Opp.SCISSOR) me = Me.ROCK;
        else throw new Error("Invalid input");
        break;

      default:
        throw new Error("Invalid input");
    }

    const shapeScore = ShapeScore.get(me);
    if (shapeScore == null) {
      throw new Error("Invalid input");
    }

    totalScore += shapeScore + outcomeScore;
  }
  console.log(totalScore);
}

const Opp = { ROCK: "A", PAPER: "B", SCISSOR: "C" };
const Me = { ROCK: "X", PAPER: "Y", SCISSOR: "Z" };
const Outcome = { LOSE: "X", DRAW: "Y", WIN: "Z" };

const ShapeScore = new Map([
  [Me.ROCK, 1],
  [Me.PAPER, 2],
  [Me.SCISSOR, 3],
]);
const OutcomeScore = new Map([
  [Outcome.LOSE, 0],
  [Outcome.DRAW, 3],
  [Outcome.WIN, 6],
]);

function readInput() {
  let input = process.argv[2];
  if (!input) {
    throw new Error("Please provide an input");
  }

  if (fs.existsSync(input)) {
    input = fs.readFileSync(input, "utf-8");
  }
  return input;
}

try {
  main();
} catch (err) {
  if (err instanceof Error) {
    console.error(err);
  }
}
