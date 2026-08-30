// dsh-token-preset
//
// The bundle's value is its four bundled skills (skills/*/SKILL.md), collected
// by dsh's skill-filesystem provider into the bundled skill root at install
// time. This plugin has no runtime behavior; it exists so the bundle registers
// as a profile layer via its cordis.patch.

export const name = 'token-preset'

export function apply(ctx, config = {}) {
  // intentionally empty: skills are the whole bundle
}
