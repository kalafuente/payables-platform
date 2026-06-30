import { SectionTitle, DocCard } from '../doc-components'
import { motionDurations, motionVariants } from '../data'

export function MotionSection() {
  return (
    <section>
      <SectionTitle
        eyebrow="Motion"
        title="Animation"
        description="All animations use shared tokens from lib/motion.ts. CSS transitions and Framer Motion share the same duration and easing vocabulary."
      />
      <div className="space-y-5">
        <DocCard title="Principles">
          <div className="space-y-3">
            {[
              { rule: 'Subtle over theatrical',  detail: 'Transitions are 50–150 ms — just enough to orient, never to entertain.' },
              { rule: 'Purposeful',              detail: 'Every animation communicates a state change. Purely decorative motion is avoided.' },
              { rule: 'Consistent vocabulary',   detail: 'duration.*, ease.*, and variants.* are the only sources of truth. No one-off values.' },
            ].map(({ rule, detail }) => (
              <div key={rule} className="flex items-start gap-4">
                <span className="mt-0.5 w-40 shrink-0 text-xs font-medium text-ink">{rule}</span>
                <span className="text-xs text-ink-muted">{detail}</span>
              </div>
            ))}
          </div>
        </DocCard>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <DocCard title="Duration scale" description="From lib/motion.ts — duration.*">
            <div className="overflow-hidden rounded-md border border-line divide-y divide-line">
              {motionDurations.map((d) => (
                <div key={d.name} className="flex items-center gap-4 px-4 py-2.5">
                  <span className="w-16 shrink-0 font-mono text-xs font-medium text-ink">{d.name}</span>
                  <span className="w-14 shrink-0 font-mono text-xs text-ink-subtle">{d.ms}</span>
                  <span className="text-xs text-ink-muted">{d.use}</span>
                </div>
              ))}
            </div>
          </DocCard>

          <DocCard title="Variant presets" description="From lib/motion.ts — variants.*">
            <div className="overflow-hidden rounded-md border border-line divide-y divide-line">
              {motionVariants.map((v) => (
                <div key={v.name} className="flex items-start gap-4 px-4 py-2.5">
                  <span className="w-24 shrink-0 font-mono text-xs font-medium text-ink">{v.name}</span>
                  <span className="text-xs text-ink-muted">{v.use}</span>
                </div>
              ))}
            </div>
          </DocCard>
        </div>

        <DocCard title="Usage">
          <pre className="text-xs leading-relaxed text-ink-muted">{`import { variants, transition } from '@/lib/motion'
import { motion, AnimatePresence } from 'framer-motion'

// Standard enter / exit
<AnimatePresence>
  <motion.div
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={variants.slideDown}
  >
    …
  </motion.div>
</AnimatePresence>

// Custom transition override
<motion.div transition={transition.slow} variants={variants.fadeIn}>
  …
</motion.div>`}</pre>
        </DocCard>
      </div>
    </section>
  )
}
