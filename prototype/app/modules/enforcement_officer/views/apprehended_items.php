<?php require_once __DIR__ . '/../controllers/apprehended_items_backend.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Apprehended Items - CENRO NASIPIT</title>
  <!-- Bootstrap 5 CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Bootstrap Icons -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
  <!-- Admin common styles -->
  <link rel="stylesheet" href="../../../../public/assets/css/modules/admin/common.css">
  <!-- Apprehended Items specific styles -->
  <link rel="stylesheet" href="../../../../public/assets/css/modules/admin/apprehended-items.css">
  <link rel="stylesheet" href="../../../../public/assets/css/modules/enforcement_officer/apprehended_items.css">
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
          <li class="active"><a href="apprehended_items.php"><i class="fa fa-archive"></i> Apprehended Items</a></li>
          <li><a href="service_requests.php"><i class="fa fa-cog"></i> Service Requests</a></li>
          <li><a href="statistical_report.php"><i class="fa fa-chart-bar"></i> Statistical Report</a></li>
        </ul>
      </nav>
    </nav>
    <!-- Main -->
    <div class="main">
      <div class="topbar">
        <div class="topbar-card">
          <div class="topbar-title">Apprehended Items</div>
          <?php include __DIR__ . '/../../shared/views/topbar_profile.php'; ?>
        </div>
      </div>
      <div class="main-content">
        <div class="container-fluid">
          
          <!-- Search and Filter Section -->
          <div class="search-filter-section mb-4">
            <div class="row">
              <div class="col-md-6">
                <div class="search-box">
                  <input type="text" class="form-control" id="searchInput" placeholder="Search">
                  <i class="fa fa-search search-icon"></i>
                </div>
              </div>
              <div class="col-md-6">
                <div class="filter-buttons d-flex gap-2">
                  <button class="btn btn-filter active" data-filter="all">All</button>
                  <button class="btn btn-filter" data-filter="vehicle">Vehicle</button>
                  <button class="btn btn-filter" data-filter="item">Items</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Items Table -->
          <div class="items-table-section">
            <div class="table-responsive">
              <table class="table table-hover" id="itemsTable">
                <thead class="table-light">
                  <tr>
                    <th>Reference No.</th>
                    <th>Item Type</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Volume</th>
                    <th>Evidence</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  <?php if (!empty($items) && is_array($items)): ?>
                    <?php foreach ($items as $item): ?>
                      <?php
                        $type = strtolower(trim($item['type'] ?? ''));
                        // Only display vehicles and seizure items (map other allowed types to 'item')
                        $allowedItemTypes = ['equipment', 'forest-product', 'item', 'seizure', 'seizure-item'];
                        if ($type !== 'vehicle' && !in_array($type, $allowedItemTypes, true)) {
                          continue;
                        }
                        $rowType = ($type === 'vehicle') ? 'vehicle' : 'item';
                      ?>
                      <tr data-type="<?php echo $rowType; ?>">
                        <td><?php echo htmlspecialchars($item['reference_no'] ?? ''); ?></td>
                        <td><?php echo htmlspecialchars($item['type_label'] ?? ($type === 'vehicle' ? 'Vehicle' : 'Item')); ?></td>
                        <td><?php echo htmlspecialchars($item['description'] ?? ''); ?></td>
                        <td><?php echo htmlspecialchars($item['quantity'] ?? ''); ?></td>
                        <td><?php echo htmlspecialchars($item['volume'] ?? ''); ?></td>
                        <td><?php echo $item['evidence'] ?? ''; ?></td>
                        <td><span class="badge <?php echo htmlspecialchars($item['status_class'] ?? ''); ?>"><?php echo htmlspecialchars($item['status_label'] ?? ''); ?></span></td>
                        <?php
                          $luRaw = $item['last_updated'] ?? '';
                          $lastUpdatedDisplay = '-';
                          if (!empty($luRaw)) {
                            // If numeric timestamp, convert to int; else try strtotime
                            if (is_numeric($luRaw)) {
                              $ts = (int)$luRaw;
                            } else {
                              $ts = strtotime($luRaw);
                            }
                            if ($ts !== false && $ts > 0) {
                              $lastUpdatedDisplay = date('M d, Y g:i a', $ts);
                            } else {
                              // Fallback to raw string if parsing failed
                              $lastUpdatedDisplay = $luRaw;
                            }
                          }
                        ?>
                        <td><?php echo htmlspecialchars($lastUpdatedDisplay); ?></td>
                      </tr>
                    <?php endforeach; ?>
                  <?php else: ?>
                    <tr>
                      <td colspan="8" class="text-center">No apprehended items found.</td>
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
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  <!-- Admin Dashboard JavaScript -->
  <script src="../../../../public/assets/js/admin/dashboard.js"></script>
  <!-- Admin Navigation JavaScript -->
  <script src="../../../../public/assets/js/admin/navigation.js"></script>
  <!-- Apprehended Items JavaScript -->
  <script src="../../../../public/assets/js/admin/apprehended-items.js"></script>
  <script src="../../../../public/assets/js/enforcement_officer/apprehended_items.js"></script>
</body>
</html>




