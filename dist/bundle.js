/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/computer.js":
/*!*************************!*\
  !*** ./src/computer.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst CreateComputer = (enemyGameboard) => {\n  const remainder = Math.floor(Math.random());\n  const linesOfHitsInfo = {\n    moreThanOneLine: false,\n    currentLine: null,\n  };\n\n  const randomCoordinate = (gameboardInfo) => {\n    const possibleAttacksWithRemainder = gameboardInfo.possibleAttacks.filter(\n      (coordinate) => coordinate % 2 === remainder,\n    );\n    const index = Math.floor(Math.random() * possibleAttacksWithRemainder.length);\n    return possibleAttacksWithRemainder[index];\n  };\n\n  const determineRow = (coordinate) => Math.floor(coordinate / 8);\n\n  const secondCoordinate = (gameboardInfo) => {\n    const hitCoordinate = gameboardInfo.hits[0];\n    const hitCoordinateRow = determineRow(hitCoordinate);\n\n    const adjacentCoordinates = [];\n    if (determineRow(hitCoordinate - 1) === hitCoordinateRow) adjacentCoordinates.push(hitCoordinate - 1);\n    if (determineRow(hitCoordinate + 1) === hitCoordinateRow) adjacentCoordinates.push(hitCoordinate + 1);\n    adjacentCoordinates.push(hitCoordinate - 8);\n    adjacentCoordinates.push(hitCoordinate + 8);\n\n    const possibleAdjacentCoordinates = adjacentCoordinates.filter((coordinate) =>\n      gameboardInfo.possibleAttacks.includes(coordinate),\n    );\n    const index = Math.floor(Math.random() * possibleAdjacentCoordinates.length);\n\n    return possibleAdjacentCoordinates[index];\n  };\n\n  const sortArray = (hitsArray) => hitsArray.sort((a, b) => a - b);\n\n  const isSingleLine = (hitsArray) => {\n    const sortedHitsArray = sortArray(hitsArray);\n    const initialDifference = sortedHitsArray[1] - sortedHitsArray[0];\n\n    let status = true;\n    let currentCoordinate = sortedHitsArray[0];\n    sortedHitsArray.forEach((coordinate) => {\n      if (coordinate !== currentCoordinate) status = false;\n      currentCoordinate += initialDifference;\n    });\n\n    return status;\n  };\n\n  const getPossibleOnLineCoordinates = (lineOfHits, possibleAttacks) => {\n    const nextCoordinateDistance = lineOfHits[1] - lineOfHits[0];\n    const onLineCoordinates = [];\n\n    onLineCoordinates.push(lineOfHits[0] - nextCoordinateDistance);\n    onLineCoordinates.push(lineOfHits[lineOfHits.length - 1] + nextCoordinateDistance);\n\n    const possibleOnLineCoordinates = onLineCoordinates.filter(\n      (coordinate) =>\n        possibleAttacks.includes(coordinate) &&\n        (nextCoordinateDistance === 8 || determineRow(coordinate) === determineRow(lineOfHits[0])),\n    );\n\n    return possibleOnLineCoordinates;\n  };\n\n  const addCoordinateToLine = (possibleOnLineCoordinates) => {\n    const index = Math.floor(Math.random() * possibleOnLineCoordinates.length);\n    return possibleOnLineCoordinates[index];\n  };\n\n  const adjacentAndPerpendicularCoordinate = (lineOfHits, possibleAttacks) => {\n    const distanceBetweenCurrentLine = lineOfHits[1] - lineOfHits[0];\n    let distanceBetweenNewLine;\n    if (distanceBetweenCurrentLine !== 1) {\n      distanceBetweenNewLine = 1;\n    } else distanceBetweenNewLine = 8;\n\n    const adjacentCoordinates = [];\n    lineOfHits.forEach((coordinate) => {\n      adjacentCoordinates.push([coordinate - distanceBetweenNewLine, coordinate]);\n      adjacentCoordinates.push([coordinate + distanceBetweenNewLine, coordinate]);\n    });\n\n    const possibleAdjacentCoordinates = adjacentCoordinates.filter(\n      (array) =>\n        possibleAttacks.includes(array[0]) &&\n        (distanceBetweenNewLine === 8 || determineRow(array[0]) === determineRow(array[1])),\n    );\n\n    const index = Math.floor(Math.random() * possibleAdjacentCoordinates.length);\n    linesOfHitsInfo.moreThanOneLine = true;\n    linesOfHitsInfo.currentLine = possibleAdjacentCoordinates[index];\n    return possibleAdjacentCoordinates[index][0];\n  };\n\n  const resetLinesOfHitsInfo = () => {\n    linesOfHitsInfo.moreThanOneLine = false;\n    linesOfHitsInfo.currentLine = null;\n  };\n\n  const singleLineCoordinate = (gameboardInfo) => {\n    const lineOfHits = sortArray(gameboardInfo.hits);\n    const onLineCoordinates = getPossibleOnLineCoordinates(lineOfHits, gameboardInfo.possibleAttacks);\n    if (onLineCoordinates.length) return addCoordinateToLine(onLineCoordinates);\n    return adjacentAndPerpendicularCoordinate(lineOfHits, gameboardInfo.possibleAttacks);\n  };\n\n  const multipleLinesCoordinate = (gameboardInfo) => {\n    const lineOfHits = sortArray(linesOfHitsInfo.currentLine);\n    const onLineCoordinates = getPossibleOnLineCoordinates(lineOfHits, gameboardInfo.possibleAttacks);\n    const finalCoordinate = addCoordinateToLine(onLineCoordinates);\n    linesOfHitsInfo.currentLine.push(finalCoordinate);\n    return finalCoordinate;\n  };\n\n  const getCoordinate = () => {\n    const gameboardInfo = enemyGameboard.getGameboardInfo();\n    if (!gameboardInfo.hits.length) return randomCoordinate(gameboardInfo);\n    if (gameboardInfo.hits.length === 1) return secondCoordinate(gameboardInfo);\n    if (isSingleLine(gameboardInfo.hits)) {\n      resetLinesOfHitsInfo();\n      return singleLineCoordinate(gameboardInfo);\n    }\n    return multipleLinesCoordinate(gameboardInfo);\n  };\n\n  const sendAttack = () => {\n    const coordinate = getCoordinate();\n    enemyGameboard.recieveAttack(coordinate);\n  };\n  const didWin = () => enemyGameboard.getGameboardInfo().areShipsSunk;\n\n  return { sendAttack, didWin };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateComputer);\n\n\n//# sourceURL=webpack://battleship/./src/computer.js?");

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst dom = (() => {\n  const displayWinner = () => {};\n\n  const init = () => {};\n\n  return { displayWinner, init };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);\n\n\n//# sourceURL=webpack://battleship/./src/dom.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n\nconst CreateGameboard = () => {\n  const ships = [];\n  const addShip = (coordinates) => ships.push((0,_ship__WEBPACK_IMPORTED_MODULE_0__.default)(coordinates));\n\n  const gameboardInfo = {\n    missedAttacks: [],\n    sunkenShips: [],\n    hits: [],\n    possibleAttacks: [],\n    allShipsSunk: false,\n  };\n  for (let i = 0; i < 64; i += 1) gameboardInfo.possibleAttacks.push(i);\n  const getGameboardInfo = () => gameboardInfo;\n\n  const isShipHit = (coordinate) => {\n    let status = false;\n    ships.forEach((ship) => {\n      if (ship.coordinates.includes(coordinate)) status = true;\n    });\n    return status;\n  };\n\n  const findShip = (coordinate) => {\n    let specificShip;\n    ships.forEach((ship) => {\n      if (ship.coordinates.includes(coordinate)) specificShip = ship;\n    });\n    return specificShip;\n  };\n\n  const areAllShipsSunk = () => {\n    let status = true;\n    ships.forEach((ship) => {\n      if (!ship.isSunk()) status = false;\n    });\n    return status;\n  };\n\n  const recieveAttack = (coordinate) => {\n    if (isShipHit(coordinate)) {\n      const hitShip = findShip(coordinate);\n      hitShip.hit(coordinate);\n\n      gameboardInfo.hits.push(coordinate);\n      if (hitShip.isSunk()) {\n        gameboardInfo.sunkenShips.push(hitShip.coordinates);\n        hitShip.coordinates.forEach((shipCoordinate) => {\n          const index = gameboardInfo.hits.indexOf(shipCoordinate);\n          gameboardInfo.hits.splice(index, 1);\n        });\n      }\n    } else {\n      gameboardInfo.missedAttacks.push(coordinate);\n    }\n    gameboardInfo.allShipsSunk = areAllShipsSunk();\n    const index = gameboardInfo.possibleAttacks.indexOf(coordinate);\n    gameboardInfo.possibleAttacks.splice(index, 1);\n  };\n\n  return { addShip, recieveAttack, getGameboardInfo };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateGameboard);\n\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logic */ \"./src/logic.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n\n\n\n(() => {\n  _logic__WEBPACK_IMPORTED_MODULE_0__.default.init();\n  _dom__WEBPACK_IMPORTED_MODULE_1__.default.init();\n})();\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/logic.js":
/*!**********************!*\
  !*** ./src/logic.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n/* harmony import */ var _randomizeShips__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./randomizeShips */ \"./src/randomizeShips.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _computer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./computer */ \"./src/computer.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n\n\n\n\n\n\nconst logic = (() => {\n  let player;\n  let computer;\n\n  const init = () => {\n    const addRandomShipsToGameboard = (gameboard) => {\n      const randomShips = (0,_randomizeShips__WEBPACK_IMPORTED_MODULE_1__.default)();\n      randomShips.forEach((ship) => gameboard.addShip(ship));\n    };\n\n    const playerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.default)();\n    const computerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.default)();\n    addRandomShipsToGameboard(playerGameboard);\n    addRandomShipsToGameboard(computerGameboard);\n\n    player = (0,_player__WEBPACK_IMPORTED_MODULE_2__.default)(computerGameboard);\n    computer = (0,_computer__WEBPACK_IMPORTED_MODULE_3__.default)(playerGameboard);\n  };\n\n  const gameLoop = (playerAttackCoordinate) => {\n    player.sendAttack(playerAttackCoordinate);\n    if (player.didWin()) {\n      _dom__WEBPACK_IMPORTED_MODULE_4__.default.displayWinner('Player');\n      return;\n    }\n    computer.sendAttack();\n    if (computer.didWin()) _dom__WEBPACK_IMPORTED_MODULE_4__.default.displayWinner('Computer');\n  };\n\n  return { init, gameLoop };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (logic);\n\n\n//# sourceURL=webpack://battleship/./src/logic.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst CreatePlayer = (enemyGameboard) => {\n  const sendAttack = (coordinate) => enemyGameboard.recieveAttack(coordinate);\n  const didWin = () => enemyGameboard.getGameboardInfo().areShipsSunk;\n\n  return { sendAttack, didWin };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreatePlayer);\n\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/randomizeShips.js":
/*!*******************************!*\
  !*** ./src/randomizeShips.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst randomizeShips = () => {\n  const shipsArray = [];\n  const availableCoordinates = [];\n  for (let i = 0; i < 64; i += 1) availableCoordinates.push(i);\n\n  const generateShipCoordinates = (coordinate, shipLength, nextCoordinateDifference) => {\n    const shipCoordinates = [];\n    for (let i = 0; i < shipLength; i += 1) shipCoordinates.push(coordinate + i * nextCoordinateDifference);\n    return shipCoordinates;\n  };\n\n  const isShipPossible = (shipCoordinates) => {\n    let status = true;\n    const nextCoordinateDifference = shipCoordinates[1] - shipCoordinates[0];\n    const determineRow = (coordinate) => Math.floor(coordinate / 8);\n    const firstRow = determineRow(shipCoordinates[0]);\n\n    shipCoordinates.forEach((coordinate) => {\n      if (!availableCoordinates.includes(coordinate)) status = false;\n      if (coordinate > 63 || coordinate < 0) status = false;\n      if (nextCoordinateDifference === 1 && determineRow(coordinate) !== firstRow) status = false;\n    });\n\n    return status;\n  };\n\n  const addShip = (shipLength) => {\n    let ship;\n    const nextCoordinateDifference = Math.round(Math.random()) * 7 + 1;\n\n    let shipStatus = false;\n    while (!shipStatus) {\n      const randomAvailableCoordinate = availableCoordinates[Math.floor(Math.random() * availableCoordinates.length)];\n      const currentShip = generateShipCoordinates(randomAvailableCoordinate, shipLength, nextCoordinateDifference);\n      ship = currentShip;\n      if (isShipPossible(currentShip)) shipStatus = true;\n    }\n\n    ship.forEach((coordinate) => availableCoordinates.splice(availableCoordinates.indexOf(coordinate), 1));\n    shipsArray.push(ship);\n  };\n\n  const shipsLengths = [5, 4, 3, 3, 2];\n  shipsLengths.forEach((shipLength) => {\n    addShip(shipLength);\n  });\n\n  return shipsArray;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (randomizeShips);\n\n\n//# sourceURL=webpack://battleship/./src/randomizeShips.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst CreateShip = (coordinates) => {\n  const hits = [];\n\n  const getHits = () => hits;\n  const hit = (coordinate) => hits.push(coordinate);\n  const isSunk = () => hits.length === coordinates.length;\n\n  return { coordinates, getHits, hit, isSunk };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateShip);\n\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;