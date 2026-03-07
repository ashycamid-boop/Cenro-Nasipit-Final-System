function printForm() {
  const sidebar = document.querySelector('.sidebar');
  const topbar = document.querySelector('.topbar');
  const backButton = document.querySelector('.btn-secondary');
  const printButton = document.querySelector('.btn-outline-dark');
  const controls = document.querySelectorAll('.row.mb-4, .row.mb-3');

  const originalDisplays = {
    sidebar: sidebar.style.display,
    topbar: topbar.style.display,
    backButton: backButton.style.display,
    printButton: printButton.style.display,
  };

  sidebar.style.display = 'none';
  topbar.style.display = 'none';
  backButton.style.display = 'none';
  printButton.style.display = 'none';
  controls.forEach((el) => {
    el.style.display = 'none';
  });

  const main = document.querySelector('.main');
  main.style.marginLeft = '0';
  main.style.width = '100%';

  window.print();

  setTimeout(() => {
    sidebar.style.display = originalDisplays.sidebar;
    topbar.style.display = originalDisplays.topbar;
    backButton.style.display = originalDisplays.backButton;
    printButton.style.display = originalDisplays.printButton;
    controls.forEach((el) => {
      el.style.display = '';
    });
    main.style.marginLeft = '';
    main.style.width = '';
  }, 100);
}
