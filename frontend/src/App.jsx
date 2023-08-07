import { useState } from "react"
import axios from "axios"

export default function App() {
    const [dados, setDados] = useState()

    const handleData = async () => {
        const data = await axios.get("http://localhost:5000")
        console.log(data)
    }

    return (
        <div>
            <button onClick={handleData}>CLIQUE AQUI</button>
        </div>
    )
}
