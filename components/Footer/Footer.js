import { Figtree } from "next/font/google"
const figtree = Figtree({subsets: ['latin']})

export default function Footer(){
    return(
        <footer className={`flex flex-row justify-center items-center min-h-12 h-12 px-5 ${figtree.className}`}>
            <p className="text-xs">Copyright - Bleed AI - 2024 All rights Unreserved</p>
        </footer>
    )
}