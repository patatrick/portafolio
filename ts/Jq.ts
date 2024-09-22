export default
class Jq{
    constructor(
        public element: HTMLElement
    ) {}
    public fadeIn(ms: number = 500): void
    {
        let opacity = 0,
            duration = ms,
            gap = 50 / duration;

        this.element.style.display = 'initial';
        this.element.style.opacity = opacity.toString();

        const fading = window.setInterval(()=>{
            opacity += gap;
            this.element.style.opacity = opacity.toString();
        
            if (opacity <= 0) this.element.style.display = 'none'
            if (opacity <= 0 || opacity >= 1) window.clearInterval(fading);
        }, 50);
    }
    public fadeOut(ms: number = 500): void
    {
        let opacity = 1,
            duration = ms,
            gap = 50 / duration;

        const fading = window.setInterval(()=>{
            opacity -= gap;
            this.element.style.opacity = opacity.toString();
        
            if (opacity <= 0) this.element.style.display = 'none'
            if (opacity <= 0 || opacity >= 1) window.clearInterval(fading);
        }, 50);
    }
    public AddClass(clasName: string){
        this.element.classList.forEach(name =>this.element.classList.remove(name));
        this.element.classList.add(clasName);
    }
    public go(id: string) {
        document.querySelector(id)?.scrollIntoView({behavior: 'smooth'});
    }
    public parallax(velocidad: number) : void
    {
        window.onscroll = ()=>{
            console.log('o');
            
            let barra: number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            let posicion: number =  (barra * velocidad);
            
            this.element.style.backgroundPosition = '0 -' + posicion.toString() + 'px';
        };
    }
}