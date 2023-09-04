"use client";
import { Tooltip } from "react-tooltip";
import { IoFootstepsSharp, IoHandRight } from "react-icons/io5";
import { TbSwimming } from "react-icons/tb";
import { GiHomeGarage, GiSofa, GiParkBench } from "react-icons/gi";
import { FaBath } from "react-icons/fa";
import { MdKitchen } from "react-icons/md";

export default function IconSelect(props: {
  options: string[];
  selected: string[];
  setSelected: any;
}) {
  function togglePenggunaanUmum(option: string) {
    if (props.selected.includes(option)) {
      props.setSelected(props.selected.filter((item) => item !== option));
    } else {
      props.setSelected([...props.selected, option]);
    }
  }

  return (
    <div className="flex space-x-4">
      {props.options.map((option) => (
        <div
          key={option}
          onClick={() => togglePenggunaanUmum(option)}
          className={`${
            props.selected.includes(option)
              ? "text-indigo-400 border rounded-full border-indigo-400"
              : "text-gray-400"
          } text-2xl cursor-pointer transition duration-300 p-1`}
          title={option}
          data-tooltip-id="tooltip"
          data-tooltip-content={option}
        >
          {option === "Lantai" ? (
            <IoFootstepsSharp />
          ) : option === "Dinding" ? (
            <IoHandRight />
          ) : option === "Teras" ? (
            <GiParkBench />
          ) : option === "Kolam Renang" ? (
            <TbSwimming />
          ) : option === "Kamar Mandi" ? (
            <FaBath />
          ) : option === "Dapur" ? (
            <MdKitchen />
          ) : option === "Dalam Rumah" ? (
            <GiSofa />
          ) : option === "Garasi" ? (
            <GiHomeGarage />
          ) : (
            ""
          )}
        </div>
      ))}
      <Tooltip id="tooltip" />
    </div>
  );
}
