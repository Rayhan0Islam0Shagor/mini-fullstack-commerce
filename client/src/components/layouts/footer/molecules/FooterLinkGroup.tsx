import FooterHeading from '../atoms/FooterHeading';
import FooterLink from '../atoms/FooterLink';
import type { FooterLinkGroup as FooterLinkGroupType } from '../footer-data';

const FooterLinkGroup = ({ heading, links }: FooterLinkGroupType) => {
  return (
    <div>
      <FooterHeading className="mb-4 text-lg lg:text-xl font-normal">
        {heading}
      </FooterHeading>
      <ul className="space-y-2">
        {links.map((link) => (
          <FooterLink key={link.label} {...link} />
        ))}
      </ul>
    </div>
  );
};

export default FooterLinkGroup;
