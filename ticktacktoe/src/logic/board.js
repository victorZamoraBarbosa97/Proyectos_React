import { WINNER_COMBOS } from "../constants";


export 
const checkWinner = (boardTOcheck) => {
    // * revisar todas las combinaciones ganadoras
    for ( const combo of WINNER_COMBOS ) {
      const [a, b, c] = combo;
      if ( 
        boardTOcheck[a] &&
        boardTOcheck[a] === boardTOcheck[b] &&
        boardTOcheck[a] === boardTOcheck[c]
      ){
        return boardTOcheck[a];
      }
    }
    // si no hay ganador
    return null;
  }