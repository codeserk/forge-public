interface Props {
  readonly checked: boolean
  readonly onChange: (checked: boolean) => void
  readonly label?: string
}

export function Switch({ checked, onChange, label }: Props) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      class={`switch ${checked ? 'switch-on' : ''}`}
      onClick={() => onChange(!checked)}>
      <span class="switch-handle" />
      {label && <span class="switch-label">{label}</span>}
    </button>
  )
}
