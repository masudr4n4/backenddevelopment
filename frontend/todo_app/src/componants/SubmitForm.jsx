import { useFormStatus } from "react-dom";

export default function Submit(){
    const { pending}  = useFormStatus();
    return (
        <>
            <button className="btn" disabled={pending}> {pending? "Adding":"Add"} </button>
        </>
    )
}