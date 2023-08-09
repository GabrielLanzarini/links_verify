import { Link } from "react-router-dom"
import axios from "axios"
import "./styles/animation.css"
import { useEffect, useRef, useState } from "react"
import Modal from "./components/Modal"
import Skeleton from "react-loading-skeleton"

export default function App() {
    const [links, setLinks] = useState()
    const [loading, setLoading] = useState(true)
    const modal = useRef(null)
    const screen = useRef(null)

    const HandleShowModal = () => {
        if (modal.current) {
            console.log(modal.current.classList)
            modal.current.classList.remove("hidden")
            modal.current.classList.add("flex")
            modal.current.classList.remove("animate__slideOutUp")
            modal.current.classList.add("animate__slideInDown")
        }
    }

    const handleCloseModal = () => {
        if (modal.current) {
            modal.current.classList.remove("animate__slideInDown")
            modal.current.classList.add("animate__slideOutUp")
        }
    }

    const handleLinks = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/links/get/users`)
            const tempArr = []
            data.user.map((a, i) => {
                tempArr.push([
                    <div key={i} className="animate__animated animate__flipInX w-[250px] h-[70px] justify-between max-w-fit flex flex-col gap-1">
                        <Link to={`/folder/${a.user}`} key={a.id} style={{ border: "2px solid #D4C2FC" }} className={` animation  flex items-center justify-center  px-14 py-2 rounded-md`}>
                            {a.user}
                        </Link>
                        <button onClick={() => handleRemoveFolder(a.user)} className="hover:tracking-[5px] text-center transition-all">
                            Remove
                        </button>
                    </div>,
                ])
                setLinks(tempArr)
            })
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const handleRemoveFolder = async (user) => {
        const data = await axios.delete(`http://localhost:5000/links/delete/user/${user}`)
        handleLinks()
    }

    useEffect(() => {
        handleLinks()
    }, [])

    return (
        <div className="w-screen h-screen p-4 bg-white">
            <div ref={screen} className={` w-full h-full bg-[#f9f5ff] flex gap-5 flex-col justify-center items-center`}>
                <Modal refreshLinks={handleLinks} modal={modal} handleCloseModal={handleCloseModal} />

                <div className="flex flex-col items-center justify-center gap-4">
                    <h1 className={`test font-bold  text-5xl text-[#28262C] `}>
                        (Link_<span className="text-[#998FC7]">Verify)</span>
                    </h1>
                    <h2 className="text-2xl">Your folder links:</h2>

                    <div className="w-[600px] min-h-[50px] flex gap-5 flex-wrap justify-center items-center">
                        {loading ? (
                            <div className="w-full h-[70px] justify-between max-w-fit flex flex-col gap-1">
                                <Skeleton height={70} containerClassName="flex gap-4 " inline count={3} width={200} />
                            </div>
                        ) : (
                            links
                        )}
                    </div>
                </div>
                <div>
                    <button onClick={HandleShowModal} className="buttonHover relative flex items-center gap-4 bg-[#d4c2fc] px-4 py-2 rounded-md text-white font-medium">
                        Add new folder
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
