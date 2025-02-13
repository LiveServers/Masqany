import { Footer } from 'app/components/home/footer';
import { Header } from 'app/components/home/header';
import {
  ComprehensivePropertyOverview,
  Notifications,
  RealTimeReporting,
  RentalAgreements,
  RentAndUtilityManagement,
} from 'app/components/home/productFeatures';
import { PropertyManagement } from 'app/components/home/propertyManagement/PropertyManagement';

export default function Index() {
  return (
    <>
      <main className='px-5'>
        <Header />
        <PropertyManagement />
        <RentAndUtilityManagement />
        <ComprehensivePropertyOverview />
        <RentalAgreements />
        <RealTimeReporting />
        <Notifications />
      </main>
      <Footer />
    </>
  );
}
