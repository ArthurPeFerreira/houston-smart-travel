import { CabinKey, cabins } from "@/lib/route/cabins";
import { CabinsType } from "@/lib/route/types";

// Tipagem das propriedades esperadas pelo componente SeeCabins
interface SeeCabinsModalProps {
  cabinsToShow: CabinsType[]; // Lista de aeroportos disponíveis
  isOpen: boolean; // Define se o modal está visível
  onClose: () => void; // Função para fechar o modal
}

export default function SeeCabins({
  cabinsToShow,
  isOpen,
  onClose,
}: SeeCabinsModalProps) {
  // Se o modal não estiver aberto, não renderiza nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 text-white flex items-center justify-center z-50  w-full h-full bg-gray-900">
      {/* Conteúdo do modal */}
      <div
        className={`bg-gray-800 p-6 rounded shadow-lg max-h-11/12 h-fit max-w-96 sm:max-w-11/12 w-fit`}
      >
        <div>
          <h1 className="text-center font-bold text-3xl mb-5 relative">
            Cabins
          </h1>
          <div
            className={`overflow-y-auto max-h-[400px] md:max-h-fit grid gap-2 grid-cols-1 ${
              cabinsToShow.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1"
            }`}
          >
            {/* Mapeia a lista de cabines e exibe informações sobre cada uma */}
            {cabinsToShow.map((cabin) => (
              <div key={cabin.id} className="p-4 bg-gray-700 rounded w-full">
                <div className="bg-gray-800 p-2 rounded mb-2">
                  {String(cabins[cabin.key as CabinKey].label)}
                </div>
                <div className="bg-gray-800 p-2 rounded mb-2 flex flex-col gap-2">
                  <div>Maximum Points: {cabin.maximumPoints}</div>
                  <div>Bags Amount: {cabin.bagsAmount}</div>
                  <div>
                    Passage Price: ${Number(cabin.passagePrice).toFixed(2)}
                  </div>
                  <div>
                    Cancellation Price: $
                    {Number(cabin.cancellationPrice).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Botão para fechar o modal e resetar a seleção de aeroporto */}
        <button
          onClick={() => {
            onClose();
          }}
          className="w-full p-2 mt-3 rounded bg-red-500 hover:bg-red-600 transition cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}
