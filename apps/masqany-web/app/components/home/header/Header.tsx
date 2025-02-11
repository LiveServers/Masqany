import { LinksFunction } from "@remix-run/node";
import { Button } from "ui/button"

  export const links: LinksFunction = () => {
    return [
        {
          rel: "preload",
          href: "images/masqany/logo.svg",
          as: "image",
        },
        {
          rel: "preload",
          href: "images/masqany/Reporting.svg",
          as: "image",
        },
        {
          rel: "preload",
          href: "images/masqany/Statistics.svg",
          as: "image",
        },
        {
          rel: "preload",
          href: "images/masqany/Hero.svg",
          as: "image",
        }
      ];
  }

export const Header = () => {
    return (
        <header className="relative md:inherit overflow-hidden">
            <div className="flex flex-row w-full justify-between md:pr-[60px]">
                <img src="images/masqany/logo.svg" alt="Masqany Logo" width={200} height={200} />
                <Button>Login</Button>
            </div>
            <div className='md:grid md:grid-cols-2 md:grid-rows-1 md:px-[60px] mt-[60px] md:gap-4'>
              <section>
                <h1 className="md:text-7xl text-6xl font-bold text-center md:text-start">Rental Property</h1>
                <h1 className="md:text-7xl text-6xl font-bold text-center md:text-start"><span className="underline underline-offset-8 decoration-yellow-5 rounded-lg">Mana</span>gement Software</h1>
                <p className="text-2xl mt-11 break-words text-neutral-5 text-center md:text-start">Streamline your rental operations with real-time insights, tenant management, and seamless communication—all in one place.</p>
                <div className="flex justify-center items-center md:block mt-12">
                <Button>Request a Demo</Button>
                </div>
                <div className="flex md:flex-row flex-col justify-start items-center mt-10">
                  <img src="images/masqany/Reporting.svg" alt="Masqany Reporting" width={370} height={198} />
                  <img src="images/masqany/Statistics.svg" alt="Masqany Statistics" width={370} height={198} />
                </div>
              </section>
              <section className="hidden md:block">
                <img src="images/masqany/Hero.svg" alt="Masqany Hero Image" />
              </section>
            </div>
        </header>
    )
}