let messages = []
let cldout = true;

// moved "getChat" to the bottom of the script

const getMessageById = (id) => $("#msg" + id);

function sendMessage(username, date = new Date(), text, id) {
	/*let json = {
		date: date,
		text: text,
		username: username,
		id: id,
		status: 0
	}
	messages.push(json);
	updateChat();*/
	if(cldout) {
		$.post("post.php", {
			text: text
		}, function(data,status) {
			cldout = false;
			console.log('[DEBUG] POST RESPONSE:', data, 'STATUS:', status);
			
			let withAttr = findWithAttr(messages, "id", id);

			if(withAttr != -1) {
				if(data == "1" && status == "success") {
					messages[withAttr].status = 1
				} else {
					messages[withAttr].status = -1
				}
			}

			displayMessage();
		})/*.done(function() {
	    // Only on success (HTTP status code < 400)
	    messages[findWithAttr(messages, "id", id)].status = 1
	}).fail(function() {
	    // Only on errors (HTTP status code >= 400)
		messages[findWithAttr(messages, "id", id)].status = -1
	})*/
	}
	setTimeout(function(){
		cldout = true; 
		console.log('[DEBUG] cooldown out');
	}, 1000);
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

let message = (username, date, text, id, status) => {
	const milliseconds = date * 1000;
	const dateObject = new Date(milliseconds);
	const timestamp = dateObject.toLocaleString();

	var statusClass;

	if(status == 0) {
		statusClass = "sending";
	} else if(status == 1) {
		statusClass = "";
	} else {
		statusClass = "failed";
	}

	$("#usermsg").val("");

	return `<div class="message glass" id="msg${id}">
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

let msgCount = messages.length;

$("#submitmsg").click(() => {
	let id = (msgCount += 1)

	sendMessage(
		"someever for now",
		Date.now(),
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

function displayMessage() {
	$.post("messageArray.php", function(data) {
		lastMsg = JSON.parse(data);
		if(!_.isEqual(messages[messages.length - 1], lastMsg)) {
			console.log('[DEBUG] got new message')
			let before = $("#chat").html();

			messages.push(lastMsg);
			let htmlLastMsg = message(
				lastMsg.username,
				lastMsg.date,
				lastMsg.text,
				lastMsg.id,
				lastMsg.status
			)
			$("#chat").html(before+htmlLastMsg);
			for (var i = 1; i <= lastMsg.id - 1; i++) {
				let element = getMessageById(i);
				if (element) {
					element.css("animation", "");
				}
			}
			getMessageById(lastMsg.id).css("animation", "message-enter 1s");
		}
	})
}

setInterval(displayMessage, 1000);

function updateChat() {
	let htmlstring = "";

	messages.forEach(element => {
		return htmlstring += message(
			element.username,
			element.date,
			element.text,
			element.id,
			element.status
		);
	});

	$("#chat").html(htmlstring);
}

$.post("messageArray.php?all", function(data) {
	console.log(data);
	messages = JSON.parse(data);
	updateChat();
})
