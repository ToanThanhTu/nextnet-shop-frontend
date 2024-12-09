import Link from "next/link";

function FooterBottom() {
  return (
    <div className="border-t-2 pt-8 flex justify-between">
      <p>
        @ Copyright 2024 |{" "}
        <Link href="https://github.com/ToanThanhTu/nextnet-shop">
          Source Code
        </Link>
      </p>

      <div className="flex">
        <Link href="/privacy-policy">Privacy Policy</Link>
        <span className="mx-4">|</span>
        <Link href="/terms-and-conditions">Terms & Conditions</Link>
      </div>
    </div>
  );
}

export default FooterBottom;
