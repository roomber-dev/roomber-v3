<?php
session_start();

//if(isset($_SESSION['id'])) {
include "include/dblogin.php";
$messages = array();

if (isset($_GET['all'])) {
    $stmt = $mysqli->prepare("SELECT * FROM messages");
    //$stmt->bind_param('s',$_SESSION['channelID']); // 's' specifies the variable type => 'string'

    $stmt->execute();

    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $myObj = new stdClass();
        $myObj->date = $row['date'];
        $myObj->text = $row['text'];
        $myObj->username = $row['authorid'];
        $myObj->id = $row['id'];
        $myObj->status = 1;
        array_push($messages, $myObj);
    }
    echo json_encode($messages);
} else {
    $stmt = $mysqli->prepare("SELECT * FROM messages ORDER BY id DESC LIMIT 1"); // get last message
    //$stmt->bind_param('s',$_SESSION['channelID']); // 's' specifies the variable type => 'string'

    $stmt->execute();

    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $myObj = new stdClass();
        $myObj->date = $row['date'];
        $myObj->text = $row['text'];
        $myObj->username = $row['authorid'];
        $myObj->id = $row['id'];
        $myObj->status = 1;
        echo json_encode($myObj);
    }
}







//}
