let messages = []


function sendMessage(username, date = new Date(), text, id) {
	let json = {
		date: date,
		text: text,
		username: username,
		id: id,
		status: -1
	}
	messages.push(json);
}

let message = (username, date = new Date(), text, id, status) => {


	var day = date.getDate().toString().padStart(2, "0");
	var mon = date.getMonth().toString().padStart(2, "0");
	var yer = date.getFullYear();
	var hour = date.getHours().toString().padStart(2, "0");
	var min = date.getMinutes().toString().padStart(2, "0");

	var timestamp = `${day}/${mon}/${yer} at ${hour}:${min}`;
var statusClass;
	if(status = -1) {
		statusClass = "failed";
	} else if(status = 0) {
		statusClass = "sending";
	} else if(status = 1) {
		statusClass = "";
	}

	return `<div class="message glass" id="${id}">
		<div class="flex">
		    <img src="avatars/default.png" class="avatar">
		    <div class="flex">
		        <div class="flex-down">
		            <div class="username">${username}</div>
		            <div class="msgln ${statusClass}">
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
	/*chat.innerHTML += message(
		"someever for now", 
		new Date(), 
		$("#usermsg").val(),
		id
	);*/

	/*message(
		"someever for now", 
		new Date(), 
		$("#usermsg").val(),
		id
	);*/

	sendMessage(
		"someever for now",
		new Date(),
		$("#usermsg").val(),
		id
	)

	updateChat();



	let messageElement = $("#" + id);

	for (var i = 1; i <= msgCount; i++) {
		let element = $("#msg" + i);
		if (element) {
			element.css("", "");
		}
	}

	

	return false;
});

function updateChat() {
	let htmlstring = "";

	messages.forEach(element => {
		return htmlstring += message(
			element.username,
			element.date,
			element.text,
			element.id,
			element.status
		)



	});

	


	$("#chat").html(htmlstring);
	$("#"+messages[messages.length - 1].id).css("animation", "message-enter 1s")

	for (var i = 1; i <= msgCount; i++) {
		let element = $("#msg" + i);
		if (element) {
			element.css("", "");
		}
	}
	
}



