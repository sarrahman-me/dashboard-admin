import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { Typography } from "../../atoms";

const InsightCard = (props: {
  data: string;
  percentase?: number;
  title: string;
  color: "amber" | "emerald" | "sky" | "violet";
  icon: React.ReactNode;
}) => {
  const colorBg = {
    amber:
      "bg-gradient-to-br from-amber-300 to-amber-500 dark:from-amber-700 dark:to-amber-900",
    emerald:
      "bg-gradient-to-br from-emerald-300 to-emerald-500 dark:from-emerald-700 dark:to-emerald-900",
    sky: "bg-gradient-to-br from-sky-300 to-sky-500 dark:from-sky-700 dark:to-sky-900",
    violet:
      "bg-gradient-to-br from-violet-300 to-violet-500 dark:from-violet-700 dark:to-violet-900",
  };

  return (
    <div className={`p-3 rounded ${colorBg[props.color]}`}>
      <div className="flex justify-between">
        {props.icon}
        <Typography variant="subtitle">{props.data}</Typography>
      </div>
      <div className="flex justify-between">
        <Typography variant="helper">{props.title}</Typography>
        {props.percentase && (
          <div className="flex items-center space-x-1">
            {props.percentase <= 0 ? (
              <FaArrowDown
                className={`text-xs ${
                  props.percentase <= 0 ? "text-red-500" : "text-green-500"
                }`}
              />
            ) : (
              <FaArrowUp
                className={`text-xs ${
                  props.percentase <= 0 ? "text-red-500" : "text-green-500"
                }`}
              />
            )}
            <Typography
              color={props.percentase <= 0 ? "danger" : "success"}
              variant="helper"
            >
              {props.percentase}%
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightCard;
