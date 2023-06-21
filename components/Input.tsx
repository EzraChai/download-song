"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Input() {
  const [youTubeUrl, setYouTubeUrl] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div
      className="flex flex-col gap-4"
      aria-label="YouTube video to MP3 converter form"
    >
      <div className="flex flex-col">
        <label htmlFor="urlInput" className="mb-1 text-base font-semibold">
          YouTube URL <span className="text-red-500">*</span>
        </label>
        <input
          value={youTubeUrl}
          autoComplete="off"
          onChange={(e) => setYouTubeUrl(e.target.value)}
          title="Please enter a valid YouTube URL."
          id="urlInput"
          required
          pattern="^(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?.*?(?:v|list)=(.*?)(?:&|$)|^(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?(?:(?!=).)*\/(.*)"
          placeholder="https://"
          className="px-2 placeholder:text-base py-2 bg-black placeholder:text-neutral-500 border border-[#333] rounded-lg outline-none focus:border-white text-base"
          name="url"
          type="text"
        />
      </div>

      <button
        onClick={() => {
          try {
            window.location.href = `${process.env.NEXT_PUBLIC_DOWNLOAD_SONG_BACKEND_URL}?url=${youTubeUrl}`;
            setYouTubeUrl("");
          } catch (error) {
            setYouTubeUrl("");
            toast.error("Please enter a valid YouTube URL.");
          }
        }}
        disabled={!!loading || youTubeUrl.trim().length === 0}
        className="px-2 py-2 mt-2 font-semibold text-black transition bg-white border rounded-lg hover:bg-black hover:text-white disabled:bg-neutral-800 disabled:text-neutral-400 disabled:border-[#333]"
        aria-label="Download MP3 button"
      >
        Download MP3
      </button>
    </div>
  );
}
