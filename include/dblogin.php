<?php


include_once "include/dbconnect.php";

$mysqli = new mysqli("localhost", $username, $password, $database);

if ($mysqli->connect_errno) {
    header('Location: problems.php?message=' . urlencode($mysqli->connect_error));
    exit();
}

/* check if server is alive */
if ($mysqli->ping()) {
    //printf ("Our connection is ok!\n");
} else {
    header('Location: problems.php?message=' . urlencode($mysqli->error));
    exit();
}