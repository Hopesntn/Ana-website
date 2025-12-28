
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
      <div class="left-bar">
        <img class="logo-control" src="assets/icon2.png" alt="Ana's logo">
        <span class="date"></span>
      </div>

      <div class="right-bar">
        <ul>
          <li>
            <button class="ghost-btn">(Optional Dark version)</button>
          </li>

          <li>
            <a href="#" class="flip">
              <span class="flip-inner">
                <span class="flip-face flip-front">About you</span>
                <span class="flip-face flip-back">About you</span>
              </span>
            </a>
          </li>

          <li>
            <a href="#" class="flip">
              <span class="flip-inner">
                <span class="flip-face flip-front">Blog</span>
                <span class="flip-face flip-back">Blog</span>
              </span>
            </a>
          </li>

          <li>
            <a href="#" class="flip">
              <span class="flip-inner"> 
                <span class="flip-face flip-front">Start a project</span>
                <span class="flip-face flip-back">Start a project</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `;
}

    connectedCallback() {

    this.dateEl = this.shadowRoot.querySelector(".date");

    this.formatted = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,

    });

    this.updatedDate();
   
    this.timerId = setInterval(() => this.updatedDate(), 60_000);

    }

    disconnectedCallback() {

        if(this.timerId){
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    updatedDate(){
        if(!this.dateEl) return;
        this.dateEl.textContent = this.formatted.format(new Date());
    }


}

customElements.define("site-nav", SiteNav);
