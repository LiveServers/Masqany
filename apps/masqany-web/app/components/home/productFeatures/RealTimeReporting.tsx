import { MainLayout } from 'app/layout/home';
import { Button } from 'ui/button';

export const RealTimeReporting = () => {
  return (
    <MainLayout>
      <MainLayout.ImageSection
        src='images/masqany/RealTimeReporting.svg'
        alt='Real Time Reporting'
      />
      <MainLayout.TextSection>
        <MainLayout.SubTitle>Reporting</MainLayout.SubTitle>
        <MainLayout.Title>
          <MainLayout.Span>Real</MainLayout.Span>-Time Reporting
        </MainLayout.Title>
        <MainLayout.Description>
          Stay on top of your rental business with live, actionable insights. Masqany provides
          instant access to key metrics like rent collection status, arrears, and property
          performance. Make confident decisions backed by accurate, up-to-the-minute data.
        </MainLayout.Description>
        <Button className='mt-12'>Request a Demo</Button>
      </MainLayout.TextSection>
    </MainLayout>
  );
};
