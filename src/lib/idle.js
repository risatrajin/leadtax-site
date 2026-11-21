/**
 * Runs `task` once the page has loaded and the browser is idle (or after `timeout` ms at most), so
 * third-party scripts (analytics, chat, video) don't compete with the page's own first render.
 * Returns a function that cancels it.
 */
export function whenIdle(task, timeout = 4000) {
  let cancelled = false;
  let handle;
  const run = () => {
    if (cancelled) return;
    handle = "requestIdleCallback" in window ? requestIdleCallback(task, { timeout }) : setTimeout(task, 1500);
  };
  if (document.readyState === "complete") run();
  else window.addEventListener("load", run, { once: true });
  return () => {
    cancelled = true;
    window.removeEventListener("load", run);
    if (handle != null) ("cancelIdleCallback" in window ? cancelIdleCallback : clearTimeout)(handle);
  };
}
