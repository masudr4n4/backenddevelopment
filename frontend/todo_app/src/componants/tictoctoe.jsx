import { use, useState } from "react"
import Toast from "./ToastMessage";
import {WINNER_COMB} from './data.js';

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
    
    let playerBlock = <span className="text-xl flex-1 bg-cyan-200 shadow-amber-200 rounded-2xl p-1">{playerName}</span>
    if (isEditing){
        playerBlock= <input type="text" placeholder="Enter Name" className="input flex-1" required defaultValue={playerName} onChange={changeHandler} disabled={gameStatus==true}/>
    }
    return <div className={`flex-1 text-center ${isActive? "font-bold":undefined}`} playerid={symbol}>
                <div className="flex">
                    {playerBlock}
                    <span className="flex-1">
                        <button className={`btn ${isEditing?"bg-emerald-50":"bg-blue-300"}`} onClick={()=>updateEdit(!isEditing)} disabled={gameStatus==true}>{isEditing ? "Save" : "Edit"}</button>
                    </span>
                </div>
                <p className="flex-1">Player Symbol: <span className="text-2xl">{symbol}</span></p>

        </div>
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


    return <>
    {currentBoard.map((row,rowIndex)=>(
        <ol key={rowIndex} className="skeleton">
            <div className="flex flex-row" key={rowIndex}>
                {row.map((col,colIndex)=>(
                    <li key={colIndex} className="btn bg-amber-50 m-2 w-20 md:w-40 h-20 md:h-40" onClick={()=>(boardclickHandler(rowIndex,colIndex))}> 
                    <button> 
                        {col}
                    </button>
                    </li>))}
           </div>
        
        </ol>))}
        <button className="btn btn-primary" onClick={resetBoard}>RESET BOARD!</button>
    </>
}






export default function TicTocToe(){
    const [currentActivePlayer,updateCurrentPlayer] = useState('X');
    const [isGameStarted,updateGameStatus] = useState(false);
    // const [winner,updateWinner] = useState(null);


    function setGameWinner(win){
        winner = win;
        alert("We have the winner! ")
        // updateGameStatus(false);
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


    return <>
    <div className="bg-cyan-100 mx-0 md:mx-10 p-3 mb-10">
        <h1 className="text-3xl font-bold text-center">
            Tic-Toc-Toe
        </h1>
        <div className="playground">
            <div className="players flex">
            <Player name={"player 1"} symbol={"X"} isActive={currentActivePlayer=="X"} gameStatus={isGameStarted}/>
            <Player name={"player 2"} symbol={"O"} isActive={currentActivePlayer=="O"} gameStatus={isGameStarted}/>
            </div>
            <p className="text-blue-600/50 dark:text-sky-400/50 font-bold content-center text-center">Next turn is for <span className="text-red-300">{currentActivePlayer}</span> symbol holder! </p>
            <div className={`board flex flex-col justify-center items-center ${winner ? "hidden":""}`}>
                <Board currentPlayer={currentActivePlayer} playerHandler={changeplayer} gameHandler={changeGameStatus} gameStatus={isGameStarted} setWinner={setGameWinner}/>
            </div>
            { cordinate ?<Toast name = {letplayerName} message={` has just click on cordinate: ${cordinate}  !!`}/> : ''}
        </div>
    </div>
    </>
}