import { useEffect, useState } from "react"
import axios from "axios"

export default function Modal({ modal, handleCloseModal, refreshLinks }) {
    const [data, setData] = useState({
        folder: "",
        links: "",
    })

    const handleSave = async () => {
        await axios.post(`http://localhost:5000/links/create/${data.folder}`, { links: [data.links] })
        setData({ folder: "", links: "" })
        refreshLinks()
        handleCloseModal()
    }

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <div ref={modal} className={`animate__animated hidden w-[400px]  h-full z-10 absolute top-0 items-center`}>
            <div className="gap-4 relative flex flex-col items-center justify-center w-full h-[300px] p-10 bg-white rounded-md drop-shadow-[0_0_10px_rgba(0,0,0,0.15)]">
                <div className="flex flex-col gap-4 w-full">
                    <input
                        className="bg-gray-100 font-thin w-full px-4 py-2 rounded-md"
                        value={data.folder}
                        onChange={(e) => setData((prev) => ({ ...prev, folder: e.target.value }))}
                        type="text"
                        placeholder="Folder Name"
                    />
                    <input
                        className="bg-gray-100 font-thin w-full px-4 py-2 rounded-md"
                        value={data.links}
                        onChange={(e) => setData((prev) => ({ ...prev, links: e.target.value }))}
                        type="text"
                        placeholder="First Link"
                    />
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
