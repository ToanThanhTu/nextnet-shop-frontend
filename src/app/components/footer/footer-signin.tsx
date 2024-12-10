import Link from "next/link";

function FooterSignIn() {
  return (
    <div className="py-12 text-center">
      <h2>See personalised recommendations</h2>
      <Link href="/login" className="button mt-4 mb-2">Sign in</Link>
      <p className="text-sm">
        New customer? <Link href="/register">Start here.</Link>
      </p>
    </div>
  );
}

export default FooterSignIn;
