let messages = []


function sendMessage(username, date = new Date(), text, id) {
	let json = {
		date: date,
		text: text,
		username: username,
		id: id,
		status: 0
	}
	messages.push(json);
	updateChat();
	$.post("post.php", {
		text: text
	}, function(data,status) {
		if(data == "1") {
			messages[findWithAttr(messages, "id", id)].status = 1
		} else if((data != "1") || status != "success") {
			messages[findWithAttr(messages, "id", id)].status = -1
		}
		updateChat();
	})/*.done(function() {
    // Only on success (HTTP status code < 400)
    messages[findWithAttr(messages, "id", id)].status = 1
}).fail(function() {
    // Only on errors (HTTP status code >= 400)
	messages[findWithAttr(messages, "id", id)].status = -1
})*/
}

function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

function filterStringHTML(text) {
	text = text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&#34;").replace(/\\/g, "&#92;")
}

let message = (username, date = new Date(), text, id, status) => {


	var day = date.getDate().toString().padStart(2, "0");
	var mon = date.getMonth().toString().padStart(2, "0");
	var yer = date.getFullYear();
	var hour = date.getHours().toString().padStart(2, "0");
	var min = date.getMinutes().toString().padStart(2, "0");

	var timestamp = `${day}/${mon}/${yer} at ${hour}:${min}`;
var statusClass;
	if(status == 0) {
		statusClass = "sending";
	} else if(status == 1) {
		statusClass = "";
	} else {
		statusClass = "failed";
	}

	$("#usermsg").val("");

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

	


	$("#chat").html(htmlstring + "<br><br>");
	if(!$("#"+messages[messages.length - 1].id).css("animation").endsWith("message-enter;")) {


	$("#"+messages[messages.length - 1].id).css("animation", "message-enter 1s")
	}

	for (var i = 1; i <= msgCount; i++) {
		let element = $("#msg" + i);
		if (element) {
			element.css("", "");
		}
	}

	
}



