<?php
session_start();

if (empty($_SESSION['user_role']) || $_SESSION['user_role'] !== 'office_staff') {
    header('Location: /prototype/index.php');
    exit;
}
