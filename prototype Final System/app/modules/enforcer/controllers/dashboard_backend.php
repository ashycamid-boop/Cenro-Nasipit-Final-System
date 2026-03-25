<?php
if (session_status() === PHP_SESSION_NONE) {
  session_start();
}

if (empty($_SESSION['user_role']) || $_SESSION['user_role'] !== 'enforcer') {
  header('Location: /prototype/index.php');
  exit;
}

$sidebarRole = 'Enforcer';

require_once dirname(__DIR__, 3) . '/config/db.php';

$sessionUid = $_SESSION['uid'] ?? null;
$totalSpot = 0;
$approvedSpot = 0;
$pendingSpot = 0;
$totalReq = 0;
$completedReq = 0;
$pendingReq = 0;

try {
  if ($sessionUid) {
    $s = $pdo->prepare('SELECT COUNT(*) FROM spot_reports WHERE submitted_by = ?');
    $s->execute([$sessionUid]);
    $totalSpot = (int) $s->fetchColumn();

    $s = $pdo->prepare("SELECT COUNT(*) FROM spot_reports WHERE submitted_by = ? AND LOWER(TRIM(status)) = 'approved'");
    $s->execute([$sessionUid]);
    $approvedSpot = (int) $s->fetchColumn();

    $s = $pdo->prepare("SELECT COUNT(*) FROM spot_reports WHERE submitted_by = ? AND LOWER(TRIM(status)) IN ('pending','draft','open')");
    $s->execute([$sessionUid]);
    $pendingSpot = (int) $s->fetchColumn();

    $r = $pdo->prepare('SELECT COUNT(*) FROM service_requests WHERE created_by = ?');
    $r->execute([$sessionUid]);
    $totalReq = (int) $r->fetchColumn();

    $r = $pdo->prepare("SELECT COUNT(*) FROM service_requests WHERE created_by = ? AND LOWER(TRIM(status)) = 'completed'");
    $r->execute([$sessionUid]);
    $completedReq = (int) $r->fetchColumn();

    $pendingReq = max(0, $totalReq - $completedReq);
  }
} catch (Exception $e) {
  // Keep zero defaults on query errors.
}

