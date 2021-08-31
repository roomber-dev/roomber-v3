<?php

session_start();


?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
    <script src="messages.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
</head>

<body>
    <div class="topbar-main flex-down">
        <div id="topbar" class="glass">
            <div id="topbar-text">
                top bar thing
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
                    <div class="message glass">
                        <div class="flex">
                            <img src="./null.png" class="avatar">
                            <div class="flex">
                                <div class="flex-down">
                                    <div class="username">someever</div>
                                    <div class="msgln">
                                        hello world
                                    </div>
                                </div>
                                <div class="timestamp">today at 3:00 AM</div>
                            </div>
                        </div>
                    </div>
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
    
</body>

</html>