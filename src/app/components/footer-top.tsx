import { menu } from "@/app/data/menu";
import Link from "next/link";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { info } from "@/app/data/contact-me";
import Image from "next/image";

function FooterTop() {
  return (
    <div className="flex justify-between">
      <div>
        <Image src="/logo.png" alt="Logo" width={500} height={160} />
        <p>Lorem Ipsum</p>
      </div>

      <div>
        <h3>Quick Links</h3>

        <ul className="grid grid-cols-2 gap-4">
          {menu.map((item) => (
            <div key={item.title}>
              <Link href={item.href}>
                {item.title}
              </Link>
            </div>
          ))}
        </ul>
      </div>

      <div>
        <h3>Contact Me</h3>

        <div className="flex gap-2">
          <PhoneAndroidIcon />
          <Link href={`tel:${info.phone}`}>{info.phone}</Link>
        </div>

        <div className="flex gap-2">
          <EmailIcon />
          <Link href={`mailto:${info.email}`}>{info.email}</Link>
        </div>

        <div className="flex gap-2">
          <LinkedInIcon />
          <Link href={info.linkedin}>LinkedIn</Link>
        </div>

        <div className="flex gap-2">
          <GitHubIcon />
          <Link href={info.github}>GitHub</Link>
        </div>

        <div className="flex gap-2">
          <PlaceIcon />
          <p>{info.address}</p>
        </div>
      </div>
    </div>
  );
}

export default FooterTop;
