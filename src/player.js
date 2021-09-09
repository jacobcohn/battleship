const CreatePlayer = (enemyGameboard) => {
  const sendAttack = (coordinate) => enemyGameboard.recieveAttack(coordinate);
  const didWin = () => enemyGameboard.getGameboardInfo().areShipsSunk;

  return { sendAttack, didWin };
};

export default CreatePlayer;
