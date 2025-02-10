import { MainLayout } from "app/layout/home"
import { Button } from "ui/button"
import { Title } from "ui/title"

export const PropertyManagement = () => {
    return (
        <MainLayout>
            <MainLayout.ImageSection src="images/masqany/PropertyManagement.svg" alt="Property Management" />
            <MainLayout.TextSection>
                <Title className="text-yellow-5 text-center md:text-start" as='h6'>About Masqany</Title>
                <Title className="mt-3 text-center md:text-start" as='h2' variant='3xl'><span className="underline underline-offset-8 decoration-yellow-5 rounded-lg">Rent</span>al Property Management</Title>
                <p className="mt-7 text-neutral-5 text-lg md:text-xl text-center md:text-start">Masqany is a cutting-edge property management platform designed to simplify rental operations
                    for landlords. With real-time insights, automated tools, and seamless communication features, 
                    Masqany helps you manage properties, tenants, and finances efficiently—all from one intuitive dashboard.
                </p>
                <Button className="mt-12">Request a Demo</Button>
            </MainLayout.TextSection>
        </MainLayout>
    )
}