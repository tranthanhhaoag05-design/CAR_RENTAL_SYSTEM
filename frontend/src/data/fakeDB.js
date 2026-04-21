import { carsNow, suggestCars, luxuryCars } from "./mockData";

export const fakeUsers = [
  {
    id: 1,
    name: "Admin",
    phone: "0375248772",
    password: "123456",
    role: "admin",
  },
  {
    id: 2,
    name: "User",
    phone: "0912345678",
    password: "123456",
    role: "user",
  },
];

const convertPriceToNumber = (priceDay) => {
  if (!priceDay) return 0;
  return Number(String(priceDay).replace(/K\/24h/i, "").replace(/\./g, "").trim()) * 1000;
};

const mapMockCarToAdminCar = (car) => ({
  id: car.id,
  name: car.name,
  brand: car.brand || "Chưa rõ",
  location: car.location || "Chưa rõ",
  price: convertPriceToNumber(car.priceDay),
  image: car.image || "",
  seats: car.seats || 0,
  transmission: car.transmission || "",
  fuel: car.fuel || "",
  deleted: false,
});

export const initialCars = [...carsNow, ...suggestCars, ...luxuryCars].map(mapMockCarToAdminCar);


const CARS_KEY = "cars_db";

export const initCars = (forceReset = false) => {
  const storedCars = localStorage.getItem(CARS_KEY);

  if (!storedCars || forceReset) {
    localStorage.setItem(CARS_KEY, JSON.stringify(initialCars));
  }
};

export const getAllCars = () => {
  initCars();
  return JSON.parse(localStorage.getItem(CARS_KEY) || "[]");
};

export const getActiveCars = () => {
  return getAllCars().filter((car) => !car.deleted);
};

export const getDeletedCars = () => {
  return getAllCars().filter((car) => car.deleted);
};

export const saveCars = (cars) => {
  localStorage.setItem(CARS_KEY, JSON.stringify(cars));
};

export const addCar = (car) => {
  const cars = getAllCars();
  const newCar = {
    id: Date.now(),
    deleted: false,
    ...car,
  };
  saveCars([...cars, newCar]);
};

export const updateCar = (updatedCar) => {
  const cars = getAllCars().map((car) =>
    car.id === updatedCar.id ? { ...car, ...updatedCar } : car
  );
  saveCars(cars);
};

export const softDeleteCar = (id) => {
  const cars = getAllCars().map((car) =>
    car.id === id ? { ...car, deleted: true } : car
  );
  saveCars(cars);
};

export const restoreCar = (id) => {
  const cars = getAllCars().map((car) =>
    car.id === id ? { ...car, deleted: false } : car
  );
  saveCars(cars);
};