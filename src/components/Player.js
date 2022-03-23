import React, { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const Player = ({ songs, currentSong, setCurrentSong, isPlaying, setIsPlaying }) => {
    // ref
    const audioRef = useRef(null)
    // state
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    })
    // event handlers
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(!isPlaying)
        } else {
            audioRef.current.play()
            audioRef.current.volume = 0.5
            setIsPlaying(!isPlaying)
        }
    }
    const timeUpdateHandler = (e) => {
        const currentTime = e.target.currentTime
        const duration = e.target.duration
        // calculate percentage
        const roundedCurrent = Math.round(currentTime)
        const roundedDuration = Math.round(duration)
        const animation = Math.round((roundedCurrent / roundedDuration) * 100)
        setSongInfo({ ...songInfo, currentTime, duration, animationPercentage: animation })
    }
    const getTime = (time) => {
        return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    }
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value
        setSongInfo({ ...songInfo, currentTime: e.target.value })
    }
    const autoPlayHandler = () => {
        if (isPlaying) {
            audioRef.current.play()
        }
    }
    const songEndHandler = () => {
        let currentSongIndex = songs.findIndex((song) => song.id === currentSong.id)
        setCurrentSong(songs[currentSongIndex + 1 === songs.length ? 0 : currentSongIndex + 1])
        if (isPlaying) audioRef.current.play()
    }

    // adding style to input
    const trackAnimation = {
        transform: `translateX(${songInfo.animationPercentage}%)`,
    }
    const trackBackgroud = {
        background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
    }

    // const skipTrackHandler = (direction) => {
    //     let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    //     if (direction === 'skip-forward') {
    //         setCurrentSong(songs[(currentIndex + 1) % songs.length])
    //     } else if (direction === 'skip-back') {
    //         if ((currentIndex - 1) % songs.length === -1) {
    //             setCurrentSong(songs[songs.length - 1])
    //             return
    //         }
    //         setCurrentSong(songs[(currentIndex - 1) % songs.length])
    //     }
    // }
    const skipTrackHandler = (direction) => {
        let currentSongIndex = songs.findIndex((song) => song.id === currentSong.id)
        if (direction === 'skip-forward') {
            setCurrentSong(songs[currentSongIndex + 1 === songs.length ? 0 : currentSongIndex + 1])
        }
        if (direction === 'skip-back') {
            setCurrentSong(songs[currentSongIndex - 1 < 0 ? songs.length - 1 : currentSongIndex - 1])
        }
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={trackBackgroud} className="track">
                    <input
                        min={0}
                        max={songInfo.duration || 0}
                        value={songInfo.currentTime}
                        onChange={dragHandler}
                        type="range"
                    />
                    <div style={trackAnimation} className="animate-track"></div>
                </div>
                <p>{getTime(songInfo.duration || 0)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    onClick={() => {
                        skipTrackHandler('skip-back')
                    }}
                    className="skip-back"
                    size="2x"
                    icon={faAngleLeft}
                />
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className="play"
                    size="2x"
                    icon={isPlaying ? faPause : faPlay}
                />
                <FontAwesomeIcon
                    onClick={() => {
                        skipTrackHandler('skip-forward')
                    }}
                    className="skip-forward"
                    size="2x"
                    icon={faAngleRight}
                />
            </div>
            <audio
                onLoadedData={autoPlayHandler}
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}
                onEnded={songEndHandler}
            ></audio>
        </div>
    )
}

export default Player
