export default function InputField({ id, label, value, onChange, satuan, error, placeholder, min = 0, step = 'any' }) {
  const errorId = `${id}-error`;
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-1.5" style={{ color: '#A0A0A0' }}>
        {label}
      </label>
      <div className="relative flex items-center">
        {satuan === 'rupiah' && (
          <span className="absolute left-3 text-sm font-medium select-none" style={{ color: '#A0A0A0' }}>Rp</span>
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
          className={`w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors
            ${satuan === 'rupiah' ? 'pl-9' : ''}
            ${satuan === 'persen' ? 'pr-9' : ''}
            ${error ? 'border border-red-500' : 'border border-transparent focus:border-[#EE4D2D] focus-visible:ring-2 focus-visible:ring-[#EE4D2D] focus-visible:ring-offset-1 focus-visible:ring-offset-[#242424]'}`}
          style={{
            backgroundColor: '#242424',
            color: '#FFFFFF',
          }}
        />
        {satuan === 'persen' && (
          <span className="absolute right-3 text-sm font-medium select-none" style={{ color: '#A0A0A0' }}>%</span>
        )}
      </div>
      {error && (
        <p id={errorId} role="alert" aria-live="polite" className="mt-1 text-xs" style={{ color: '#EF4444' }}>
          {error}
        </p>
      )}
    </div>
  );
}
