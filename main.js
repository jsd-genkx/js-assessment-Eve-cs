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
    //this.field[this.positionRow][this.positionCol] = pathCharacter;
    this.gameOver = false; //the game can continue
  }

  //create field space
  static createField(holes, row, column) {
    const field = [];
    const allPoint = row * column;
    const fieldPlace = new Array(allPoint).fill("░");

    //place holes
    for (let i = 0; i < holes; i++) {
      const holeIndex = Math.floor(Math.random() * allPoint);
      fieldPlace[holeIndex] = "O";
    }

    //place hat
    const hatIndex = Math.floor(Math.random() * allPoint);
    fieldPlace[hatIndex] = "^";

    //place actor
    for (let i = 0; i < row; i++) {
      const placeOfActor = [];
      for (let j = 0; j < column; j++) {
        placeOfActor.push(fieldPlace.pop());
      }
      field.push(placeOfActor);
    }

    return field;
    //console.log(field); /ตอนแรกอันนี้อยู่ตรง 30 ติดบัคที่ปริ้นต์มาแต่fieldเปล่า ไม่มีหมวกกับแอคเตอร์
  }

  //create Actor with random position
  createActor() {
    const row = Math.floor(Math.random() * this.field.length);
    const column = Math.floor(Math.random() * this.field[0].length);
    this.positionRow = row;
    this.positionCol = column;
    this.field[this.positionRow][this.positionCol] = pathCharacter;
  }

  // Print field //
  print() {
    clear();
    for (let row of this.field) {
      console.log(row);
    }
  }
  //replace field after actor left
  updateField() {
    this.field[this.positionRow][this.positionCol] = fieldCharacter;
  }
  //command in field
  moveLeft() {
    this.positionCol--;
  }

  moveRight() {
    this.positionCol++;
  }

  moveUp() {
    this.positionRow = this.positionRow - 1;
  }

  moveDown() {
    this.positionRow = this.positionRow + 1;
  }

  //receive command from user
  move(direction) {
    if (direction === "l") {
      this.moveLeft();
    } else if (direction === "r") {
      this.moveRight();
    } else if (direction === "u") {
      this.moveUp();
    } else if (direction === "d") {
      this.moveDown();
    }
  }

  //check condition before update field
  checkCondition() {
    //positionRow >= 0 positionCol >= 0
    if (
      this.field.length <= this.positionRow ||
      this.field[0].length <= this.positionCol ||
      this.positionRow < 0 ||
      this.positionCol < 0
    ) {
      this.gameOver = true;
      console.log("Loses by attempting to move “outside” the field.");
      return;
    } else if (this.field[this.positionRow][this.positionCol] === "O") {
      this.gameOver = true;
      console.log("Loses by landing on (and falling in) a hole.");
      return;
    } else if (this.field[this.positionRow][this.positionCol] === "^") {
      this.gameOver = true;
      console.log("Wins by finding their hat.");
      return;
    }
  }

  update() {
    if (!this.gameOver) {
      this.field[this.positionRow][this.positionCol] = pathCharacter;
    }
  }
  gameOn() {
    this.createActor();
    while (this.gameOver) {
      this.print();
      const way = prompt("Which way do you want to go?"); // user input: u , way = 'u'
      this.move(way); // move("u")
      this.checkCondition();
      this.update();
    }
  }
}

// Game Mode ON
// Remark: Code example below should be deleted and use your own code.
/*const newGame = new Field([
	["░", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
  ]);
newGame.print();
*/

const newGame = new Field(Field.createField(2, 4, 3));
newGame.gameOn();
