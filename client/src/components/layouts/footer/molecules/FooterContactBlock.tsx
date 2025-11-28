import Image from 'next/image';
import FooterHeading from '../atoms/FooterHeading';
import FooterText from '../atoms/FooterText';
import SocialIconButton from '../atoms/SocialIconButton';
import type { FooterContactInfo } from '../footer-data';

const FooterContactBlock = ({
  tagline,
  phoneNumbers,
  email,
  socials,
}: FooterContactInfo) => {
  return (
    <div className="max-w-sm space-y-4">
      <div>
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={100}
          height={100}
          className="object-contain h-auto"
        />
        <FooterHeading className="mt-2 font-normal">{tagline}</FooterHeading>
      </div>

      <div className="mt-2 space-y-1">
        {phoneNumbers.map((phone) => (
          <FooterText key={phone} className="text-sm font-normal">
            {phone}
          </FooterText>
        ))}
      </div>

      <div>
        <FooterHeading className="mt-2 font-normal">Contact Info</FooterHeading>
        <FooterText>{email}</FooterText>
      </div>

      <div className="flex items-center gap-3">
        {socials.map((social) => (
          <SocialIconButton key={social.label} {...social} />
        ))}
      </div>
    </div>
  );
};

export default FooterContactBlock;
