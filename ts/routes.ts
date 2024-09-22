interface Add {
    path: RegExp | string;
    cb: (() => void);
}
export default
class Routes {
    constructor(
        public root: string = location.hostname
    ) {}
    public add(path: string): void | null 
    {
        window.onpopstate = () => history.go();
        if (!location.hash){
            history.replaceState(null, '', this.root + path);
            return null;
        }
        history.replaceState(null, '', this.root + path);
    }
}