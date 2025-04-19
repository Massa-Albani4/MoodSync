"use client"

import { useState } from "react"
import { MoodButton } from "./components/MoodButton"
import { PlaylistItem } from "./components/PlaylistItem"

// Mock data for demonstration purposes
const moods = ["Happy", "Sad", "Energetic", "Romantic", "Angry", "Calm"]

export default function App() {
  const [selectedMood, setSelectedMood] = useState(null)
  const [playlist, setPlaylist] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood)
  }

  const generatePlaylist = async () => {
    if (!selectedMood) return

    setIsGenerating(true)

    // In a real app, this would be an API call to your backend
    // which would then call the Spotify API
    setTimeout(() => {
      // Mock data - in a real app this would come from the Spotify API
      const mockPlaylist = [
        {
          id: "1",
          title: "Happy Song",
          artist: "Happy Artist",
          spotifyUrl: "https://open.spotify.com/track/123",
        },
        {
          id: "2",
          title: "Another Great Song",
          artist: "Popular Band",
          spotifyUrl: "https://open.spotify.com/track/456",
        },
        {
          id: "3",
          title: "Awesome Track",
          artist: "Cool Artist",
          spotifyUrl: "https://open.spotify.com/track/789",
        },
        {
          id: "4",
          title: "Perfect Mood",
          artist: "Mood Masters",
          spotifyUrl: "https://open.spotify.com/track/012",
        },
        {
          id: "5",
          title: "Feeling Good",
          artist: "The Vibes",
          spotifyUrl: "https://open.spotify.com/track/345",
        },
      ]

      setPlaylist(mockPlaylist)
      setIsGenerating(false)
    }, 1500)
  }

  const removeSong = (songId) => {
    setPlaylist(playlist.filter((song) => song.id !== songId))
  }

  const addSong = () => {
    // In a real app, this would open a search interface to find and add songs
    const newSong = {
      id: `new-${Date.now()}`,
      title: "New Added Song",
      artist: "User Added",
      spotifyUrl: "https://open.spotify.com/track/new",
    }

    setPlaylist([...playlist, newSong])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300">
            MoodSync
          </h1>
          <p className="text-xl text-purple-200">Generate playlists based on your mood</p>
        </header>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-center">How are you feeling today?</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {moods.map((mood) => (
              <MoodButton
                key={mood}
                mood={mood}
                isSelected={selectedMood === mood}
                onClick={() => handleMoodSelect(mood)}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <button
            onClick={generatePlaylist}
            disabled={!selectedMood || isGenerating}
            className={`
              px-8 py-3 rounded-full text-lg font-semibold transition-all
              ${
                !selectedMood || isGenerating
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              }
            `}
          >
            {isGenerating ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating...
              </span>
            ) : (
              "Generate Playlist"
            )}
          </button>
        </div>

        {playlist.length > 0 && (
          <div className="bg-black bg-opacity-30 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Your {selectedMood} Playlist</h2>
              <button
                onClick={addSong}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                + Add Song
              </button>
            </div>

            <div className="space-y-3">
              {playlist.map((song) => (
                <PlaylistItem key={song.id} song={song} onRemove={() => removeSong(song.id)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
