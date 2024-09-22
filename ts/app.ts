import Portfolio from "./portfolio.js";
import Utils from "./Utils.js";
import Routes from "./routes.js";
export default
    class App {
    //private URL: string = "";
    private URL: string = "/holapatrick.com";
    public load() {
        localStorage.setItem("root", this.URL);
        this.portafolio();
    }
    private Menu(items: { title: string; links: string[]; }) {
        document.querySelector('nav h2')!.innerHTML = items.title;
        document.querySelector('nav ul')!.innerHTML = items.links.join("");
    }
    private portafolio(): void {
        new Routes(this.URL).add("/");
        Utils.Template("portafolio")
        .then(() => {
            this.Menu(
                {
                    title: '<a href="" id="_portada">PORTAFOLIO</a>',
                    links: [
                        '<li><a href="" id="_contact"></a></li>'
                    ]
                }
            );
            new Portfolio().Execute();
            Utils.ajustarScreen();
        })
        .catch(error => console.log(error));
    }
}