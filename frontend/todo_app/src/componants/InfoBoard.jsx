// import data from "../data.js"

import { useState } from "react"

const data= {
    "Python":{
        'description':" PYTHON lorem ip helo world python lasd vmaloweifj slnlvaoie fn ike vnlavalsdfie nlav lwenviaoaonlkdnv loevna"
    },
    "JavaScript":{
        'description':" JAVASCRIPT lorem ip helo worlorem ip helo world python lasd vmaloweifj slnlvaoie fn ike vnlavalsdfie nlav lwenhon"
    },
    "Java":{
        'description':" JAVA lorem ip helo worem ip helo world python lasd vmaloweifj slnlvaoie fn ike vnlavalsdfie nlav lwenn"
    },
    "SQL":{
        'description':" SQL lorem ip helo worem ip helo world python lasd vmaloweifj slnlvaoie fn ike vnlavalsdfie nlav lwenn"
    },
    "QA":{
        'description':"QA orem ip helo worem ip helo world python lasd vmaloweifj slnlvaoie fn ike vnlavalsdfie nlav lwenn"
    }
}



function Button({item,id,clickHandler,isSelected}){
return (
    <button className={`btn flex-1 ${isSelected ? "bg-sky-500/50":""}`} key={id} onClick={clickHandler}>{item}</button>
)
}

export default function InfoBoard(){
    const [selectedSKill,updateSkill] = useState("Python");
    const skills = ["Python","JavaScript","Java","SQL","QA"]
    return <>
    <div className="info-container mx-12 bg-transparent p-6">
        <div className="info-button flex ">
        {skills.map((item,index)=>(<Button item={item} key={index} clickHandler={()=>updateSkill(item)} isSelected={item==selectedSKill}/>))}
        </div>
        <div className="info">
             <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <h2 className="text-xl">{data[selectedSKill].description}</h2>
                    </div>
                </div>
                </div>
        </div>

    </>
}