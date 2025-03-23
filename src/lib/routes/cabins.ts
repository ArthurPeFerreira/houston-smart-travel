export type CabinKey = "economy" | "premium" | "business" | "first";

export interface Cabin {
  key: CabinKey;
  label: string;
  code: "Y" | "W" | "J" | "F";
}

export const cabins: Record<CabinKey, Cabin> = {
  economy: {
    key: "economy",
    label: "Economy",
    code: "Y",
  },
  premium: {
    key: "premium",
    label: "Premium",
    code: "W",
  },
  business: {
    key: "business",
    label: "Business",
    code: "J",
  },
  first: {
    key: "first",
    label: "First Class",
    code: "F",
  },
};
