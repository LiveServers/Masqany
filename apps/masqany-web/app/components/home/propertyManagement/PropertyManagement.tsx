import { MainLayout } from "app/layout/home"
import { Button } from "ui/button"

export const PropertyManagement = () => {
    return (
        <MainLayout>
            <MainLayout.ImageSection src="images/masqany/PropertyManagement.svg" alt="Property Management" />
            <MainLayout.TextSection>
                <MainLayout.SubTitle>About Masqany</MainLayout.SubTitle>
                <MainLayout.Title><MainLayout.Span>Rent</MainLayout.Span>al Property Management</MainLayout.Title>
                <MainLayout.Description>
                    Masqany is a cutting-edge property management platform designed to simplify rental operations
                    for landlords. With real-time insights, automated tools, and seamless communication features, 
                    Masqany helps you manage properties, tenants, and finances efficiently—all from one intuitive dashboard.
                </MainLayout.Description>
                <Button className="mt-12">Request a Demo</Button>
            </MainLayout.TextSection>
        </MainLayout>
    )
}