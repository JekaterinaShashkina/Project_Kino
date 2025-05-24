import { Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchAllSessions } from "../services/sessionService";

export const ShowTime = () => {
     const [sessions, setSessions] = useState()
     const [loading, setLoading] = useState(true);
  
     useEffect(() => {
        const loadSessions = async () => {
            try {
                const data = await fetchAllSessions()
                setSessions(data)
            } catch (error) {
                console.error('Error fetching sessions', error)
            } finally {
                setLoading(false)
            }
        }
        loadSessions()
    }, []) 
        if (loading) {
        return (
            <div>Loading</div>
        )
    }  
    return (
    <Box>
    <Typography>ShowTime</Typography>

              {sessions.map((session) => (
                        <Typography key={session.sessionid} value={session.movie.title}>
                        {session.movie.title}
                        </Typography>
                    ))}
    </Box>
    )

}
