export default function TombolReset({ onClick, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="Reset semua input ke nilai awal"
      style={{
        width: '100%',
        padding: '12px 20px',
        borderRadius: 10,
        border: '1px solid var(--border)',
        backgroundColor: 'transparent',
        color: 'var(--text-secondary)',
        fontSize: 13,
        fontWeight: 500,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'all 0.2s',
        fontFamily: 'inherit',
        letterSpacing: '0.2px',
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.target.style.borderColor = 'var(--accent)';
          e.target.style.color = 'var(--accent)';
          e.target.style.backgroundColor = 'var(--accent-glow)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.target.style.borderColor = 'var(--border)';
          e.target.style.color = 'var(--text-secondary)';
          e.target.style.backgroundColor = 'transparent';
        }
      }}
    >
      Reset
    </button>
  );
}
