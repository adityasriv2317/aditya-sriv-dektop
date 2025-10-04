// Small helper to request the app to open a URL inside the in-app Browser
export function openInBrowser(url: string, title?: string) {
  try {
    const ev = new CustomEvent("open-in-browser", {
      detail: { url, title },
    });
    window.dispatchEvent(ev);
  } catch (e) {
    // Fallback: open in new tab if dispatch fails
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

export default openInBrowser;
