import Jq from "./Jq.js";
export default
class Blog{
    public Execute(): void
    {
        const body = document.querySelector('body') as HTMLElement;
        new Jq(body).AddClass('blog');

        document.querySelector('#_portada')!.addEventListener('click', (e) => 
        {
            new Jq(body).go("#portada");
        });
        document.querySelector('#_contact')!.addEventListener('click', (e) => 
        {
            e.preventDefault();
            new Jq(body).go("#contact");
        });
    }
}