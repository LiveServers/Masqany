import { MainLayout } from "app/layout/home"
import { Button } from "ui/button"
import { Title } from "ui/title"

export const RentalAgreements = () => {
    return (
        <MainLayout>
            <MainLayout.TextSection>
                <Title className="text-yellow-5 text-center md:text-start" as='h6'>Rental agreements</Title>
                <Title className="mt-3 text-center md:text-start" as='h2' variant='3xl'><span className="underline underline-offset-8 decoration-yellow-5 rounded-lg">Rent</span>al agreements</Title>
                <p className="mt-7 text-neutral-5 text-lg md:text-xl text-center md:text-start">
                    Create, store, and manage rental agreements with ease. Masqany ensures all your
                    lease terms are organized and accessible, giving landlords and tenants confidence
                    in their commitments. Say goodbye to paper trails and hello to secure, digital
                    documentation.
                </p>
                <Button className="mt-12">Request a Demo</Button>
            </MainLayout.TextSection>
            <MainLayout.ImageSection src="images/masqany/RentalAgreements.svg" alt="Rental Agreements" />
        </MainLayout>
    )
}