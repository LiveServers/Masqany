import { MainLayout } from "app/layout/home"
import { Button } from "ui/button"
import { Title } from "ui/title"

export const ComprehensivePropertyOverview = () => {
    return (
        <MainLayout>
            <MainLayout.ImageSection src="images/masqany/PropertyManagement.svg" alt="Property Management" />
            <MainLayout.TextSection>
                <Title className="text-yellow-5 text-center md:text-start" as='h6'>Property Overview</Title>
                <Title className="mt-3 text-center md:text-start" as='h2' variant='3xl'><span className="underline underline-offset-8 decoration-yellow-5 rounded-lg">Com</span>prehensive Property Overview</Title>
                <p className="mt-7 text-neutral-5 text-lg md:text-xl text-center md:text-start">
                    Gain a complete understanding of your rental portfolio with Masqany’s intuitive dashboard.
                    Manage properties, units, tenants, and even visitors from one central location. Our 
                    platform gives you a bird’s-eye view of every detail, helping you stay organized and
                    efficient.
                </p>
                <Button className="mt-12">Request a Demo</Button>
            </MainLayout.TextSection>
        </MainLayout>
    )
}