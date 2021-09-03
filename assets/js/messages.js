let messages = []
let cldout = true;

function getChat() {
	$.post("messageArray.php?all", function(data) {
		console.log(data);
		messages = JSON.parse(data);
		updateChat();
	})
}

getChat();



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
		console.log('[DEBUG]', messages[findWithAttr(messages, "id", id)])
		if(data == "1") {
			messages[findWithAttr(messages, "id", id)].status = 1
		} else if((data != "1") || status != "success") {
			messages[findWithAttr(messages, "id", id)].status = -1
		}
		updateChatOptimal();
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


const milliseconds = date * 1000 // 1575909015000

const dateObject = new Date(milliseconds)

const timestamp = dateObject.toLocaleString()

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

function updateChatOptimal() {
	$.post("messageArray.php", function(data) {
		lastMsg = JSON.parse(data);
		//console.log('[DEBUG] last:', messages[messages.length - 1]);
		//console.log('[DEBUG] loaded:', lastMsg);
		//console.log('[DEBUG] the same?', _.isEqual(messages[messages.length - 1], lastMsg))
		if(!_.isEqual(messages[messages.length - 1], lastMsg)) {
			console.log('[DEBUG] it\'s the same')
			let before = $("#chat").html();

			messages.push(lastMsg);
			let element = lastMsg;
			let htmlLastMsg = message(
				element.username,
				element.date,
				element.text,
				element.id,
				element.status
			)
			$("#chat").html(before+htmlLastMsg);


		}
		if(!$("#msg"+messages[messages.length - 1].id).css("animation").endsWith("message-enter;")) {


			$("#msg"+messages[messages.length - 1].id).css("animation", "message-enter 1s")
			}
		
			for (var i = 1; i <= msgCount; i++) {
				let element = $("#msg" + i);
				if (element) {
					element.css("", "");
				}
			}
	})
}

setInterval(updateChatOptimal, 1000);

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
	
	for (var i = 1; i <= msgCount; i++) {
		let element = $("#msg" + i);
		if (element) {
			element.css("", "");
		}
	}

	if(!$("#"+messages[messages.length - 1].id).css("animation").endsWith("message-enter;")) {
		$("#"+messages[messages.length - 1].id).css("animation", "message-enter 1s")

	
	if(!$("#msg"+messages[messages.length - 1].id).css("animation").endsWith("message-enter;")) {
		$("#msg"+messages[messages.length - 1].id).css("animation", "message-enter 1s")
	}
}



