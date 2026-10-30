// src/scripts/share.js
// Behavior for ShareButton: native share sheet on touch devices, otherwise the Facebook/Email/Copy menu

const shares = [...document.querySelectorAll('details.share')];

// Phones and tablets get the system share sheet; desktop share sheets are clunky, so use the menu there
const useNativeShare = typeof navigator.share === 'function' && window.matchMedia('(pointer: coarse)').matches;

// Screen readers don't announce text changes inside a button, so report copies here
const status = document.createElement('div');
status.setAttribute('role', 'status');
status.className = 'visually-hidden';
document.body.appendChild(status);

shares.forEach((share) => {
  const toggle = share.querySelector('.share-toggle');
  const copyButton = share.querySelector('.share-copy');
  const copyLabel = share.querySelector('.share-copy-label');
  const data = {
    title: share.dataset.shareTitle,
    text: share.dataset.shareText,
    url: share.dataset.shareUrl
  };

  toggle.addEventListener('click', (e) => {
    if (!useNativeShare) return;
    e.preventDefault();
    navigator.share(data).catch((err) => {
      // AbortError just means the person closed the share sheet; anything else, fall back to the menu
      if (err.name !== 'AbortError') share.open = true;
    });
  });

  // Only one share menu open at a time
  share.addEventListener('toggle', () => {
    if (share.open) shares.forEach((other) => { if (other !== share) other.open = false; });
  });

  // Copy link needs JavaScript, so it's hidden in the markup until now
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(data.url);
      copyLabel.textContent = 'Link copied!';
      status.textContent = 'Link copied';
      setTimeout(() => {
        copyLabel.textContent = 'Copy link';
        status.textContent = '';
        share.open = false;
      }, 1500);
    } catch {
      // Clipboard blocked (older browser or insecure page): let them copy it by hand
      window.prompt('Copy this link:', data.url);
    }
  });
});

// Close menus when tapping elsewhere or pressing Escape
document.addEventListener('click', (e) => {
  shares.forEach((share) => { if (share.open && !share.contains(e.target)) share.open = false; });
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  shares.forEach((share) => {
    if (share.open) {
      share.open = false;
      share.querySelector('.share-toggle').focus();
    }
  });
});
