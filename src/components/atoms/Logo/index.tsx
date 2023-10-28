import { FaMountainSun } from "react-icons/fa6";

/**
 * Logo perusahaan TokoKeramik.com
 *
 * @param {string} size - Ukuran logo ("small", "medium", "large") (opsional default medium).
 */

interface LogoProps {
  size?: "small" | "medium" | "large";
}

const Logo = ({ size }: LogoProps) => {
  const classSize = {
    small: "text-base",
    medium: "text-xl",
    large: "text-2xl",
  };

  const className = `flex select-none items-center divide-x-2 divide-transparent font-serif
    ${classSize[size || "medium"]}
  `;

  return (
    <span className={className}>
      <p>Tokokera</p>
      <FaMountainSun className="text-lime-600" />
      <p>ik.com</p>
    </span>
  );
};

export default Logo;
