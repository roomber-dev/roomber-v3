<?php

sleep(2);

$random = rand(-1, 0);

if($random == -1) {
    echo '-1';
} else if($random == 0) {
    echo '1';
}