import FooterBottom from "@/app/components/footer/footer-bottom";
import FooterSignIn from "@/app/components/footer/footer-signin";
import FooterTop from "@/app/components/footer/footer-top";

function Footer() {
  return (
    <footer>
      <FooterSignIn />
      <FooterTop />
      <FooterBottom />
    </footer>
  );
}

export default Footer;
