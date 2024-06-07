import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { AudioContext } from "../../context/AppContext"
import { Box, Container, CircularProgress, Card, CardContent } from "@mui/material"
import { FaPlay, FaPause } from 'react-icons/fa';
import PlayBar from "../PlayBar/PlayBar"

const url = "https://665b0c8a003609eda45fa87a.mockapi.io/api/v1/tracks"



const MusicList = () => {
    const [songs, setSongs] = useState([])
    const { setAudio, currentTrack, isPlaying, name } = useContext(AudioContext)

    useEffect(() => {
        axios.get(url).then((response) => {
            console.log(response);
            setSongs(response.data)
        })
    }, [])
    if (songs.length === 0) {
        return <Container maxWidth="md">
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        </Container>
    }

    return (
        <div>
            <Container maxWidth="md">
                <Card>
                    <CardContent style={{ background: "#979797" }}>
                        {songs.filter(el => el.artists.toLowerCase().includes(name.toLowerCase())).map((track) => {
                            const min = Math.floor(track.duration / 60)
                            const remainderSecund = Math.floor(track.duration % 60)
                            return (
                                <div key={track.id} style={{ display: "flex", gap: 20, alignItems: 'center', marginBottom: "24px", }}>
                                    <button
                                        onClick={() => setAudio(track)}
                                        style={{ width: "40px", height: "40px", borderRadius: "50px", border: "none", }}
                                    >
                                        {currentTrack?.id === track.id ?
                                            isPlaying
                                                ?
                                                <FaPause />
                                                :
                                                <FaPlay />
                                            :
                                            <FaPlay />
                                        }
                                    </button>
                                    <img width={36} height={36} src={track.preview} alt="" />
                                    <div>
                                        <h4 style={{ fontSize: "16px", fontWeight: 700, }}>{track.title}</h4>
                                        <p style={{ fontSize: "16px", fontWeight: 400, }}>{track.artists}</p>
                                    </div>
                                    <p style={{ fontSize: "16px", fontWeight: 400, marginLeft: "auto" }}>{min} :{remainderSecund}</p>
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>

                {currentTrack && <PlayBar />}
            </Container>
        </div>
    )
}

export default MusicList