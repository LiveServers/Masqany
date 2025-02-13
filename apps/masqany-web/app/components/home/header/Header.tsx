import type { LinksFunction } from '@remix-run/node';

import { Button } from 'ui/button';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'preload',
      href: 'images/masqany/logo.svg',
      as: 'image',
    },
    {
      rel: 'preload',
      href: 'images/masqany/Reporting.svg',
      as: 'image',
    },
    {
      rel: 'preload',
      href: 'images/masqany/Statistics.svg',
      as: 'image',
    },
    {
      rel: 'preload',
      href: 'images/masqany/Hero.svg',
      as: 'image',
    },
  ];
};

export const Header = () => {
  return (
    <header className='md:inherit relative overflow-hidden'>
      <div className='flex w-full flex-row justify-between md:pr-[60px]'>
        <img src='images/masqany/logo.svg' alt='Masqany Logo' width={200} height={200} />
        <Button>Login</Button>
      </div>
      <div className='mt-[60px] md:grid md:grid-cols-2 md:grid-rows-1 md:gap-4 md:px-[60px]'>
        <section>
          <h1 className='text-center text-6xl font-bold md:text-start md:text-7xl'>
            Rental Property
          </h1>
          <h1 className='text-center text-6xl font-bold md:text-start md:text-7xl'>
            <span className='rounded-lg underline decoration-yellow-5 underline-offset-8'>
              Mana
            </span>
            gement Software
          </h1>
          <p className='mt-11 break-words text-center text-2xl text-neutral-5 md:text-start'>
            Streamline your rental operations with real-time insights, tenant management, and
            seamless communication—all in one place.
          </p>
          <div className='mt-12 flex items-center justify-center md:block'>
            <Button>Request a Demo</Button>
          </div>
          <div className='mt-10 flex flex-col items-center justify-start md:flex-row'>
            <img
              src='images/masqany/Reporting.svg'
              alt='Masqany Reporting'
              width={370}
              height={198}
            />
            <img
              src='images/masqany/Statistics.svg'
              alt='Masqany Statistics'
              width={370}
              height={198}
            />
          </div>
        </section>
        <section className='hidden md:block'>
          <img src='images/masqany/Hero.svg' alt='Masqany Hero Image' />
        </section>
      </div>
    </header>
  );
};
