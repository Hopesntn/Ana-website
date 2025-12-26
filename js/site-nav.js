
class SiteNav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.render();
    }
    render(){
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/css/site-nav.css">

        <nav> 
            <div class="left-nav">
                <img class="logo-control" src="assets/icon2.png" alt="Ana's logo">
                <span class="date"> </span>
            </div>

            <div class="right-bar">
                <ul>
                    <li><button>(Optional Dark version)</button></li>
                    <li><a href="#">About you</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Start a project</a></li>
                </ul>
            </div>

        </nav>


        `;
    }
}

customElements.define("site-nav", SiteNav);