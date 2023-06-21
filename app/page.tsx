import Image from "next/image";
import Input from "../components/Input";
import logo from "@/public/logo.jpg";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 text-white md:p-24">
      <div className="max-w-2xl p-4 md:p-8 bg-black border border-[#333] rounded-lg">
        <div className="grid grid-cols-7 gap-4 mb-6">
          <Image
            src={logo}
            alt="TubeToMP3 logo"
            className="col-span-2 bg-white md:col-span-1"
            aria-label="TubeToMP3 logo"
          />
          <div className="self-center col-span-5 px-4 md:col-span-6">
            <h2 className="text-xl font-bold md:text-3xl ">TubeToMP3</h2>
            <p className="text-sm md:text-base text-neutral-400">
              Convert YouTube videos to MP3 with album art.
            </p>
          </div>
        </div>
        <Input />
      </div>
    </main>
  );
}
