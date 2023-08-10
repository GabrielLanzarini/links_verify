import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router"

export default function LinkModal({ modal, handleCloseModal, refreshLinks }) {
    const [err, setErr] = useState("")
    const { user } = useParams()
    const [data, setData] = useState("")

    const handleSave = async () => {
        if (data === "") return setErr("Please fill in all field")
        await axios.put(`http://localhost:5000/links/update/${user}`, { links: data })
        setData("")
        refreshLinks()
        setErr(null)
        handleCloseModal()
    }

    return (
        <div ref={modal} className={` animate__animated  w-[400px]  hidden h-full z-10 absolute top-0 items-center`}>
            <div className="gap-4 relative flex flex-col items-center justify-center w-full h-[200px] p-10 bg-white rounded-md drop-shadow-[0_0_10px_rgba(0,0,0,0.15)]">
                <div className="flex flex-col gap-4 w-full relative">
                    {err && <p className="absolute top-[-20px] text-sm text-red-400 ">{err}</p>}
                    <input className="bg-gray-100 font-thin w-full px-4 py-2 rounded-md" value={data} onChange={(e) => setData(e.target.value)} type="text" placeholder="New Link" />
                </div>
                <div className="flex justify-between  w-full">
                    <button onClick={handleSave} className="hover:scale-105 transition-all duration-150 bg-[#d4c2fc] px-4 w-[150px] py-2 rounded-md text-white font-medium">
                        Save
                    </button>
                    <button onClick={handleCloseModal} className="hover:scale-105 transition-all duration-150 bg-red-400 px-4 w-[150px] py-2 rounded-md  font-medium text-white">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
