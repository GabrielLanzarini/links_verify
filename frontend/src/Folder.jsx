import { Link, useParams } from "react-router-dom"
import axios from "axios"
import "./styles/animation.css"
import { useEffect, useRef, useState } from "react"
import LinkModal from "./components/LinkModal"
import Skeleton from "react-loading-skeleton"

export default function App() {
    const [links, setLinks] = useState()
    const [loading, setLoading] = useState(true)
    const modal = useRef(null)
    const { user } = useParams()

    const HandleShowModal = () => {
        if (modal.current) {
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

    const handleRemove = async (id) => {
        await axios.delete(`http://localhost:5000/links/delete/${user}/${id}`)
        await handleLinks()
    }

    const handleLinks = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`http://localhost:5000/links/verify/${user}`)
            if (data.lenght === 0) return setLinks(null)
            console.log(data)
            const tempArr = []
            data.map((a, i) => {
                tempArr.push([
                    <div key={i} className="w-full flex flex-col gap-4 justify-center items-center ">
                        <hr className="w-full" />
                        <div className="w-[40%] flex flex-col items-start gap-2">
                            <Link to={a.link}>{a.link}</Link>
                            <h1>
                                status:<span className={`${a.status === 200 ? "text-green-400" : "text-yellow-400"} font-bold`}>{a.status}</span>
                            </h1>
                            <button onClick={() => handleRemove(i)} className="hover:tracking-[5px] text-center transition-all">
                                remove
                            </button>
                        </div>
                    </div>,
                ])
            })
            setLinks(tempArr)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleLinks()
    }, [])

    return (
        <div className="w-screen h-screen p-4 bg-white">
            <div className={`sm:flex hidden w-full h-full bg-[#f9f5ff] gap-5 flex-col justify-center items-center`}>
                <h1 className="text-2xl font-bold text-center text-[#998FC7]">only available on computers</h1>
                <svg className="w-[100px] fill-[#998FC7]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M12 2C17.5228 2 22 6.47715 22 12C22 12.7266 21.9225 13.4351 21.7753 14.1177L19.9931 12.3355C19.9977 12.2242 20 12.1124 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C13.3023 20 14.5319 19.6888 15.6186 19.1368C15.7735 19.3828 15.958 19.6149 16.1716 19.8284C16.4739 20.1307 16.8125 20.3745 17.1734 20.5598C15.6642 21.4737 13.8936 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM19 14.1716L20.4142 15.5858C21.1953 16.3668 21.1953 17.6332 20.4142 18.4142C19.6332 19.1953 18.3668 19.1953 17.5858 18.4142C16.8402 17.6687 16.8064 16.481 17.4841 15.6952L17.5858 15.5858L19 14.1716ZM12 15C13.4664 15 14.7853 15.6312 15.6999 16.6368L14.7549 17.4961C13.965 17.1825 13.018 17 12 17C10.982 17 10.035 17.1825 9.24506 17.4961L8.30009 16.6368C9.21468 15.6312 10.5336 15 12 15ZM8.5 10C9.32843 10 10 10.6716 10 11.5C10 12.3284 9.32843 13 8.5 13C7.67157 13 7 12.3284 7 11.5C7 10.6716 7.67157 10 8.5 10ZM15.5 10C16.3284 10 17 10.6716 17 11.5C17 12.3284 16.3284 13 15.5 13C14.6716 13 14 12.3284 14 11.5C14 10.6716 14.6716 10 15.5 10Z"></path>
                </svg>
            </div>
            <div className={`sm:hidden w-full h-full  bg-[#f9f5ff] flex justify-center items-center overflow-x-hidden`}>
                <LinkModal refreshLinks={handleLinks} modal={modal} handleCloseModal={handleCloseModal} />
                <div className="w-full flex flex-col items-center justify-center gap-4">
                    <Link to="/" className={`fixed top-10 left-10  font-bold  text-3xl text-[#28262C] `}>
                        Link_<span className="text-[#998FC7]">Verify</span>
                    </Link>
                    <div className="w-full items-center h-[700px] gap-4 flex  flex-col  ">
                        {loading ? (
                            <div className="w-full justify-between max-w-fit flex flex-col">
                                <Skeleton duration={1} height={80} containerClassName="flex flex-col" width={800} count={3} />
                            </div>
                        ) : (
                            links
                        )}
                    </div>
                    <button onClick={HandleShowModal} className="fixed right-[150px] bottom-[100px] buttonHover flex items-center gap-4 bg-[#d4c2fc]  px-4 py-2 rounded-md text-white font-medium">
                        Add new link
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={40}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
