import { useNavigate } from 'react-router-dom'

export default function Enviado() {
  const navigate = useNavigate()

  return (
    <div
      data-testid="page-enviado"
      className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6 gap-8"
    >
      <div className="text-center">
        <div className="text-7xl mb-4">✓</div>
        <h1 className="text-3xl font-bold text-green-800">Relato enviado</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Seu relato foi registrado com segurança.
          <br />
          Um profissional vai receber e acompanhar o caso.
        </p>
      </div>
      <button
        onClick={() => navigate('/')}
        className="px-8 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700"
      >
        Voltar ao início
      </button>
    </div>
  )
}
