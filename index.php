<?php

session_start();


/*if (!isset($_SESSION['test'])) {
    $_SESSION['test'] = 0;
} else {
    foreach ($_COOKIE as $key => $value) {
        echo $key . ": " . $value . "<br>";
        setcookie("test".$_SESSION['test'],"cookie overflow!!");
        //setcookie("test".$i, "", time() - 3600);
        $_SESSION['test'] += 1;
    }
}
die();*/


?>

<!DOCTYPE html>
<html lang="en">

<head>

    <script>
        var matched_classes = [],
            regex = /(#ad)\w+/gmi,
            style = document.querySelectorAll('style');

        style.forEach(function(item) {
            matched_classes = item.innerHTML.match(regex);
        });

        matched_classes.forEach(function(item) {
            var el = document.getElementById(item.replace('#', ''));
            if (el != null && el.nodeName === 'IFRAME') {
                el.parentElement.removeChild(el);
            }
        });
    </script>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Roomber v3</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="popup_style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js"></script>
</head>

<body>
    <div class="topbar-main flex-down">
        <div id="topbar" class="glass">
            <div id="topbar-content">
                <img id="roomber-logo" src="assets/roomber-logo.png">
                <!-- other stuff will be in this div, will rename it later -->
                <div id="other-stuff"></div>
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
                    <form>
                        <div class="message-input">
                            <input name="usermsg" type="text" id="usermsg" placeholder="Message" autocomplete="off" />
                            <input name="submitmsg" type="submit" id="submitmsg" value="Send" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="assets/js/messages.js"></script>
    <script src="assets/js/popup.js"></script>
</body>

</html>