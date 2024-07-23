import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const Tooltip = ({ id, content, place = "top", effect = "solid" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const targetElement = document.querySelector(`[data-tooltip-id="${id}"]`);

    if (!targetElement) return;

    const showTooltip = () => setIsVisible(true);
    const hideTooltip = () => setIsVisible(false);

    targetElement.addEventListener("mouseenter", showTooltip);
    targetElement.addEventListener("mouseleave", hideTooltip);

    const updatePosition = () => {
      const targetRect = targetElement.getBoundingClientRect();
      const tooltipElement = document.getElementById(`tooltip-${id}`);

      if (!tooltipElement) return;

      const tooltipRect = tooltipElement.getBoundingClientRect();

      let top, left;

      switch (place) {
        case "top":
          top = targetRect.top - tooltipRect.height;
          left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
          break;
        case "bottom":
          top = targetRect.bottom;
          left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
          break;
        case "left":
          top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
          left = targetRect.left - tooltipRect.width;
          break;
        case "right":
          top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
          left = targetRect.right;
          break;
        default:
          top = targetRect.top - tooltipRect.height;
          left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
      }

      setPosition({ top, left });
    };

    if (isVisible) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition);
    }

    return () => {
      targetElement.removeEventListener("mouseenter", showTooltip);
      targetElement.removeEventListener("mouseleave", hideTooltip);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [id, isVisible, place]);

  return isVisible
    ? ReactDOM.createPortal(
        <div
          id={`tooltip-${id}`}
          className={`tooltip-content tooltip-${place} tooltip-${effect}`}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          {content}
        </div>,
        document.body
      )
    : null;
};

export default Tooltip;
