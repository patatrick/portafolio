import Jq from "./Jq.js";
export default
class Portfolio {
    public Execute(): void
    {
        const body = document.querySelector('body') as HTMLElement;
        const jq = new Jq(body);
        jq.AddClass('portafolio');
        const btnCarousel = document.querySelectorAll('.carousel-item button') as NodeListOf<HTMLButtonElement>;
        btnCarousel.forEach(btn => {
            btn.addEventListener('click', (e)=>{
                const self = e.currentTarget! as HTMLButtonElement;
                jq.go(self.id);
            });
        });
        
        document.querySelector('#_portada')!.addEventListener('click', (e) =>
        {
            e.preventDefault();
            jq.go("#portada");
        });
        document.querySelector('#_contact')!.addEventListener('click', (e) =>
        {
            e.preventDefault();
            jq.go("#contact");
        });
    }
}