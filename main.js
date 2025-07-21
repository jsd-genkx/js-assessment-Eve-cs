"use strict";
// JS Assessment: Find Your Hat //
import promptSync from "prompt-sync";
import clear from "clear-screen";

const prompt = promptSync({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field = [[]]) {
    this.field = field;
    // Replace with your own code //
    // Set the home position at (0, 0) before the game starts
    this.positionRow = 0;
    this.positionCol = 0;
    this.gameOver = false; //the game can continue
  }

  //create field space and this is a static method. happen with Class only
  static createField(holes, row, column) {
    const allPoint = row * column; //show all available point in array
    //create new array fill with ("░")
    const fieldPlace = new Array(allPoint).fill("░");

    //place holes in holeIndex, random a point and place them
    for (let i = 0; i < holes; i++) {
      const holeIndex = Math.floor(Math.random() * allPoint);
      fieldPlace[holeIndex] = "O";
    }

    //place hat in hatIndex
    const hatIndex = Math.floor(Math.random() * allPoint);
    {
      fieldPlace[hatIndex] = "^";
    }

    //change fieldPlace to 2D and add fieldPlace to field
    const field = [];
    let f = 0; // Index for fieldPlace
    for (let i = 0; i < row; i++) {
      const eachRow = [];
      for (let j = 0; j < column; j++) {
        eachRow.push(fieldPlace[f]);
        f++;
      }
      field.push(eachRow);
    }
    //field now fill with "░"
    return field;
  }

  //create Actor with random position
  createActor() {
    let row;
    let column;
    //random a place for actor to a fieldCharacter only
    do {
      row = Math.floor(Math.random() * this.field.length);
      column = Math.floor(Math.random() * this.field[0].length);
    } while (this.field[row][column] !== fieldCharacter);
    this.positionRow = row;
    this.positionCol = column;
    this.field[this.positionRow][this.positionCol] = pathCharacter;
  }

  // Print field //
  print() {
    clear();
    //add row of this.field out in console
    for (let row of this.field) {
      console.log(row);
    }
  }

  //command in field
  moveLeft() {
    this.positionCol--;
  }

  moveRight() {
    this.positionCol++;
  }

  moveUp() {
    this.positionRow--;
  }

  moveDown() {
    this.positionRow++;
  }

  //receive command from user + return field after player left
  move(direction) {
    //Store previous position to clear it later
    const prevRow = this.positionRow;
    const prevCol = this.positionCol;
    //all move that receive command from user
    if (direction === "l") {
      this.moveLeft();
    } else if (direction === "r") {
      this.moveRight();
    } else if (direction === "u") {
      this.moveUp();
    } else if (direction === "d") {
      this.moveDown();
    } else {
      console.log("Invalid move. Use 'u', 'd', 'l', or 'r'.");
    }
    //after player moved, now we have new positionRow & positionCol
    //now we have to replace field back after actor left by using prevRow and prevCol
    this.field[prevRow][prevCol] = fieldCharacter;
  }

  //check condition before update field
  checkCondition() {
    //check if the actor is still in the field
    if (
      this.field.length <= this.positionRow ||
      this.field[0].length <= this.positionCol ||
      this.positionRow < 0 ||
      this.positionCol < 0
    ) {
      this.gameOver = true;
      console.log("You loses by moving “outside” of the field.");
      return;
    } else if (
      //check if actor found hole
      this.field[this.positionRow][this.positionCol] === "O"
    ) {
      this.gameOver = true;
      console.log("Loses by falling in a hole.");
      return;
    } else if (
      //check if actor fount hat
      this.field[this.positionRow][this.positionCol] === "^"
    ) {
      this.gameOver = true;
      console.log("Wins by finding their hat.");
      return;
    }
  }

  //update place of actor
  updateActorPlace() {
    if (!this.gameOver) {
      this.field[this.positionRow][this.positionCol] = pathCharacter;
    }
  }

  //the game mode is on and this is all things that shows in console.log
  gameOn() {
    this.createActor();
    //do this while this.gameOver = false
    while (!this.gameOver) {
      this.print();
      //add text to remind  player that they are at border
      if (
        this.positionRow === 0 ||
        this.positionRow === this.field.length - 1 ||
        this.positionCol === 0 ||
        this.positionCol === this.field[0].length - 1
      ) {
        console.log(
          "You are at the edge of the field. Going further may cause you to lose."
        );
      }
      const way = prompt("Which way do you want to go?"); // user input: u , way = 'u'
      this.move(way); // move("u")
      this.checkCondition();
      this.updateActorPlace();
    }
  }
}

// Game Mode ON
// Remark: Code example below should be deleted and use your own code.
/*/const newGame = new Field([
  ["░", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);
newGame.print();*/

const newGame = new Field(Field.createField(2, 3, 3));
newGame.gameOn();
