"use client"

import { XCircle } from "lucide-react"

export function PlaylistItem({ song, onRemove }) {
  return (
    <div className="flex items-center justify-between bg-white bg-opacity-10 p-3 rounded-lg hover:bg-opacity-15 transition-colors">
      <div className="flex-1">
        <h3 className="font-medium">{song.title}</h3>
        <p className="text-sm text-purple-200">{song.artist}</p>
      </div>

      <div className="flex items-center gap-2">
        <a
          href={song.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.622.622 0 11-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.623.623 0 01.207.857zm1.223-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.786-2.13-9.965-1.166a.78.78 0 01-.973-.516.781.781 0 01.517-.972c3.632-1.102 8.147-.569 11.235 1.324a.78.78 0 01.258 1.073zm.105-2.835c-3.223-1.914-8.54-2.09-11.618-1.156a.935.935 0 11-.542-1.79c3.532-1.072 9.404-.865 13.115 1.338a.936.936 0 11-.955 1.608z" />
          </svg>
        </a>

        <button
          onClick={onRemove}
          className="text-gray-300 hover:text-red-400 transition-colors"
          aria-label="Remove song"
        >
          <XCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
