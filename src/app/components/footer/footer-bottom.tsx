import Link from "next/link";

function FooterBottom() {
  return (
    <div className="bg-footer">
      <div className="border-t-2 border-primary p-4 max-w-screen-lg m-auto text-sm">
        <p className="text-center">
          @ Copyright 2024 |{" "}
          <Link href="https://github.com/ToanThanhTu/nextnet-shop">
            Source Code
          </Link>
        </p>

        <div className="flex justify-center">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <span className="mx-4">|</span>
          <Link href="/terms-and-conditions">Terms & Conditions</Link>
        </div>
      </div>
    </div>
  );
}

export default FooterBottom;
