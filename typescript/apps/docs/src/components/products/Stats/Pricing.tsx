import type { JSX } from 'preact'
import { useState } from 'preact/hooks'
import { Icon, IconName } from '../../Icon'
import { Switch } from '../../Switch'

interface Feature {
  readonly icon: `${IconName}`
  readonly label: JSX.Element | string
}

interface Tier {
  readonly name: string
  readonly icon: string
  readonly desc: JSX.Element | string
  readonly features: readonly Feature[]
  readonly available: boolean
  readonly monthlyPrice: (quotaIndex: number) => number | null
}

export function ProductsStatsPricingView() {
  const [quotaIndex, setQuotaIndex] = useState(0)
  const [yearly, setYearly] = useState(false)

  return (
    <div class="stats-pricing">
      <h3>
        <Icon name="coin" size={28} /> Pricing
      </h3>

      <div class="pricing-controls">
        <div class="billing-toggle">
          <span class={`toggle-label ${!yearly ? 'toggle-label-active' : ''}`}>Monthly</span>
          <Switch checked={yearly} onChange={setYearly} />
          <span class={`toggle-label ${yearly ? 'toggle-label-active' : ''}`}>
            Yearly <em>- 2 months free</em>
          </span>
        </div>

        <div class="quota-slider">
          <div class="quota-label">
            <span>Events per month</span>
            <strong>{formatQuota(QUOTAS[quotaIndex])}</strong>
          </div>
          <input
            type="range"
            min={0}
            max={QUOTAS.length - 1}
            step={1}
            value={quotaIndex}
            onInput={(e) => setQuotaIndex(Number((e.target as HTMLInputElement).value))}
          />
          <div class="quota-ticks">
            {QUOTAS.map((quota, index) => (
              <span
                key={quota}
                class={`tick ${index === quotaIndex ? 'tick-active' : ''}`}
                onClick={() => setQuotaIndex(index)}>
                {formatQuota(quota)}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div class="tiers-grid">
        {TIERS.map((tier) => {
          const monthly = tier.monthlyPrice(quotaIndex)
          const price = monthly === null ? null : yearly ? monthly * 10 : monthly

          return (
            <div key={tier.name} class={`tier-card ${!tier.available ? 'tier-disabled' : ''}`}>
              <div class="tier-header">
                <span class="tier-name">
                  <Icon name={tier.icon as `${IconName}`} size={18} />
                  {tier.name}
                </span>
                {!tier.available && <span class="tier-tag">Soon</span>}
              </div>
              <p class="tier-desc">{tier.desc}</p>

              <ul class="tier-features">
                {tier.features.map((f, i) => (
                  <li key={i}>
                    <Icon name={f.icon} size={14} />
                    {f.label}
                  </li>
                ))}
              </ul>

              <div class="tier-price">
                {price !== null ? (
                  <>
                    <strong class="price-amount">€{price}</strong>
                    <span class="price-period">/{yearly ? 'year' : 'month'}</span>
                  </>
                ) : monthly === null ? (
                  <span class="price-na">-</span>
                ) : (
                  <span class="price-contact">Contact us</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const QUOTAS = [100_000, 250_000, 500_000, 1_000_000, 5_000_000, 10_000_000, 20_000_000]
const SPARK_PRICES = [2, 4, 6, 8, null, null, null]
const TIERS: readonly Tier[] = [
  {
    name: 'Spark',
    icon: 'zap',
    desc: (
      <>
        Lightweight and <strong>cheap</strong>. Get started <em>fast</em>.
      </>
    ),
    features: [
      {
        icon: 'clock',
        label: (
          <>
            <strong>2 days</strong> retention
          </>
        ),
      },
    ],
    available: true,
    monthlyPrice: (i) => SPARK_PRICES[i] ?? null,
  },
  {
    name: 'Anvil',
    icon: 'briefcase',
    desc: (
      <>
        More history, more insights. <strong>Still affordable</strong>.
      </>
    ),
    features: [
      {
        icon: 'clock',
        label: (
          <>
            <strong>2 weeks</strong> retention
          </>
        ),
      },
    ],
    available: false,
    monthlyPrice: () => null,
  },
  {
    name: 'Furnace',
    icon: 'server',
    desc: (
      <>
        Growing products with <strong>dedicated resources</strong>.
      </>
    ),
    features: [
      {
        icon: 'clock',
        label: (
          <>
            <strong>2 months</strong> retention
          </>
        ),
      },
      { icon: 'speed-fast', label: 'Optimized events database' },
    ],
    available: false,
    monthlyPrice: () => null,
  },
  {
    name: 'Foundry',
    icon: 'buildings',
    desc: (
      <>
        <strong>Long retention</strong>, on par with <em>the big players</em>.
      </>
    ),
    features: [
      {
        icon: 'clock',
        label: (
          <>
            <strong>2 years</strong> retention
          </>
        ),
      },
      { icon: 'speed-fast', label: 'Optimized events database' },
    ],
    available: false,
    monthlyPrice: () => null,
  },
]

function formatQuota(n: number) {
  if (n >= 1_000_000) {
    return `${n / 1_000_000}M`
  }

  return `${n / 1_000}k`
}
