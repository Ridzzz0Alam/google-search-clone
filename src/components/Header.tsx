import Image from "next/image";
import Link from "next/link";
import { TbGridDots } from "react-icons/tb";
import dynamic from "next/dynamic";

const Header: React.FC = () => {
  const url: string =
    "https://cdn-icons-png.flaticon.com/512/10337/10337609.png";

  return (
    <div className="flex justify-between px-4 py-3 md:px-8 md:py-4 items-center">
      <div className="flex space-x-4 items-center">
        <Link
          href="https://mail.google.com"
          className="text-xs md:text-sm hover:underline cursor-pointer"
        >
          Gmail
        </Link>
        <Link
          href="https://images.google.com"
          className="text-xs md:text-sm hover:underline cursor-pointer"
        >
          Images
        </Link>
      </div>
      <div className="flex items-center">
        <TbGridDots className="text-2xl cursor-pointer" />
        <Image
          src={url}
          alt="picture"
          width={30}
          height={30}
          className="rounded-full object-cover cursor-pointer ml-2 md:ml-4"
        />
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
