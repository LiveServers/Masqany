import { Header } from "app/components/home/header/Header";
import { RentAndUtilityManagement, ComprehensivePropertyOverview, RentalAgreements, RealTimeReporting, Notifications } from "app/components/home/productFeatures";
import { PropertyManagement } from "app/components/home/propertyManagement/PropertyManagement";

export default function Index() {
    return (
        <main className="px-5">
            <Header />
            <PropertyManagement />
            <RentAndUtilityManagement />
            <ComprehensivePropertyOverview />
            <RentalAgreements />
            <RealTimeReporting />
            <Notifications />
        </main>
    )
}