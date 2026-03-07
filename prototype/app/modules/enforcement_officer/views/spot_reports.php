<?php require_once __DIR__ . '/../controllers/spot_reports_backend.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Spot Reports - CENRO NASIPIT</title>
  <!-- Bootstrap 5 CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Bootstrap Icons -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
  <!-- Admin common styles -->
  <link rel="stylesheet" href="../../../../public/assets/css/modules/admin/common.css">
  <!-- Spot Reports specific styles -->
  <link rel="stylesheet" href="../../../../public/assets/css/modules/admin/spot_reports.css">
  <link rel="stylesheet" href="../../../../public/assets/css/modules/enforcement_officer/spot_reports.css">
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
      <div class="sidebar-role">Enforcement Officer</div>
      <nav class="sidebar-nav" aria-label="Sidebar menu">
        <ul>
          <li><a href="dashboard.php"><i class="fa fa-th-large"></i> Dashboard</a></li>
          <li class="active"><a href="spot_reports.php"><i class="fa fa-file-text"></i> Spot Reports</a></li>
          <li><a href="case_management.php"><i class="fa fa-briefcase"></i> Case Management</a></li>
          <li><a href="apprehended_items.php"><i class="fa fa-archive"></i> Apprehended Items</a></li>
          <li><a href="service_requests.php"><i class="fa fa-cog"></i> Service Requests</a></li>
          <li><a href="statistical_report.php"><i class="fa fa-chart-bar"></i> Statistical Report</a></li>
        </ul>
      </nav>
    </nav>
    <!-- Main -->
    <div class="main">
      <div class="topbar">
        <div class="topbar-card">
          <div class="topbar-title">Spot Report</div>
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
                      <th>Actions</th>
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
                        $commentRaw = isset($r['status_comment']) ? $r['status_comment'] : '';
                        $badgeClass = 'bg-secondary';
                        if ($statusRaw === 'approved') $badgeClass = 'bg-success';
                        elseif ($statusRaw === 'pending') $badgeClass = 'bg-warning';
                        elseif ($statusRaw === 'rejected') $badgeClass = 'bg-danger';
                        elseif ($statusRaw === 'under_review' || $statusRaw === 'under review') $badgeClass = 'bg-info';
                        $status = htmlspecialchars($r['status'] ?? '');
                        $commentAttr = htmlspecialchars($commentRaw, ENT_QUOTES);
                        $estRaw = isset($r['est_value']) ? $r['est_value'] : null;
                        $est = ($estRaw !== null && $estRaw !== '') ? ('&#8369; ' . number_format((float)$estRaw, 2)) : '-';
                        $viewUrl = 'view_spot_report.php?ref=' . urlencode($r['reference_no']);
                        echo "<tr>\n";
                        echo "  <td><a href=\"$viewUrl\">$ref</a></td>\n";
                        echo "  <td>$inc</td>\n";
                        echo "  <td>$loc</td>\n";
                        echo "  <td>$sum</td>\n";
                        echo "  <td>$tl</td>\n";
                        echo "  <td>$cust</td>\n";
                        echo "  <td>$submittedBy</td>\n";
                        $statusHtml = "<span class=\"badge $badgeClass\">$status</span>";
                        if (strpos(strtolower($status), 'rejected') !== false && $commentRaw !== '') {
                          $statusHtml .= " <button type=\"button\" class=\"status-comment-btn\" data-comment=\"{$commentAttr}\" title=\"View comment\" style=\"display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;margin-left:8px;vertical-align:middle;border:1px solid #ced4da;border-radius:6px;background:#fff;color:#495057;padding:0;\"><i class=\"fa fa-question-circle\"></i></button>";
                        }
                        echo "  <td>$statusHtml</td>\n";
                        echo "  <td>$est</td>\n";
                        echo "  <td><a class=\"btn btn-sm btn-outline-primary\" href=\"$viewUrl\">Details</a></td>\n";
                        echo "  <td><button class=\"btn btn-sm btn-outline-secondary\" onclick=\"editSpotReportStatus('$ref')\">Edit</button></td>\n";
                        echo "</tr>\n";
                      }
                    } else {
                      echo '<tr><td colspan="11" class="text-center">No spot reports found.</td></tr>';
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
  <script src="../../../../public/assets/js/admin/navigation.js"></script>  <!-- Spot Reports Action Functionality -->
  <script src="../../../../public/assets/js/enforcement_officer/spot_reports.js"></script>
</body>
</html>
