"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Music, Pencil } from "lucide-react";
import { sampleSongs } from "./songs";
import chillIcon from "./assets/chill.png";
import energeticIcon from "./assets/energetic.png";
import happyIcon from "./assets/happy.png";
import sadIcon from "./assets/sad.png";
import wittyIcon from "./assets/witty.png";
import mysteriousIcon from "./assets/mysterious.png";
import playIcon from "./assets/play.png";

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
  const [playlistName, setPlaylistName] = useState("");
  const inputRef = useRef(null);

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
      <div className="mx-auto flex max-w-6xl flex-col items-center">
        {/* Header */}
        <div className="mb-11 text-center">
          <h1 className="mb-2 text-5xl font-bold tracking-tight text-gray-900">
            MoodSync
          </h1>
          <p className="text-lg font-medium text-gray-600">
            Generate playlists that match your mood
          </p>
        </div>

        {/* Mood Selector */}
        <Card className="mb-8 border-[#CECECE] shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-gray-900">
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
                  className={`flex h-20 flex-col items-center justify-center gap-2 font-semibold text-gray-900 transition-all duration-200 hover:scale-105 ${
                    selectedMood === mood.id
                      ? "scale-105 border-[#FF8661] bg-white ring-2 ring-[#FF8661]"
                      : "border-[#b8b8b8] bg-white hover:bg-gray-50"
                  }`}
                >
                  <span className="size-5">
                    <img
                      className="h-full w-full object-contain"
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
            className="rounded-md bg-[#ff0f7b] bg-[linear-gradient(90deg,_hsla(333,_100%,_53%,_1)_0%,_hsla(33,_94%,_57%,_1)_100%)] px-6 py-5 text-lg text-white filter"
          >
            <Music className="mr-1 h-5 w-5" />
            Generate Playlist
          </Button>
        </div>
        {generatedPlaylist.length > 0 && (
          <Card className="mt-8 border-[#CECECE] shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-gray-900 hover:text-[#FF7D55]">
                  <Input
                    ref={inputRef}
                    type="text"
                    className="rounded border-none p-0 !text-xl text-gray-900 shadow-none placeholder:text-xl placeholder:text-gray-900 hover:placeholder:text-[#FF7D55] focus-visible:ring-0"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    placeholder="My playlist"
                  />
                  <Pencil className="mt-1" size={16} />
                </CardTitle>
                <Button
                  onClick={() => setPlaylistSongs([...generatedPlaylist])}
                  className="rounded-sm bg-white text-gray-900 ring-1 ring-gray-900 hover:bg-gray-200"
                  disabled={playlistSongs.length === generatedPlaylist.length}
                >
                  <Plus className="mr-1 h-4 w-4 text-gray-900" />
                  Add song
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {generatedPlaylist.map((song) => (
                <div
                  key={song.id}
                  className="flex justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-gray-100"
                >
                  <div className="group relative mr-4 size-16 rounded-md bg-gray-300">
                    <img
                      src="https://placehold.co/600x400"
                      className="rounded-lg"
                    />
                    <button className="absolute inset-0 m-auto hidden h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white group-hover:flex">
                      <img src={playIcon} className="ml-0.5 h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{song.title}</h4>
                    <p className="text-sm text-gray-600">{song.artist}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      onClick={() => removeSongFromPlaylist(song.id)}
                      className="rounded-[0.2rem] bg-gray-50 p-1 text-gray-900 ring-1 ring-gray-900 hover:text-red-500 hover:ring-red-500"
                    >
                      <Trash2 size={20} strokeWidth={1.5} />
                    </div>
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
