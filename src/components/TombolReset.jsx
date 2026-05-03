export default function TombolReset({ onClick, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="Reset semua input ke nilai awal"
      className="w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EE4D2D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A]"
      style={{
        border: '1px solid #EE4D2D',
        color: '#EE4D2D',
        backgroundColor: 'transparent',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onMouseEnter={(e) => { if (!disabled) { e.target.style.backgroundColor = '#EE4D2D'; e.target.style.color = '#FFFFFF'; } }}
      onMouseLeave={(e) => { if (!disabled) { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#EE4D2D'; } }}
    >
      Reset
    </button>
  );
}
