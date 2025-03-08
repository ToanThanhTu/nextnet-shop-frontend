import Link from "next/link";

function FooterBottom() {
  return (
    <div className="bg-footer">
      <div className="border-t-2 border-primary p-4 max-w-screen-lg m-auto text-sm">
        <div className="flex justify-center">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <span className="mx-4">|</span>
          <Link href="/terms-and-conditions">Terms & Conditions</Link>
          <span className="mx-4">|</span>
          <Link href="https://github.com/ToanThanhTu/nextnet-shop">
            Source Code
          </Link>
        </div>

        <div className="text-center my-2">
          <p>Copyright © 2025 Next Net Shop v1.0.4. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default FooterBottom;
