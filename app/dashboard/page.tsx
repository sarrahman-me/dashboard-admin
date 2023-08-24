import { GiHand } from "react-icons/gi";

export default function Dashboard() {
  return (
    <div>
      <p className="hidden md:inline-flex text-lg font-bold text-indigo-500 justify-center items-center">
        Hay !! Selamat datang di{" "}
        <span className="text-black dark:text-white mx-2">sarrahman bangunan</span>{" "}
        <span>
          <GiHand />
        </span>{" "}
      </p>
      <p className="inline-flex md:hidden text-lg font-bold text-indigo-500 justify-center items-center">
        Hay !! Selamat datang{" "}
        <span>
          <GiHand />
        </span>{" "}
      </p>
    </div>
  );
}
