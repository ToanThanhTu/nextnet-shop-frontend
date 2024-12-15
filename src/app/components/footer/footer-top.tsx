import Link from "next/link";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { info } from "@/app/data/contact-me";
import Image from "next/image";
import { categories } from "@/app/data/categories";

function FooterTop() {
  return (
    <div className="bg-footer">
      <div className="w-full h-4 bg-primary" />

      <div className="flex flex-col gap-8 md:flex-row justify-between py-12 px-6 max-w-screen-xl m-auto">
        <div className="w-80">
          <Image
            src="/logo.png"
            alt="Logo"
            width={500}
            height={160}
            className="w-60"
          />
          <p className="mt-4">
            A Demo E-commerce Website built with Next.js, Tailwind CSS, ASP.NET
            and Azure.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>

          <ul className="grid grid-cols-2 gap-4">
            {categories.map((item) => (
              <div key={item.title}>
                <Link href={item.href}>{item.title}</Link>
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
    </div>
  );
}

export default FooterTop;
