let popups = 0;

let popup = (title, text) => {
    popups += 1;
    id = `popup-${popups}`;
    html = `<div class="popup" id="${id}">
    <div class="popup-content">
        <div class="popup-main">
            <h4>${title}</h4>
            <br>
            ${text}
        </div>
            <div class="popup-footer">
                <button class="popup-button">
                    OK
                </button>
            </div>
        </div>
        <div class="popup-blur">
        </div>
    </div>`;
    document.body.innerHTML += html;
    elem = document.getElementById(id);
    content = document.querySelector(`#${id} .popup-content`);
    blur = document.querySelector(`#${id} .popup-blur`);
    content.style = "animation: 0.5s popup-before;";
    blur.style = "animation: 0.5s popup-blur-before;";
    animEnd = (e) => {
        if(e.animationName == "popup-after") {
            elem.remove();
        }
    };
    content.addEventListener("webkitAnimationEnd", animEnd);
    content.addEventListener("animationend", animEnd);
    btn = document.querySelector(`#${id} .popup-footer .popup-button`);
    btn.onclick = () => {
        content.style = "animation: 0.5s popup-after;";
        blur.style = "animation: 0.5s popup-blur-after;";
    };
};

function alert(msg) {
    popup("Alert", msg);
}

popup("Welcome to Roomber!", `Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
Asperiores inventore molestias neque consequuntur alias 
praesentium ipsa impedit accusamus exercitationem perferendis, 
obcaecati consectetur provident et cumque sint omnis facilis`);
