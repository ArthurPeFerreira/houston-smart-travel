import { CabinKey, cabins } from "@/lib/route/cabins"; // Importa o tipo CabinKey e o objeto cabins com os dados das cabines
import { CabinsType } from "@/lib/route/types"; // Importa a tipagem que representa os dados de uma cabine

// Tipagem das propriedades esperadas pelo componente SeeCabins
interface SeeCabinsModalProps {
  cabinsToShow: CabinsType[]; // Lista de cabines a serem exibidas no modal
  isOpen: boolean; // Indica se o modal está visível ou não
  onClose: () => void; // Função callback chamada para fechar o modal
}

export default function SeeCabins({
  cabinsToShow,
  isOpen,
  onClose,
}: SeeCabinsModalProps) {
  // Se o modal não estiver aberto, retorna null para não renderizar nada
  if (!isOpen) return null;

  return (
    // Container principal do modal com fundo escuro cobrindo toda a tela
    <div className="fixed inset-0 text-white flex items-center justify-center z-50  w-full h-full bg-gray-900">
      {/* Caixa interna do modal com padding e aparência arredondada */}
      <div
        className={`bg-gray-800 p-6 rounded shadow-lg max-h-11/12 h-fit max-w-96 sm:max-w-11/12 w-fit`}
      >
        <div>
          {/* Título centralizado do modal */}
          <h1 className="text-center font-bold text-3xl mb-5 relative">
            Cabins
          </h1>

          {/* Área de listagem das cabines com rolagem caso o conteúdo seja muito extenso */}
          <div
            className={`overflow-y-auto max-h-[400px] md:max-h-fit grid gap-2 grid-cols-1 ${
              cabinsToShow.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1"
            }`}
          >
            {/* Itera sobre a lista de cabines recebidas via props */}
            {cabinsToShow.map((cabin) => (
              // Container individual para cada cabine
              <div key={cabin.id} className="p-4 bg-gray-700 rounded w-full">
                {/* Exibe o rótulo da cabine com base na chave do objeto cabins */}
                <div className="bg-gray-800 p-2 rounded mb-2">
                  {String(cabins[cabin.key as CabinKey].label)}
                </div>

                {/* Exibe os detalhes numéricos da cabine: pontos máximos, bagagens, preços */}
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

        {/* Botão que executa a função de fechamento do modal ao ser clicado */}
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
