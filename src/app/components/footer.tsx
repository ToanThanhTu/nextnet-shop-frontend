import FooterBottom from "@/app/components/footer-bottom";
import FooterTop from "@/app/components/footer-top";
import SignInPrompt from "@/app/components/signin-prompt";

function Footer() {
  return (
    <footer>
      <SignInPrompt />
      <FooterTop />
      <FooterBottom />
    </footer>
  );
}

export default Footer;
