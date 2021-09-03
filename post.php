<?php
session_start();
$sent = true;
include "include/dblogin.php"; // userid: 00000000000000000000

if(isset($_POST['text'])) {
$timestampbeforerequest = time();
$senderid = "00000000000000000000";
$stmt = $mysqli->prepare("INSERT INTO messages (id, text, authorid, date) VALUES (NULL, ?, ?, ?)");
$successparam = $stmt->bind_param('ssi', $_POST['text'], $senderid, $timestampbeforerequest); // 's' specifies the variable type => 'string'

if(!$successparam) $sent = false;

$success = $stmt->execute();

if(!$success) $sent = false;

}

if($sent) {
    echo '1';
} else {
    echo '-1';
}

/*sleep(2);

$random = rand(-1, 0);

if($random == -1) {
    echo '-1';
} else if($random == 0) {
    echo '1';
}*/