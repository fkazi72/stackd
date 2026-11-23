// Dynamic Mascot Favicon Rotator
const MASCOT_ICONS = [
  { name: 'Stackd Logo', url: '/stackd-logo.jpg' },
  { name: 'Pip Pink', url: '/mascots/mascot-pink.jpg' },
  { name: 'Sunny Cloud', url: '/mascots/mascot-yellow.jpg' },
  { name: 'Minty Pop', url: '/mascots/mascot-mint.jpg' },
  { name: 'Blobby Blue', url: '/mascots/mascot-blue.jpg' },
];

let currentIndex = 0;
let timerId: number | null = null;
const cachedCanvasIcons: Record<string, string> = {};

// Helper to render image into a crisp circular canvas with border
const renderCircularFavicon = (src: string, callback: (dataUrl: string) => void) => {
  if (cachedCanvasIcons[src]) {
    callback(cachedCanvasIcons[src]);
    return;
  }

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = src;

  img.onload = () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw circular clip
      ctx.beginPath();
      ctx.arc(32, 32, 30, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      // Draw mascot image
      ctx.drawImage(img, 0, 0, 64, 64);

      // Draw subtle colorful ring
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#2756E8';
      ctx.stroke();

      const dataUrl = canvas.toDataURL('image/png');
      cachedCanvasIcons[src] = dataUrl;
      callback(dataUrl);
    } catch {
      callback(src);
    }
  };

  img.onerror = () => {
    callback(src);
  };
};

export const setFavicon = (iconUrl: string) => {
  let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }

  renderCircularFavicon(iconUrl, (dataUrl) => {
    if (link) {
      link.href = dataUrl;
    }
  });
};

export const startFaviconRotation = (intervalMs = 3500) => {
  if (timerId !== null) return;

  timerId = window.setInterval(() => {
    currentIndex = (currentIndex + 1) % MASCOT_ICONS.length;
    setFavicon(MASCOT_ICONS[currentIndex].url);
  }, intervalMs);
};

export const stopFaviconRotation = () => {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
};
