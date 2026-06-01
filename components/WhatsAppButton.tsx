"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("2348012345678");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [wasDragged, setWasDragged] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);

  const buttonRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });
  const dragDistance = useRef(0);

  // Initialize position
  useEffect(() => {
    setViewportWidth(window.innerWidth);

    const saved = localStorage.getItem("wa-btn-pos");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPosition(clampPosition(parsed.x, parsed.y));
      } catch {
        setPosition(getDefaultPosition());
      }
    } else {
      setPosition(getDefaultPosition());
    }
    setMounted(true);
  }, []);

  function getDefaultPosition() {
    return {
      x: window.innerWidth - 80,
      y: window.innerHeight - 100,
    };
  }

  function clampPosition(x: number, y: number) {
    const btnSize = 56;
    const padding = 8;
    return {
      x: Math.min(Math.max(padding, x), window.innerWidth - btnSize - padding),
      y: Math.min(Math.max(padding, y), window.innerHeight - btnSize - padding),
    };
  }

  // Fetch WhatsApp number
  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.whatsapp) {
          const cleaned = data.whatsapp.replace(/\D/g, "");
          setWhatsappNumber(cleaned);
        }
      })
      .catch(() => {});
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setPosition((prev) => clampPosition(prev.x, prev.y));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragDistance.current = 0;
    dragStart.current = { x: e.clientX, y: e.clientY };
    posStart.current = { ...position };
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    dragDistance.current = Math.sqrt(dx * dx + dy * dy);
    const newPos = clampPosition(posStart.current.x + dx, posStart.current.y + dy);
    setPosition(newPos);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragDistance.current > 5) {
      setWasDragged(true);
      // Snap to nearest edge
      setPosition((prev) => {
        const snapped = snapToEdge(prev.x, prev.y);
        localStorage.setItem("wa-btn-pos", JSON.stringify(snapped));
        return snapped;
      });
    }
    setTimeout(() => setWasDragged(false), 100);
  }, [isDragging]);

  // Touch drag handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    dragDistance.current = 0;
    dragStart.current = { x: touch.clientX, y: touch.clientY };
    posStart.current = { ...position };
  }, [position]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    const dx = touch.clientX - dragStart.current.x;
    const dy = touch.clientY - dragStart.current.y;
    dragDistance.current = Math.sqrt(dx * dx + dy * dy);
    const newPos = clampPosition(posStart.current.x + dx, posStart.current.y + dy);
    setPosition(newPos);
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragDistance.current > 5) {
      setWasDragged(true);
      setPosition((prev) => {
        const snapped = snapToEdge(prev.x, prev.y);
        localStorage.setItem("wa-btn-pos", JSON.stringify(snapped));
        return snapped;
      });
    }
    setTimeout(() => setWasDragged(false), 100);
  }, [isDragging]);

  function snapToEdge(x: number, y: number) {
    const btnSize = 56;
    const padding = 12;

    // Determine closest edge
    const distLeft = x;
    const distRight = window.innerWidth - x - btnSize;
    const distTop = y;
    const distBottom = window.innerHeight - y - btnSize;
    const minDist = Math.min(distLeft, distRight, distTop, distBottom);

    if (minDist === distLeft) {
      return { x: padding, y: Math.min(Math.max(padding, y), window.innerHeight - btnSize - padding) };
    } else if (minDist === distRight) {
      return { x: window.innerWidth - btnSize - padding, y: Math.min(Math.max(padding, y), window.innerHeight - btnSize - padding) };
    } else if (minDist === distTop) {
      return { x: Math.min(Math.max(padding, x), window.innerWidth - btnSize - padding), y: padding };
    } else {
      return { x: Math.min(Math.max(padding, x), window.innerWidth - btnSize - padding), y: window.innerHeight - btnSize - padding };
    }
  }

  // Attach global mouse/touch listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const message = encodeURIComponent(
    "Hello JMK Auto! 👋 I'm interested in your car inventory. Please can you help me find the perfect car?"
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  const handleClick = (e: React.MouseEvent) => {
    if (wasDragged) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (!mounted) return null;

  // Determine if tooltip should go left or right after the component is mounted.
  const tooltipOnLeft = position.x > viewportWidth / 2;

  return (
    <div
      ref={buttonRef}
      className="fixed z-50 select-none"
      style={{
        left: position.x,
        top: position.y,
        transition: isDragging ? "none" : "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "none",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onMouseEnter={() => !isDragging && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative flex items-center">
        {/* Tooltip - left side */}
        {tooltipOnLeft && (
          <span
            className={`
              glass text-ink text-sm font-medium px-4 py-2 rounded-full
              transition-all duration-300 whitespace-nowrap mr-3
              ${hovered && !isDragging ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}
            `}
          >
            Chat with us!
          </span>
        )}

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className={`wa-pulse w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 ${
            isDragging ? "scale-95 shadow-2xl" : "hover:scale-110"
          }`}
          aria-label="Chat on WhatsApp"
          draggable={false}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 fill-white pointer-events-none"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>

        {/* Tooltip - right side */}
        {!tooltipOnLeft && (
          <span
            className={`
              glass text-ink text-sm font-medium px-4 py-2 rounded-full
              transition-all duration-300 whitespace-nowrap ml-3
              ${hovered && !isDragging ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"}
            `}
          >
            Chat with us!
          </span>
        )}
      </div>
    </div>
  );
}
