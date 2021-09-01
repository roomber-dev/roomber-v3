<?php

session_start();


?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Roomber v3</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
    <!-- dont put <script src="messages.js"> here the script must be loaded after the 
         html elements--> <!-- ok -->
</head>

<body>
    <div class="topbar-main flex-down">
        <div id="topbar" class="glass">
            <div id="topbar-content">
                <img src="assets/roomber-logo.png" style="width: 60px; height: 60px;">
            </div>
        </div>
        <div class="flex">
            <div id="channels" class="glass">
                <ul>
                    <li>#example1</li>
                    <li>#example2</li>
                    <li>#example3</li>

                </ul>
            </div>
            <div id="chat-area">
                <div id="chat">
                    <!-- initially empty -->

                </div>
                <div id="message-box" class="glass">
                        <div class="message-input">
                            <input name="usermsg" type="text" id="usermsg" placeholder="Message" autocomplete="off" />
                            <input name="submitmsg" type="submit" id="submitmsg" value="Send" />
                        </div>
                </div>
            </div>
        </div>
    </div>

    <script src="assets/js/messages.js"></script>
    
</body>

</html>