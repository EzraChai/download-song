"use client";

import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { RiLoader4Fill } from "react-icons/ri";

export default function Input() {
  const [youTubeUrl, setYouTubeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url: youTubeUrl }),
    };

    let fileName = "audio";
    try {
      const data = await fetch("https://ytdl-oak.deno.dev/download", options);
      if (!data.ok) {
        throw new Error(await data.json());
      }
      const blob = await data.blob();
      const contentDisposition = await data.headers
        .get("Content-Disposition")
        ?.split(";")[1]
        .trim()
        .split("=")[1]
        .replaceAll('"', "")
        .replace(".mp3", "");
      if (contentDisposition) {
        fileName = decodeURI(contentDisposition);
      }
      const newBlob = new Blob([blob]);
      const blobUrl = window.URL.createObjectURL(newBlob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", `${fileName}.mp3`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);

      // clean up Url
      window.URL.revokeObjectURL(blobUrl);
      setYouTubeUrl("");
      setLoading(false);
    } catch (error: any) {
      setYouTubeUrl("");
      setLoading(false);
      toast.error("Please enter a valid YouTube URL.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col ">
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
        disabled={loading || !youTubeUrl}
        className="px-2 py-2 mt-2 font-semibold text-black transition bg-white border rounded-lg hover:bg-black hover:text-white disabled:bg-neutral-800 disabled:text-neutral-400 disabled:border-[#333]"
        type="submit"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-1">
            <RiLoader4Fill className="animate-spin" width={24} height={24} />
            loading ...
          </div>
        ) : (
          <>Download MP3</>
        )}
      </button>
    </form>
  );
}
