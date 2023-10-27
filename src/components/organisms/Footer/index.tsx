import Link from "next/link";
import { legalPages, mainPages } from "@/src/data/pages";
import { Logo, Typography } from "../../atoms";
import { FooterText, NavGroup, SocialIcon } from "../../molecules";

/**
 * Komponen `Footer` digunakan untuk menampilkan footer situs web dengan tautan navigasi, ikon media sosial, teks deskripsi, dan hak cipta.
 */

const Footer = () => {
  return (
    <div className="relative">
      <div className="container p-8 mx-auto xl:px-0">
        
        <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-indigo-100 dark:border-indigo-600 lg:grid-cols-5">
          {/* Bagian 1 */}

          <div className="lg:col-span-2">
            <div>
              <Link href="/">
                <Logo size="large" />
              </Link>
            </div>

            <Typography otherClass="max-w-md" color="secondary">
              Kami selalu siap membantu Anda. Jika Anda memiliki pertanyaan atau
              mengalami masalah, kami akan dengan senang hati memberikan bantuan
              yang Anda butuhkan.
            </Typography>
          </div>

          {/* Bagian 2 */}

          <NavGroup pages={mainPages} direction="vertical" />

          {/* Bagian 3 */}

          <NavGroup pages={legalPages} direction="vertical" />

          {/* Bagian 4 */}

          <SocialIcon facebook={"/"} whatsapp={"https://wa.me/6285210211441"} />
        </div>

        <FooterText />
      </div>
    </div>
  );
};

export default Footer;
