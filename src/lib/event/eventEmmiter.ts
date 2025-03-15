// Importa a classe EventEmitter do módulo "events"
import { EventEmitter } from "events";

// Cria uma instância de EventEmitter para gerenciar eventos personalizados
const eventEmitter = new EventEmitter();

// Exporta a instância para ser usada em outros módulos
// Essa instância pode ser utilizada para emitir eventos e registrar ouvintes (listeners)
export default eventEmitter;