import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import {useRouter} from "next/navigation";

export default function Signup_form(){
    const [signupData, setSignupData] = useState({email: "", password: "", c_password: ""})
    const [error, setError] = useState({email: "", password: "", c_password: ""})
    const router = useRouter()

    function handleChange(event){
        const {id, value} = event.target
        setSignupData(prevSignupData => {return {...prevSignupData, [id]: value}})
    }

    function giveError(){
        Object.entries(signupData).map(([key, value]) => {
            if(value === ""){
                setError((prevError) => {return {...prevError, [key]: `- ${key} is empty -`}})
            }
            else{
                setError((prevError) => {return {...prevError, [key]: ""}})
            }
        })
        if(signupData.password !== signupData.c_password){
            setError((prevError) => {return {...prevError, ["c_password"]: "- passwords do not match -"}})
        }
    }

    async function handelSubmit(event){
        event.preventDefault()
        giveError()
        if(signupData.email !== "" && 
           signupData.password !== ""
        ){
            try{
                const res = await axios.post("api/signup", {signupData: signupData})
                router.push("/login")
            }
            catch (error){
                if(error.request.status === 400){
                    setError((prevError) => {return {...prevError, ["email"]: "- email already registered -"}})
                }
                console.log("error in signup: ")
                console.log(error)
            }
        }
    }

    return(
        <div className="h-full w-full flex flex-col items-center justify-center">
            <h3 className={`w-2/6 text-center text-2xl font-bold mb-3 text-gray-700 font-figtree`}>Account SignUp</h3>
            <form onSubmit={handelSubmit} className="w-2/6 pt-4 py-5 px-4">
                <div className="mb-3 w-full">
                    <label htmlFor="email" className={`text-sm mb-1 block font-figtree`}>Email</label>
                    <input onChange={handleChange} value={signupData.email} type="text" name="email" id="email" className="focus:outline-none focus:shadow focus:border-blue-400 border border-gray-300 rounded-md px-3.5 pt-1.5 pb-1.5 w-full" />
                    {error.email && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.email}</p>}
                </div>
                <div className="mb-3 w-full">
                    <label htmlFor="password" className={`text-sm mb-1 block font-figtree`}>Password</label>
                    <input onChange={handleChange} value={signupData.password} type="password" name="password" id="password" className="focus:outline-none focus:shadow focus:border-blue-400 border border-gray-300 rounded-md px-3.5 pt-1.5 pb-1.5 w-full" />
                    {error.password && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.password}</p>}
                </div>
                <div className="mb-5 w-full">
                    <label htmlFor="c_password" className={`text-sm mb-1 block font-figtree`}>Confirm Password</label>
                    <input onChange={handleChange} value={signupData.c_password} type="password" name="c_password" id="c_password" className="focus:outline-none focus:shadow focus:border-blue-400 border border-gray-300 rounded-md px-3.5 pt-1.5 pb-1.5 w-full" />
                    {error.c_password && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.c_password}</p>}
                </div>
                <div className="w-full flex flex-row space-x-2">
                    <button type="submit" 
                    className={`w-full py-2 font-figtree font-medium text-white bg-bleed-red hover:bg-bleed-red-hover hover:shadow-md rounded-md`}>SignUp</button>
                </div>
            </form>
        </div>
    )
}