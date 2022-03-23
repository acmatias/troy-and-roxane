import React, { useState, useRef } from 'react'
import './styles/App.scss'
import Player from './components/Player.js'
import Song from './components/Song.js'
import Library from './components/Library.js'
import Nav from './components/Nav.js'
import Banner from './components/Banner.js'

// data
import data from './data.js'

function App() {
    // ref
    const audioRef = useRef(null)
    // State
    const [songs, setSongs] = useState(data())
    const [currentSong, setCurrentSong] = useState(songs[0])
    const [isPlaying, setIsPlaying] = useState(false)

    const [libraryStatus, setLibraryStatus] = useState(false)

    return (
        <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
            <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
            <Banner></Banner>
            <Song currentSong={currentSong} />
            <Player
                audioRef={audioRef}
                setIsPlaying={setIsPlaying}
                isPlaying={isPlaying}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
                songs={songs}
            />
            <Library
                songs={songs}
                setSongs={setSongs}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
                isPlaying={isPlaying}
                libraryStatus={libraryStatus}
            />
        </div>
    )
}

export default App
