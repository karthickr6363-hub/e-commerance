document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.account-menu li');
  const panels = document.querySelectorAll('.tab-panel');

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const tab = item.getAttribute('data-tab');
      if (tab === 'logout') {
        alert('You have been logged out.');
        window.location.href = 'login.html';
        return;
      }
      menuItems.forEach(m => m.classList.remove('active'));
      item.classList.add('active');
      panels.forEach(p => p.classList.remove('active'));
      const target = document.getElementById(tab);
      if (target) target.classList.add('active');
    });
  });

  const settingsForm = document.getElementById('settingsForm');
  if (settingsForm) {
    settingsForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Settings saved successfully.');
    });
  }
});




