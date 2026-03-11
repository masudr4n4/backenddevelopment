import { useState, useRef } from 'react';

export function User({ name }) {
    return (
        <h1 className="font-bold text-center my-10">
            Hello {name}! let&apos;s play a game....
        </h1>
    );
}

export function Challenge({ initialTime }) {
    const [timeRemaining, setTimeRemaining] = useState(initialTime * 1000);
    const intervalRef = useRef(null);

    function startChallenge() {
        if (intervalRef.current) return;
        setTimeRemaining(initialTime * 1000);
        intervalRef.current = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 10) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    return 0;
                }
                return prev - 10;
            });
        }, 10);
    }

    function stopChallenge() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    function resetChallenge() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setTimeRemaining(initialTime * 1000);
    }

    return (
        <div className="card w-62 flex-1 p-8">
            <p>Your challenge..... {initialTime} sec</p>
            <p className="my-2 font-mono">Time remaining: {(timeRemaining / 1000).toFixed(2)}s</p>
            <div className="flex gap-2 flex-wrap">
                <button type="button" className="btn btn-danger" onClick={startChallenge}>
                    Start
                </button>
                <button type="button" className="btn btn-info" onClick={stopChallenge}>
                    Stop
                </button>
                <button type="button" className="btn btn-secondary" onClick={resetChallenge}>
                    Reset
                </button>
            </div>
        </div>
    );
}


export default function TimerChallenge(){
    return <>
    <User name="Rana"/>
    <div className='flex flex-row gap-4'>    
    <Challenge initialTime={5}/>
    {/* <Challenge />
    <Challenge />
    <Challenge /> */}

    </div>



    </>
}