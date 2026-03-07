<?php require_once __DIR__ . '/../controllers/service_requests_backend.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Service Requests</title>
  <!-- Bootstrap 5 CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Bootstrap Icons -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
  <!-- Admin common styles -->
  <link rel="stylesheet" href="../../../../public/assets/css/modules/admin/common.css">
  <!-- Dashboard specific styles -->
  <link rel="stylesheet" href="../../../../public/assets/css/modules/admin/dashboard.css">
  <link rel="stylesheet" href="../../../../public/assets/css/modules/enforcement_officer/service_requests.css">
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
      <div class="sidebar-role"><?php echo htmlspecialchars((string)($sidebarRole ?? 'Enforcement Officer'), ENT_QUOTES, 'UTF-8'); ?></div>
      <nav class="sidebar-nav" aria-label="Sidebar menu">
        <ul>
          <li><a href="dashboard.php"><i class="fa fa-th-large"></i> Dashboard</a></li>
          <li><a href="spot_reports.php"><i class="fa fa-file-text"></i> Spot Reports</a></li>
          <li><a href="case_management.php"><i class="fa fa-briefcase"></i> Case Management</a></li>
          <li><a href="apprehended_items.php"><i class="fa fa-archive"></i> Apprehended Items</a></li>
          <li class="active"><a href="service_requests.php"><i class="fa fa-cog"></i> Service Requests</a></li>
          <li><a href="statistical_report.php"><i class="fa fa-chart-bar"></i> Statistical Report</a></li>
        </ul>
      </nav>
    </nav>
    <!-- Main -->
    <div class="main">
      <div class="topbar">
        <div class="topbar-card">
          <div class="topbar-title">Service Requests</div>
          <?php include __DIR__ . '/../../shared/views/topbar_profile.php'; ?>
        </div>
      </div>
      <div class="main-content">
        <div class="container-fluid p-2">

          <!-- Filter Controls -->
          <form method="get" action="service_requests.php">
          <div class="row mb-4 g-3 align-items-end">
            <!-- Search -->
            <div class="col-md-3">
              <input type="text" name="search" value="<?php echo htmlspecialchars($search); ?>" class="form-control sr-control" placeholder="Search">
            </div>
            <!-- Date From -->
            <div class="col-md-2">
              <input type="date" name="date_from" value="<?php echo htmlspecialchars($dateFrom); ?>" class="form-control sr-control" onkeydown="return false;" onpaste="return false;" onclick="this.showPicker && this.showPicker()">
            </div>
            <!-- Date To -->
            <div class="col-md-2">
              <input type="date" name="date_to" value="<?php echo htmlspecialchars($dateTo); ?>" class="form-control sr-control" onkeydown="return false;" onpaste="return false;" onclick="this.showPicker && this.showPicker()">
            </div>
            <!-- Apply Button -->
            <div class="col-md-1">
              <button type="submit" class="btn btn-primary w-100 sr-btn-primary">Apply</button>
            </div>
            <!-- Clear Button -->
            <div class="col-md-1">
              <a href="service_requests.php" class="btn btn-outline-secondary w-100 sr-btn-clear">Clear</a>
            </div>
          </div>
          </form>

          <!-- New Request Button -->
          <div class="row mb-3">
            <div class="col-12 d-flex justify-content-end">
              <a href="new_requests.php" class="btn btn-primary sr-btn-new-request">
                + New Request
              </a>
            </div>
          </div>

          <!-- Data Table -->
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body p-0">
                  <div class="table-responsive">
                    <table class="table table-hover mb-0">
                      <thead class="table-light">
                        <tr>
                          <th>Ticket ID</th>
                          <th>Date Logged</th>
                          <th>Type of Request</th>
                          <th>Description of Request</th>
                          <th>Status</th>
                          <th>Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <?php if (!empty($service_requests) && is_array($service_requests)): ?>
                          <?php foreach ($service_requests as $req): ?>
                            <tr>
                              <td><?php echo htmlspecialchars($req['ticket_no'] ?? $req['id'] ?? ''); ?></td>
                              <td><?php echo !empty($req['ticket_date']) ? htmlspecialchars(date('Y-m-d', strtotime($req['ticket_date']))) : htmlspecialchars($req['created_at'] ?? ''); ?></td>
                              <td><?php echo htmlspecialchars($req['request_type'] ?? ''); ?></td>
                              <td><?php echo htmlspecialchars($req['request_description'] ?? $req['request_description'] ?? ''); ?></td>
                              <td>
                                <?php
                                  // Normalize status values: map legacy 'open' to 'pending'
                                  $rawStatus = strtolower(trim($req['status'] ?? ''));
                                  if ($rawStatus === 'open') $rawStatus = 'pending';
                                  $displayStatus = ucfirst($rawStatus ?: '');
                                  $badgeColor = ($rawStatus === 'pending') ? '#ffc107' : (($rawStatus === 'completed') ? '#28a745' : '#6c757d');
                                ?>
                                <span class="badge" style="background-color: <?php echo htmlspecialchars($badgeColor); ?>; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px;"><?php echo htmlspecialchars($displayStatus); ?></span>
                              </td>
                              <td>
                                <a href="request_details.php?id=<?php echo urlencode($req['id'] ?? ''); ?>" class="btn btn-sm btn-outline-primary">View</a>
                                <?php if ($rawStatus === 'completed'): ?>
                                  <a href="rate_request.php?id=<?php echo urlencode($req['id'] ?? ''); ?>" class="btn btn-sm btn-warning text-dark ms-2"><i class="fa fa-star me-1"></i>Rate</a>
                                <?php endif; ?>
                              </td>
                            </tr>
                          <?php endforeach; ?>
                        <?php else: ?>
                          <tr>
                            <td colspan="6" class="text-center">No service requests found.</td>
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
      </div>
    </div>
  </div>

  <!-- Bootstrap 5 JS Bundle -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  <!-- Admin Navigation JavaScript -->
  <script src="../../../../public/assets/js/admin/navigation.js"></script>
  <!-- Flatpickr JS -->
  <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
  <script src="../../../../public/assets/js/enforcement_officer/service_requests.js"></script>
</body>
</html>
