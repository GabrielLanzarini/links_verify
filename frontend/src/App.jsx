import { Link } from "react-router-dom"
import axios from "axios"
import style from "./styles/animation.module.css"
import { useEffect, useState } from "react"

export default function App() {
    const [links, setLinks] = useState()

    const handleLinks = async () => {
        const { data } = await axios.get(`http://localhost:5000/links/get/users`)
        const tempArr = []
        data.user.map((a) => {
            tempArr.push([
                <Link to={`/folder/${a.user}`} key={a.id} style={{ border: "2px solid #D4C2FC" }} className={`${style.animation} w-[250px] max-w-fit px-14 py-2 rounded-md`}>
                    {a.user}
                </Link>,
            ])
        })
        setLinks(tempArr)
    }
    useEffect(() => {
        handleLinks()
    }, [])

    return (
        <div className="w-screen h-screen p-4 bg-white">
            <div className={`${style.screnAnimation} w-full h-full bg-[#f9f5ff] flex justify-center items-center`}>
                <div className="flex flex-col items-center justify-center gap-4">
                    <h1 className={`${style.tests} font-bold  text-5xl text-[#28262C] `}>
                        Link_<span className="text-[#998FC7]">Verify</span>
                    </h1>
                    <h2 className="text-2xl">Your folder links:</h2>
                    <div className="w-[800px] flex gap-5 justify-center ">{links}</div>
                </div>
            </div>
        </div>
    )
}
