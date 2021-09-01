let message = (username, date = new Date(), text, id) => {

	
	var day = date.getDate().toString().padStart(2, "0");
	var mon = date.getMonth().toString().padStart(2, "0");
	var yer = date.getFullYear();
	var hour = date.getHours().toString().padStart(2, "0");
	var min = date.getMinutes().toString().padStart(2, "0");

	var timestamp = `${day}/${mon}/${yer} at ${hour}:${min}`;
	return `<div class="message glass" id="${id}">
		<div class="flex">
		    <img src="avatars/default.png" class="avatar">
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

$("#submitmsg").click(() => {
	let id = "msg" + (msgCount += 1)
	chat.innerHTML += message(
		"someever for now", 
		new Date(), 
		$("#usermsg").val(),
		id
	);

	let messageElement = $("#" + id)[0];

	for(var i = 1; i <= msgCount; i++) {
		let element = $("#msg" + i)[0];
		element.style = "";
	}

	messageElement.style = "animation: message-enter 1s";

	return false;
});



