<?php require_once __DIR__ . '/../controllers/ongoing_scheduled_backend.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ongoing / Scheduled</title>
  <!-- Bootstrap 5 CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Bootstrap Icons -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
  <!-- Admin common styles -->
  <link rel="stylesheet" href="../../../../public/assets/css/modules/admin/common.css">
  <!-- Service Desk specific styles -->
  <link rel="stylesheet" href="../../../../public/assets/css/modules/admin/service-desk.css">
  <link rel="stylesheet" href="../../../../public/assets/css/modules/admin/ongoing_scheduled.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
  <link href="https://fonts.googleapis.com/css?family=Fredoka+One:400&display=swap" rel="stylesheet">
  <!-- Flatpickr datepicker CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
</head>
<body>
  <div class="layout">
    <!-- Sidebar -->
    <nav class="sidebar" role="navigation" aria-label="Main sidebar">
      <div class="sidebar-logo">
        <img src="../../../../public/assets/images/denr-logo.png" alt="DENR Logo">
        <span>CENRO</span>
      </div>
      <div class="sidebar-role"><?php echo htmlspecialchars($sidebarRole, ENT_QUOTES, 'UTF-8'); ?></div>
      <nav class="sidebar-nav" aria-label="Sidebar menu">
        <ul>
          <li><a href="dashboard.php"><i class="fa fa-th-large"></i> Dashboard</a></li>
          <li><a href="user_management.php"><i class="fa fa-users"></i> User Management</a></li>
          <li><a href="spot_reports.php"><i class="fa fa-file-text"></i> Spot Reports</a></li>
          <li><a href="case_management.php"><i class="fa fa-briefcase"></i> Case Management</a></li>
          <li><a href="apprehended_items.php"><i class="fa fa-archive"></i> Apprehended Items</a></li>
          <li><a href="equipment_management.php"><i class="fa fa-cogs"></i> Equipment Management</a></li>
          <li><a href="assignments.php"><i class="fa fa-tasks"></i> Assignments</a></li>
              <li class="dropdown active">
            <a href="#" class="dropdown-toggle active" id="serviceDeskToggle" data-target="serviceDeskMenu">
              <i class="fa fa-headset"></i> Service Desk 
              <i class="fa fa-chevron-down dropdown-arrow rotated"></i>
            </a>
            <ul class="dropdown-menu show" id="serviceDeskMenu">
              <li><a href="new_requests.php">New Requests <span class="badge">2</span></a></li>
              <li class="active"><a href="ongoing_scheduled.php">Ongoing / Scheduled <span class="badge badge-blue"><?php echo htmlspecialchars($ongoingCount, ENT_QUOTES, 'UTF-8'); ?></span></a></li>
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
          <div class="topbar-title">Ongoing / Scheduled Requests</div>
          <?php include __DIR__ . '/../../shared/views/topbar_profile.php'; ?>
        </div>
      </div>
      <div class="main-content">
        <!-- Ongoing / Scheduled Content -->
        <div class="container-fluid p-4">
          <!-- Top Controls -->
          <div class="row mb-4 align-items-center">
            <div class="col-md-2">
              <input type="text" class="form-control" placeholder="Search">
            </div>
            <div class="col-md-2">
              <input type="text" id="date_from" class="form-control date-picker" placeholder="mm/dd/yyyy" autocomplete="off">
            </div>
            <div class="col-md-2">
              <input type="text" id="date_to" class="form-control date-picker" placeholder="mm/dd/yyyy" autocomplete="off">
            </div>
            <div class="col-md-3">
              <div class="filter-buttons">
                <button id="applyFilter" class="btn btn-primary">Apply</button>
                <button id="clearFilter" class="btn btn-outline-secondary">Clear</button>
              </div>
            </div>
          </div>

          <!-- Ongoing / Scheduled Table -->
          <div class="new-requests-table-section">
            <div class="table-responsive">
              <table class="table table-bordered table-sm ongoing-requests-table" id="ongoingRequestsTable">
                <thead class="table-light">
                  <tr>
                    <th class="ongoing-cell-head">Ticket ID</th>
                    <th class="ongoing-cell-head">Date Logged</th>
                    <th class="ongoing-cell-head">Requester</th>
                    <th class="ongoing-cell-head">Position</th>
                    <th class="ongoing-cell-head">Office/Unit</th>
                    <th class="ongoing-cell-head">Type of Request</th>
                    <th class="ongoing-cell-head">Start Date/Time</th>
                    <th class="ongoing-cell-head">Status</th>
                    <th class="ongoing-cell-head">Details</th>
                    <th class="ongoing-cell-head">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <?php if (!empty($ongoing)): foreach ($ongoing as $r): 
                    $firstActionStart = '-';
                    if ($actionStmt) {
                      try {
                        $actionStmt->execute(['id' => $r['id']]);
                        $firstActionRow = $actionStmt->fetch(PDO::FETCH_ASSOC);
                        if (!empty($firstActionRow) && !empty($firstActionRow['action_date'])) {
                          $firstActionStart = $firstActionRow['action_date'] . (!empty($firstActionRow['action_time']) ? ' ' . $firstActionRow['action_time'] : '');
                        } elseif (!empty($r['start_datetime'])) {
                          $firstActionStart = $r['start_datetime'];
                        }
                      } catch (Exception $e) {
                        error_log('fetch first action start error: ' . $e->getMessage());
                      }
                    } else {
                      if (!empty($r['start_datetime'])) {
                        $firstActionStart = $r['start_datetime'];
                      }
                    }

                    // Prepare display value and format if it's a valid datetime
                    $displayStart = '-';
                    if ($firstActionStart !== '-' && strtotime($firstActionStart) !== false) {
                      $displayStart = date('m/d/Y h:i A', strtotime($firstActionStart));
                    } elseif ($firstActionStart !== '-') {
                      $displayStart = $firstActionStart;
                    }
                  ?>
                    <tr>
                      <td class="ongoing-cell-body"><?php echo htmlspecialchars($r['ticket_no'] ?? $r['id'] ?? ''); ?></td>
                      <td class="ongoing-cell-body">
                        <?php
                          if (!empty($r['ticket_date'])) {
                            echo htmlspecialchars(date('m/d/Y', strtotime($r['ticket_date'])));
                          } elseif (!empty($r['created_at'])) {
                            echo htmlspecialchars(date('m/d/Y', strtotime($r['created_at'])));
                          } else {
                            echo '';
                          }
                        ?>
                      </td>
                      <td class="ongoing-cell-body"><?php echo htmlspecialchars($r['requester_name'] ?? ''); ?></td>
                      <td class="ongoing-cell-body"><?php echo htmlspecialchars($r['requester_position'] ?? ''); ?></td>
                      <td class="ongoing-cell-body"><?php echo htmlspecialchars($r['requester_office'] ?? ''); ?></td>
                      <td class="ongoing-cell-body"><?php echo htmlspecialchars($r['request_type'] ?? ''); ?></td>
                      <td class="ongoing-cell-body"><?php echo htmlspecialchars($displayStart); ?></td>
                      <td class="ongoing-cell-body"><span class="badge bg-info text-dark"><?php echo htmlspecialchars($r['status'] ?? ''); ?></span></td>
                      <td class="ongoing-cell-body"><a href="request_details.php?id=<?php echo urlencode($r['id']); ?>" class="btn btn-sm btn-outline-primary">View</a></td>
                      <td class="ongoing-cell-body">
                        <a href="edit_requests_ongoing.php?id=<?php echo urlencode($r['id'] ?? $r['ticket_no'] ?? ''); ?>" class="btn btn-sm btn-outline-secondary">Edit</a>
                      </td>
                    </tr>
                  <?php endforeach; else: ?>
                    <tr>
                      <td colspan="10" class="text-center">No ongoing or scheduled requests.</td>
                    </tr>
                  <?php endif; ?>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

  <!-- Bootstrap 5 JS Bundle -->
  <!-- Flatpickr JS -->
  <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  <!-- Admin Dashboard JavaScript -->
  <script src="../../../../public/assets/js/admin/dashboard.js"></script>
  <!-- Admin Navigation JavaScript -->
  <script src="../../../../public/assets/js/admin/navigation.js"></script>
  <script src="../../../../public/assets/js/admin/ongoing_scheduled.js"></script>
</body>
</html>
