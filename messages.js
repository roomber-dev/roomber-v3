function elem(id)
{
	return document.getElementById(id);
}

function createElement(html)
{
	let div = document.createElement("div");
	div.innerHTML = html;
	return div.firstChild;
}

let messageBox = elem("usermsg");
let messageBtn = elem("submitmsg");
let chat = elem("chat");

let message = (username, timestamp, text, id) => {
	return `<div class="message glass" id="${id}">
		<div class="flex">
		    <img src="./null.png" class="avatar">
		    <div class="flex">
		        <div class="flex-down">
		            <div class="username">${username}</div>
		            <div class="msgln">
		                ${text}
		            </div>
		        </div>
		        <div class="timestamp">${timestamp}</div>
		    </div>
		</div>
	</div>`;
};

let msgCount = 0;

messageBtn.onclick = () => {
	let id = "msg" + (msgCount += 1)
	chat.innerHTML += message(
		"someever for now", 
		new Date().toString(), 
		messageBox.value,
		id
	);

	let messageElement = elem(id);

	for(var i = 1; i <= msgCount; i++) {
		let element = elem("msg" + i);
		element.style = "";
	}

	messageElement.style = "animation: message-enter 1s";
};