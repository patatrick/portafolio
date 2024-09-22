import Jq from "./Jq.js";
export default
class Portfolio {
    public Execute(): void
    {
        const body = document.querySelector('body') as HTMLElement;
        new Jq(body).AddClass('portafolio')
        const btnVerMas = document.querySelectorAll('#habilidades button') as NodeListOf<HTMLButtonElement>;
        btnVerMas.forEach(element => {
            element.onclick = ()=>{
                const texto = element.parentElement!.parentElement!.children[1] as HTMLDivElement;
                const display = texto.style.display;
                if (display == 'none') {
                    new Jq(texto).fadeIn();
                }
                else{
                    new Jq(texto).fadeOut();
                }
            }
        });

        document.querySelector('#_portada')!.addEventListener('click', (e) =>
        {
            e.preventDefault();
            new Jq(body).go("#portada");
        });
        document.querySelector('#_contact')!.addEventListener('click', (e) =>
        {
            e.preventDefault();
            new Jq(body).go("#contact");
        });
    }
}