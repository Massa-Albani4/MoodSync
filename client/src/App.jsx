"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Plus, X, Music } from "lucide-react";
import { sampleSongs } from "./songs";
import chillIcon from "./assets/chill.png";
import energeticIcon from "./assets/energetic.png";
import happyIcon from "./assets/happy.png";
import sadIcon from "./assets/sad.png";
import wittyIcon from "./assets/witty.png";
import mysteriousIcon from "./assets/mysterious.png";

const moods = [
  { id: "happy", label: "Happy", emoji: happyIcon },
  { id: "sad", label: "Sad", emoji: sadIcon },
  { id: "energetic", label: "Energetic", emoji: energeticIcon },
  { id: "chill", label: "Chill", emoji: chillIcon },
  { id: "witty", label: "Witty", emoji: wittyIcon },
  { id: "mysterious", label: "Mysterious", emoji: mysteriousIcon },
];

export default function MoodSync() {
  const [selectedMood, setSelectedMood] = useState("");
  const [generatedPlaylist, setGeneratedPlaylist] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);

  const generatePlaylist = () => {
    if (!selectedMood) return;

    const songs = sampleSongs[selectedMood] || [];
    setGeneratedPlaylist(songs);
    setPlaylistSongs([]);
  };

  const removeSongFromPlaylist = (songId) => {
    setPlaylistSongs(playlistSongs.filter((song) => song.id !== songId));
  };

  return (
    <div className="min-h-screen bg-white px-4 py-16">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-11">
          <h1 className="text-5xl font-bold text-gray-900 mb-2 tracking-tight">
            MoodSync
          </h1>
          <p className="text-lg font-medium text-gray-600">
            Generate playlists that match your mood
          </p>
        </div>

        {/* Mood Selector */}
        <Card className="mb-8 shadow-lg border-[#CECECE]">
          <CardHeader>
            <CardTitle className="text-gray-900 text-center">
              Select Your Mood
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {moods.map((mood) => (
                <Button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  variant={selectedMood === mood.id ? "default" : "outline"}
                  className={`h-20 flex flex-col items-center justify-center gap-2 text-gray-900 font-semibold transition-all duration-200 hover:scale-105 ${
                    selectedMood === mood.id
                      ? "bg-white border-[#FF8661] ring-1 ring-[#FF8661] scale-105"
                      : "bg-white hover:bg-gray-50 border-[#b8b8b8]"
                  }`}
                >
                  <span className="size-5">
                    <img
                      className="w-full h-full object-contain"
                      src={mood.emoji}
                    />
                  </span>
                  <span className="text-sm">{mood.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Generate Playlist Button */}
        <div className="flex justify-center">
          <Button
            onClick={generatePlaylist}
            className="bg-[hsla(333,_100%,_53%,_1)]  bg-[linear-gradient(90deg,_hsla(333,_100%,_53%,_1)_0%,_hsla(33,_94%,_57%,_1)_100%)] filter text-white py-5 px-6 text-lg rounded-md"
          >
            <Music className="mr-1 h-5 w-5" />
            Generate Playlist
          </Button>
        </div>

        {generatedPlaylist.length > 0 && (
          <Card className="shadow-lg border-[#CECECE] mt-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900 flex items-center">
                  <Music className="mr-2 h-5 w-5" />
                  Generated Songs
                </CardTitle>
                <Button
                  onClick={() => setPlaylistSongs([...generatedPlaylist])}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={playlistSongs.length === generatedPlaylist.length}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add All Songs
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {generatedPlaylist.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <div className="flex-1">
                    <h4 className="text-gray-900 font-medium">{song.title}</h4>
                    <p className="text-gray-600 text-sm">{song.artist}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => window.open(song.spotifyUrl, "_blank")}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                    {playlistSongs.some((s) => s.id === song.id) && (
                      <Button
                        size="sm"
                        onClick={() => removeSongFromPlaylist(song.id)}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
