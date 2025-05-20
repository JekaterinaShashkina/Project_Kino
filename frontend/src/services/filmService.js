import axios from "axios"
import { API_URL } from "../../constants/env"


export const fetchAllFilms = async () => {
    const response = await axios.get(`${API_URL}/movies`)
    return response.data
}

