import { imgUrl } from '../data/pictograms'

export default function Pictogram({ pictogram, selected, onToggle }) {
  return (
    <button
      onClick={() => onToggle(pictogram)}
      aria-pressed={selected}
      className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
        selected
          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-300'
          : 'border-gray-200 bg-white hover:border-gray-400'
      }`}
    >
      <img
        src={imgUrl(pictogram.arasaacId)}
        alt={pictogram.label}
        className="w-16 h-16 object-contain"
        onError={(e) => { e.currentTarget.style.opacity = '0.25' }}
      />
      <span className="text-sm font-medium text-center leading-tight">{pictogram.label}</span>
    </button>
  )
}
