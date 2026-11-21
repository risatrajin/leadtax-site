import { useEffect, useRef } from "react";

const CONFETTI_COLOURS = ["#177ff8", "#6cb8ff", "#0b5fcc", "#fbbf24", "#f472b6", "#34d399"];

/** Bursts confetti up from the bottom edge of the canvas; it falls back down and fades out. */
function useConfetti(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = canvas.getContext("2d");
    const ratio = window.devicePixelRatio || 1;
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.scale(ratio, ratio);

    const pieces = Array.from({ length: 140 }, () => ({
      x: width * (0.1 + Math.random() * 0.8),
      y: height + 10,
      vx: (Math.random() - 0.5) * 7,
      vy: -(height / 38 + Math.random() * (height / 45)),
      size: 5 + Math.random() * 6,
      angle: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.3,
      colour: CONFETTI_COLOURS[Math.floor(Math.random() * CONFETTI_COLOURS.length)],
      delay: Math.random() * 18,
    }));

    let frame = 0;
    let tick = 0;
    const draw = () => {
      tick += 1;
      context.clearRect(0, 0, width, height);
      const fade = Math.max(0, 1 - Math.max(0, tick - 110) / 60);
      for (const piece of pieces) {
        if (tick < piece.delay) continue;
        piece.vy += 0.32;
        piece.vx *= 0.99;
        piece.x += piece.vx;
        piece.y += piece.vy;
        piece.angle += piece.spin;
        context.save();
        context.globalAlpha = fade;
        context.translate(piece.x, piece.y);
        context.rotate(piece.angle);
        context.fillStyle = piece.colour;
        context.fillRect(-piece.size / 2, -piece.size / 4, piece.size, piece.size / 2);
        context.restore();
      }
      if (fade > 0) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [canvasRef]);
}

/**
 * Shown in place of the enquiry form once it has been sent: an animated check (a circle that draws
 * itself, then the tick, with a soft ring pulsing out) on white, eTaskMe's thank-you title and line,
 * and confetti bursting up from the bottom.
 */
export default function LeadFormSent({ title, text }) {
  const canvasRef = useRef(null);
  useConfetti(canvasRef);

  return (
    <div role="status" className="relative flex min-h-80 flex-col items-center justify-center overflow-hidden rounded-2xl bg-white px-6 py-12 text-center">
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
      <div aria-hidden="true" className="sent-pop relative h-24 w-24">
        <span className="sent-ring absolute inset-0 rounded-full bg-brand/20" />
        <svg viewBox="0 0 96 96" className="relative h-24 w-24">
          <circle cx="48" cy="48" r="44" className="fill-brand-subtle" />
          <circle cx="48" cy="48" r="44" pathLength="1" className="sent-draw-circle fill-none stroke-brand" strokeWidth="5" strokeLinecap="round" />
          <path d="M30 49.5 42.5 62 66 36" pathLength="1" className="sent-draw-check fill-none stroke-brand" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="sent-rise relative mt-8 text-2xl font-semibold text-gray-900 md:text-3xl">{title}</h3>
      <p className="sent-rise relative mt-3 max-w-md text-gray-600 [animation-delay:0.75s]">{text}</p>
    </div>
  );
}
