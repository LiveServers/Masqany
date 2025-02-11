import { MainLayout } from "app/layout/home"
import { Button } from "ui/button"

export const ComprehensivePropertyOverview = () => {
    return (
        <MainLayout>
            <MainLayout.ImageSection src="images/masqany/PropertyManagement.svg" alt="Property Management" />
            <MainLayout.TextSection>
                <MainLayout.SubTitle>Property Overview</MainLayout.SubTitle>
                <MainLayout.Title><MainLayout.Span>Com</MainLayout.Span>prehensive Property Overview</MainLayout.Title>
                <MainLayout.Description>
                    Gain a complete understanding of your rental portfolio with Masqany’s intuitive dashboard.
                    Manage properties, units, tenants, and even visitors from one central location. Our 
                    platform gives you a bird’s-eye view of every detail, helping you stay organized and
                    efficient.
                </MainLayout.Description>
                <Button className="mt-12">Request a Demo</Button>
            </MainLayout.TextSection>
        </MainLayout>
    )
}