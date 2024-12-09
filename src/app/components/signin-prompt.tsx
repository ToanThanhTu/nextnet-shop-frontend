import { Button } from "@/app/components/ui/button";
import Link from "next/link";

function SignInPrompt() {
  return (
    <div>
      <h2>See personalised recommendations</h2>
      <Link href="/sign-in">
        <Button>Sign in</Button>
      </Link>
      <p>
        New customer? <Link href="/register">Start here.</Link>
      </p>
    </div>
  );
}

export default SignInPrompt;
