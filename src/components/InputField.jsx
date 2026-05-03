export default function InputField({ id, label, value, onChange, satuan, error, placeholder, min = 0, step = 'any' }) {
  const errorId = `${id}-error`;
  return (
    <div style={{ marginBottom: 16 }}>
      <label
        htmlFor={id}
        style={{ display: 'block', fontSize: 12, fontWeight: 500, marginBottom: 8, color: 'var(--text-secondary)', letterSpacing: '0.3px', textTransform: 'uppercase' }}
      >
        {label}
      </label>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {satuan === 'rupiah' && (
          <span style={{
            position: 'absolute', left: 14, fontSize: 13, fontWeight: 500,
            color: 'var(--text-secondary)', userSelect: 'none', pointerEvents: 'none'
          }}>Rp</span>
        )}
        <input
          id={id}
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          step={step}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={!!error}
          style={{
            width: '100%',
            padding: satuan === 'rupiah' ? '12px 14px 12px 36px' : satuan === 'persen' ? '12px 36px 12px 14px' : '12px 14px',
            backgroundColor: 'var(--bg-input)',
            border: error ? '1px solid var(--error)' : '1px solid var(--border)',
            borderRadius: 10,
            color: '#fff',
            fontSize: 15,
            fontWeight: 500,
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            fontFamily: 'inherit',
          }}
          onFocus={(e) => {
            if (!error) {
              e.target.style.borderColor = 'var(--accent)';
              e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)';
            }
          }}
          onBlur={(e) => {
            if (!error) {
              e.target.style.borderColor = 'var(--border)';
              e.target.style.boxShadow = 'none';
            }
          }}
        />
        {satuan === 'persen' && (
          <span style={{
            position: 'absolute', right: 14, fontSize: 13, fontWeight: 500,
            color: 'var(--text-secondary)', userSelect: 'none', pointerEvents: 'none'
          }}>%</span>
        )}
      </div>
      {error && (
        <p id={errorId} role="alert" aria-live="polite" style={{ margin: '6px 0 0', fontSize: 11, color: 'var(--error)' }}>
          {error}
        </p>
      )}
    </div>
  );
}
