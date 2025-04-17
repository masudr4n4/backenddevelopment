export default function Toast({message,type="info"}){
    console.log("Toasting message! ")
    return <>
    <div className="toast toast-end">
            <div className={`alert alert-${type}`}>
                <span>{message}</span>
            </div>
    </div>
    </>
}