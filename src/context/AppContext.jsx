import React, { useState, useEffect } from 'react';

export const AudioContext = React.createContext();

const audio = new Audio();

const AppContext = (props) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [name, setName] = useState("");
    const [theme, setTheme] = useState("white");

    const toggleTheme = ()=>{
        if(theme==="white"){
            setTheme("dark")
        }else if (theme==="dark"){
            setTheme("white")
        }
    }

    const setAudio = (track) => {
        if (currentTrack?.id === track.id) {
            if (isPlaying) {
                audio.pause();
                setIsPlaying(false);
            } else {
                audio.play();
                setIsPlaying(true);
            }
        } else {
            setCurrentTrack(track);
            audio.src = track.src;
            audio.play();
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        audio.addEventListener('ended', () => {
            setIsPlaying(true);
        });

        return () => {
            audio.removeEventListener('ended', () => {
                setIsPlaying(true);
            });
        };
    }, []);

    const setSearchText = (name) => {
        console.log(name);
        setName(name)

    }

    const value = {
        toggleTheme,
        theme,
        setSearchText,
        name,
        text: "Music App",
        setAudio,
        audio,
        currentTrack,
        isPlaying,
    };

    return (
        <AudioContext.Provider value={value}>
            {props.children}
        </AudioContext.Provider>
    );
};

export default AppContext;








// import React, { useState } from 'react'
// export const AudioContext = React.createContext();

// const audio = new Audio();

// const AppContext = (props) => {
//     const [currentTrack, setCurrentTrack] =useState(null)
//     const [isPlaying, setIsPlaying] =useState(false)
//     const setAudio = (track) => {
//         setCurrentTrack(track)
//         audio.src = track.src;
//         audio.play();
//         setIsPlaying(track)
//         // if return
//         //else

//     }
//     const value = {
//         text: "Music App",
//         setAudio,
//         audio,
//         currentTrack,
//         isPlaying
//     }
//     return (
//         <AudioContext.Provider value={value}>
//            {props.children}
//         </AudioContext.Provider>
//     )
// }

// export default AppContext