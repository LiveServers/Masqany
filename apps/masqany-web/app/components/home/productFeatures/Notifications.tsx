import { MainLayout } from "app/layout/home"
import { Button } from "ui/button"
import { Title } from "ui/title"

export const Notifications = () => {
    return (
        <MainLayout>
            <MainLayout.TextSection>
                <Title className="text-yellow-5 text-center md:text-start" as='h6'>Notifications Management</Title>
                <Title className="mt-3 text-center md:text-start" as='h2' variant='3xl'><span className="underline underline-offset-8 decoration-yellow-5 rounded-lg">Noti</span>fications via SMS, Push & Email</Title>
                <p className="mt-7 text-neutral-5 text-lg md:text-xl text-center md:text-start">
                    Stay connected with your tenants and informed of all key updates. Masqany 
                    automatically sends timely notifications for rent reminders, inquiries, and 
                    critical events via SMS, PUSH and email. You’ll never miss an important 
                    message again.
                </p>
                <Button className="mt-12">Request a Demo</Button>
            </MainLayout.TextSection>
            <MainLayout.ImageSection src="images/masqany/Notifications.svg" alt="Notifications" />
        </MainLayout>
    )
}