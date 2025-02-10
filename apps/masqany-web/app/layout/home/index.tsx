import { PropsWithChildren } from "react"

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

export const MainLayout = ({children}: PropsWithChildren) => {
    return (
        <div className="md:grid md:grid-rows-1 md:grid-cols-2 gap-4 mt-28 md:px-[60px]">
            {children}
        </div>
    )
}

MainLayout.ImageSection = ImageSection;
MainLayout.TextSection = TextSection;