export default function StepProgress({ currentStep, totalSteps }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm text-gray-500">Passo {currentStep} de {totalSteps}</p>
      <div className="flex gap-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            role="presentation"
            className={`w-3 h-3 rounded-full transition-colors ${
              i < currentStep ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
