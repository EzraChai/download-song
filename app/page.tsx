import Image from "next/image";
import Input from "../components/Input";
import logo from "@/public/logo.jpg";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24 text-white">
      <div className="max-w-2xl p-8 bg-black border border-[#333] rounded-lg">
        <div className="grid grid-cols-7 gap-4 mb-6">
          <Image src={logo} alt="logo" className="col-span-1 bg-white" />
          <div className="self-center col-span-6 px-4">
            <h2 className="text-3xl font-bold ">TubeToMP3</h2>
            <p className="text-base text-neutral-400">
              Convert YouTube videos to MP3 easily.
            </p>
          </div>
        </div>
        <Input />
      </div>
    </main>
  );
}
