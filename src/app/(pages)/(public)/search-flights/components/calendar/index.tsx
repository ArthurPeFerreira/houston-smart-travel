"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { useEffect, useRef, useState } from "react";
import { addYears, startOfToday } from "date-fns";

import "../../styles/calendar.css";

import "@fullcalendar/daygrid/index.js";
import "@fullcalendar/multimonth/index.js";
import { api } from "@/lib/api/api";
import { RoutesDataType } from "@/lib/route/types";
import { AirportType } from "@/lib/airport/types";
import { MdFlight } from "react-icons/md";

interface CalendarProps {
  originAirportId: number;
  destinationAirportId: number;
  cabin: string;
  seats: number;
  route: number;
}

export default function Calendar({
  originAirportId,
  destinationAirportId,
  cabin,
  seats,
  route,
}: CalendarProps) {
  const today = startOfToday();
  const nextYear = addYears(today, 1);
  const calendarRef = useRef<FullCalendar | null>(null);

  const [eventsData, setEventsData] = useState<
    {
      title: string;
      start: string;
      end: string;
      allDay: boolean;
      extendedProps: { eventType: string };
    }[]
  >([]);
  const [originAirport, setOriginAirport] = useState<AirportType>();
  const [destinationAirport, setDestinationAirport] = useState<AirportType>();
  const [roundedTrip, setRoundedTrip] = useState<boolean>(false);
  const [departureDate, setDepartureDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");

  const [calendarKey, setCalendarKey] = useState<string>(crypto.randomUUID());

  // Função disparada ao clicar em um dia
  function handleDateClick(arg: { dateStr: string }) {
    const clickedDate = arg.dateStr;

    // Verifica se há eventos para essa data
    const events = calendarRef.current
      ?.getApi()
      .getEvents()
      .filter((ev) => ev.start?.toISOString().slice(0, 10) === clickedDate);

    const hasFlight = events?.some(
      (ev) =>
        ev.extendedProps.eventType === "has-flight-direct" ||
        ev.extendedProps.eventType === "has-flight-layovers"
    );

    if (!hasFlight) {
      return;
    }

    if (roundedTrip) {
      // Nenhuma data selecionada
      if (!departureDate && !returnDate) {
        setDepartureDate(clickedDate);
        setReturnDate("");

        // Mantém os outros eventos
        setEventsData((prev) => [
          ...prev.filter(
            (ev) =>
              ev.extendedProps.eventType !== "departure-date" &&
              ev.extendedProps.eventType !== "return-date"
          ),
          {
            title: "Departure",
            start: clickedDate,
            end: clickedDate,
            allDay: true,
            extendedProps: {
              eventType: "departure-date",
            },
          },
        ]);
      }

      // Só ida selecionada
      else if (departureDate && !returnDate) {
        const clicked = new Date(clickedDate);
        const departure = new Date(departureDate);

        // Se clicou numa data anterior à ida
        if (clicked < departure) {
          setDepartureDate(clickedDate);
          setReturnDate(departureDate);

          setEventsData((prev) => [
            ...prev.filter(
              (ev) =>
                ev.extendedProps.eventType !== "departure-date" &&
                ev.extendedProps.eventType !== "return-date"
            ),
            {
              title: "Departure",
              start: clickedDate,
              end: clickedDate,
              allDay: true,
              extendedProps: {
                eventType: "departure-date",
              },
            },
            {
              title: "Return",
              start: departureDate,
              end: departureDate,
              allDay: true,
              extendedProps: {
                eventType: "return-date",
              },
            },
          ]);
        } else {
          // Clicou depois da ida → vira volta
          setReturnDate(clickedDate);
          setEventsData((prev) => [
            ...prev.filter(
              (ev) => ev.extendedProps.eventType !== "return-date"
            ),
            ...prev.filter(
              (ev) => ev.extendedProps.eventType === "departure-date"
            ),
            {
              title: "Return",
              start: clickedDate,
              end: clickedDate,
              allDay: true,
              extendedProps: {
                eventType: "return-date",
              },
            },
          ]);
        }
      }

      // Já tem ida e volta → resetar volta, manter ida como nova
      else {
        setDepartureDate(clickedDate);
        setReturnDate("");

        setEventsData((prev) => [
          ...prev.filter(
            (ev) =>
              ev.extendedProps.eventType !== "departure-date" &&
              ev.extendedProps.eventType !== "return-date"
          ),
          {
            title: "Departure",
            start: clickedDate,
            end: clickedDate,
            allDay: true,
            extendedProps: {
              eventType: "departure-date",
            },
          },
        ]);
      }
    }

    // Só ida (one way)
    else {
      setDepartureDate(clickedDate);
      setReturnDate("");

      setEventsData((prev) => [
        ...prev.filter((ev) => ev.extendedProps.eventType !== "departure-date"),
        {
          title: "Departure",
          start: clickedDate,
          end: clickedDate,
          allDay: true,
          extendedProps: {
            eventType: "departure-date",
          },
        },
      ]);
    }
  }

  useEffect(() => {
    setCalendarKey(crypto.randomUUID());
  }, [eventsData]);

  useEffect(() => {
    async function fetchData() {
      try {
        const responseEvents = await api.get(
          `/api/check-flights/search-flights?origin=${originAirportId}&destination=${destinationAirportId}&cabin=${cabin}&seats=${seats}&route=${route}`
        );

        if (responseEvents.data.length > 0) {
          setEventsData(
            responseEvents.data.map((data: RoutesDataType) => {
              const date = new Date(data.date).toISOString().slice(0, 10);
              return {
                title: `${data.originAirport} -> ${data.destinationAirport} - ${date}`,
                start: date,
                end: date,
                allDay: true,
                extendedProps: {
                  eventType: data.direct
                    ? "has-flight-direct"
                    : "has-flight-layovers",
                },
              };
            })
          );
        } else {
          setEventsData([]);
        }

        const responseOriginAirport = await api.get(
          `/api/airport/${originAirportId}`
        );

        setOriginAirport(responseOriginAirport.data);

        const responseDestinationAirport = await api.get(
          `/api/airport/${destinationAirportId}`
        );

        setDestinationAirport(responseDestinationAirport.data);
      } catch {
        console.error("Failed to Find Routes!");
      }
    }
    fetchData();
  }, [originAirportId, destinationAirportId, cabin, seats, route]);

  return (
    <main className="w-full flex flex-col items-center justify-center min-h-screen">
      {originAirport && destinationAirport ? (
        <div className="p-4 flex flex-row gap-4 h-full w-fit items-center rounded-md shadow-md mt-4 border border-gray-500">
          {/* Exibe os códigos dos aeroportos se ambos estiverem definidos */}
          <div className="flex flex-row gap-2 text-lg font-semibold text-gray-800 text-center">
            {originAirport.airportCode}
            <MdFlight className="rotate-90" size={24} />
            {destinationAirport.airportCode}
          </div>

          {/* Botões de seleção de tipo de viagem */}
          <div className="flex justify-center gap-4">
            <button
              className={`px-4 py-2 rounded-lg font-medium border ${
                roundedTrip
                  ? "bg-gray-200 text-gray-600 border-gray-400 cursor-pointer"
                  : "bg-blue-600 text-white border-blue-600 cursor-default"
              }`}
              onClick={() => setRoundedTrip(false)}
            >
              One Way
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium border ${
                roundedTrip
                  ? "bg-blue-600 text-white border-blue-600 cursor-default"
                  : "bg-gray-200 text-gray-600 border-gray-400 cursor-pointer"
              }`}
              onClick={() => setRoundedTrip(true)}
            >
              Rounded Trip
            </button>
          </div>
        </div>
      ) : null}

      <div className="px-2 max-w-7xl">
        <div className="w-full h-fit rounded-lg">
          {eventsData.length > 0 && (
            <FullCalendar
              key={calendarKey}
              ref={calendarRef}
              plugins={[dayGridPlugin, multiMonthPlugin, interactionPlugin]}
              headerToolbar={{
                left: "",
                center: "",
                right: "",
              }}
              initialView="multiMonth"
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

                // Filtra os eventos desse dia
                const events = arg.view.calendar.getEvents().filter((event) => {
                  return (
                    event.start &&
                    event.start.toISOString().slice(0, 10) === cellDateStr
                  );
                });

                if (events.length) {
                  // Zera todas as classes customizadas antes de aplicar novas
                  arg.el.classList.remove(
                    "has-flight-direct",
                    "has-flight-layovers",
                    "selected-flight-departure",
                    "selected-flight-return"
                  );

                  for (const ev of events) {
                    const eventType = ev.extendedProps.eventType;

                    if (eventType === "has-flight-layovers") {
                      arg.el.classList.add("has-flight-layovers");
                    }

                    if (eventType === "has-flight-direct") {
                      arg.el.classList.remove("has-flight-layovers");
                      arg.el.classList.add("has-flight-direct");
                    }

                    if (eventType === "departure-date") {
                      arg.el.classList.remove("has-flight-layovers");
                      arg.el.classList.remove("has-flight-direct");
                      arg.el.classList.add("selected-flight-departure");
                    }

                    if (eventType === "return-date") {
                      arg.el.classList.remove("has-flight-layovers");
                      arg.el.classList.remove("has-flight-direct");
                      arg.el.classList.add("selected-flight-return");
                    }
                  }
                }
              }}
              events={eventsData}
            />
          )}
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
              <div className="bg-[#95dfbc] w-fit p-5 relative">
                <label className="absolute right-1 top-0.5">19</label>
              </div>
              <div>Direct flight</div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div className="bg-[#51a2ff] w-fit p-5 relative">
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
