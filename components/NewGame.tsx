export function NewGame() {
  return (
    <>
      <h2>Start a New Game!</h2>
      <form action="get">
        <div>
          <label htmlFor="gameName">Game Name</label>
          <input
            type="text"
            id="gameName"
            name="gameName"
            placeholder="Game Name"
            required
          />
        </div>
        <button type="submit">Start Game</button>
      </form>
    </>
  );
}

export function AddPlayers() {
  return (
    <>
      <h2>Add Players</h2>
      <form action="get">
        <div>
          <label htmlFor="playerName">Player Name</label>
          <input
            type="text"
            id="playerName"
            name="playerName"
            placeholder="Player Name"
            required
          />
        </div>
        <button type="button">Add Another</button>
        <button type="button">Start Game</button>
      </form>
    </>
  );
}
