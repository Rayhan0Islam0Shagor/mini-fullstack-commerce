import Container from '@/components/ui/Container';
import {
  FOOTER_CONTACT,
  FOOTER_LINK_GROUPS,
  PAYMENT_METHODS,
} from './footer-data';
import FooterContactBlock from './molecules/FooterContactBlock';
import FooterLinkGroup from './molecules/FooterLinkGroup';
import FooterPayments from './molecules/FooterPayments';

const FooterNavigation = () => {
  return (
    <div className="pt-16 pb-12">
      <Container className="gap-4 sm:gap-6 lg:gap-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2 md:col-span-3 lg:col-span-2">
          <FooterContactBlock {...FOOTER_CONTACT} />
        </div>

        {FOOTER_LINK_GROUPS.map((group) => (
          <FooterLinkGroup key={group.heading} {...group} />
        ))}
      </Container>
      <Container className="grid grid-cols-5 pt-6 gap-4 sm:gap-6 lg:gap-10">
        <div className="col-span-3 hidden lg:block"></div>
        <FooterPayments
          methods={PAYMENT_METHODS}
          className="col-span-5 lg:col-span-2"
        />
      </Container>
    </div>
  );
};

export default FooterNavigation;
