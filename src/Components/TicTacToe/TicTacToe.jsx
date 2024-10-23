import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import o from '../../mark/circle.png';
import x from '../../mark/cross.png';
import { BiRefresh } from 'react-icons/bi';

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => { 
    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    const [isDayTheme, setIsDayTheme] = useState(false);

    let titleRef = useRef(null);
    let box1 = useRef(null);
    let box2 = useRef(null);
    let box3 = useRef(null);
    let box4 = useRef(null);
    let box5 = useRef(null);
    let box6 = useRef(null);
    let box7 = useRef(null);
    let box8 = useRef(null);
    let box9 = useRef(null);

    let boxArray = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

    const toggleTheme = () => {
        setIsDayTheme(!isDayTheme);
    };
    

    const toggle = (e, num) => {
        if (lock || data[num] !== "") {
            return;
        }
        if (count % 2 === 0) {
            e.target.innerHTML = `<img src='${x}' alt='x'/>`;
            data[num] = "x";
        } else {
            e.target.innerHTML = `<img src='${o}' alt='o'/>`;
            data[num] = "o";
        }
        setCount(count + 1);
        checkWin();
    };

    const checkWin = () => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                won(data[a]);
                return;
            }
        }

        // Check for a draw (if all cells are filled and no winner)
        if (data.every(cell => cell !== "")) {
            titleRef.current.innerHTML = 'Match Draw';
            setLock(true);
        }
    };

    const won = (winner) => {
        setLock(true);
        if (winner === "x") {
            titleRef.current.innerHTML = `<img src='${x}' alt='x'/> WON`;
        } else if (winner === "o") {
            titleRef.current.innerHTML = `<img src='${o}' alt='o'/> WON`;
        }
    };

    const reset = () => {
        setLock(false);
        data = ["", "", "", "", "", "", "", "", ""];
        titleRef.current.innerHTML = "";
        boxArray.forEach((box) => {
            box.current.innerHTML = "";
        });
        // Resetting the count if it was odd so that "X" always starts first
        if (count % 2 === 1) {
            setCount(count + 1);
        }
    };

    return (
        

        <div className={`container ${isDayTheme ? 'day' : 'night'}`}>
        <div className="theme-toggle">
            <label className="switch">
                <input type="checkbox" onChange={toggleTheme} />
                <span className="slider round"></span>
            </label>
        </div>
            <h1 className='title'>Tic Tac Toe Game In <span>React</span></h1>
            <div className='player-indicators'>
                <span className='player'>Player 1: <span className='mark'>X</span></span>
                <span className='player'>Player 2: <span className='mark'>O</span></span>
            </div>
            <h3 className='winner' ref={titleRef}></h3>
            <div className="board">
                <div className="row1">
                    <div className="boxes" ref={box1} onClick={(e) => toggle(e, 0)}></div>
                    <div className="boxes" ref={box2} onClick={(e) => toggle(e, 1)}></div>
                    <div className="boxes" ref={box3} onClick={(e) => toggle(e, 2)}></div>
                </div>
                <div className="row2">
                    <div className="boxes" ref={box4} onClick={(e) => toggle(e, 3)}></div>
                    <div className="boxes" ref={box5} onClick={(e) => toggle(e, 4)}></div>
                    <div className="boxes" ref={box6} onClick={(e) => toggle(e, 5)}></div>
                </div>
                <div className="row3">
                    <div className="boxes" ref={box7} onClick={(e) => toggle(e, 6)}></div>
                    <div className="boxes" ref={box8} onClick={(e) => toggle(e, 7)}></div>
                    <div className="boxes" ref={box9} onClick={(e) => toggle(e, 8)}></div>
                </div>
            </div>
            <button className="reset" onClick={reset}>
                <BiRefresh /> Play Again
            </button>
        </div>
    );
};

export default TicTacToe;
