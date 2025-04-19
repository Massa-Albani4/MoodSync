"use client"

export function MoodButton({ mood, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-5 py-2 rounded-full text-sm font-medium transition-all
        ${
          isSelected
            ? "bg-gradient-to-r from-pink-500 to-purple-500 shadow-md transform scale-105"
            : "bg-white bg-opacity-20 hover:bg-opacity-30"
        }
      `}
    >
      {mood}
    </button>
  )
}
