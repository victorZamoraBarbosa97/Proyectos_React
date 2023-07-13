import { useState } from "react"
import confetti from "canvas-confetti"

import { Square } from "./components/Square" 
import { TURNS } from "./constants";
import { checkWinner } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";


function App() {
  // tablero
  const [board, setBoard ] = useState( () => {
    const storageBoard = window.localStorage.getItem('board');
    return storageBoard ? JSON.parse(storageBoard) : Array(9).fill(null)
  });
  // turno
  const [ turn, seturn ] =  useState(() => {
    const turnLocalStorage = window.localStorage.getItem('turn');
    return turnLocalStorage ?? TURNS.X
  });
  // ganador
  const [winner, setWinner] = useState(null); // Null -> no hay ganador , False -> empate.


  //*  game over reiniciar juego 
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    seturn(TURNS.X)
    setWinner(null)
    // * delete storage
    window.localStorage.removeItem('turn')
    window.localStorage.removeItem('board')
  }

  // controla turnos, actualiza estados , check ganador. 
  const updateBoard = (index) => {

    //! no actualizar si ya tiene un valor
    if (board[index] || winner ) return;

    // * actualizar el tablero
    const newBoard = [...board ];
    newBoard[index] = turn; // X u O
    setBoard(newBoard);

    // * actualizar turno de jugador
    const newTurn = (turn === TURNS.X ) ? TURNS.O : TURNS.X;
    seturn(newTurn);

    //* guardar partida en localstorage
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn);

    //* revisar si hay un ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner)
      confetti();
    }

    // Empate
    else if( !newBoard.includes(null) ){
      setWinner(false);
    }
  }

  return ( 
    <main className="board">
      <h1>Tic - Tac - Toe </h1>
      <button onClick={resetGame}> Reset del juego </button>
        <section className="game">
          {
            board.map((_, index) => {
              return (
                  <Square
                    key = {index}
                    index = { index }
                    updateBoard = { updateBoard }
                  >
                    { board[index]}
                  </Square>
              )
            })
          }
        </section>

        <section className="turn">
          <Square isSelected = { turn === TURNS.X} > {TURNS.X} </Square>
          <Square isSelected = { turn === TURNS.O} > {TURNS.O} </Square>
        </section>
        <WinnerModal winner = {winner} resetGame = { resetGame } />
    </main>
  )
}

export default App
