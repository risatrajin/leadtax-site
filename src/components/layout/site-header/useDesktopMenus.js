import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

const OPEN_DELAY = 120;
const CLOSE_DELAY = 200;

/**
 * State for the desktop menus: one open at a time; opens on click or on hover
 * (with a short delay). A hover-opened menu closes when the pointer leaves; a
 * click-opened one stays until Escape (which returns focus to the trigger), a click
 * outside, keyboard focus leaving the header, or navigation.
 */
export default function useDesktopMenus(containerRef) {
  const [openId, setOpenId] = useState(null);
  const timer = useRef(null);
  const openedByHoverAt = useRef(0);
  const openedBy = useRef(null);
  const triggers = useRef({});
  const { pathname, hash } = useLocation();

  const clearTimer = () => clearTimeout(timer.current);
  const close = useCallback(() => {
    clearTimer();
    setOpenId(null);
  }, []);

  useEffect(close, [pathname, hash, close]);

  useEffect(() => {
    if (!openId) return undefined;
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      const trigger = triggers.current[openId];
      close();
      trigger?.focus();
    };
    const onPointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [openId, close, containerRef]);

  useEffect(() => clearTimer, []);

  /** Props for the element that wraps a trigger and its panel. */
  const itemProps = (id) => ({
    onMouseEnter: () => {
      clearTimer();
      timer.current = setTimeout(() => {
        openedByHoverAt.current = Date.now();
        openedBy.current = "hover";
        setOpenId(id);
      }, openId ? 0 : OPEN_DELAY);
    },
    onMouseLeave: () => {
      clearTimer();
      if (openedBy.current !== "hover") return;
      timer.current = setTimeout(() => setOpenId(null), CLOSE_DELAY);
    },
  });

  /** Props for a trigger button. */
  const triggerProps = (id, panelId) => ({
    ref: (element) => {
      triggers.current[id] = element;
    },
    type: "button",
    "aria-expanded": openId === id,
    "aria-controls": panelId,
    onClick: () => {
      clearTimer();
      // A click right after hover-open would otherwise close the menu again.
      if (openId === id && Date.now() - openedByHoverAt.current < 400) {
        openedBy.current = "click";
        return;
      }
      openedBy.current = "click";
      setOpenId(openId === id ? null : id);
    },
  });

  /** Close when keyboard focus leaves the container. */
  const onBlur = (event) => {
    if (openId && !containerRef.current?.contains(event.relatedTarget)) close();
  };

  return { openId, close, itemProps, triggerProps, onBlur };
}
