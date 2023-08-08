import { Link, useParams } from "react-router-dom"
import axios from "axios"
import style from "./styles/animation.module.css"
import { useEffect, useState } from "react"

export default function App() {
    const [links, setLinks] = useState()
    const { user } = useParams()

    const handleRemove = async (id) => {
        await axios.delete(`http://localhost:5000/links/delete/${user}/${id}`)
        await handleLinks()
    }

    const handleLinks = async () => {
        const { data } = await axios.get(`http://localhost:5000/links/${user}`)
        const tempArr = []
        data.link.map((a, i) => {
            tempArr.push([
                <hr className="w-full" />,
                <div className="w-[40%] h-[50px] flex flex-col items-center">
                    <div className="flex w-full gap-4 justify-between">
                        <Link to={a}>{a}</Link>
                        <h1 className="font-bold">
                            status:<span className="text-green-400">200</span>
                        </h1>
                    </div>
                    <div className="flex w-full justify-between">
                        <button onClick={() => handleRemove(i)} className="hover:tracking-[5px] text-center transition-all">
                            remove
                        </button>
                    </div>
                </div>,
            ])
        })
        setLinks(tempArr)
    }

    useEffect(() => {
        handleLinks()
    }, [])

    return (
        <div className="w-screen h-screen p-4 bg-white">
            <div className={`${style.screnAnimation} w-full h-full  bg-[#f9f5ff] flex justify-center items-center overflow-x-hidden`}>
                <div className="w-full flex flex-col items-center justify-center gap-4">
                    <Link to="/" className={`fixed top-10 left-10  font-bold  text-3xl text-[#28262C] `}>
                        Link_<span className="text-[#998FC7]">Verify</span>
                    </Link>
                    <div className="w-full flex gap-5 justify-center flex-col items-center">{links}</div>
                </div>
            </div>
        </div>
    )
}
