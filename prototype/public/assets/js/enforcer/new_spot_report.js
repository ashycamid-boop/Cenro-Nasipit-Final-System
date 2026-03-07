// Reference number is provided by user (no auto-generation)
    const VEHICLE_MAKE_MODEL_OPTIONS = [
      'Toyota - Vios',
      'Toyota - Wigo',
      'Toyota - Yaris',
      'Toyota - Corolla Altis',
      'Toyota - Corolla Cross',
      'Toyota - Camry',
      'Toyota - Raize',
      'Toyota - Rush',
      'Toyota - Avanza',
      'Toyota - Innova',
      'Toyota - Fortuner',
      'Toyota - Hilux',
      'Toyota - Land Cruiser',
      'Toyota - Hiace',
      'Mitsubishi - Mirage',
      'Mitsubishi - Mirage G4',
      'Mitsubishi - Xpander',
      'Mitsubishi - Montero Sport',
      'Mitsubishi - Strada',
      'Mitsubishi - L300',
      'Nissan - Almera',
      'Nissan - Navara',
      'Nissan - Terra',
      'Nissan - Urvan',
      'Ford - Ranger',
      'Ford - Everest',
      'Ford - Territory',
      'Isuzu - D-Max',
      'Isuzu - mu-X',
      'Isuzu - Traviz',
      'Honda - Brio',
      'Honda - City',
      'Honda - Civic',
      'Honda - HR-V',
      'Honda - BR-V',
      'Honda - CR-V',
      'Hyundai - Accent',
      'Hyundai - Reina',
      'Hyundai - Tucson',
      'Hyundai - Santa Fe',
      'Hyundai - Starex',
      'Hyundai - H-100',
      'Kia - Soluto',
      'Kia - Stonic',
      'Kia - Seltos',
      'Kia - Sportage',
      'Kia - Carnival',
      'Suzuki - Dzire',
      'Suzuki - Celerio',
      'Suzuki - Swift',
      'Suzuki - Ertiga',
      'Suzuki - XL7',
      'Suzuki - Jimny',
      'Suzuki - Carry',
      'Mazda - Mazda2',
      'Mazda - Mazda3',
      'Mazda - CX-3',
      'Mazda - CX-5',
      'Mazda - BT-50',
      'Chevrolet - Spark',
      'Chevrolet - Sail',
      'Chevrolet - Tracker',
      'Chevrolet - Trailblazer',
      'Chevrolet - Colorado',
      'Subaru - XV',
      'Subaru - Forester',
      'Subaru - Outback',
      'Hino - 300 Series',
      'Hino - 500 Series',
      'Hino - 700 Series',
      'Fuso - Canter',
      'Fuso - Fighter',
      'Fuso - Super Great',
      'UD Trucks - Croner',
      'UD Trucks - Quester',
      'Foton - Tornado',
      'Foton - Thunder',
      'Dongfeng - Captain',
      'Dongfeng - KR Series',
      'Sinotruk/Howo - Howo A7',
      'Sinotruk/Howo - Howo NX',
      'Caterpillar - 320',
      'Caterpillar - 336',
      'Caterpillar - D6',
      'Caterpillar - 966',
      'Komatsu - PC200',
      'Komatsu - PC300',
      'Komatsu - D65',
      'Komatsu - WA380',
      'Hitachi - ZX200',
      'Hitachi - ZX210',
      'Volvo CE - EC210',
      'Volvo CE - EC360',
      'Honda (Motorcycle) - TMX',
      'Honda (Motorcycle) - XRM',
      'Honda (Motorcycle) - Wave',
      'Honda (Motorcycle) - Click',
      'Yamaha - Mio',
      'Yamaha - NMAX',
      'Yamaha - Sniper',
      'Yamaha - Aerox',
      'Kawasaki - Barako',
      'Kawasaki - Rouser',
      'Suzuki (Motorcycle) - Raider',
      'Suzuki (Motorcycle) - Smash',
      'Rusi - Rusi 125',
      'Motorstar - Star-X'
    ];

    function escapeHtml(value) {
      return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    function buildVehicleMakeModelSelect() {
      const options = VEHICLE_MAKE_MODEL_OPTIONS
        .map(function(item) { return '<option value="' + escapeHtml(item) + '">' + escapeHtml(item) + '</option>'; })
        .join('');
      return `
        <select class="form-select vehicle-make-select" name="vehicle_make[]" onchange="toggleVehicleCustomInput(this)">
          <option value="">Select Make/Model</option>
          ${options}
          <option value="__custom__">Add model</option>
        </select>
        <input type="text" class="form-control mt-2 vehicle-make-custom d-none" name="vehicle_make_custom[]" placeholder="Enter make/model (custom)">
      `;
    }

    function toggleVehicleCustomInput(selectEl) {
      if (!selectEl) return;
      const holder = selectEl.closest('td');
      if (!holder) return;
      const customInput = holder.querySelector('.vehicle-make-custom');
      if (!customInput) return;
      const useCustom = selectEl.value === '__custom__';
      customInput.classList.toggle('d-none', !useCustom);
      customInput.required = useCustom;
      if (!useCustom) customInput.value = '';
    }

    // Add person row
    function addPersonRow() {
      const tbody = document.getElementById('personsTableBody');
      const newRow = `
        <tr>
          <td><input type="text" class="form-control" name="person_name[]" placeholder="Full Name"></td>
          <td><input type="text" class="form-control" name="person_age[]" placeholder="Age" inputmode="numeric" pattern="[0-9]*" maxlength="3"></td>
          <td>
            <select class="form-select" name="person_gender[]">
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </td>
          <td><input type="text" class="form-control" name="person_address[]" placeholder="Address"></td>
          <td><input type="text" class="form-control" name="person_contact[]" placeholder="Contact Number"></td>
          <td>
            <select class="form-select" name="person_role[]">
              <option value="">Select Role</option>
              <option value="Financier">Financier</option>
              <option value="Operator">Operator</option>
              <option value="Timber Cutter">Timber Cutter</option>
              <option value="Chainsaw Operator">Chainsaw Operator</option>
              <option value="Helper">Helper</option>
              <option value="Laborer">Laborer</option>
              <option value="Driver">Driver</option>
              <option value="Lookout">Lookout</option>
              <option value="Loader">Loader</option>
              <option value="Broker">Broker</option>
              <option value="Middleman">Middleman</option>
              <option value="Buyer">Buyer</option>
              <option value="Consignee">Consignee</option>
              <option value="Permit Falsifier">Permit Falsifier</option>
            </select>
          </td>
          <td>
            <select class="form-select" name="person_status[]">
              <option value="">Select Status</option>
              <option value="Under Custody / Detained">Under Custody / Detained</option>
              <option value="Under Inquest / For Filing of Case">Under Inquest / For Filing of Case</option>
              <option value="Respondent / Accused">Respondent / Accused</option>
              <option value="Released Pending Investigation">Released Pending Investigation</option>
              <option value="On Bail">On Bail</option>
              <option value="Convicted">Convicted</option>
              <option value="Case Dismissed / Acquitted">Case Dismissed / Acquitted</option>
            </select>
          </td>
          <td>
            <input type="file" class="form-control person-evidence-input" name="person_evidence[]" accept="image/*,video/*,.pdf">
            <div class="file-preview mt-2"></div>
          </td>
          <td>
            <button type="button" class="btn btn-danger btn-sm" onclick="removeRow(this)">
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      `;
      tbody.insertAdjacentHTML('beforeend', newRow);
      bindRowFileInputs();
    }

    // Add vehicle row
    function addVehicleRow() {
      const tbody = document.getElementById('vehiclesTableBody');
      const newRow = `
        <tr>
          <td><input type="text" class="form-control" name="vehicle_plate[]" placeholder="Plate Number"></td>
          <td>${buildVehicleMakeModelSelect()}</td>
          <td><input type="text" class="form-control" name="vehicle_color[]" placeholder="Color"></td>
          <td><input type="text" class="form-control" name="vehicle_owner[]" placeholder="Owner Name"></td>
          <td><input type="text" class="form-control" name="vehicle_contact[]" placeholder="Contact Number"></td>
          <td><input type="text" class="form-control" name="vehicle_engine[]" placeholder="Engine/Chassis No."></td>
          <td>
            <input type="text" class="form-control" name="vehicle_remarks[]" placeholder="Remarks">
          </td>
          <td>
            <select class="form-select" name="vehicle_status[]">
              <option value="">Select Status</option>
              <option value="Confiscated">Confiscated</option>
              <option value="Seized">Seized</option>
              <option value="Under Custody">Under Custody</option>
              <option value="For Disposal">For Disposal</option>
              <option value="Disposed">Disposed</option>
              <option value="Burned/Destroyed">Burned/Destroyed</option>
              <option value="Forfeited to Government">Forfeited to Government</option>
              <option value="Donated to LGU">Donated to LGU</option>
              <option value="Returned to Owner">Returned to Owner</option>
              <option value="Publicly Auctioned">Publicly Auctioned</option>
            </select>
          </td>
          <td>
            <input type="file" class="form-control vehicle-evidence-input" name="vehicle_evidence[]" accept="image/*,video/*,.pdf">
            <div class="file-preview mt-2"></div>
          </td>
          <td>
            <button type="button" class="btn btn-danger btn-sm" onclick="removeRow(this)">
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      `;
      tbody.insertAdjacentHTML('beforeend', newRow);
      bindRowFileInputs();
    }

    // Add seizure item row
    function addSeizureRow() {
      const tbody = document.getElementById('seizureTableBody');
      const rowCount = tbody.children.length + 1;
      const newRow = `
        <tr>
          <td><input type="text" inputmode="numeric" pattern="[0-9]*" class="form-control" name="item_no[]" placeholder="${rowCount}" value="${rowCount}"></td>
          <td>
            <select class="form-select" name="item_type[]">
              <option value="">Select Type</option>
              <option value="Forest Product">Forest Product</option>
              <option value="Equipment">Equipment</option>
              <option value="Other">Other</option>
            </select>
          </td>
          <td><input type="text" class="form-control" name="item_description[]" placeholder="Description"></td>
          <td><input type="text" class="form-control" name="item_quantity[]" placeholder="e.g., 13 pcs"></td>
          <td><input type="text" class="form-control" name="item_volume[]" placeholder="e.g., 88 Bd.ft."></td>
          <td><input type="number" class="form-control" name="item_value[]" placeholder="0.00" step="0.01" min="0"></td>
          <td><input type="text" class="form-control" name="item_remarks[]" placeholder="Remarks"></td>
          <td>
            <select class="form-select" name="item_status[]">
              <option value="">Select Status</option>
              <option value="Confiscated">Confiscated</option>
              <option value="Seized">Seized</option>
              <option value="Under Custody">Under Custody</option>
              <option value="For Disposal">For Disposal</option>
              <option value="Disposed">Disposed</option>
              <option value="Burned/Destroyed">Burned/Destroyed</option>
              <option value="Forfeited to Government">Forfeited to Government</option>
              <option value="Donated to LGU">Donated to LGU</option>
              <option value="Returned to Owner">Returned to Owner</option>
              <option value="Publicly Auctioned">Publicly Auctioned</option>
            </select>
          </td>
          <td>
            <input type="file" class="form-control item-evidence-input" name="item_evidence[]" accept="image/*,video/*,.pdf">
            <div class="file-preview mt-2"></div>
          </td>
          <td>
            <button type="button" class="btn btn-danger btn-sm" onclick="removeRow(this)">
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      `;
      tbody.insertAdjacentHTML('beforeend', newRow);
      bindRowFileInputs();
    }

    // Remove row function
    function removeRow(button) {
      const row = button.closest('tr');
      if (row) row.remove();
    }

    // Update file list display
    function updateFileList(inputId, listId) {
      const input = document.getElementById(inputId);
      const listDiv = document.getElementById(listId);
      
      listDiv.innerHTML = '';
      
      if (input && input.files && input.files.length > 0) {
        for (let i = 0; i < input.files.length; i++) {
          const file = input.files[i];
          const fileItem = document.createElement('div');
          fileItem.className = 'file-item mb-2 p-2 border rounded d-flex align-items-center';

          // preview for images
          if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.style.maxWidth = '120px';
            img.style.maxHeight = '80px';
            img.className = 'me-2';
            fileItem.appendChild(img);
          } else if (file.type.startsWith('video/')) {
            const ico = document.createElement('i');
            ico.className = 'fa fa-video fa-2x me-2';
            fileItem.appendChild(ico);
          } else {
            const ico = document.createElement('i');
            ico.className = 'fa fa-file-pdf fa-2x me-2';
            fileItem.appendChild(ico);
          }

          const info = document.createElement('div');
          info.innerHTML = `<div><strong>${file.name}</strong></div>`;
          info.className = 'flex-grow-1 text-truncate';
          fileItem.appendChild(info);

          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'btn btn-sm btn-outline-danger ms-2';
          btn.innerHTML = '<i class="fa fa-times"></i>';
          btn.addEventListener('click', function() { removeFile(inputId, i); });
          fileItem.appendChild(btn);

          listDiv.appendChild(fileItem);
        }
      }
    }

    // Bind change handlers for per-row file inputs (dynamic rows)
    function bindRowFileInputs() {
      // person evidence
      document.querySelectorAll('.person-evidence-input').forEach(function(inp) {
        if (!inp._bound) {
          inp.addEventListener('change', function() { previewRowFiles(inp); });
          inp._bound = true;
        }
      });
      document.querySelectorAll('.vehicle-evidence-input').forEach(function(inp) {
        if (!inp._bound) {
          inp.addEventListener('change', function() { previewRowFiles(inp); });
          inp._bound = true;
        }
      });
      document.querySelectorAll('.item-evidence-input').forEach(function(inp) {
        if (!inp._bound) {
          inp.addEventListener('change', function() { previewRowFiles(inp); });
          inp._bound = true;
        }
      });
    }

    function previewRowFiles(input) {
      const previewDiv = input.closest('td').querySelector('.file-preview');
      if (!previewDiv) return;
      previewDiv.innerHTML = '';
      if (!input.files || input.files.length === 0) return;
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        const item = document.createElement('div');
        item.className = 'd-inline-block me-2 mb-2 text-center';
        if (file.type.startsWith('image/')) {
          const img = document.createElement('img');
          img.src = URL.createObjectURL(file);
          img.style.maxWidth = '120px';
          img.style.maxHeight = '80px';
          img.className = 'd-block mb-1 border';
          item.appendChild(img);
        } else if (file.type.startsWith('video/')) {
          const ico = document.createElement('i');
          ico.className = 'fa fa-video fa-2x d-block mb-1';
          item.appendChild(ico);
        } else {
          const ico = document.createElement('i');
          ico.className = 'fa fa-file-pdf fa-2x d-block mb-1';
          item.appendChild(ico);
        }
        const name = document.createElement('div');
        name.className = 'small text-truncate';
        name.style.maxWidth = '120px';
        name.textContent = file.name;
        item.appendChild(name);
        previewDiv.appendChild(item);
      }
    }

    // Remove file (clears selection and refreshes list)
    function removeFile(inputId, index) {
      const input = document.getElementById(inputId);
      if (!input) return;
      // Can't remove single file from FileList; clear all and let user re-select
      input.value = '';
      const listId = inputId === 'evidenceFiles' ? 'evidenceList' : 'pdfList';
      updateFileList(inputId, listId);
    }

    // Save as draft — set action and submit (skip required-field validation)
    function saveDraft() {
      const form = document.getElementById('spotReportForm');
      const actionInput = document.getElementById('formAction');
      actionInput.value = 'save_draft';
      form.submit();
    }

    // Handle submission client-side: validate then submit form to server
    function handleSubmit(e, saveAsDraft = false) {
      const form = document.getElementById('spotReportForm');
      const actionInput = document.getElementById('formAction');

      // determine if this submit is a draft save (either requested or already set)
      const isDraft = saveAsDraft || (actionInput && actionInput.value === 'save_draft');

      // If this is a draft, skip required-field validation
      if (isDraft) {
        // ensure hidden input reflects draft
        if (actionInput) actionInput.value = 'save_draft';
        return true; // allow normal submit to proceed
      }

      if (e && e.preventDefault) {
        // Basic validation for full submit
        const requiredFields = [
          'incident_datetime', 'memo_date', 'location', 'summary',
          'team_leader', 'custodian'
        ];
        let isValid = true;
        requiredFields.forEach(field => {
          const input = document.querySelector(`[name="${field}"]`);
          if (!input || !input.value.trim()) {
            if (input) input.classList.add('is-invalid');
            isValid = false;
          } else {
            input.classList.remove('is-invalid');
          }
        });
        if (!isValid) {
          e.preventDefault();
          alert('Please fill in all required fields.');
          return false;
        }
      }

      // ensure action input is empty for normal submit
      if (actionInput) actionInput.value = '';
      return true; // allow browser to submit form (files included)
    }

    function generateRef() {
      const d = new Date();
      const iso = d.toISOString().slice(0,10);
      return iso + '-0001';
    }

    // Populate reference number on load if empty
    document.addEventListener('DOMContentLoaded', function() {
      const refEl = document.getElementById('referenceNo');
      if (refEl && !refEl.value) {
        refEl.value = generateRef();
      }
      // bind handlers for any existing dynamic row file inputs
      if (typeof bindRowFileInputs === 'function') bindRowFileInputs();
      // render previews for any pre-selected top-level files
      if (document.getElementById('evidenceFiles')) updateFileList('evidenceFiles', 'evidenceList');
      if (document.getElementById('pdfFiles')) updateFileList('pdfFiles', 'pdfList');
    });

