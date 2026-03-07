<?php
session_start();

if (empty($_SESSION['role']) || $_SESSION['role'] !== 'Admin') {
    header('Location: /prototype/index.php');
    exit;
}

$sidebarRole = (isset($_SESSION['role']) && $_SESSION['role'] === 'Admin')
    ? 'Administrator'
    : (isset($_SESSION['role']) ? htmlspecialchars($_SESSION['role']) : 'Administrator');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Spot Reports</title>
  <!-- Bootstrap 5 CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Bootstrap Icons -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
  <!-- Admin common styles -->
  <link rel="stylesheet" href="../../../../public/assets/css/modules/admin/common.css">
  <!-- Spot Reports specific styles -->
  <link rel="stylesheet" href="../../../../public/assets/css/modules/admin/spot_reports.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
  <link href="https://fonts.googleapis.com/css?family=Fredoka+One:400&display=swap" rel="stylesheet">
</head>
<body>
  <div class="layout">
    <!-- Sidebar -->
    <nav class="sidebar" role="navigation" aria-label="Main sidebar">
      <div class="sidebar-logo">
        <img src="../../../../public/assets/images/denr-logo.png" alt="DENR Logo">
        <span>CENRO</span>
      </div>
      <div class="sidebar-role"><?php echo $sidebarRole; ?></div>
      <nav class="sidebar-nav" aria-label="Sidebar menu">
        <ul>
          <li><a href="dashboard.php"><i class="fa fa-th-large"></i> Dashboard</a></li>
          <li><a href="user_management.php"><i class="fa fa-users"></i> User Management</a></li>
          <li class="active"><a href="spot_reports.php"><i class="fa fa-file-text"></i> Spot Reports</a></li>
          <li><a href="case_management.php"><i class="fa fa-briefcase"></i> Case Management</a></li>
          <li><a href="apprehended_items.php"><i class="fa fa-archive"></i> Apprehended Items</a></li>
          <li><a href="equipment_management.php"><i class="fa fa-cogs"></i> Equipment Management</a></li>
          <li><a href="assignments.php"><i class="fa fa-tasks"></i> Assignments</a></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" id="serviceDeskToggle" data-target="serviceDeskMenu">
              <i class="fa fa-headset"></i> Service Desk 
              <i class="fa fa-chevron-down dropdown-arrow"></i>
            </a>
            <ul class="dropdown-menu" id="serviceDeskMenu">
              <li><a href="new_requests.php">New Requests <span class="badge">2</span></a></li>
              <li><a href="ongoing_scheduled.php">Ongoing / Scheduled <span class="badge badge-blue">2</span></a></li>
              <li><a href="completed.php">Completed</a></li>
              <li><a href="all_requests.php">All Requests</a></li>
            </ul>
          </li>
          <li><a href="statistical_report.php"><i class="fa fa-chart-bar"></i> Statistical Report</a></li>
        </ul>
      </nav>
    </nav>
    <!-- Main -->
    <div class="main">
      <div class="topbar">
        <div class="topbar-card">
          <div class="topbar-title">Spot Reports</div>
          <?php include __DIR__ . '/../../shared/views/topbar_profile.php'; ?>
        </div>
      </div>
      <div class="main-content">
        <!-- Spot Reports Content -->
        <div class="container-fluid p-4">
          <!-- Search and Filter Section -->
          <div class="filter-section mb-4">
            <div class="row g-3 align-items-end">
              <div class="col-md-3">
                <input type="text" class="form-control" placeholder="Search" id="searchInput">
              </div>
              <div class="col-md-2">
                <input type="date" class="form-control" placeholder="dd/mm/yyyy" id="dateFrom">
              </div>
              <div class="col-md-2">
                <input type="date" class="form-control" placeholder="dd/mm/yyyy" id="dateTo">
              </div>
              <div class="col-md-2">
                <select class="form-select" id="statusFilter">
                  <option value="">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div class="col-md-1">
                <button class="btn btn-primary w-100" id="applyFilter">
                  <i class="fa fa-filter"></i> Apply
                </button>
              </div>
              <div class="col-md-1">
                <button class="btn btn-outline-secondary w-100" id="clearFilter">Clear</button>
              </div>
            </div>
          </div>

          <!-- Summary Cards -->
          <?php
          try {
            require_once dirname(dirname(dirname(__DIR__))) . '/config/db.php'; // loads $pdo
            $stmt = $pdo->prepare("SELECT s.id, s.reference_no, s.incident_datetime, s.location, s.summary, s.team_leader, s.custodian, s.status, s.status_comment, u.full_name AS submitted_by_name, (SELECT SUM(value) FROM spot_report_items WHERE report_id = s.id) AS est_value FROM spot_reports s LEFT JOIN users u ON u.id = s.submitted_by WHERE u.role = 'Enforcer' ORDER BY s.created_at DESC");
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
          } catch (Exception $e) {
            $rows = array();
          }

          function short_text($s, $len = 120) {
            $s = trim(strip_tags((string)$s));
            if (mb_strlen($s) <= $len) return $s;
            return mb_substr($s, 0, $len) . '...';
          }

          $totalReports = count($rows);
          $totalEst = 0.0;
          foreach ($rows as $r) {
            $estRaw = isset($r['est_value']) ? $r['est_value'] : null;
            $totalEst += ($estRaw !== null && $estRaw !== '') ? (float)$estRaw : 0.0;
          }
          $totalEstFormatted = $totalReports > 0 ? '₱ ' . number_format($totalEst, 2) : '-';
          ?>

          <div class="row mb-3">
            <div class="col-md-6 mb-3">
              <div class="summary-card">
                <div class="summary-label">Total</div>
                <div id="summaryTotal" class="summary-value"><?php echo $totalReports; ?></div>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div class="summary-card">
                <div class="summary-label">Est. Value</div>
                <div id="summaryEst" class="summary-value"><?php echo $totalEstFormatted; ?></div>
              </div>
            </div>
          </div>

          <!-- Reports Table -->
          <div class="card">
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead class="table-light">
                    <tr>
                      <th>Ref #</th>
                      <th>Incident Date</th>
                      <th>Location</th>
                      <th>Items</th>
                      <th>Team Leader</th>
                      <th>Custodian</th>
                      <th>Submitted By</th>
                      <th>Status</th>
                      <th>Est. Value</th>
                      <th>Details</th>
                      <!-- Actions column removed -->
                    </tr>
                  </thead>
                  <tbody>
                    <?php
                    if (!empty($rows)) {
                      foreach ($rows as $r) {
                        $ref = htmlspecialchars($r['reference_no']);
                        $inc = $r['incident_datetime'] ? htmlspecialchars($r['incident_datetime']) : '-';
                        $loc = htmlspecialchars($r['location'] ?? '');
                        $sum = htmlspecialchars(short_text($r['summary'] ?? ''));
                        $tl = htmlspecialchars($r['team_leader'] ?? '');
                        $cust = htmlspecialchars($r['custodian'] ?? '');
                        $submittedBy = htmlspecialchars($r['submitted_by_name'] ?? '-');
                        $statusRaw = strtolower(trim($r['status'] ?? ''));
                        $badgeClass = 'bg-secondary';
                        if ($statusRaw === 'approved') $badgeClass = 'bg-success';
                        elseif ($statusRaw === 'pending') $badgeClass = 'bg-warning';
                        elseif ($statusRaw === 'rejected') $badgeClass = 'bg-danger';
                        elseif ($statusRaw === 'under_review' || $statusRaw === 'under review') $badgeClass = 'bg-info';
                        $status = htmlspecialchars($r['status'] ?? '');
                        $statusComment = isset($r['status_comment']) ? $r['status_comment'] : '';
                        $estRaw = isset($r['est_value']) ? $r['est_value'] : null;
                        $est = ($estRaw !== null && $estRaw !== '') ? ('₱ ' . number_format((float)$estRaw, 2)) : '-';
                        $viewUrl = 'view_spot_report.php?ref=' . urlencode($r['reference_no']);
                        echo "<tr>\n";
                        echo "  <td><a href=\"$viewUrl\">$ref</a></td>\n";
                        echo "  <td>$inc</td>\n";
                        echo "  <td>$loc</td>\n";
                        echo "  <td>$sum</td>\n";
                        echo "  <td>$tl</td>\n";
                        echo "  <td>$cust</td>\n";
                        echo "  <td>$submittedBy</td>\n";
                        // If there's a status comment, show a small '?' button next to the badge
                        $commentHtml = '';
                        if (!empty($statusComment)) {
                          $commentAttr = htmlspecialchars($statusComment, ENT_QUOTES);
                          $commentHtml = " <button type=\"button\" class=\"status-comment-btn\" data-comment=\"{$commentAttr}\" title=\"View comment\"><i class=\"fa fa-question-circle\"></i></button>";
                        }
                        echo "  <td><span class=\"badge $badgeClass\">$status</span>$commentHtml</td>\n";
                        echo "  <td>$est</td>\n";
                        echo "  <td><a class=\"btn btn-sm btn-outline-primary\" href=\"$viewUrl\">Details</a></td>\n";
                        echo "</tr>\n";
                      }
                    } else {
                      echo '<tr><td colspan="10" class="text-center">No spot reports found.</td></tr>';
                    }
                    ?>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Bootstrap 5 JS Bundle -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  <!-- Admin Dashboard JavaScript -->
  <script src="../../../../public/assets/js/admin/dashboard.js"></script>
  <!-- Admin Navigation JavaScript -->
  <script src="../../../../public/assets/js/admin/navigation.js"></script>
  <!-- Spot Reports Action Functionality -->
  <script src="../../../../public/assets/js/admin/spot_reports.js"></script>
</body>
</html>


