import {useState} from 'react';

export function User({name}){
    return (
        <>
        <h1 className="font-bold text-center my-10">
            Hello {name}! let's play a game....
        </h1>
        </>
    )
}
export function Challenge({initialTime}){
    const [timeRemaining,updateRemainingTime] = useState({
        "timer":null,
        "initalTimer":initialTime*1000
    });
    function startChallenge(){
        console.log("Just clicked the button and game started...")
        const timer = setInterval(() => {
            updateRemainingTime((timeRemaining)=>(timeRemaining-10))
        }, 10);
        console.log(timeRemaining);
    }
    function stopChallenge(){
        clearInterval()
    }

    return <>
    <div className="card w-62 flex-1 p-8">
        <p>Your challenge..... 5 sec</p>
        <button className="btn btn-danger" onClick={startChallenge}>
            start
        </button>
        <button className="btn btn-info" onClick={startChallenge}>
           stop
        </button>

    </div>
    </>
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