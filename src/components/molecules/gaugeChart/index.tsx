export default function GaugeChartComp({ data }: { data: number }) {
  const getColor = () => {
    if (data < 25) {
      return "bg-gradient-to-t from-green-500 to-lime-400";
    } else if (data > 25 && data < 50) {
      return "bg-gradient-to-t from-lime-500 to-yellow-400";
    } else if (data > 50 && data < 75) {
      return "bg-gradient-to-t from-yellow-500 to-orange-400";
    } else if (data > 75 && data < 90) {
      return "bg-gradient-to-t from-orange-500 to-red-400";
    } else if (data > 90) {
      return "bg-red-500";
    } else {
      return "bg-green-500";
    }
  };

  const boxShadowColor = () => {
    if (data < 40) {
      return "lime-500";
    } else if (data >= 40 && data < 50) {
      return "yellow-500";
    } else if (data >= 50 && data < 65) {
      return "yellow-500";
    } else if (data >= 65 && data < 75) {
      return "red-500";
    } else {
      return "red-500";
    }
  };

  return (
    <div
      className={`w-32 h-32 relative ${getColor()} rounded-full overflow-hidden`}
    >
      <div
        className={`flex justify-center items-center w-full h-full absolute inset-0 rounded-full shadow-inner bg-${boxShadowColor()}`}
        style={{ zIndex: -1 }}
      ></div>
      <span className="text-black text-center font-bold absolute w-full top-1/2 transform -translate-y-1/2">
        {data}%
      </span>
    </div>
  );
}
