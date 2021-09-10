const dom = (() => {
  const fixCanvasHeights = () => {
    const playerBoard = document.getElementById('playerBoard');
    playerBoard.height = playerBoard.width;
    const computerBoard = document.getElementById('computerBoard');
    computerBoard.height = computerBoard.width;
  };

  const displayBoards = () => {
    // code here
  };

  const addEventListeners = () => {
    // code here
  };

  const displayWinner = () => {
    // code here
  };

  const init = () => {
    fixCanvasHeights();
    displayBoards();
    addEventListeners();
  };

  return { displayWinner, init };
})();

export default dom;
