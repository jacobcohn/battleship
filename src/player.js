const CreatePlayer = (enemyGameboard) => {
  const sendAttack = (coordinate) => enemyGameboard.recieveAttack(coordinate);

  return { sendAttack };
};

export default CreatePlayer;
