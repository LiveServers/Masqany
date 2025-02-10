import { MainLayout } from "app/layout/home"
import { Button } from "ui/button"
import { Title } from "ui/title"

export const RentAndUtilityManagement = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-20">
            <Title variant='3xl' as='h2'>Product Features</Title>
            <MainLayout>
                <MainLayout.TextSection>
                    <Title className="text-yellow-5 text-center md:text-start" as='h6'>Rent & Utility Management</Title>
                    <Title className="mt-3 text-center md:text-start" as='h2' variant='3xl'><span className="underline underline-offset-8 decoration-yellow-5 rounded-lg">Rent</span> and Utility Management</Title>
                    <p className="mt-7 text-neutral-5 text-lg md:text-xl text-center md:text-start">
                        Take the hassle out of tracking rent payments and managing utilities. 
                        Masqany simplifies how you collect payments, handle arrears, and
                        allocate utility costs. With automated tools, you’ll have more time 
                        to focus on growing your rental business.
                    </p>
                    <Button className="mt-12">Request a Demo</Button>
                </MainLayout.TextSection>
                <MainLayout.ImageSection src="images/masqany/Rent&Utility.svg" alt="Property Management" />
            </MainLayout>
        </div>
    )
}