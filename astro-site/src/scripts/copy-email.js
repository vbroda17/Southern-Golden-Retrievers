// public/scripts/copy-email.js
// Handles copy-to-clipboard functionality for email buttons

document.addEventListener('DOMContentLoaded', () => {
  // Handle all copy buttons
  document.querySelectorAll('.copy-email-btn').forEach(button => {
    button.addEventListener('click', async () => {
      const email = button.getAttribute('data-email');
      if (!email) return;

      try {
        await navigator.clipboard.writeText(email);
        
        // Visual feedback
        const originalContent = button.innerHTML;
        button.innerHTML = '✓';
        button.classList.add('copied');
        
        setTimeout(() => {
          button.innerHTML = originalContent;
          button.classList.remove('copied');
        }, 1500);
      } catch (err) {
        // Fallback for older browsers or if clipboard API fails
        console.error('Failed to copy email:', err);
        alert(`Copy this email: ${email}`);
      }
    });
  });

  // Handle general copy buttons (like in EmailLink component)
  document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', async () => {
      const email = button.getAttribute('data-email');
      if (!email) return;

      try {
        await navigator.clipboard.writeText(email);
        
        // Show feedback
        const originalText = button.textContent;
        button.textContent = '✓ Copied!';
        button.classList.add('copied');
        
        setTimeout(() => {
          button.textContent = originalText;
          button.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy email:', err);
        alert(`Email: ${email}`);
      }
    });
  });
});