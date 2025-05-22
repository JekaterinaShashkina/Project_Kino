import axios from "axios"
import { API_URL } from "../../constants/env"


export const fetchAllSessions = async () => {
    const response = await axios.get(`${API_URL}/sessions`)
    return response.data
}