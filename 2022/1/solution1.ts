#!/usr/bin/env ts-node-esm
import fs from "fs";

function main() {
  let maxCalories = -Infinity;
  const elvesCalories = readInput().split("\n\n");

  for (const calories of elvesCalories) {
    let totalCalories = 0;

    for (const item of calories.split("\n")) {
      if (!/^\d+$/.test(item)) {
        throw new Error("Calories must be a positive integer");
      }
      totalCalories += parseInt(item);
    }

    maxCalories = Math.max(totalCalories, maxCalories);
  }

  console.log(maxCalories);
}

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
