export default function Toast({name,message,type="info"}){
    return <>
    <div className="toast toast-end">
            <div className={`alert alert-${type}`}>
                <p>
                <span className="text-cyan-500 font-bold">{name}</span>
                <span>{message}</span>
                </p>
            </div>
    </div>
    </>
}