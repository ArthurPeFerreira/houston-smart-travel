import { format, toZonedTime } from 'date-fns-tz';

// Função para converter um timestamp ISO para o fuso horário de Houston
export function convertToHoustonTime(isoTimestamp: string): string {
    // Define o fuso horário de Houston (UTC-6 ou UTC-5, dependendo do horário de verão)
    const houstonTimeZone = 'America/Chicago'; // Houston está no fuso horário 'America/Chicago'

    // Converte o timestamp ISO para o fuso horário de Houston
    const zonedDate = toZonedTime(isoTimestamp, houstonTimeZone);

    // Formata a data no formato desejado
    const formattedDate = format(zonedDate, 'MM/dd/yyyy HH:mm:ss', { timeZone: houstonTimeZone });

    return formattedDate;
}