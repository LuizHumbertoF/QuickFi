import logoVerde from "./logo-fundo-verde.png"

interface BasicLogoTextProps {
    white ?: boolean
    posStart ?: boolean
}

export function BasicLogoText(props: BasicLogoTextProps) {

    return (
        <div className={props.posStart ? ("flex gap-3 justify-start items-center") : ("flex gap-3 justify-center items-center")}>
                    
            <img className='w-12 h-12 rounded-lg' src={logoVerde} alt='Logo QuickFi'/>
        
            <h2 className={props.white ? 
                    ('font-sans font-bold text-2xl text-white') 
                : 
                    ('font-sans font-bold text-2xl')}>
                QuickFi
            </h2>
        </div>
    )
}