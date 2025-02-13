import { Button } from 'ui/button';
import { Title } from 'ui/title';

export const Footer = () => {
  return (
    <section className='mt-28 bg-yellow-5 p-24'>
      <div className='flex flex-col items-center gap-20 md:flex-row md:items-start md:justify-between'>
        <div className='flex flex-1 flex-col items-center'>
          <Title as='h6' variant='2xl' className='text-neutral-0 md:self-start'>
            About Property
          </Title>
          <p className='mt-5 break-words text-center text-xl text-neutral-0 md:text-start md:text-2xl'>
            Masqany is a rental property management software that helps landlords and property
            managers streamline their rental operations with real-time insights, tenant management,
            and seamless communication—all in one place.
          </p>
          <Button className='mt-7 md:self-start'>Request a Demo</Button>
        </div>
        <div className='flex flex-1 flex-col items-center'>
          <div className='flex flex-col items-center md:items-start'>
            <Title as='h6' variant='2xl' className='text-neutral-0'>
              Explore
            </Title>
            <ul className='mt-5 text-center text-xl text-neutral-0 md:text-start md:text-2xl'>
              <li>About</li>
              <li>Blog</li>
              <li>Press</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
        <div className='flex flex-1 flex-col items-center'>
          <div className='flex flex-col items-center md:items-start'>
            <Title as='h6' variant='2xl' className='text-neutral-0'>
              Address Info
            </Title>
            <ul className='mt-5 text-center text-xl text-neutral-0 md:text-start md:text-2xl'>
              <li>Features</li>
              <li>Integrations</li>
              <li>Pricing</li>
              <li>Request a Demo</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
