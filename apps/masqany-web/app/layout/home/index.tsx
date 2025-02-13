import type { PropsWithChildren } from 'react';

import { Title as Ttle } from 'ui/title';

const ImageSection = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <section className='hidden md:block'>
      <img src={src} alt={alt} width={500} height={300} />
    </section>
  );
};

const TextSection = ({ children }: PropsWithChildren) => {
  return <section className='flex flex-col items-center md:items-start'>{children}</section>;
};

const Title = ({ children }: PropsWithChildren) => {
  return (
    <Ttle className='mt-3 text-center md:text-start' as='h2' variant='3xl'>
      {children}
    </Ttle>
  );
};

const SubTitle = ({ children }: PropsWithChildren) => {
  return (
    <Ttle className='text-center text-yellow-5 md:text-start' as='h6'>
      {children}
    </Ttle>
  );
};

const Description = ({ children }: PropsWithChildren) => {
  return (
    <p className='mt-7 text-center text-lg text-neutral-5 md:text-start md:text-xl'>{children}</p>
  );
};

const Span = ({ children }: PropsWithChildren) => {
  return (
    <span className='rounded-lg underline decoration-yellow-5 underline-offset-8'>{children}</span>
  );
};

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='mt-28 gap-4 md:grid md:grid-cols-2 md:grid-rows-1 md:px-[60px]'>{children}</div>
  );
};

MainLayout.ImageSection = ImageSection;
MainLayout.TextSection = TextSection;
MainLayout.Title = Title;
MainLayout.SubTitle = SubTitle;
MainLayout.Description = Description;
MainLayout.Span = Span;
