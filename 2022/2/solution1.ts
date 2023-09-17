#!/usr/bin/env ts-node-esm
import fs from "fs";

function main() {
  const rounds = readInput().split("\n");
  let totalScore = 0;

  for (const round of rounds) {
    const [opp, me] = round.split(" ");
    if (
      !opp ||
      !me ||
      !Object.values(Opp).includes(opp) ||
      !Object.values(Me).includes(me)
    ) {
      throw new Error("Invalid input");
    }

    const shapeScore = ShapeScore.get(me);
    if (shapeScore == null) {
      throw new Error("Invalid input");
    }

    const outcomeScore = OutcomeScore.get(opp + me);
    if (outcomeScore == null) {
      throw new Error("Invalid input");
    }

    totalScore += shapeScore + outcomeScore;
  }
  console.log(totalScore);
}

const Opp = { ROCK: "A", PAPER: "B", SCISSOR: "C" };
const Me = { ROCK: "X", PAPER: "Y", SCISSOR: "Z" };

const ShapeScore = new Map([
  [Me.ROCK, 1],
  [Me.PAPER, 2],
  [Me.SCISSOR, 3],
]);
const OutcomeScore = new Map([
  [Opp.ROCK + Me.SCISSOR, 0],
  [Opp.PAPER + Me.ROCK, 0],
  [Opp.SCISSOR + Me.PAPER, 0],

  [Opp.ROCK + Me.ROCK, 3],
  [Opp.PAPER + Me.PAPER, 3],
  [Opp.SCISSOR + Me.SCISSOR, 3],

  [Opp.ROCK + Me.PAPER, 6],
  [Opp.PAPER + Me.SCISSOR, 6],
  [Opp.SCISSOR + Me.ROCK, 6],
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
