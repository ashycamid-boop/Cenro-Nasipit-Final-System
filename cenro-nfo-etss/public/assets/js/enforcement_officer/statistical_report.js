/* ===== Chart defaults ===== */
    Chart.defaults.animation = false;
    Chart.defaults.responsive = true;
    Chart.defaults.maintainAspectRatio = false;
    Chart.defaults.resizeDelay = 200;
    
    // Register the datalabels plugin
    Chart.register(ChartDataLabels);

    const PALETTE = ['#2563eb','#10b981','#f59e0b','#ef4444','#8b5cf6','#14b8a6','#f97316','#06b6d4','#84cc16','#64748b'];
    const rgba = (hex,a=.35)=>{const m=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);return `rgba(${parseInt(m[1],16)},${parseInt(m[2],16)},${parseInt(m[3],16)},${a})`};

    /* ===== Period helpers (From/To months) ===== */
    function monthsBetween(fromStr, toStr){
      const [fy,fm] = fromStr.split('-').map(Number);
      const [ty,tm] = toStr.split('-').map(Number);
      const start = new Date(fy, fm-1, 1);
      const end   = new Date(ty, tm-1, 1);
      const out=[];
      let cur = new Date(start);
      while (cur <= end){
        out.push({y:cur.getFullYear(),m:cur.getMonth()+1,label:`${cur.getFullYear()}-${String(cur.getMonth()+1).padStart(2,'0')}`});
        cur.setMonth(cur.getMonth()+1);
      }
      return out;
    }
    const toQuarter = m=>Math.floor((m-1)/3)+1;
    function aggregate(series, baseMonths, gran){
      if (gran==='monthly') return {labels: baseMonths.map(x=>x.label), data: series.slice(0, baseMonths.length)};
      if (gran==='quarterly'){
        const map=new Map();
        baseMonths.forEach((bm,i)=>{const k=`${bm.y} Q${toQuarter(bm.m)}`; map.set(k,(map.get(k)||0)+(series[i]||0));});
        return {labels:[...map.keys()], data:[...map.values()]};
      }
      const map=new Map();
      baseMonths.forEach((bm,i)=>{const k=`${bm.y}`; map.set(k,(map.get(k)||0)+(series[i]||0));});
      return {labels:[...map.keys()], data:[...map.values()]};
    }
    function sum(arr){ return arr.reduce((x,y)=>x+(+y||0),0); }
    const labelize = g => g[0].toUpperCase()+g.slice(1);

    /* ===== Data placeholders (static/demo data removed) ===== */
    // Keep a reasonable months window limit; real data should be retrieved from server/API
    const monthsWindow = 24;

    // NOTE: All demo/static arrays removed. Populate these via AJAX/server endpoints.
    const m_spot_reports = [];
    const spotStatusLabels = [];
    const spotStatusCounts = [];

    const m_cases_opened = [];
    const caseStatusLabels = [];
    const caseStatusCounts = [];

    const m_app_individuals = [];
    const rolesLabels = [];
    const rolesCounts = [];
    const genderLabels = [];
    const genderCounts = [];

    const m_app_vehicles = [];
    const vehicleStatusLabels = [];
    const vehicleStatusCounts = [];

    const m_app_items = [];
    const itemTypeLabels = [];
    const itemTypeCounts = [];

    const locLabels = [];
    const locCounts = [];

    const svcStatusLabels = [];
    const svcStatusCounts = [];
    const svcDevicesLabels = [];
    const svcDevicesCounts = [];
    const svcStatusMap = {};
    let apiLabels = [];

    /* ===== Chart builders (BAR / PIE only) ===== */
    const charts = {};
    const mkBar = (id, labels, data, colorIdx=0)=>{
      const canvas = document.getElementById(id);
      if (!canvas) return;
      
      // Reset canvas animation
      canvas.classList.remove('loaded');
      
      if (charts[id]) charts[id].destroy();
      
      // Add smooth chart transition (skip fade while preparing print output)
      canvas.style.opacity = printingInProgress ? '1' : '0.3';
      canvas.style.transform = printingInProgress ? 'scale(1)' : 'scale(0.98)';
      
      charts[id]=new Chart(canvas,{
        type:'bar',
        data:{
          labels,
          datasets:[{
            data,
            backgroundColor: data.map((_, i) => {
              // Gradient colors for each bar
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              const gradient = ctx.createLinearGradient(0, 0, 0, 300);
              gradient.addColorStop(0, PALETTE[(colorIdx + i) % PALETTE.length]);
              gradient.addColorStop(1, rgba(PALETTE[(colorIdx + i) % PALETTE.length], 0.3));
              return gradient;
            }),
            borderColor: PALETTE[colorIdx],
            borderWidth: 0,
            borderRadius: 12,
            borderSkipped: false,
            barThickness: 'flex',
            maxBarThickness: 50,
            hoverBackgroundColor: data.map((_, i) => PALETTE[(colorIdx + i) % PALETTE.length]),
            hoverBorderColor: '#fff',
            hoverBorderWidth: 3,
            // Shadow effect
            shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.2)'
          }]
        },
        options:{
          responsive: true,
          maintainAspectRatio: false,
          plugins:{
            legend:{display:false},
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#fff',
              bodyColor: '#fff',
              borderColor: PALETTE[colorIdx],
              borderWidth: 1,
              cornerRadius: 8,
              displayColors: false,
              callbacks: {
                title: function(context) {
                  return context[0].label;
                },
                label: function(context) {
                  return `Count: ${context.raw}`;
                }
              }
            }
          },
          scales:{
            x:{
              grid:{
                display: false
              },
              ticks:{
                autoSkip: true,
                maxRotation: 45,
                color: '#6b7280',
                font: {
                  size: 11,
                  weight: '500'
                }
              },
              border: {
                display: false
              }
            },
            y:{
              beginAtZero: true,
              grid: {
                color: 'rgba(107, 114, 128, 0.1)',
                drawBorder: false
              },
              ticks:{
                precision: 0,
                color: '#6b7280',
                font: {
                  size: 11
                },
                padding: 10
              },
              border: {
                display: false
              }
            }
          },
          animation: {
            duration: printingInProgress ? 0 : 1500,
            easing: printingInProgress ? 'linear' : 'easeOutBounce',
            delay: (context) => {
              return printingInProgress ? 0 : (context.dataIndex * 200); // Stagger animation
            },
            onProgress: (animation) => {
              if (printingInProgress) return;
              // Add glow effect during animation
              const ctx = animation.chart.ctx;
              ctx.save();
              ctx.shadowColor = PALETTE[colorIdx];
              ctx.shadowBlur = 20;
              ctx.restore();
            },
            onComplete: () => {
              canvas.classList.add('loaded');
            }
          },
          interaction: {
            intersect: false,
            mode: 'index'
          }
        }
      });
      
      // Complete chart transition
      if (printingInProgress) {
        canvas.style.opacity = '1';
        canvas.style.transform = 'scale(1)';
        canvas.classList.add('loaded');
      } else {
        setTimeout(() => {
          canvas.style.opacity = '1';
          canvas.style.transform = 'scale(1)';
          canvas.classList.add('loaded');
        }, 300);
      }
    };
    const mkPie = (id, labels, data, doughnut=false)=>{
      const canvas = document.getElementById(id);
      if (!canvas) return;
      
      // Reset canvas animation
      canvas.classList.remove('loaded');
      
      if (charts[id]) charts[id].destroy();
      
      // Add smooth chart transition (skip fade while preparing print output)
      canvas.style.opacity = printingInProgress ? '1' : '0.3';
      canvas.style.transform = printingInProgress ? 'scale(1)' : 'scale(0.98)';
      
      const colors=labels.map((_,i)=>PALETTE[i%PALETTE.length]);
      charts[id]=new Chart(canvas,{
        type: doughnut?'doughnut':'pie',
        data:{labels,datasets:[{data,backgroundColor:colors}]},
        options:{
          plugins:{
            legend:{
              position:'right',
              align: 'center',
              labels: {
                usePointStyle: true,
                pointStyle: 'rect',
                padding: 15,
                font: {
                  size: 12
                },
                generateLabels: function(chart) {
                  const data = chart.data;
                  if (data.labels.length && data.datasets.length) {
                    const dataset = data.datasets[0];
                    const total = dataset.data.reduce((a, b) => a + b, 0);
                    return data.labels.map((label, i) => {
                      const value = dataset.data[i];
                      const percentage = ((value / total) * 100).toFixed(1);
                      return {
                        text: `${label}: ${value} (${percentage}%)`,
                        fillStyle: dataset.backgroundColor[i],
                        strokeStyle: dataset.backgroundColor[i],
                        pointStyle: 'rect',
                        hidden: false,
                        index: i
                      };
                    });
                  }
                  return [];
                }
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = ((context.raw / total) * 100).toFixed(1);
                  return `${context.label}: ${context.raw} (${percentage}%)`;
                }
              }
            },
            datalabels: {
              display: true,
              color: '#fff',
              font: {
                weight: 'bold',
                size: 11
              },
              formatter: function(value, context) {
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                // Show both count and percentage, but only if slice is >= 3% to avoid clutter
                return percentage >= 3 ? `${value}\n${percentage}%` : '';
              },
              textAlign: 'center',
              anchor: 'center',
              align: 'center'
            }
          },
          cutout: doughnut?'55%':0,
          animation: {
            duration: printingInProgress ? 0 : 1200,
            easing: printingInProgress ? 'linear' : 'easeOutBounce',
            onComplete: () => {
              canvas.classList.add('loaded');
            }
          }
        }
      });
      
      // Complete chart transition
      if (printingInProgress) {
        canvas.style.opacity = '1';
        canvas.style.transform = 'scale(1)';
        canvas.classList.add('loaded');
      } else {
        setTimeout(() => {
          canvas.style.opacity = '1';
          canvas.style.transform = 'scale(1)';
          canvas.classList.add('loaded');
        }, 300);
      }
    };

    /* ===== Load data from backend ===== */
    async function fetchStats(fromMonth='', toMonth=''){
      try{
        const params = new URLSearchParams();
        if (fromMonth && toMonth) {
          params.set('from', fromMonth);
          params.set('to', toMonth);
        } else {
          params.set('months', String(monthsWindow));
        }
        const resp = await fetch('./actions/get_statistical_data.php?' + params.toString(), { credentials: 'same-origin' });
        if (!resp.ok) throw new Error('Network response not ok');
        const json = await resp.json();
        if (!json.ok) throw new Error(json.error || 'Invalid data');
        apiLabels = Array.isArray(json.labels) ? json.labels.slice() : [];

        // Fill frontend arrays from API
        // time series
        if (Array.isArray(json.spot && json.spot.series ? json.spot.series : [])) {
          m_spot_reports.length = 0; m_spot_reports.push(...json.spot.series);
        }
        if (Array.isArray(json.cases && json.cases.series ? json.cases.series : [])){
          m_cases_opened.length = 0; m_cases_opened.push(...json.cases.series);
        }
            if (json.apprehended){
              // Prefer server-provided series (counts per month). Fall back to raw arrays if necessary.
              const personsSeries = Array.isArray(json.apprehended.persons && json.apprehended.persons.series ? json.apprehended.persons.series : (json.apprehended.persons || [])) ? (json.apprehended.persons.series || json.apprehended.persons || []) : [];
              const vehiclesSeries = Array.isArray(json.apprehended.vehicles && json.apprehended.vehicles.series ? json.apprehended.vehicles.series : (json.apprehended.vehicles || [])) ? (json.apprehended.vehicles.series || json.apprehended.vehicles || []) : [];
              const itemsSeries = Array.isArray(json.apprehended.items && json.apprehended.items.series ? json.apprehended.items.series : (json.apprehended.items || [])) ? (json.apprehended.items.series || json.apprehended.items || []) : [];

              m_app_individuals.length = 0; m_app_individuals.push(...personsSeries);
              m_app_vehicles.length = 0; m_app_vehicles.push(...vehiclesSeries);
              m_app_items.length = 0; m_app_items.push(...itemsSeries);
            }

        // spot status pie
        if (json.spot && json.spot.by_status){
          spotStatusLabels.length = 0; spotStatusCounts.length = 0;
          Object.entries(json.spot.by_status).forEach(([k,v])=>{ spotStatusLabels.push(k); spotStatusCounts.push(v); });
        }

        // case status pie
        if (json.cases && json.cases.by_status){
          caseStatusLabels.length = 0; caseStatusCounts.length = 0;
          Object.entries(json.cases.by_status).forEach(([k,v])=>{ caseStatusLabels.push(k); caseStatusCounts.push(v); });
        }

        // service requests
        if (json.service_requests){
          // Prefer per-user service request status counts when provided by the API
          const byStatus = (json.service_requests.by_status_user && Object.keys(json.service_requests.by_status_user).length) ? json.service_requests.by_status_user : (json.service_requests.by_status || {});
          svcStatusLabels.length = 0; svcStatusCounts.length = 0;
          Object.entries(byStatus).forEach(([k,v])=>{ svcStatusLabels.push(k); svcStatusCounts.push(v); });
          // keep a map for quick status lookups (keys are as returned by API)
          for (const key in svcStatusMap) delete svcStatusMap[key];
          Object.entries(byStatus).forEach(([k,v])=>{ svcStatusMap[k] = v; });
          svcDevicesLabels.length = 0; svcDevicesCounts.length = 0;
          (json.service_requests.by_type || []).forEach(o=>{ svcDevicesLabels.push(o.label); svcDevicesCounts.push(o.count); });
        }

        // breakdowns: roles, genders, vehicles_make, items_type
        if (json.breakdowns) {
          // roles
          if (json.breakdowns.roles) {
            rolesLabels.length = 0; rolesCounts.length = 0;
            Object.entries(json.breakdowns.roles).forEach(([k,v])=>{ rolesLabels.push(k); rolesCounts.push(v); });
          }
          // genders
          if (json.breakdowns.genders) {
            genderLabels.length = 0; genderCounts.length = 0;
            Object.entries(json.breakdowns.genders).forEach(([k,v])=>{ genderLabels.push(k); genderCounts.push(v); });
          }
          // vehicles (use 'Vehicle Make' distribution)
          if (json.breakdowns.vehicles_make) {
            vehicleStatusLabels.length = 0; vehicleStatusCounts.length = 0;
            Object.entries(json.breakdowns.vehicles_make).forEach(([k,v])=>{ vehicleStatusLabels.push(k); vehicleStatusCounts.push(v); });
          }
          // items by type
          if (json.breakdowns.items_type) {
            itemTypeLabels.length = 0; itemTypeCounts.length = 0;
            Object.entries(json.breakdowns.items_type).forEach(([k,v])=>{ itemTypeLabels.push(k); itemTypeCounts.push(v); });
          }
        }

        return json;
      }catch(err){
        console.error('fetchStats error', err);
        return null;
      }
    }

    /* ===== UI wiring ===== */
    const tabsWrap = document.getElementById('tabs');
    const tabbar   = document.getElementById('tabbar');
    const kpisDiv  = document.getElementById('kpis');
    const host     = document.getElementById('host');
    const showAllEl= document.getElementById('showAll');
    const printBtn = document.getElementById('printBtn');
    const exportBtn= document.getElementById('exportCsv');
    const printMetaDetails = document.getElementById('printMetaDetails');
    let printingInProgress = false;
    let originalRender = null;

    let activeTab = 'spot';

    // Default dates = blank; load all records until the user picks a range
    (function initMonths(){
      document.getElementById('from').value = '';
      document.getElementById('to').value = '';
    })();

    tabbar.addEventListener('click', (e)=>{
      const btn = e.target.closest('.tab'); if(!btn) return;
      [...tabbar.children].forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      activeTab = btn.dataset.tab;
      render();
    });
    showAllEl.addEventListener('change', ()=>{
      tabsWrap.style.display = showAllEl.checked ? 'none' : '';
      render();
    });
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    async function printReport(){
      if (printingInProgress) return;
      printingInProgress = true;

      const wasShowAll = !!showAllEl.checked;
      const rerenderImmediate = async () => {
        if (typeof originalRender === 'function') {
          await originalRender();
          return;
        }
        await render();
      };
      try {
        showAllEl.checked = true;
        tabsWrap.style.display = 'none';
        updatePrintMeta();
        await rerenderImmediate();
        await sleep(220);
        Object.values(charts).forEach(c => { if (c && typeof c.resize === 'function') c.resize(); });
        await sleep(120);
        window.print();
      } finally {
        showAllEl.checked = wasShowAll;
        tabsWrap.style.display = wasShowAll ? 'none' : '';
        await rerenderImmediate();
        Object.values(charts).forEach(c => { if (c && typeof c.resize === 'function') c.resize(); });
        printingInProgress = false;
      }
    }
    printBtn.addEventListener('click', printReport);
    window.addEventListener('beforeprint', ()=>{
      updatePrintMeta();
      Object.values(charts).forEach(c => { if (c && typeof c.resize === 'function') c.resize(); });
    });
    window.addEventListener('afterprint', ()=>{
      Object.values(charts).forEach(c => { if (c && typeof c.resize === 'function') c.resize(); });
    });
    window.addEventListener('keydown', (e)=>{
      if ((e.ctrlKey || e.metaKey) && String(e.key).toLowerCase() === 'p') {
        e.preventDefault();
        printReport();
      }
    });
    exportBtn.addEventListener('click', () => {
      exportCurrentCSV().catch(err => {
        console.error('CSV export failed', err);
        alert('Unable to export CSV. Please try again.');
      });
    });

    // helpers
    function monthPretty(ym){
      if (!ym || !/^\d{4}-\d{2}$/.test(String(ym))) return String(ym || '');
      const [y,m] = String(ym).split('-').map(Number);
      const d = new Date(y, m - 1, 1);
      return d.toLocaleDateString(undefined, { month:'long', year:'numeric' });
    }
    function updatePrintMeta(){
      if (!printMetaDetails) return;
      const from = document.getElementById('from').value;
      const to = document.getElementById('to').value;
      const gran = document.getElementById('granularity').value;
      const stamp = new Date().toLocaleString();
      if (!from || !to) {
        printMetaDetails.textContent = `Range: All records | Granularity: ${labelize(gran)} | Generated: ${stamp}`;
        return;
      }
      const prettyFrom = monthPretty(from);
      const prettyTo = monthPretty(to);
      const rangeText = prettyFrom === prettyTo ? prettyFrom : `${prettyFrom} to ${prettyTo}`;
      printMetaDetails.textContent = `Range: ${rangeText} | Granularity: ${labelize(gran)} | Generated: ${stamp}`;
    }
    function kpiStrip(obj){ return Object.entries(obj).map(([k,v])=>`
      <div class="kpi"><div class="label">${k}</div><div class="value">${v}</div></div>`).join(''); }
    const card = (id,title)=>`
      <div class="card">
        <h3>${title} <div class="actions"><button class="iconbtn" data-export="${id}">📊</button></div></h3>
        <canvas id="${id}"></canvas>
      </div>`;
    document.addEventListener('click',(e)=>{
      const btn=e.target.closest('[data-export]'); if(!btn) return;
      const id=btn.getAttribute('data-export');
      const a=document.createElement('a'); a.download=id+'.png'; a.href=charts[id].toBase64Image(); a.click();
    });

    function renderKPIsOverall(gran, baseMonths){
      const aSpot = aggregate(m_spot_reports, baseMonths, gran);
      const aCases= aggregate(m_cases_opened, baseMonths, gran);
      const aInd  = aggregate(m_app_individuals, baseMonths, gran);
      const aVeh  = aggregate(m_app_vehicles, baseMonths, gran);
      const aItm  = aggregate(m_app_items, baseMonths, gran);

      // Determine completed service requests from per-user status counts (robust matching)
      let completedSvc = 0;
      if (svcStatusMap && typeof svcStatusMap === 'object') {
        const completeRe = /^\s*(completed|complete|done|finished)\s*$/i;
        Object.entries(svcStatusMap).forEach(([k,v])=>{ if (completeRe.test(String(k))) completedSvc += (+v||0); });
      } else {
        // fallback to earlier heuristic
        if (Array.isArray(svcStatusLabels) && Array.isArray(svcStatusCounts)) {
          const idx = svcStatusLabels.findIndex(l => /complete|finished|done/i.test(l));
          if (idx >= 0) completedSvc = svcStatusCounts[idx] || 0;
        }
      }
      kpisDiv.innerHTML = kpiStrip({
        'Total Spot Reports': sum(aSpot.data),
        'Total Cases Opened': sum(aCases.data),
        'Apprehended Individuals': sum(aInd.data),
        'Apprehended Vehicles': sum(aVeh.data),
        'Apprehended Items': sum(aItm.data),
        'Completed Service Requests': completedSvc
      });
    }

    /* ===== Export CSV (current view) ===== */
    function toCSV(rows){
      return rows.map(r=>r.map(v=>{
        const s = String(v);
        return /[",\n]/.test(s) ? `"${s.replace(/"/g,'""')}"` : s;
      }).join(',')).join('\n');
    }
    function downloadCSV(filename, csv){
      const blob = new Blob(['\ufeff', csv], {type:'text/csv;charset=utf-8;'});
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(()=>URL.revokeObjectURL(a.href), 1000);
    }
    function pushCSVSection(rows, title, headers, values){
      rows.push([title]);
      rows.push(headers);
      if (Array.isArray(values) && values.length){
        values.forEach(v => rows.push(v));
      } else {
        rows.push(['No data', 0]);
      }
      rows.push([]);
    }
    async function exportCurrentCSV(){
      const gran = document.getElementById('granularity').value;
      const from = document.getElementById('from').value;
      const to   = document.getElementById('to').value;
      if (!from || !to){ alert('Please select From and To months.'); return; }
      const baseMonths = monthsBetween(from, to);
      if (!baseMonths.length){ alert('Invalid month range.'); return; }
      const scope = showAllEl.checked ? 'all' : activeTab;
      const payload = await fetchStats(from, to);
      if (!payload) {
        alert('Unable to load statistical data for export.');
        return;
      }

      let effectiveMonths = baseMonths;
      if (Array.isArray(apiLabels) && apiLabels.length > 0) {
        effectiveMonths = apiLabels.map(label => {
          const [y, m] = String(label).split('-').map(Number);
          return { y, m, label: String(label) };
        });
      }

      const spotSeries = aggregate(m_spot_reports, effectiveMonths, gran);
      const caseSeries = aggregate(m_cases_opened, effectiveMonths, gran);
      const indSeries  = aggregate(m_app_individuals, effectiveMonths, gran);
      const vehSeries  = aggregate(m_app_vehicles, effectiveMonths, gran);
      const itemSeries = aggregate(m_app_items, effectiveMonths, gran);

      let completedSvc = 0;
      const completeRe = /^\s*(completed|complete|done|finished)\s*$/i;
      Object.entries(svcStatusMap).forEach(([k, v]) => {
        if (completeRe.test(String(k))) completedSvc += (+v || 0);
      });

      const kpiRows = [
        ['Total Spot Reports', sum(spotSeries.data)],
        ['Total Cases Opened', sum(caseSeries.data)],
        ['Apprehended Individuals', sum(indSeries.data)],
        ['Apprehended Vehicles', sum(vehSeries.data)],
        ['Apprehended Items', sum(itemSeries.data)],
        ['Completed Service Requests', completedSvc]
      ];

      const sectionMap = {
        spot: {
          name: 'Spot Reports',
          timeTitle: `Spot Reports Over Time (${labelize(gran)})`,
          time: spotSeries,
          distTitle: 'Spot Report Status Distribution',
          distLabels: spotStatusLabels,
          distCounts: spotStatusCounts
        },
        cases: {
          name: 'Case Management',
          timeTitle: `Cases Opened Over Time (${labelize(gran)})`,
          time: caseSeries,
          distTitle: 'Case Status Distribution',
          distLabels: caseStatusLabels,
          distCounts: caseStatusCounts
        },
        app_individuals: {
          name: 'Apprehended Individuals',
          timeTitle: `Individuals Apprehended Over Time (${labelize(gran)})`,
          time: indSeries,
          genderTitle: 'Gender Distribution',
          genderLabels: genderLabels,
          genderCounts: genderCounts
        },
        app_vehicles: {
          name: 'Apprehended Vehicles',
          timeTitle: `Vehicles Apprehended Over Time (${labelize(gran)})`,
          time: vehSeries,
          distTitle: 'Vehicle Status Distribution',
          distLabels: vehicleStatusLabels,
          distCounts: vehicleStatusCounts
        },
        app_items: {
          name: 'Apprehended Items',
          timeTitle: `Items Apprehended Over Time (${labelize(gran)})`,
          time: itemSeries,
          distTitle: 'Item Type Distribution',
          distLabels: itemTypeLabels,
          distCounts: itemTypeCounts
        }
      };
      const selectedTabs = showAllEl.checked
        ? ['spot', 'cases', 'app_individuals', 'app_vehicles', 'app_items']
        : [activeTab];

      const sections = [];
      sections.push(['CENRO Statistical Report']);
      sections.push(['Scope', showAllEl.checked ? 'All Modules' : (sectionMap[activeTab]?.name || activeTab)]);
      sections.push(['From', from]);
      sections.push(['To', to]);
      sections.push(['Granularity', labelize(gran)]);
      sections.push(['Exported At', new Date().toLocaleString()]);
      sections.push([]);

      pushCSVSection(sections, 'KPI Summary', ['Metric', 'Value'], kpiRows);

      selectedTabs.forEach(tab => {
        const cfg = sectionMap[tab];
        if (!cfg) return;

        sections.push([`Section: ${cfg.name}`]);
        sections.push([]);

        const timeRows = cfg.time.labels.map((label, i) => [label, cfg.time.data[i] || 0]);
        pushCSVSection(sections, cfg.timeTitle, ['Period', 'Count'], timeRows);

        if (tab === 'app_individuals') {
          const genderRows = (cfg.genderLabels || []).map((label, i) => [label, (cfg.genderCounts && cfg.genderCounts[i]) || 0]);
          pushCSVSection(sections, cfg.genderTitle, ['Gender', 'Count'], genderRows);
        } else {
          const distRows = (cfg.distLabels || []).map((label, i) => [label, (cfg.distCounts && cfg.distCounts[i]) || 0]);
          pushCSVSection(sections, cfg.distTitle, ['Category', 'Count'], distRows);
        }
      });

      const csv = toCSV(sections);
      downloadCSV(`cenro_report_${scope}_${from}_to_${to}.csv`, csv);
    }

    /* ===== Render (Tabs mode OR Show-All) ===== */
    async function render(){
      const gran = document.getElementById('granularity').value;
      const from = document.getElementById('from').value;
      const to   = document.getElementById('to').value;
      const hasFrom = !!from;
      const hasTo = !!to;
      if ((hasFrom && !hasTo) || (!hasFrom && hasTo)) {
        alert('Please select both From and To months.');
        return;
      }

      const hasMonthFilter = hasFrom && hasTo;
      let baseMonths = [];
      if (hasMonthFilter) {
        baseMonths = monthsBetween(from, to);
        if (baseMonths.length < 1) { alert('Invalid month range.'); return; }
        if (baseMonths.length > monthsWindow) {
          alert(`Data range limited to ${monthsWindow} months. Trimming...`);
          baseMonths.splice(monthsWindow);
        }
      }

      // Fetch fresh stats for the selected range (DB-driven and filter-aware)
      const payload = await fetchStats(hasMonthFilter ? from : '', hasMonthFilter ? to : '');
      if (!payload) {
        alert(`Unable to load statistical data${hasMonthFilter ? ' for the selected range' : ''}.`);
        return;
      }

      let effectiveMonths = baseMonths;
      if (Array.isArray(apiLabels) && apiLabels.length > 0) {
        effectiveMonths = apiLabels.map(label => {
          const [y,m] = String(label).split('-').map(Number);
          return { y, m, label: String(label) };
        });
      }
      if (effectiveMonths.length < 1) {
        host.innerHTML = '';
        kpisDiv.innerHTML = '';
        return;
      }

      // destroy old charts
      Object.values(charts).forEach(c=>c.destroy && c.destroy());
      for (const k in charts) delete charts[k];
      host.innerHTML='';

      // KPIs across modules
      renderKPIsOverall(gran, effectiveMonths);

      // aligned series for range
      const spotSeries = aggregate(m_spot_reports, effectiveMonths, gran);
      const caseSeries = aggregate(m_cases_opened, effectiveMonths, gran);
      const indSeries  = aggregate(m_app_individuals, effectiveMonths, gran);
      const vehSeries  = aggregate(m_app_vehicles, effectiveMonths, gran);
      const itemSeries = aggregate(m_app_items, effectiveMonths, gran);

      const gridStart = `<div class="grid">`, gridEnd = `</div>`;

      if (!showAllEl.checked){
        // TAB MODE
        if (activeTab==='spot'){
          host.innerHTML = gridStart + card('spotBar',`Spot Reports Over Time (${labelize(gran)})`) + card('spotPie','Spot Report Status Distribution') + gridEnd;
          mkBar('spotBar', spotSeries.labels, spotSeries.data, 0);
          mkPie('spotPie', spotStatusLabels, spotStatusCounts, true);
        }
        else if (activeTab==='cases'){
          host.innerHTML = gridStart + card('caseBar',`Cases Opened Over Time (${labelize(gran)})`) + card('casePie','Case Status Distribution') + gridEnd;
          mkBar('caseBar', caseSeries.labels, caseSeries.data, 5);
          mkPie('casePie', caseStatusLabels, caseStatusCounts, true);
        }
        else if (activeTab==='app_individuals'){
          host.innerHTML = gridStart + card('indBar',`Individuals Apprehended Over Time (${labelize(gran)})`) + card('genderPie','Gender Distribution') + gridEnd;
          mkBar('indBar', indSeries.labels, indSeries.data, 3);
          mkPie('genderPie', genderLabels, genderCounts, true);
        }
        else if (activeTab==='app_vehicles'){
          host.innerHTML = gridStart + card('vehBar',`Vehicles Apprehended Over Time (${labelize(gran)})`) + card('vehPie','Vehicle Status Distribution') + gridEnd;
          mkBar('vehBar', vehSeries.labels, vehSeries.data, 1);
          mkPie('vehPie', vehicleStatusLabels, vehicleStatusCounts, true);
        }
        else if (activeTab==='app_items'){
          host.innerHTML = gridStart + card('itmBar',`Items Apprehended Over Time (${labelize(gran)})`) + card('itmPie','Item Type Distribution') + gridEnd;
          mkBar('itmBar', itemSeries.labels, itemSeries.data, 6);
          mkPie('itmPie', itemTypeLabels, itemTypeCounts, true);
        }
        // Locations and Service Desk tabs removed
      } else {
        // SHOW-ALL MODE
        const sectionsHTML = [];
        sectionsHTML.push(`<div class="section"><h2>Spot Reports</h2>${gridStart}${card('spotBar',`Spot Reports Over Time (${labelize(gran)})`)}${card('spotPie','Status Distribution')}${gridEnd}</div>`);
        sectionsHTML.push(`<div class="section"><h2>Case Management</h2>${gridStart}${card('caseBar',`Cases Opened Over Time (${labelize(gran)})`)}${card('casePie','Status Distribution')}${gridEnd}</div>`);
        sectionsHTML.push(`<div class="section"><h2>Apprehended Individuals</h2>${gridStart}${card('indBar',`Individuals Over Time (${labelize(gran)})`)}${card('genderPie','Gender Distribution')}${gridEnd}</div>`);
        sectionsHTML.push(`<div class="section"><h2>Apprehended Vehicles</h2>${gridStart}${card('vehBar',`Vehicles Over Time (${labelize(gran)})`)}${card('vehPie','Status Distribution')}${gridEnd}</div>`);
        sectionsHTML.push(`<div class="section"><h2>Apprehended Items</h2>${gridStart}${card('itmBar',`Items Over Time (${labelize(gran)})`)}${card('itmPie','Type Distribution')}${gridEnd}</div>`);
        // Locations and Service Desk sections removed

        host.innerHTML = sectionsHTML.join('');

        mkBar('spotBar', spotSeries.labels, spotSeries.data, 0);
        mkPie('spotPie', spotStatusLabels, spotStatusCounts, true);
        mkBar('caseBar', caseSeries.labels, caseSeries.data, 5);
        mkPie('casePie', caseStatusLabels, caseStatusCounts, true);
        mkBar('indBar', indSeries.labels, indSeries.data, 3);
        mkPie('genderPie', genderLabels, genderCounts, true);
        mkBar('vehBar', vehSeries.labels, vehSeries.data, 1);
        mkPie('vehPie', vehicleStatusLabels, vehicleStatusCounts, true);
        mkBar('itmBar', itemSeries.labels, itemSeries.data, 6);
        mkPie('itmPie', itemTypeLabels, itemTypeCounts, true);
        // Locations charts removed
        // Service Desk charts removed
      }
    }

    /* ===== Main Content Transition Functions ===== */
    
    // Add smooth transitions when content updates
    function addContentTransition() {
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        mainContent.classList.add('updating');
        
        setTimeout(() => {
          mainContent.classList.remove('updating');
          mainContent.classList.add('updated');
          
          setTimeout(() => {
            mainContent.classList.remove('updated');
          }, 600);
        }, 200);
      }
    }
    
    // Override render function to include transitions
    originalRender = render;
    render = function() {
      addContentTransition();
      setTimeout(() => {
        // call originalRender (async) but don't await here — transition is visual
        originalRender();
      }, 100);
    };
    
    // Add transitions to generate button
    document.getElementById('generate').addEventListener('click', () => {
      const generateBtn = document.getElementById('generate');
      const originalText = generateBtn.innerHTML;
      
      generateBtn.innerHTML = 'Generating...';
      generateBtn.disabled = true;
      generateBtn.style.transform = 'scale(0.95)';
      
      setTimeout(() => {
        render();
        generateBtn.innerHTML = originalText;
        generateBtn.disabled = false;
        generateBtn.style.transform = 'scale(1)';
      }, 800);
    });

    // initial render
    (async function(){
      render();
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(()=>setTimeout(render,100));
      }
    })();
