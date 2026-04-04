document.addEventListener('DOMContentLoaded', function() {
  // 1. Initialize existing UI components
  initializeProfileDropdown();
  initializeProfileCropper();

  // 2. Password Validation and Matching Logic
  const passwordField = document.getElementById('password');
  const confirmPasswordField = document.getElementById('confirmPassword');

  if (passwordField && confirmPasswordField) {
    // Alphanumeric and Length Check
    passwordField.addEventListener('input', function() {
      const password = this.value;
      let strengthMessage = '';

      if (password.length > 0) {
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);

        if (!hasLetter || !hasNumber) {
          strengthMessage = 'Password must be a mix of letters and numbers.';
        } else if (password.length < 8) {
          strengthMessage = 'Password must be at least 8 characters long.';
        }
      }

      this.setCustomValidity(strengthMessage);
      // Nagdadagdag ng visual red border kung may error (Bootstrap class)
      this.classList.toggle('is-invalid', strengthMessage !== '');
    });

    // Confirm Password Match Check
    confirmPasswordField.addEventListener('input', function() {
      const isMatch = this.value === passwordField.value;

      if (this.value.length > 0 && !isMatch) {
        this.setCustomValidity('Passwords do not match');
        this.classList.add('is-invalid');
      } else {
        this.setCustomValidity('');
        this.classList.remove('is-invalid');
      }
    });
  }
});

function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} position-fixed`;
  notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);';
  notification.innerHTML = `
    <div class="d-flex align-items-center">
      <i class="fa fa-${type === 'error' ? 'exclamation-circle' : type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
      <span>${message}</span>
      <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
    </div>
  `;
  document.body.appendChild(notification);

  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

function previewProfile(e) {
  if (window.editUserProfileCropper) {
    window.editUserProfileCropper.openFromInputEvent(e);
  }
}

function initializeProfileCropper() {
  const fileInput = document.getElementById('profile_picture');
  const hiddenInput = document.getElementById('cropped_profile_picture');
  const preview = document.getElementById('profilePreview');
  if (!fileInput || !hiddenInput || !preview || typeof window.createProfileImageCropper !== 'function') return;

  window.editUserProfileCropper = window.createProfileImageCropper({
    fileInput: fileInput,
    hiddenInput: hiddenInput,
    previewTarget: function(dataUrl) {
      preview.innerHTML = `<img src="${dataUrl}" alt="Profile" style="width:100%; height:100%; object-fit:cover; border-radius:50%; display:block;">`;
    },
    onError: function(message) {
      showNotification(message, 'error');
    }
  });
}

function initializeProfileDropdown() {
  const profileCard = document.getElementById('profileCard');
  const profileDropdown = document.getElementById('profileDropdown');

  if (!profileCard || !profileDropdown) return;

  let dropdownOpen = false;

  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
    if (dropdownOpen) {
      profileDropdown.classList.add('show');
    } else {
      profileDropdown.classList.remove('show');
    }
  }

  profileCard.addEventListener('click', function(e) {
    toggleDropdown();
    e.stopPropagation();
  });

  document.addEventListener('click', function(e) {
    if (!profileCard.contains(e.target)) {
      dropdownOpen = false;
      profileDropdown.classList.remove('show');
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && dropdownOpen) {
      dropdownOpen = false;
      profileDropdown.classList.remove('show');
    }
  });
}
