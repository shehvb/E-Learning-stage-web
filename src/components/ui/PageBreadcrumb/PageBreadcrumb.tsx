import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import "./PageBreadcrumb.css";

export interface BreadcrumbTrailItem {
  label: string;
  to?: string;
}

export interface PageBreadcrumbProps {
  trail: BreadcrumbTrailItem[];
  title: string;
  icon?: ReactNode;
  meta?: ReactNode;
  className?: string;
  renderH1?: boolean;
}

export function PageBreadcrumb({
  trail,
  title,
  icon,
  meta,
  className,
  renderH1 = true,
}: PageBreadcrumbProps) {
  const shouldReduceMotion = useReducedMotion();

  // Primary parent item for reachable aria-label when collapsed
  // const primaryParent = trail[0];

  // Motion variants with respect to prefers-reduced-motion
  const chipTransition: Transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: [0.16, 1, 0.3, 1] };

  const trailTransition: Transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.3, delay: 0.08, ease: "easeOut" };

  const titleTransition: Transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.35, delay: 0.16, ease: [0.16, 1, 0.3, 1] };


  // const renderChipContent = () => {
  // if (!icon) return null;

  // if (primaryParent?.to) {
  // return (
  //   <Link
  //     to={primaryParent.to}
  //     className="page-breadcrumb__chip"
  //     aria-label={primaryParent.label}
  //     title={primaryParent.label}
  //   >
  //     {icon}
  //   </Link>
  // );
  // }

  //   return (
  //     <div className="page-breadcrumb__chip" aria-hidden="true">
  //       {icon}
  //     </div>
  //   );
  // };

  return (
    <nav
      aria-label="Breadcrumb"
      className={`page-breadcrumb ${className ?? ""}`.trim()}
    >
      {icon && (
        <motion.div
          className="flex items-center"
          initial={shouldReduceMotion ? false : { scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={chipTransition}
        >
          {/* {renderChipContent()} */}
        </motion.div>
      )}

      <ol className="page-breadcrumb__list">
        {trail.map((item, index) => (
          <motion.li
            key={index}
            className="page-breadcrumb__item page-breadcrumb__item--trail"
            initial={shouldReduceMotion ? false : { opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={trailTransition}
          >
            {item.to ? (
              <Link to={item.to} className="page-breadcrumb__trail-link">
                {item.label}
              </Link>
            ) : (
              <span className="page-breadcrumb__trail-text">{item.label}</span>
            )}
            <ChevronRight
              size={13}
              strokeWidth={2.4}
              className="page-breadcrumb__chevron"
              aria-hidden="true"
            />
          </motion.li>
        ))}

        <li
          className="page-breadcrumb__item page-breadcrumb__item--current"
          aria-current="page"
        >
          <motion.div
            className="page-breadcrumb__title-wrapper"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={titleTransition}
          >
            {renderH1 ? (
              <h1 className="page-breadcrumb__title" title={title}>
                {title}
              </h1>
            ) : (
              <span
                className="page-breadcrumb__title"
                role="heading"
                aria-level={1}
                title={title}
              >
                {title}
              </span>
            )}

            {/*
              Signature ECG accent: animated EKG trace sitting under title edge.
              Width = 120 px (~45 % wider than the original 82 px).
              Left edge is flush with the h1's left edge via position: absolute; left: 0
              on the SVG (relative to .page-breadcrumb__title-wrapper).
              The path encodes a real ECG waveform:
                flat baseline → P-wave bump (11,5.5) → flat → Q-dip (22,8.5) →
                R-spike (24,1) → S-dip (26,13) → flat ST → T-wave (40,4.5) →
                flat tail to x=120.
              The stroke-dashoffset animation in PageBreadcrumb.css redraws the
              line left-to-right every 2 s; the outer SVG scaleY pulse-beat
              keyframe is timed to match (lub at ~28 %, dub at ~52 %).
            */}
            <svg
              className="page-breadcrumb__pulse"
              width="108"
              height="14"
              viewBox="0 0 120 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                className="page-breadcrumb__ecg-path"
                d="M 0 7 L 8 7 L 11 5.5 L 14 7 L 20 7 L 22 8.5 L 24 1 L 26 13 L 28 7 L 36 7 L 40 4.5 L 44 7 L 52 7 L 120 7"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </motion.div>
        </li>

        {meta && (
          <motion.li
            className="page-breadcrumb__item page-breadcrumb__item--meta"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={trailTransition}
          >
            {meta}
          </motion.li>
        )}
      </ol>
    </nav>
  );
}
