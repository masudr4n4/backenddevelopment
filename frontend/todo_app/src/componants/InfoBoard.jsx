function Button({item,key}){
return (
    <button className="btn" id={key}>{item}</button>
)
}

export default function InfoBoard(){
    const skills = ["Python","JavaScript","Java","SQL"]
    return <>
    <div className="info-container">
        <div className="info-button">
        {skills.map((item,index)=>(<Button item={item} key={index}/>))}
        </div>
        <div className="info"></div>
    </div>

    </>
}