import { useState } from "react"
import Toast from "./ToastMessage";
import { WINNER_COMB } from './data.js';

const board = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
]
let cordinate =undefined;
let players = {};
let winner = null;

function Player({name,symbol,isActive,gameStatus}){
    const [playerName,updatePlayerName] = useState(name);
    const [isEditing,updateEdit] = useState(false);
    players[symbol] = playerName;
    function changeHandler(event){
        console.log(event);
        updatePlayerName(event.target.value);
        players[symbol] = playerName;
    }
    
    let playerBlock = (
        <span className="text-base font-medium flex-1 truncate px-3 py-2 rounded-xl bg-base-100 border border-base-300 text-base-content">
            {playerName}
        </span>
    );
    if (isEditing){
        playerBlock = (
            <input
                type="text"
                placeholder="Enter name"
                className="input input-bordered input-sm flex-1 bg-base-100 border-base-300"
                required
                defaultValue={playerName}
                onChange={changeHandler}
                disabled={gameStatus==true}
            />
        );
    }
    return (
        <div
            className={`flex-1 rounded-2xl border p-4 transition-colors ${
                isActive
                    ? "border-primary/50 bg-primary/5 ring-1 ring-primary/20"
                    : "border-base-300 bg-base-200/80"
            }`}
            data-player={symbol}
        >
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                {playerBlock}
                <button
                    type="button"
                    className={`btn btn-sm shrink-0 ${
                        isEditing ? "btn-primary" : "btn-outline border-base-300"
                    }`}
                    onClick={()=>updateEdit(!isEditing)}
                    disabled={gameStatus==true}
                >
                    {isEditing ? "Save" : "Edit"}
                </button>
            </div>
            <p className="mt-3 text-sm text-base-content/70">
                Symbol{" "}
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-base-100 border border-base-300 text-lg font-bold text-primary">
                    {symbol}
                </span>
            </p>
        </div>
    );
}

function Board({currentPlayer,playerHandler,gameHandler,gameStatus,setWinner}){
    const [currentBoard,updateBoard] = useState(board);
    

    function hasWinner(winner_com,board){
       for (const comb of winner_com){
        let first_symbol_match = board[comb[0].row][comb[0].col]
        let second_symbol_match = board[comb[1].row][comb[1].col]
        let third_symbol_match = board[comb[2].row][comb[2].col]
        if(first_symbol_match && first_symbol_match === second_symbol_match && first_symbol_match == third_symbol_match){
            setWinner(first_symbol_match)
            console.log("We have the winner now : ",players[first_symbol_match])
        }
       }
    }


    function boardclickHandler(row,col){
        if(!currentBoard[row][col]){
            playerHandler();
            cordinate=[row,col]
        }
        if (!gameStatus){
            gameHandler();
            console.log("Game just started")
        }
        updateBoard((currentBoard) =>{
            let updatedboard = [...currentBoard.map((data)=>([...data]))]
            if(!updatedboard[row][col]){
                updatedboard[row][col] = currentPlayer;
            }
            hasWinner(WINNER_COMB,updatedboard);
            return updatedboard;
        })
    }
    function resetBoard(){
        updateBoard(board);
        gameHandler('reset');
        setWinner(null);
        console.log("Game status just turned OFF")
    }


    return (
        <div className="flex flex-col items-center gap-8 w-full">
            <div
                className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-base-300/40 border border-base-300 w-full max-w-[min(100%,20rem)] aspect-square max-h-[min(80vw,20rem)]"
                role="grid"
                aria-label="Tic-tac-toe board"
            >
                {currentBoard.flatMap((row, rowIndex) =>
                    row.map((col, colIndex) => (
                        <button
                            key={`${rowIndex}-${colIndex}`}
                            type="button"
                            className="flex items-center justify-center rounded-xl bg-base-100 border border-base-300 text-3xl sm:text-4xl font-bold text-base-content hover:bg-base-200 active:scale-[0.98] transition-all min-h-0 aspect-square"
                            onClick={() => boardclickHandler(rowIndex,colIndex)}
                        >
                            <span className={col ? "text-primary" : "text-base-content/15 select-none"}>
                                {col ?? "·"}
                            </span>
                        </button>
                    ))
                )}
            </div>
            <button type="button" className="btn btn-outline border-base-300 btn-wide" onClick={resetBoard}>
                Reset board
            </button>
        </div>
    );
}





export default function TicTocToe(){
    const [currentActivePlayer,updateCurrentPlayer] = useState('X');
    const [isGameStarted,updateGameStatus] = useState(false);


    function setGameWinner(win){
        winner = win;
        const winnerName = players[win] || `Player ${win}`;
        alert(`We have a winner! ${winnerName} wins!`);
    }

    function changeGameStatus(event="start"){
        if(event=="reset"){
            updateGameStatus(false);
        }else{
            updateGameStatus(true);
        }
    }

    function changeplayer(){
        updateCurrentPlayer((player)=>{
            if(player=="X"){
                return "O"
            }
            if (player=="O"){
                return "X"
            }
        })
    }

    let letplayerName = undefined;
    if(currentActivePlayer=="X"){
        letplayerName=players.O
    }else{
        letplayerName = players.X
    }


    return (
        <div className="w-full max-w-2xl mx-auto px-4 py-10">
            <header className="text-center mb-8">
                <p className="text-sm font-medium uppercase tracking-wide text-primary mb-2">
                    Play
                </p>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                    Tic-tac-toe
                </h1>
                <p className="text-sm text-base-content/70 max-w-md mx-auto">
                    Edit player names, take turns on the grid, reset anytime.
                </p>
            </header>

            <div className="rounded-2xl border border-base-300 bg-base-200 shadow-sm p-4 sm:p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <Player name={"Player 1"} symbol={"X"} isActive={currentActivePlayer=="X"} gameStatus={isGameStarted}/>
                    <Player name={"Player 2"} symbol={"O"} isActive={currentActivePlayer=="O"} gameStatus={isGameStarted}/>
                </div>

                <div className="rounded-xl bg-base-100/80 border border-base-300 px-4 py-3 mb-6 text-center">
                    <p className="text-sm text-base-content/80">
                        Next turn:{" "}
                        <span className="font-semibold text-primary">{currentActivePlayer}</span>
                    </p>
                </div>

                <div className={`flex flex-col items-center ${winner ? "hidden" : ""}`}>
                    <Board currentPlayer={currentActivePlayer} playerHandler={changeplayer} gameHandler={changeGameStatus} gameStatus={isGameStarted} setWinner={setGameWinner}/>
                </div>
                {cordinate ? (
                    <div className="mt-6 flex justify-center">
                        <Toast name={letplayerName} message={` clicked cell [${cordinate[0]}, ${cordinate[1]}]`}/>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
