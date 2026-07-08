/**
 * PM Surya Ghar gallery — single source of truth for which sg-NN.jpg files
 * actually exist in public/gallery/surya-ghar/.
 *
 * Photos get added/removed from that folder directly (no build step), so this
 * list must be kept in sync by hand. If you add/remove files, update SG_ALL_NUMS
 * to match — anything else importing gallery numbers should pull from here
 * instead of assuming a 1..40 range.
 */
export const SG_ALL_NUMS = [
  1, 2, 5, 8, 10, 11, 13, 14, 15, 16, 19, 21, 22, 23, 24, 25, 26, 27, 28,
  30, 31, 32, 33, 34, 37, 38, 39, 40,
]

// Equipment / behind-the-scenes shots (inverters, panels, rooftop-only crops)
// excluded from the homeowner-facing "Real Homes" slider specifically.
const SG_SLIDER_EXCLUDED = new Set([16, 38])

export const SG_SLIDER_NUMS = SG_ALL_NUMS.filter(n => !SG_SLIDER_EXCLUDED.has(n))

export const sgSrc = n => `/gallery/surya-ghar/sg-${String(n).padStart(2, '0')}.jpg`
