

export default function LoginForm(){
    function submitHandler(event){
        event.preventDefault();
        let data = new FormData(event.target)
        console.log(Object.fromEntries(data.entries()))
    }

    return <>
    <div className="card items-center my-10">
        <h1 className="font-bold text-2xl  bg-gradient-to-r from-fuchsia-800 to-fuchsia-200 mb-3"> 
         Welcome to the system!
        </h1>
        <form className="form flex flex-col gap-3 w-72 md:w-76" onSubmit={submitHandler}>
            <label className="input validator" htmlFor="email">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                    >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                </svg>
                <input type="email" placeholder="userhandler!" required id="email" name="email"/>
                </label>
                <div className="validator-hint hidden">Enter valid email address</div>
            <label className="input validator" htmlFor="password">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                        >
                        <path
                            d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                        ></path>
                        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                        </g>
                    </svg>
                    <input
                        type="password"
                        required
                        placeholder="Password"
                        minLength="8"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                        id="password"
                        name="password"
                        autoComplete="true"
                    />
                    </label>
                    <p className="validator-hint hidden">
                    Must be more than 8 characters, including
                    <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                    </p>
            <button className="btn">Login</button>
        </form>
    </div>
    </>
}
