import { useState } from "react";
import Icon from "@/components/ui/icon";

const tours = [
  {
    id: 1,
    name: "Санторини, Греция",
    region: "Европа",
    type: "Пляж",
    days: 8,
    price: 89000,
    image: "/images/mountain-landscape.jpg",
    tag: "Хит",
  },
  {
    id: 2,
    name: "Бали, Индонезия",
    region: "Азия",
    type: "Экзотика",
    days: 10,
    price: 112000,
    image: "/images/woman-horse.jpg",
    tag: "Популярный",
  },
  {
    id: 3,
    name: "Барселона, Испания",
    region: "Европа",
    type: "Экскурсии",
    days: 7,
    price: 74000,
    image: "/images/spiral-circles.jpg",
    tag: "",
  },
  {
    id: 4,
    name: "Токио, Япония",
    region: "Азия",
    type: "Экскурсии",
    days: 12,
    price: 145000,
    image: "/images/mountain-landscape.jpg",
    tag: "Новинка",
  },
  {
    id: 5,
    name: "Мальдивы",
    region: "Экзотика",
    type: "Пляж",
    days: 9,
    price: 210000,
    image: "/images/woman-horse.jpg",
    tag: "Люкс",
  },
  {
    id: 6,
    name: "Прага, Чехия",
    region: "Европа",
    type: "Экскурсии",
    days: 5,
    price: 52000,
    image: "/images/spiral-circles.jpg",
    tag: "",
  },
];

const regions = ["Все", "Европа", "Азия", "Экзотика"];
const types = ["Все", "Пляж", "Экскурсии", "Экзотика"];

export default function Featured() {
  const [activeRegion, setActiveRegion] = useState("Все");
  const [activeType, setActiveType] = useState("Все");
  const [maxPrice, setMaxPrice] = useState(250000);

  const filtered = tours.filter((t) => {
    const regionOk = activeRegion === "Все" || t.region === activeRegion;
    const typeOk = activeType === "Все" || t.type === activeType;
    const priceOk = t.price <= maxPrice;
    return regionOk && typeOk && priceOk;
  });

  return (
    <div id="tours" className="bg-neutral-50 px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase text-xs tracking-widest text-neutral-500 mb-3">Наши туры</p>
        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-12">
          Выбери своё путешествие
        </h2>

        {/* Фильтры */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 p-6 bg-white border border-neutral-200">
          <div className="flex-1">
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">Регион</p>
            <div className="flex flex-wrap gap-2">
              {regions.map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRegion(r)}
                  className={`px-4 py-2 text-sm uppercase tracking-wide border transition-all duration-200 cursor-pointer ${
                    activeRegion === r
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-700 border-neutral-300 hover:border-black"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">Тип отдыха</p>
            <div className="flex flex-wrap gap-2">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveType(t)}
                  className={`px-4 py-2 text-sm uppercase tracking-wide border transition-all duration-200 cursor-pointer ${
                    activeType === t
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-700 border-neutral-300 hover:border-black"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">
              Бюджет до: <span className="text-black font-semibold">{maxPrice.toLocaleString("ru-RU")} ₽</span>
            </p>
            <input
              type="range"
              min={50000}
              max={250000}
              step={5000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-black"
            />
            <div className="flex justify-between text-xs text-neutral-400 mt-1">
              <span>50 000 ₽</span>
              <span>250 000 ₽</span>
            </div>
          </div>
        </div>

        {/* Карточки туров */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-neutral-400">
            <Icon name="SearchX" size={48} className="mx-auto mb-4 opacity-40" />
            <p className="text-lg">Туров не найдено — попробуйте изменить фильтры</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tour) => (
              <div
                key={tour.id}
                className="group bg-white border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative overflow-hidden h-52">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {tour.tag && (
                    <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 uppercase tracking-wide">
                      {tour.tag}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wide mb-2">
                    <Icon name="MapPin" size={12} />
                    {tour.region} · {tour.type}
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">{tour.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-neutral-500 mb-4">
                    <Icon name="Clock" size={14} />
                    {tour.days} дней
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-neutral-400">от</span>
                      <span className="text-xl font-bold text-neutral-900 ml-1">
                        {tour.price.toLocaleString("ru-RU")} ₽
                      </span>
                    </div>
                    <button className="bg-black text-white px-4 py-2 text-xs uppercase tracking-wide hover:bg-neutral-800 transition-colors duration-200 cursor-pointer">
                      Забронировать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
