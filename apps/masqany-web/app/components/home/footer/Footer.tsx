import { Button } from "ui/button"
import { Title } from "ui/title"

export const Footer = () => {
    return (
        <section className="bg-yellow-5 p-24 mt-28">
            <div className="flex md:flex-row md:justify-between md:items-start items-center gap-20 flex-col">
                <div className="flex flex-col items-center flex-1">
                    <Title as='h6' variant='2xl' className="text-neutral-0 md:self-start">About Property</Title>
                    <p className="text-neutral-0 md:text-2xl text-xl mt-5 break-words text-center md:text-start">Masqany is a rental property management software that helps landlords and property managers streamline their rental operations with real-time insights, tenant management, and seamless communication—all in one place.</p>
                    <Button className="mt-7 md:self-start">Request a Demo</Button>
                </div>
                <div className="flex flex-col items-center flex-1">
                    <div className="flex flex-col md:items-start items-center">
                        <Title as='h6' variant='2xl' className="text-neutral-0">Explore</Title>
                        <ul className="text-neutral-0 mt-5 md:text-2xl text-xl text-center md:text-start">
                            <li>About</li>
                            <li>Blog</li>
                            <li>Press</li>
                            <li>Terms of Service</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col items-center flex-1">
                    <div className="flex flex-col md:items-start items-center">
                        <Title as='h6' variant='2xl' className="text-neutral-0">Address Info</Title>
                        <ul className="text-neutral-0 mt-5 md:text-2xl text-xl text-center md:text-start">
                            <li>Features</li>
                            <li>Integrations</li>
                            <li>Pricing</li>
                            <li>Request a Demo</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}