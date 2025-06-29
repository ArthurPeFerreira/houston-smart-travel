"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { useEffect, useRef, useState, useMemo } from "react";
import { addYears, startOfToday } from "date-fns";
import debounce from "lodash/debounce";
import "../../styles/calendar.css";
import "@fullcalendar/daygrid/index.js";
import "@fullcalendar/multimonth/index.js";
import { api } from "@/lib/api/api";
import { CabinsType, RoutesDataType } from "@/lib/route/types";
import { AirportType } from "@/lib/airport/types";
import Link from "next/link";
import { FaPlane, FaSpinner } from "react-icons/fa";
import InfoCard from "./components/InfoCard";
import { toastConfigs } from "@/lib/toastify/toastify";
import { toast } from "react-toastify";
import OneWayTripModal from "./components/OneWayTripModal";
import RoundedTripModal from "./components/RoundedTripModal";

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

  const [isOpenOneWayTripModal, setIsOpenOneWayTripModal] =
    useState<boolean>(false);
  const [isOpenRoundedTripModal, setIsOpenRoundedTripModal] =
    useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  const [selection, setSelection] = useState<"departure" | "return">(
    "departure"
  );

  // Eventos de ida que obedecem à data-limite imposta pela volta escolhida
  const filteredDepartureEvents = useMemo(() => {
    if (!returnDate) return departureEventsData;
    const limit = new Date(returnDate);
    return departureEventsData.filter((ev) => new Date(ev.start) < limit);
  }, [departureEventsData, returnDate]);

  // Eventos de volta que obedecem à data-limite imposta pela ida escolhida
  const filteredReturnEvents = useMemo(() => {
    if (!departureDate) return returnEventsData;
    const limit = new Date(departureDate);
    return returnEventsData.filter((ev) => new Date(ev.start) > limit);
  }, [returnEventsData, departureDate]);

  useEffect(() => {
    const debounced = debounce(() => {
      setCalendarKey(new Date().toISOString());
    }, 1500);

    window.addEventListener("resize", debounced);
    return () => {
      window.removeEventListener("resize", debounced);
      debounced.cancel();
    };
  }, []);

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
            responseDepartureEvents.data.map((route: RoutesDataType) => {
              const date = new Date(route.date).toISOString().slice(0, 10);
              return {
                title: `${route.originAirport} → ${route.destinationAirport} - ${date}`,
                start: date,
                end: date,
                allDay: true,
                extendedProps: {
                  eventType: route.direct
                    ? "departure-direct"
                    : "departure-layover",
                },
              };
            })
          );

          setDepartureEventsData(
            responseDepartureEvents.data.map((route: RoutesDataType) => {
              const date = new Date(route.date).toISOString().slice(0, 10);
              return {
                title: `${route.originAirport} → ${route.destinationAirport} - ${date}`,
                start: date,
                end: date,
                allDay: true,
                extendedProps: {
                  eventType: route.direct
                    ? "departure-direct"
                    : "departure-layover",
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
            responseReturnEvents.data.map((route: RoutesDataType) => {
              const date = new Date(route.date).toISOString().slice(0, 10);
              return {
                title: `${route.originAirport} → ${route.destinationAirport} - ${date}`,
                start: date,
                end: date,
                allDay: true,
                extendedProps: {
                  eventType: route.direct ? "return-direct" : "return-layover",
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
    const FLIGHT_TYPES = [
      "departure-direct",
      "departure-layover",
      "return-direct",
      "return-layover",
    ];

    const clickedDate = arg.dateStr;

    const events = calendarRef.current
      ?.getApi()
      .getEvents()
      .filter((ev) => ev.start?.toISOString().slice(0, 10) === clickedDate);

    const hasFlight = events?.some((ev) =>
      FLIGHT_TYPES.includes(ev.extendedProps.eventType)
    );
    if (!hasFlight) return;

    if (selection === "return" && departureDate) {
      const departure = new Date(departureDate);
      const returning = new Date(clickedDate);

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

    // Se ainda não sabemos se será ida-e-volta, pergunte agora.
    if (!roundedTrip && selection === "departure") {
      setIsOpenOneWayTripModal(true); // pergunta: “voltar ou não?”
      return;
    }

    // Já é ida-e-volta e o usuário acabou de escolher a data de volta:
    if (
      roundedTrip &&
      (selection === "return" || (departureDate !== "" && returnDate !== ""))
    ) {
      setIsOpenRoundedTripModal(true); // mostra o resumo final
    }
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

  function resetTrip() {
    // Zera datas e modo
    setDepartureDate("");
    setReturnDate("");
    setRoundedTrip(false);
    setSelection("departure");

    // Remove eventos "Departure"/"Return" que pintam as células
    setDepartureEventsData((prev) =>
      prev.filter((ev) => ev.extendedProps.eventType !== "departure-date")
    );
    setReturnEventsData((prev) =>
      prev.filter((ev) => ev.extendedProps.eventType !== "return-date")
    );

    // Força o FullCalendar a reconstruir o DOM
    setCalendarKey(new Date().toISOString());
  }

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
              <div className="w-fit flex flex-row items-center md:items-end justify-center gap-3 text-md sm:text-xl md:text-3xl text-[#141414] my-5">
                {selection === "departure" ? (
                  <>
                    {originAirport?.city} ({originAirport?.airportCode})
                    <FaPlane className="text-3xl" />
                    {destinationAirport?.city} (
                    {destinationAirport?.airportCode})
                  </>
                ) : (
                  <>
                    {destinationAirport?.city} (
                    {destinationAirport?.airportCode})
                    <FaPlane className="text-3xl" />
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
                      if (arg.isOther) return;

                      const cellDateStr = arg.date.toISOString().slice(0, 10);
                      const events = arg.view.calendar
                        .getEvents()
                        .filter(
                          (ev) =>
                            ev.start?.toISOString().slice(0, 10) === cellDateStr
                        );

                      if (!events.length) return;

                      if (events.length) {
                        // Zera todas as classes customizadas antes de aplicar novas
                        arg.el.classList.remove(
                          "departure-direct",
                          "departure-layover",
                          "return-direct",
                          "return-layover",
                          "selected-flight-departure",
                          "selected-flight-return"
                        );

                        for (const ev of events) {
                          const type = ev.extendedProps.eventType;

                          if (type === "departure-direct")
                            arg.el.classList.add("departure-direct");
                          if (type === "departure-layover")
                            arg.el.classList.add("departure-layover");
                          if (type === "return-direct")
                            arg.el.classList.add("return-direct");
                          if (type === "return-layover")
                            arg.el.classList.add("return-layover");

                          if (type === "departure-date") {
                            arg.el.classList.add("selected-flight-departure");
                            arg.el.classList.remove("departure-direct");
                            arg.el.classList.remove("departure-layover");
                          }
                          if (type === "return-date") {
                            arg.el.classList.add("selected-flight-return");
                            arg.el.classList.remove("return-direct");
                            arg.el.classList.remove("return-layover");
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
                    <div
                      className={`${
                        selection === "departure"
                          ? "departure-direct"
                          : "return-direct"
                      } w-fit p-5 relative`}
                    >
                      <label className="absolute right-1 top-0.5">19</label>
                    </div>
                    <div>Direct flight</div>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <div
                      className={`${
                        selection === "departure"
                          ? "departure-layover"
                          : "return-layover"
                      } w-fit p-5 relative`}
                    >
                      <label className="absolute right-1 top-0.5">19</label>
                    </div>
                    <div>Flight with connection(s)</div>
                  </div>
                </div>
              </div>
            </div>
            <OneWayTripModal
              isOpen={isOpenOneWayTripModal && !roundedTrip}
              setIsOpen={setIsOpenOneWayTripModal}
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
              seats={seats}
              resetDepatureDate={resetTrip}
            />
            <RoundedTripModal
              isOpen={isOpenRoundedTripModal && roundedTrip}
              setIsOpen={setIsOpenRoundedTripModal}
              cabinSelected={cabinSelected as CabinsType}
              originAirport={originAirport}
              destinationAirport={destinationAirport}
              departureDate={departureDate}
              returnDate={returnDate}
              seats={seats}
            />
          </>
        )}
      </div>
    </main>
  );
}
