export default
class Utils {
    static Height() : number
    {
        const body = document.body,
              html = document.documentElement;

        return html.clientHeight + 10;
    }
    static base64(str: string){
        return window.btoa(str);
    }
    static get getBrowser(): {navigator: string; version: number}
    {
        let ua = navigator.userAgent, tem, 
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if(/trident/i.test(M[1])){
            tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
            return {
                navigator: 'IE',
                version: parseInt(tem[1] || '')
            }
        }
        if(M[1]=== 'Chrome'){
            tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
            if(tem!= null){
                return {
                   navigator: tem.slice(1)[0].replace('OPR', 'Opera').trim(),
                   version: parseInt(tem[1])
                }
            }
        }
        M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
        return {
            navigator: M[0].trim(),
            version: parseInt(M[1])
        };
    }
    static ajustarScreen() {
        const alto: number = Utils.Height();
        const divNav = document.querySelector('nav') as HTMLDivElement;
        const arr_ventana = document.querySelectorAll('.ventana') as NodeListOf<HTMLDivElement>;
        const arr_carousel = document.querySelectorAll('.carousel-item') as NodeListOf<HTMLDivElement>;
        const arr_imgPortada = document.querySelectorAll('#portada img') as NodeListOf<HTMLImageElement>;
        
        arr_carousel.forEach(item =>{
            item.style.height = alto.toString() + "px";
        });
        arr_imgPortada.forEach(img =>{
            img.style.height = (alto + alto * 0.2).toString() + "px";
        })
        arr_ventana.forEach(div =>{
            div.style.minHeight = alto + "px";
        });
        
        window.onscroll = () => {
            if (window.scrollY > alto) {
                divNav.style.background = "rgba(252, 252, 252, 0.9)";
            }
            else {
                let barra: number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                let posicion: number =  (barra * 0.2);
                arr_imgPortada.forEach(img =>{
                    img.style.objectPosition = 'center -' + posicion.toString() + 'px';
                });
                divNav.style.background = "transparent";
            }
        }
    }
    static Template(templateName: string): Promise<void> {
        const locationOrigin = localStorage.root;
        return new Promise((resolve, reject) => {
            fetch(locationOrigin + "/templates/" + templateName + ".html", { cache: 'no-cache' })
                .then(response => response.text())
                .then(result => {
                    document.querySelector('#layout')!.innerHTML = result.replace(/{absolute}/g, locationOrigin);
                    resolve();
                })
                .catch(error => {
                    reject(error);
                    return null;
                });
        });
    }
    static Empty(str: string): string | boolean{
        return !str || !/[^\s]+/.test(str);
    }
    static loading(load: boolean = true): void
	{
        const divLoad = document.querySelector('#loader');
        if(divLoad) divLoad.remove();
        if (load) {           
            const div = document.createElement('div');
            div.id = 'loader';
            div.innerHTML = '<img src="./img/loader.gif" width="60px height="60px" />';
            div.style.display = "flex";
            div.style.flexFlow = "column wrap";
            div.style.justifyContent = "center";
            div.style.alignItems = "center";
            div.style.backgroundColor = "#fff";
            div.style.opacity = ".7";
            div.style.width = "100%";
            div.style.height = "100%";
            div.style.position = "absolute";
            div.style.top = (document.documentElement.scrollTop - 25).toString() + 'px';
            div.style.left = "0";
            div.style.right = "0";
            div.style.zIndex = "16777271";
            document.querySelector('#layout')!.append(div)
            document.querySelector('html')!.style.overflow = 'hidden'
        }
        else{
            if (divLoad){
                divLoad.remove();
                document.querySelector('html')!.removeAttribute('style');
            }
        }
	}
}