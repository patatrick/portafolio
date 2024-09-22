import Blog from "./blog.js";
import Portfolio from "./portfolio.js";
import Utils from "./Utils.js";
import Routes from "./routes.js";
export default
    class App {
    //private URL: string = "https://holapatrick.com";
    private URL: string = "/holapatrick.com";
    public load() {
        this.Inicial();
        const busqueda: string = location.search.replace('?', '');
        switch (busqueda) {
            case "blog":
                this.blog();
            break;
            default:
                this.portafolio();
            break;
        }
    }
    private Menu(items: { title: string; links: string[]; }) {
        document.querySelector('nav h2')!.innerHTML = items.title;
        document.querySelector('nav ul')!.innerHTML = items.links.join("");
    }
    private blog(): void {
        new Routes(this.URL).add("/blog/");
        Utils.Template("blog", this.URL)
        .then(() => {
            this.Menu(
                {
                    title: '<a href="" id="_portada">BLOG</a>',
                    links: [
                        '<li id="portafolio">PORTAFOLIO</li>',
                        '<li><a href="" id="_contact">CONTACTO</a></li>'
                    ]
                }
                );
                Utils.ajustarScreen();
                new Blog().Execute();
                document.querySelector('#portafolio')!.addEventListener('click', ()=> {
                    history.pushState(null, "", this.URL);
                    this.portafolio();
                });
                
        })
        .catch(error => console.log(error));
    }
    private portafolio(): void {
        new Routes(this.URL).add("/");
        Utils.Template("portafolio", this.URL)
        .then(() => {
            this.Menu(
                {
                    title: '<a href="" id="_portada">PORTAFOLIO</a>',
                    links: [
                        //'<li id="blog">BLOG</li>',
                        '<li><a href="" id="_contact">CONTACTO</a></li>'
                    ]
                }
            );
            new Portfolio().Execute();
            this.Contacto();
            Utils.ajustarScreen();
            document.querySelector('#blog')!.addEventListener('click', ()=> {
                history.pushState(null, "", this.URL + "/blog");
                this.blog();
            });
        })
        .catch(error => console.log(error));
    }
    private Inicial(){
        const formData = new FormData();
        formData.append("metodo", "Inicial");
        fetch(this.URL +'/dal.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            if (result.Code != 200) alert(result.Message);
        })
        .catch(error => {
            console.log(error);
            return null;
        });
    }
    private Contacto(): boolean
    {
        const Form = document.querySelector('#contact form')!;
        Form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData();
            const nombre = Form.querySelector('[name="nombre"]') as HTMLInputElement;
            const mail = Form.querySelector('[name="mail"]') as HTMLInputElement;
            const message = Form.querySelector('[name="message"]')! as HTMLTextAreaElement;

            if (
                Utils.Empty(nombre.value) ||
                Utils.Empty(mail.value) ||
                Utils.Empty(message.value)
            ) { alert("No pueden haber campos vacíos"); return false; }

            formData.append("nombre", nombre.value);
            formData.append("mail", mail.value);
            formData.append("message", Utils.base64(message.value));
            formData.append("metodo", "Correo");
            
            Utils.loading();
            fetch( this.URL +'/dal.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(result => {
                Utils.loading(false);
                if (result.Code == 200){
                    alert(result.Message);
                    nombre.value = "";
                    mail.value = "";
                    message.value = "";
                }
                else{
                    alert(result.Message);
                    console.log(result.Message);                    
                }
            })
            .catch(error => {
                Utils.loading(false);
                alert("Prorblemas con el envío de correo, intente más tarde o comuníquese al teléfono más abajo señalado");
                console.log(error);
                return null;
            });
        });
        return true;
    }
}