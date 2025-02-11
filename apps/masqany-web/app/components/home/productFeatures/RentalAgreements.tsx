import { MainLayout } from "app/layout/home"
import { Button } from "ui/button"

export const RentalAgreements = () => {
    return (
        <MainLayout>
            <MainLayout.TextSection>
                <MainLayout.SubTitle>Rental agreements</MainLayout.SubTitle>
                <MainLayout.Title><MainLayout.Span>Rent</MainLayout.Span>al agreements</MainLayout.Title>
                <MainLayout.Description>
                    Create, store, and manage rental agreements with ease. Masqany ensures all your
                    lease terms are organized and accessible, giving landlords and tenants confidence
                    in their commitments. Say goodbye to paper trails and hello to secure, digital
                    documentation.
                </MainLayout.Description>
                <Button className="mt-12">Request a Demo</Button>
            </MainLayout.TextSection>
            <MainLayout.ImageSection src="images/masqany/RentalAgreements.svg" alt="Rental Agreements" />
        </MainLayout>
    )
}