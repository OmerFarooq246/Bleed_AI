import Link from "next/link"
import { useState } from "react"
import { signIn } from 'next-auth/react'
import {useRouter} from "next/navigation";

export default function Login_form(){
    const [loginData, setLoginData] = useState({email: "", password: ""})
    const [error, setError] = useState({email: "", password: "", credentials: ""})
    const router = useRouter()

    function handleChange(event){
        const {id, value} = event.target
        setLoginData(prevLoginData => {return {...prevLoginData, [id]: value}})
    }

    function giveError(){
        Object.entries(loginData).map(([key, value]) => {
            if(value === ""){
                setError((prevError) => {return {...prevError, [key]: `- ${key} is empty -`}})
            }
            else{
                setError((prevError) => {return {...prevError, [key]: ""}})
            }
        })
    }

    async function handleSubmit(event){
        event.preventDefault()
        giveError()
        if(loginData.email !== "" &&
           loginData.password !== ""
        ){
            try{
                const res = await signIn('credentials', {...loginData, redirect: false}) //credentials is the type of provider, redirect false to prevent redirect to auth's own signin page
                console.log("res in login: ", res)
                if(res.status === 401){
                    setError((prevError) => {return {...prevError, ["credentials"]: "- credentials are incorrect -"}})
                }
                else if(res.status === 200){
                    setError((prevError) => {return {...prevError, ["credentials"]: ""}})
                    router.push("/")
                }
            }
            catch(error){
                console.log("error in login: ")
                console.log(error)
            }
        }
    }

    return(
        <div className="h-full w-full flex flex-col items-center justify-center">
            <h3 className={`w-2/6 text-center text-2xl font-bold mb-3 text-gray-700 font-figtree`}>Account Login</h3>
            <form className="w-2/6 pt-4 py-5 px-4">
                <div className="mb-3 w-full">
                    <label htmlFor="email" className={`text-sm mb-1 block font-figtree`}>Email</label>
                    <input onChange={handleChange} value={loginData.email} type="text" name="email" id="email" className="focus:outline-none focus:shadow focus:border-blue-400 border border-gray-300 rounded-md px-3.5 pt-1.5 pb-1.5 w-full" />
                    {error.email !== "" && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.email}</p>}
                </div>
                <div className="mb-5 w-full">
                    <label htmlFor="password" className={`text-sm mb-1 block font-figtree`}>Password</label>
                    <input onChange={handleChange} value={loginData.password} type="password" name="password" id="password" className="focus:outline-none focus:shadow focus:border-blue-400 border border-gray-300 rounded-md px-3.5 pt-1.5 pb-1.5 w-full" />
                    {error.password !== "" && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.password}</p>}
                    {error.credentials !== "" && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.credentials}</p>}
                </div>
                <div className="w-full flex flex-row space-x-2">
                    <button 
                    onClick={handleSubmit}
                    className={`w-full py-2 font-figtree font-medium text-white bg-bleed-red hover:bg-bleed-red-hover hover:shadow-md rounded-md`}>Login</button>
                </div>
            </form>
        </div>
    )
}