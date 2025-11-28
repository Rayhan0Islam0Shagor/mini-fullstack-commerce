import Container from '@/components/ui/Container';
import FooterNavigation from './footer-navigations';

const Footer = () => {
  return (
    <footer className="bg-[#393939]">
      <FooterNavigation />

      <div className="bg-[#161616]">
        <Container className="py-4">
          <p className="text-white text-sm lg:text-lg">
            © {new Date().getFullYear()} Winstore. All Rights Reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
