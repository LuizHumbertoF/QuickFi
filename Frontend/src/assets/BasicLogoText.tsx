import logoVerde from "./logo-fundo-verde.png"

export function BasicLogoText() {

    return (
        <div className="flex gap-3 justify-center items-center">
                    
            <img className='w-12 h-12 rounded-lg' src={logoVerde} alt='Logo QuickFi'/>
        
            <h2 className='font-sans font-bold text-2xl'>QuickFi</h2>
        </div>
    )
}