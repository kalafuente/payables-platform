/**
 * Motion tokens for Framer Motion.
 *
 * These mirror the CSS custom properties in globals.css (:root motion tokens)
 * so that CSS transitions and Framer Motion animations share the same vocabulary.
 *
 * Usage:
 *   import { transition, variants } from '@/lib/motion'
 *   <motion.div transition={transition.normal} variants={variants.slideUp} />
 */

/** Duration values in seconds (Framer Motion uses seconds, not milliseconds) */
export const duration = {
  instant: 0.05,  // 50ms  — state swap, no perceptible motion
  fast:    0.1,   // 100ms — hover state transitions
  normal:  0.15,  // 150ms — standard UI transitions
  slow:    0.25,  // 250ms — deliberate / multi-property
  slower:  0.4,   // 400ms — page-level or cinematic
} as const

/** Cubic bezier easing curves */
export const ease = {
  out:    [0, 0, 0.2, 1]    as const,  // decelerate — elements entering
  in:     [0.4, 0, 1, 1]    as const,  // accelerate — elements exiting
  inOut:  [0.4, 0, 0.2, 1]  as const,  // symmetric  — transform / resize
} as const

/** Spring physics configs */
export const spring = {
  /** Snappy, immediate feel — for small UI elements */
  default: {
    type:      'spring' as const,
    stiffness: 400,
    damping:   30,
  },
  /** Softer, more deliberate — for panels, drawers */
  gentle: {
    type:      'spring' as const,
    stiffness: 250,
    damping:   25,
  },
  /** Slight overshoot — for emphasis, selection states */
  bouncy: {
    type:      'spring' as const,
    stiffness: 300,
    damping:   18,
  },
} as const

/**
 * Pre-composed transition configs.
 * Pass directly to Framer Motion's `transition` prop or inside variant objects.
 */
export const transition = {
  fast:         { duration: duration.fast,   ease: ease.out  } as const,
  normal:       { duration: duration.normal, ease: ease.out  } as const,
  slow:         { duration: duration.slow,   ease: ease.out  } as const,
  exit:         { duration: duration.fast,   ease: ease.in   } as const,
  spring:       spring.default,
  springGentle: spring.gentle,
} as const

/**
 * Standard variant sets for `<motion.* variants={...} />`.
 * Pair with `initial="hidden" animate="visible" exit="exit"` on the element,
 * and `<AnimatePresence>` for exit animations.
 */
export const variants = {
  /** Opacity only — for overlays, tooltips */
  fadeIn: {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: transition.normal },
    exit:    { opacity: 0, transition: transition.exit },
  },

  /** Slide up + fade — for cards, dropdowns entering from below */
  slideUp: {
    hidden:  { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: transition.normal },
    exit:    { opacity: 0, y: 4, transition: transition.exit },
  },

  /** Slide down + fade — for items entering from above */
  slideDown: {
    hidden:  { opacity: 0, y: -8 },
    visible: { opacity: 1, y: 0, transition: transition.normal },
    exit:    { opacity: 0, y: -4, transition: transition.exit },
  },

  /** Scale + fade — for modals, context menus */
  scaleIn: {
    hidden:  { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1,    transition: transition.spring },
    exit:    { opacity: 0, scale: 0.98, transition: transition.exit },
  },

  /**
   * For staggered list items.
   * Set `staggerChildren: 0.05` on the parent's visible transition.
   */
  listItem: {
    hidden:  { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: transition.normal },
  },
} as const
