// Initialize page functionality and client-side filters
document.addEventListener('DOMContentLoaded', function() {
  // Add hover effects to action buttons
  const actionButtons = document.querySelectorAll('.btn-outline-secondary');
  actionButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
      this.style.transition = 'transform 0.2s ease';
    });

    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  function parseDateOnly(str) {
    if (!str) return null;
    const m = str.match(/(\d{4}-\d{2}-\d{2})/);
    if (m) return new Date(m[1]);
    const d = new Date(str);
    return isNaN(d.getTime()) ? null : d;
  }

  function parseCurrencyToNumber(text) {
    if (!text) return 0;
    const cleaned = text.replace(/[^0-9.\-]/g, '');
    const n = parseFloat(cleaned);
    return isNaN(n) ? 0 : n;
  }

  function applyFilters() {
    const searchTerm = (document.getElementById('searchInput').value || '').trim().toLowerCase();
    const dateFromVal = document.getElementById('dateFrom').value;
    const dateToVal = document.getElementById('dateTo').value;
    const statusVal = (document.getElementById('statusFilter').value || '').trim().toLowerCase();

    const dateFrom = dateFromVal ? new Date(dateFromVal) : null;
    const dateTo = dateToVal ? new Date(dateToVal) : null;
    if (dateTo) dateTo.setHours(23,59,59,999);

    const rows = document.querySelectorAll('#casesTableBody tr');
    let visibleCount = 0;
    const counts = {
      'under-investigation': 0,
      'pending-review': 0,
      'for-filing': 0,
      'filed-in-court': 0,
      'ongoing-trial': 0,
      'resolved': 0,
      'dismissed': 0,
      'archived': 0,
      'on-hold': 0,
      'under-appeal': 0
    };
    let estSum = 0;

    rows.forEach(row => {
      if (row.querySelector('td') && row.querySelector('td').getAttribute('colspan')) return;
      const cells = row.cells;
      if (!cells) return;

      const ref = (cells[0].textContent || '').toLowerCase();
      const incText = (cells[1].textContent || '').trim();
      const loc = (cells[2].textContent || '').toLowerCase();
      const teamLeader = (cells[3] ? (cells[3].textContent||'') : '').toLowerCase();
      const submittedBy = (cells[4] ? (cells[4].textContent||'') : '').toLowerCase();
      const reviewText = (cells[5] ? (cells[5].textContent||'') : '').toLowerCase();
      const caseStatusText = (cells[6] ? (cells[6].textContent||'') : '').toLowerCase();
      const estText = (cells[7] ? (cells[7].textContent||'') : '').trim();

      let visible = true;

      if (searchTerm) {
        const hay = ref + ' ' + loc + ' ' + teamLeader + ' ' + submittedBy + ' ' + reviewText + ' ' + caseStatusText;
        if (!hay.includes(searchTerm)) visible = false;
      }

      if (visible && (dateFrom || dateTo)) {
        const incDate = parseDateOnly(incText);
        if (!incDate) visible = false;
        else {
          if (dateFrom && incDate < dateFrom) visible = false;
          if (dateTo && incDate > dateTo) visible = false;
        }
      }

      if (visible && statusVal) {
        const norm = statusVal.replace(/_/g,' ');
        if (!caseStatusText.includes(norm)) visible = false;
      }

      if (visible) {
        row.style.display = '';
        visibleCount++;
        estSum += parseCurrencyToNumber(estText);

        if (caseStatusText.includes('under') || caseStatusText.includes('invest')) counts['under-investigation']++;
        else if (caseStatusText.includes('pending')) counts['pending-review']++;
        else if (caseStatusText.includes('for filing') || caseStatusText.includes('for-filing')) counts['for-filing']++;
        else if (caseStatusText.includes('filed') || caseStatusText.includes('filed in court') || caseStatusText.includes('filed-in-court')) counts['filed-in-court']++;
        else if (caseStatusText.includes('ongoing') || caseStatusText.includes('trial')) counts['ongoing-trial']++;
        else if (caseStatusText.includes('dismiss')) counts['dismissed']++;
        else if (caseStatusText.includes('resolv')) counts['resolved']++;
        else if (caseStatusText.includes('archiv')) counts['archived']++;
        else if (caseStatusText.includes('hold')) counts['on-hold']++;
        else if (caseStatusText.includes('appeal')) counts['under-appeal']++;
      } else {
        row.style.display = 'none';
      }
    });

    document.getElementById('count-under-investigation').textContent = counts['under-investigation'];
    document.getElementById('count-pending-review').textContent = counts['pending-review'];
    document.getElementById('count-for-filing').textContent = counts['for-filing'];
    document.getElementById('count-filed-in-court').textContent = counts['filed-in-court'];
    document.getElementById('count-ongoing-trial').textContent = counts['ongoing-trial'];
    document.getElementById('count-resolved').textContent = counts['resolved'];
    document.getElementById('count-dismissed').textContent = counts['dismissed'];
    document.getElementById('count-archived').textContent = counts['archived'];
    document.getElementById('count-on-hold').textContent = counts['on-hold'];
    document.getElementById('count-under-appeal').textContent = counts['under-appeal'];

    const tbody = document.getElementById('casesTableBody');
    if (tbody) {
      const placeholder = tbody.querySelector('tr[data-placeholder]');
      if (visibleCount === 0) {
        if (!placeholder) {
          const nr = document.createElement('tr');
          nr.setAttribute('data-placeholder','1');
          nr.innerHTML = '<td colspan="9" class="text-center">No approved cases found.</td>';
          tbody.appendChild(nr);
        }
      } else {
        if (placeholder) placeholder.remove();
      }
    }
  }

  const applyFilterBtn = document.getElementById('applyFilter');
  const clearFilterBtn = document.getElementById('clearFilter');
  if (applyFilterBtn) applyFilterBtn.addEventListener('click', applyFilters);
  if (clearFilterBtn) clearFilterBtn.addEventListener('click', function() {
    document.getElementById('searchInput').value = '';
    document.getElementById('dateFrom').value = '';
    document.getElementById('dateTo').value = '';
    document.getElementById('statusFilter').value = '';
    applyFilters();
  });

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { e.preventDefault(); applyFilters(); }
  });
});
