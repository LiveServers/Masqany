import { PropsWithChildren } from "react"
import { Title as Ttle } from "ui/title"

const ImageSection = ({src, alt}: {src: string, alt: string}) => {
    return (
        <section className="hidden md:block">
            <img src={src} alt={alt} width={500} height={300}  />
        </section>
    )
}

const TextSection = ({children}: PropsWithChildren) => {
    return (
        <section className="flex flex-col md:items-start items-center">
            {children}
        </section>
    )
}

const Title = ({children}: PropsWithChildren) => {   
    return (
        <Ttle className="mt-3 text-center md:text-start" as='h2' variant='3xl'>{children}</Ttle>
    )
}

const SubTitle = ({children}: PropsWithChildren) => {   
    return (
        <Ttle className="text-yellow-5 text-center md:text-start" as='h6'>{children}</Ttle>
    )
}

const Description = ({children}: PropsWithChildren) => {
    return (
        <p className="mt-7 text-neutral-5 text-lg md:text-xl text-center md:text-start">{children}</p>
    )
}

const Span = ({children}: PropsWithChildren) => {
    return (
        <span className="underline underline-offset-8 decoration-yellow-5 rounded-lg">{children}</span>
    )
}

export const MainLayout = ({children}: PropsWithChildren) => {
    return (
        <div className="md:grid md:grid-rows-1 md:grid-cols-2 gap-4 mt-28 md:px-[60px]">
            {children}
        </div>
    )
}

MainLayout.ImageSection = ImageSection;
MainLayout.TextSection = TextSection;
MainLayout.Title = Title;
MainLayout.SubTitle = SubTitle;
MainLayout.Description = Description;
MainLayout.Span = Span;