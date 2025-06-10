export type AccessCounterTypes = "check flights" | "home";

export interface AccessCounterType {
  type: AccessCounterTypes;
  count: number;
  lastAccessAt: Date;
}
