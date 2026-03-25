<?php
session_start();

if (empty($_SESSION['user_role']) || $_SESSION['user_role'] !== 'property_custodian') {
    header('Location: /prototype/index.php');
    exit;
}
