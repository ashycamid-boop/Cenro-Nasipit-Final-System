<?php
if (session_status() === PHP_SESSION_NONE) {
  session_start();
}

if (empty($_SESSION['role']) || $_SESSION['role'] !== 'Admin') {
  header('Location: /prototype/index.php');
  exit;
}

$sidebarRole = 'Administrator';
