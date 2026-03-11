import {useActionState} from 'react';
import Submit from "./SubmitForm.jsx";





export default function CreateTodo(){
    function submitHandler(event){
        setTimeout(() => {
      console.log("Wait before submit")
    }, 2000);
        event.preventDefault();
        let data = new FormData(event.target)
        console.log(Object.fromEntries(data.entries()))
    //     setTimeout(() => {
    //   console.log("Wait before submit")
    // }, 2000);
}

    return <>
    <div className="card items-center my-10">
        <h1 className="font-bold text-2xl  bg-gradient-to-r from-fuchsia-800 to-fuchsia-200 mb-3">
         Add new todo!
        </h1>
        <form className="form flex flex-col gap-3 w-72 md:w-76" onSubmit={submitHandler}>
            <label className="input" htmlFor="title">
                <input type="text" placeholder="Enter Title" required id="title" name="title"/>
            </label>
            <textarea className="textarea" placeholder="Enter Description" name={"description"} required></textarea>
            <label className="input" htmlFor="priority">
                <input type="number" required id="title" name="priority" placeholder="Enter task priority" min={0} max={5}/>
            </label>

            <Submit/>
        </form>
    </div>
    </>
}