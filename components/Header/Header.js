import { Figtree } from "next/font/google"
const figtree = Figtree({subsets: ['latin']})

import Link from "next/link"

export default function Header(){
    return(
        <header className={`flex flex-row justify-between items-center min-h-11 h-11 px-5 ${figtree.className} shadow`}>
            <h3 className="text-xl font-bold text-center">Bleed AI</h3>
            <div className="text-sm font-medium space-x-4">
                <Link href="/">Home</Link>
                <Link href="/">Stage_1</Link>
                <Link href="/login">Login</Link>
                <Link href="/signup">SignUp</Link>
            </div>
        </header>
    )
}