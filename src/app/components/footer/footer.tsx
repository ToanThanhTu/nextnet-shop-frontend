import FooterBottom from "@/app/components/footer/footer-bottom";
import PersonalisedRecommendations from "@/app/components/footer/recommendations";
import FooterTop from "@/app/components/footer/footer-top";

function Footer() {
  return (
    <footer>
      <PersonalisedRecommendations />
      <FooterTop />
      <FooterBottom />
    </footer>
  );
}

export default Footer;
