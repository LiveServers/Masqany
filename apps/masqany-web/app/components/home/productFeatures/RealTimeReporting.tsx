import { MainLayout } from "app/layout/home"
import { Button } from "ui/button"
import { Title } from "ui/title"

export const RealTimeReporting = () => {
    return (
        <MainLayout>
            <MainLayout.ImageSection src="images/masqany/RealTimeReporting.svg" alt="Real Time Reporting" />
            <MainLayout.TextSection>
                <Title className="text-yellow-5 text-center md:text-start" as='h6'>Reporting</Title>
                <Title className="mt-3 text-center md:text-start" as='h2' variant='3xl'><span className="underline underline-offset-8 decoration-yellow-5 rounded-lg">Real</span>-Time Reporting</Title>
                <p className="mt-7 text-neutral-5 text-lg md:text-xl text-center md:text-start">
                    Stay on top of your rental business with live, actionable insights. Masqany provides 
                    instant access to key metrics like rent collection status, arrears, and property
                    performance. Make confident decisions backed by accurate, up-to-the-minute data.
                </p>
                <Button className="mt-12">Request a Demo</Button>
            </MainLayout.TextSection>
        </MainLayout>
    )
}