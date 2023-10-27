"use client";
import { BsWhatsapp } from "react-icons/bs";
import { IconButton } from "../../atoms";
import { FaFacebookF } from "react-icons/fa";
import { useRouter } from "next/navigation";

/**
 * Komponen `SocialIcon` digunakan untuk menampilkan ikon tautan media sosial (seperti WhatsApp, Facebook) dan mengarahkan pengguna ke tautan yang sesuai saat ikon diklik.
 *
 * @param {string} whatsapp - Tautan WhatsApp yang akan digunakan.
 * @param {string} facebook - Tautan Facebook yang akan digunakan.
 */

interface SocialIconProps {
  facebook?: string;
  whatsapp?: string;
}

const SocialIcon = ({ whatsapp, facebook }: SocialIconProps) => {
  const router = useRouter();

  return (
    <div>
      {whatsapp && (
        <a target="_blank" href={whatsapp} rel="noopener noreferrer">
          <IconButton
            color="success"
            otherClass="m-1"
            size="small"
            onClick={() => console.log(whatsapp)}
            icon={<BsWhatsapp />}
          />
        </a>
      )}
      {facebook && (
        <a target="_blank" href={facebook} rel="noopener noreferrer">
          <IconButton
            otherClass="m-1"
            size="small"
            onClick={() => console.log(facebook)}
            icon={<FaFacebookF />}
          />
        </a>
      )}
    </div>
  );
};

export default SocialIcon;
