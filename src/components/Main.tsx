"use client";
/* eslint-disable react/no-unescaped-entities */
import "regenerator-runtime";
import Image from "next/image";
import { AiOutlineSearch, AiFillCamera } from "react-icons/ai";
import { BiMicrophone } from "react-icons/bi";
import { BsFillMicFill } from "react-icons/bs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import dynamic from "next/dynamic";

const Main: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const googleLogo: string =
    "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";

  function onSearchSubmit({
    e,
  }: {
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>;
  }): void {
    e.preventDefault();
    router.push(`https://www.google.com/search?q=${search}`);
  }

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setSearch(transcript);
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div className="items-center flex flex-col mt-10 md:mt-20 lg:mt-28">
      <Image src={googleLogo} alt="Google-Logo" height={100} width={270} />
      <form
        onSubmit={(e) => onSearchSubmit({ e })}
        className="flex border mt-7 px-2 md:px-5 py-1 md:py-2 rounded-full w-11/12 md:w-2/3 lg:w-2/5 items-center hover:shadow-md"
      >
        <AiOutlineSearch className="text-lg md:text-xl text-slate-400" />
        <input
          type="text"
          className="w-full focus:outline-none ml-2 md:ml-4"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        {listening ? (
          <BsFillMicFill
            onClick={stopListening}
            className="text-2xl md:text-3xl text-slate-400 ml-2 md:mr-5 cursor-pointer"
          />
        ) : (
          <BiMicrophone
            onClick={startListening}
            className="text-2xl md:text-3xl text-slate-400 ml-2 md:mr-5 cursor-pointer"
          />
        )}
        <AiFillCamera className="text-2xl md:text-3xl text-slate-400 cursor-pointer" />
      </form>
      <div className="flex mt-5 md:mt-7">
        <button
          className="bg-slate-100 mr-2 md:mr-3 py-1 md:py-2 px-2 md:px-4 text-xs md:text-sm rounded hover:border"
          onClick={(e) => onSearchSubmit({ e })}
        >
          Google Search
        </button>
        <button
          className="bg-slate-100 py-1 md:py-2 px-2 md:px-4 text-xs md:text-sm rounded hover:border"
          onClick={() => router.push("http://www.google.com/doodles")}
        >
          I'm Feeling Lucky
        </button>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Main), { ssr: false });
