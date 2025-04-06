// pages/calendar.tsx ou app/calendar/page.tsx (se estiver usando App Router)
"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { useRef } from "react";
import { addYears, startOfToday } from "date-fns";

import "./styles/calendar.css";
// import "./styles/darkCalendar.css";

import "@fullcalendar/daygrid/index.js";
import "@fullcalendar/multimonth/index.js";

export default function Search() {
  const today = startOfToday();
  const nextYear = addYears(today, 1);
  const calendarRef = useRef<FullCalendar | null>(null);

  // Função disparada ao clicar em um dia
  function handleDateClick(arg: { dateStr: string }) {
    console.log(`Você clicou no dia: ${arg.dateStr}`);
  }

  return (
    <main className="w-full flex items-center justify-center">
      <div className="px-2 max-w-7xl">
        <div className="w-full h-fit rounded-lg">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, multiMonthPlugin, interactionPlugin]}
            headerToolbar={{
              left: "",
              center: "",
              right: "",
            }}
            initialView="multiMonth" // ou "multiMonthYear"
            initialDate={today.toISOString().slice(0, 10)}
            views={{
              multiMonth: {
                type: "multiMonthYear",
                duration: { months: 12 },
                multiMonthMaxColumns: 5,
                visibleRange: {
                  start: today.toISOString().slice(0, 10),
                  end: nextYear.toISOString().slice(0, 10),
                },
              },
            }}
            validRange={{
              start: today.toISOString().slice(0, 10), // início
              end: nextYear.toISOString().slice(0, 10), // fim (não incluso)
            }}
            dateClick={handleDateClick}
            showNonCurrentDates={false}
            height="auto"
            dayCellDidMount={(arg) => {
              const cellDateStr = arg.date.toISOString().slice(0, 10);
              // Filtra os eventos que começam neste dia
              const events = arg.view.calendar.getEvents().filter((event) => {
                return (
                  event.start &&
                  event.start.toISOString().slice(0, 10) === cellDateStr
                );
              });

              // Se houver ao menos um evento, pode-se tratar:
              if (events.length) {
                // Se houver mais de um evento, você pode definir uma prioridade ou combinar cores.
                // Aqui, usaremos o primeiro evento como exemplo.
                const eventType = events[0].extendedProps.eventType;

                if (eventType === "has-flight-direct") {
                  arg.el.classList.add("has-flight-direct");
                } else if (eventType === "has-flight-layovers") {
                  arg.el.classList.add("has-flight-layovers");
                }
              }
            }}
            events={[
              {
                title: "Voo para Nova York",
                start: "2025-04-10",
                end: "2025-04-11",
                // Mesmo que a propriedade color seja definida, ela não será exibida se você ocultar os eventos via CSS
                extendedProps: { eventType: "has-flight-direct" },
              },
              {
                title: "Voo de Retorno",
                start: "2025-05-03",
                end: "2025-05-04",
                extendedProps: { eventType: "has-flight-layovers" },
              },
            ]}
          />
        </div>
        <div className="flex flex-col-reverse gap-4 lg:flex-row justify-between items-start my-4">
          <div className="text-[#141414] text-lg [text-align:justify] space-y-2">
            <p>
              • You have chosen the <strong>Business</strong> cabin.
            </p>
            <p>
              • Your reservation includes <strong>2 checked bags</strong> at no
              extra cost.
            </p>
            <p>
              • The ticket price is <strong>$2,500.00</strong>.
            </p>
            <p>
              • In case of cancellation, a <strong>$500.00 fee</strong> will
              apply.
            </p>
            <p>
              • This policy follows our <strong>terms of services</strong>.
            </p>
          </div>
          <div className="flex flex-row gap-3 font-bold">
            <div className="flex flex-row items-center gap-2">
              <div className="bg-blue-400 w-fit p-5 relative">
                <label className="absolute right-1 top-0.5">19</label>
              </div>
              <div>Direct flight</div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div className="bg-green-400 w-fit p-5 relative">
                <label className="absolute right-1 top-0.5">19</label>
              </div>
              <div>Flight with connection(s)</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
