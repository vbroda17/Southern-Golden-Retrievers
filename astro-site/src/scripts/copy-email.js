// src/scripts/copy-email.js
// Handles copy-to-clipboard functionality for email buttons

// .copy-email-btn: navbar top bar and ContactButton
// .copy-btn: EmailLink with showCopy
const COPY_BUTTONS = [
  { selector: '.copy-email-btn', feedback: '✓', duration: 1500 },
  { selector: '.copy-btn', feedback: '✓ Copied!', duration: 2000 }
];

document.addEventListener('DOMContentLoaded', () => {
  // Screen readers don't announce text changes inside a button, so report copies here
  const status = document.createElement('div');
  status.setAttribute('role', 'status');
  status.className = 'visually-hidden';
  document.body.appendChild(status);

  COPY_BUTTONS.forEach(({ selector, feedback, duration }) => {
    document.querySelectorAll(selector).forEach(button => {
      button.addEventListener('click', async () => {
        const email = button.getAttribute('data-email');
        if (!email) return;

        try {
          await navigator.clipboard.writeText(email);

          // Visual feedback
          const originalText = button.textContent;
          button.textContent = feedback;
          button.classList.add('copied');
          status.textContent = 'Email address copied';

          setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
            status.textContent = '';
          }, duration);
        } catch (err) {
          // Fallback for older browsers or if clipboard API fails
          console.error('Failed to copy email:', err);
          alert(`Copy this email: ${email}`);
        }
      });
    });
  });
});
