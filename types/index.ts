export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: "Petrol" | "Diesel" | "Hybrid" | "Electric";
  transmission: "Automatic" | "Manual";
  bodyType: "SUV" | "Sedan" | "Coupe" | "Hatchback" | "Truck" | "Wagon";
  color: string;
  condition: "Foreign Used" | "Nigerian Used" | "Brand New";
  engine: string;
  drivetrain: string;
  seats: number;
  features: string[];
  images: string[];
  description: string;
  featured?: boolean;
}

export interface Filters {
  makes: string[];
  minPrice: number | "";
  maxPrice: number | "";
  minYear: number | "";
  maxYear: number | "";
  fuelTypes: string[];
  transmissions: string[];
  bodyTypes: string[];
  conditions: string[];
  maxMileage: number | "";
}

export const defaultFilters: Filters = {
  makes: [],
  minPrice: "",
  maxPrice: "",
  minYear: "",
  maxYear: "",
  fuelTypes: [],
  transmissions: [],
  bodyTypes: [],
  conditions: [],
  maxMileage: "",
};
