import { MainLayout } from 'app/layout/home';
import { Button } from 'ui/button';

export const Notifications = () => {
  return (
    <MainLayout>
      <MainLayout.TextSection>
        <MainLayout.SubTitle>Notifications Management</MainLayout.SubTitle>
        <MainLayout.Title>
          <MainLayout.Span>Noti</MainLayout.Span>fications via SMS, Push & Email
        </MainLayout.Title>
        <MainLayout.Description>
          Stay connected with your tenants and informed of all key updates. Masqany automatically
          sends timely notifications for rent reminders, inquiries, and critical events via SMS,
          PUSH and email. You’ll never miss an important message again.
        </MainLayout.Description>
        <Button className='mt-12'>Request a Demo</Button>
      </MainLayout.TextSection>
      <MainLayout.ImageSection src='images/masqany/Notifications.svg' alt='Notifications' />
    </MainLayout>
  );
};
