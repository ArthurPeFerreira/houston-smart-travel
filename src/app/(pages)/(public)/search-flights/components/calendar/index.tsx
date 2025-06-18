"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { useEffect, useRef, useState, useMemo } from "react";
import { addYears, startOfToday } from "date-fns";

import "../../styles/calendar.css";

import "@fullcalendar/daygrid/index.js";
import "@fullcalendar/multimonth/index.js";
import { api } from "@/lib/api/api";
import { CabinsType, RoutesDataType } from "@/lib/route/types";
import { AirportType } from "@/lib/airport/types";
import GoingBackModal from "./components/GoingBackModal";
import Link from "next/link";
import { FaPlane, FaSpinner } from "react-icons/fa";
import InfoCard from "./components/InfoCard";
import { toastConfigs } from "@/lib/toastify/toastify";
import { toast } from "react-toastify";

interface CalendarProps {
  originAirportId: number;
  destinationAirportId: number;
  cabin: string;
  seats: number;
  routeId: number;
}

export default function Calendar({
  originAirportId,
  destinationAirportId,
  cabin,
  seats,
  routeId,
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

  const [departureEventsData, setDepartureEventsData] = useState<
    {
      title: string;
      start: string;
      end: string;
      allDay: boolean;
      extendedProps: { eventType: string };
    }[]
  >([]);

  const [returnEventsData, setReturnEventsData] = useState<
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

  const [cabinSelected, setCabinSelected] = useState<CabinsType>();

  const [calendarKey, setCalendarKey] = useState<string>(
    new Date().toISOString()
  );

  const [isOpenGoingBackModal, setIsOpenGoingBackModal] =
    useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  const [selection, setSelection] = useState<"departure" | "return">(
    "departure"
  );

  // Eventos de ida que obedecem à data-limite imposta pela volta escolhida
  const filteredDepartureEvents = useMemo(() => {
    if (!returnDate) return departureEventsData;
    const limit = new Date(returnDate);
    return departureEventsData.filter(
      (ev) => new Date(ev.start) < limit // <  (não pode ser =)
    );
  }, [departureEventsData, returnDate]);

  // Eventos de volta que obedecem à data-limite imposta pela ida escolhida
  const filteredReturnEvents = useMemo(() => {
    if (!departureDate) return returnEventsData;
    const limit = new Date(departureDate);
    return returnEventsData.filter(
      (ev) => new Date(ev.start) > limit // >  (não pode ser =)
    );
  }, [returnEventsData, departureDate]);

  useEffect(() => {
    async function fetchData() {
      try {
        const responseDepartureEvents = await api.get(
          `/api/check-flights/search-flights?origin=${originAirportId}&destination=${destinationAirportId}&cabin=${cabin}&seats=${seats}&route=${routeId}`
        );

        const responseReturnEvents = await api.get(
          `/api/check-flights/search-flights?origin=${destinationAirportId}&destination=${originAirportId}&cabin=${cabin}&seats=${seats}&route=${routeId}`
        );

        if (responseDepartureEvents.data.length > 0) {
          setEventsData(
            responseDepartureEvents.data.map((data: RoutesDataType) => {
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
          setDepartureEventsData(
            responseDepartureEvents.data.map((data: RoutesDataType) => {
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
          setDepartureEventsData([]);
        }

        if (responseReturnEvents.data.length > 0) {
          setReturnEventsData(
            responseReturnEvents.data.map((data: RoutesDataType) => {
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
          setReturnEventsData([]);
        }

        const responseOriginAirport = await api.get(
          `/api/airport/${originAirportId}`
        );

        setOriginAirport(responseOriginAirport.data);

        const responseDestinationAirport = await api.get(
          `/api/airport/${destinationAirportId}`
        );

        setDestinationAirport(responseDestinationAirport.data);

        const responseRoute = await api.get(`/api/route/${routeId}`);

        const routeCabins: CabinsType[] = responseRoute.data.cabins;

        setCabinSelected(
          routeCabins.find((c) => {
            return c.key === cabin;
          })
        );
      } catch {
        console.error("Failed to Find Route!");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [originAirportId, destinationAirportId, cabin, seats, routeId]);

  // Função disparada ao clicar em um dia
  function handleDateClick(arg: { dateStr: string }) {
    const clickedDate = arg.dateStr;

    const events = calendarRef.current
      ?.getApi()
      .getEvents()
      .filter((ev) => ev.start?.toISOString().slice(0, 10) === clickedDate);

    const hasFlight = events?.some(
      (ev) =>
        ev.extendedProps.eventType === "has-flight-direct" ||
        ev.extendedProps.eventType === "has-flight-layovers"
    );

    if (!hasFlight) return;

    if (selection === "return" && departureDate) {
      const departure = new Date(departureDate);
      const returning = new Date(clickedDate); // ← data clicada para a volta

      if (returning <= departure) {
        toast.info(
          "Please select a return date that is after the departure date.",
          toastConfigs
        );
        return;
      }
    }

    // DEPATURE SELECIONADO
    if (selection === "departure") {
      setDepartureDate(clickedDate);

      setDepartureEventsData((prev) => [
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

    // RETURN SELECIONADO
    if (selection === "return") {
      setReturnDate(clickedDate);

      setReturnEventsData((prev) => [
        ...prev.filter((ev) => ev.extendedProps.eventType !== "return-date"),
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

    setIsOpenGoingBackModal(true);
  }

  useEffect(() => {
    setCalendarKey(new Date().toISOString());
  }, [eventsData]);

  useEffect(() => {
    if (selection === "departure") {
      setEventsData(filteredDepartureEvents);
    }

    if (selection === "return") {
      setEventsData(filteredReturnEvents);
    }
  }, [selection, departureEventsData, returnEventsData]);

  return (
    <main className="relative flex-1 w-full min-h-[60vh] md:min-h-fit flex items-center justify-center p-5">
      <div>
        {loading ? (
          <div className="h-full">
            <FaSpinner className="animate-spin" size={40} />
          </div>
        ) : (
          <>
            <InfoCard
              cabinSelected={cabinSelected as CabinsType}
              originAirport={originAirport}
              destinationAirport={destinationAirport}
              departureDate={departureDate}
              returnDate={returnDate}
              roundedTrip={roundedTrip}
              selection={selection}
              setSelection={setSelection}
              seats={seats}
            />
            <div className="px-2 max-w-7xl flex flex-col justify-center items-center">
              <div className="w-fit flex flex-row items-end justify-center gap-3 text-4xl text-[#141414] my-5">
                {selection === "departure" ? (
                  <>
                    {originAirport?.city} ({originAirport?.airportCode})
                    <FaPlane size={35} />
                    {destinationAirport?.city} (
                    {destinationAirport?.airportCode})
                  </>
                ) : (
                  <>
                    {destinationAirport?.city} (
                    {destinationAirport?.airportCode})
                    <FaPlane size={35} />
                    {originAirport?.city} ({originAirport?.airportCode})
                  </>
                )}
              </div>
              <div className="w-full h-fit mt-[-20px]">
                {eventsData.length > 0 && (
                  <FullCalendar
                    key={calendarKey}
                    ref={calendarRef}
                    plugins={[
                      dayGridPlugin,
                      multiMonthPlugin,
                      interactionPlugin,
                    ]}
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
                      const events = arg.view.calendar
                        .getEvents()
                        .filter((event) => {
                          return (
                            event.start &&
                            event.start.toISOString().slice(0, 10) ===
                              cellDateStr
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
              <div className="flex flex-col-reverse md:flex-row-reverse  gap-3 font-bold mt-4 w-full justify-between items-center">
                <div className="text-black h-fit items-end justify-end">
                  This policy follows our{" "}
                  <Link
                    href="/terms-services"
                    className="underline text-blue-600"
                  >
                    terms of services
                  </Link>
                  .
                </div>
                <div className="flex flex-row gap-2">
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
            <GoingBackModal
              isOpen={isOpenGoingBackModal && !roundedTrip}
              setIsOpen={setIsOpenGoingBackModal}
              onSelect={(value) => {
                setRoundedTrip(value);
                if (value) {
                  setSelection("return");
                }
              }}
              cabinSelected={cabinSelected as CabinsType}
              originAirport={originAirport}
              destinationAirport={destinationAirport}
              departureDate={departureDate}
            />
          </>
        )}
      </div>
    </main>
  );
}
