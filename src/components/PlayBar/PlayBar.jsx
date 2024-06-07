import React, { useState, useEffect, useContext } from 'react';
import { AudioContext } from "../../context/AppContext"
import { Container, IconButton, Box, Slider } from '@mui/material';
import { formatMMSS } from '../../helpers/formarMMSS';
import { FaPlay, FaPause } from 'react-icons/fa';

const PlayBar = () => {
    const { currentTrack, isPlaying, audio, setAudio } = useContext(AudioContext);
    const [value, setValue] = useState(0);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        let timer;
        if (isPlaying) {
            timer = setInterval(() => {
                let time = Math.floor(audio.currentTime);
                setValue(time);
                setPercent((time / currentTrack.duration) * 100);
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isPlaying, audio, currentTrack]);

    const handleSliderChange = (_, newValue) => {
        setPercent(newValue);
        const newTime = (newValue / 100) * currentTrack.duration;
        setValue(newTime);
        audio.currentTime = newTime;
    };

    return (
        <div style={{
            position: 'fixed',
            width: '100%',
            left: 0,
            bottom: 0,
            height: 150,
            background: "black",
            alignItems: 'center',
            padding: "50px"
        }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', alignItems: 'center', color: "#fff", gap: "10px" }}>
                    <IconButton onClick={() => {
                        setAudio(currentTrack);
                    }} style={{ color: "#fff" }}>
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </IconButton>
                    <img width={80} src={currentTrack.preview} alt="" />
                    <div style={{ color: "#fff" }}>
                        <h4>{currentTrack.artists}</h4>
                        <p>{currentTrack.title}</p>
                    </div>
                    <p style={{ width: 100 }}>{formatMMSS(value)}</p>
                    <Slider onChange={handleSliderChange} value={percent} min={0} max={100} />
                    <p style={{ width: 100 }}>{formatMMSS(currentTrack.duration-value)}</p>
                </Box>
            </Container>
        </div>
    );
}

export default PlayBar;








// import React, { useState, useEffect, useContext } from 'react';
// import { AudioContext } from "../../context/AppContext"
// import { Container, IconButton, Box, Slider } from '@mui/material';
// import { formatMMSS } from '../../helpers/formarMMSS';
// import { FaPlay, FaPause } from 'react-icons/fa';


// const PlayBar = () => {
//     const { currentTrack, isPlaying, audio, setAudio} = useContext(AudioContext)
//     const [value, setValue] = useState(0)
//     const [percent, SetPercent] = useState(0)

//     useEffect(() => {
//         let timer = setInterval(() => {
//             let time = Math.floor(audio.currentTime)
//             setValue(time)
//             console.log('tik',);
//         }, 1000)
//         if (isPlaying == false) {
//             clearInterval(timer)
//         }
//         return () => clearInterval(timer)
//     }, [isPlaying])


//     return (
//         <div style={{
//             position: 'fixed',
//             width: '100%',
//             left: 0,
//             bottom: 0,
//             height: 150,
//             background: "black",
//             alignItems: 'center',
//             padding: "50px"
//         }}
//         >
//             <Container maxWidth="lg">
//                 <Box sx={{ display: 'flex', alignItems: 'center', color: "#fff", gap:"10px" }}>
//                     <IconButton onClick={()=> {
//                         setAudio(currentTrack)
//                     } }
//                      style={{color:"#fff"}}>{isPlaying ? <FaPause/> : <FaPlay/>}</IconButton>
//                     <img width={80} src={currentTrack.preview} alt="" />
//                     <div style={{color: "#fff"}}>
//                         <h4>{currentTrack.artists}</h4>
//                         <p>{currentTrack.title}</p>
//                     </div>
//                     <p style={{ width: 100 }}>{formatMMSS(value)}</p>
//                     <Slider onChange={(_, v) => {
//                         //
//                         console.log(v, '%');
//                         SetPercent(v)
//                     }} value={percent} min={0} max={100} />
//                     <p style={{ width: 100 }}>{formatMMSS(currentTrack.duration)}</p>
//                 </Box>
//             </Container>
//         </div>
//     )
// }

// export default PlayBar