import { MainLayout } from 'app/layout/home';
import { Button } from 'ui/button';
import { Title } from 'ui/title';

export const RentAndUtilityManagement = () => {
  return (
    <div className='mt-20 flex flex-col items-center justify-center'>
      <Title variant='3xl' as='h2'>
        Product Features
      </Title>
      <MainLayout>
        <MainLayout.TextSection>
          <MainLayout.SubTitle>Rent & Utility Management</MainLayout.SubTitle>
          <MainLayout.Title>
            <MainLayout.Span>Rent</MainLayout.Span> and Utility Management
          </MainLayout.Title>
          <MainLayout.Description>
            Take the hassle out of tracking rent payments and managing utilities. Masqany simplifies
            how you collect payments, handle arrears, and allocate utility costs. With automated
            tools, you’ll have more time to focus on growing your rental business.
          </MainLayout.Description>
          <Button className='mt-12'>Request a Demo</Button>
        </MainLayout.TextSection>
        <MainLayout.ImageSection src='images/masqany/Rent&Utility.svg' alt='Property Management' />
      </MainLayout>
    </div>
  );
};
