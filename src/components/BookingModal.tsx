import { useState } from "react";
import Icon from "@/components/ui/icon";

interface BookingModalProps {
  tourName: string;
  onClose: () => void;
}

const BOOKING_URL = "https://functions.poehali.dev/83b6ab46-650c-487a-a313-9d71d174ad12";

export default function BookingModal({ tourName, onClose }: BookingModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(BOOKING_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, tour: tourName, comment }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-black transition-colors cursor-pointer"
        >
          <Icon name="X" size={20} />
        </button>

        {status === "success" ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="mx-auto mb-4 text-green-600" />
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">Заявка отправлена!</h3>
            <p className="text-neutral-500">Мы свяжемся с вами в ближайшее время.</p>
            <button
              onClick={onClose}
              className="mt-6 bg-black text-white px-6 py-2 uppercase text-sm tracking-wide hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Бронирование</p>
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">{tourName}</h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs uppercase tracking-wide text-neutral-500 block mb-1">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Иванов"
                  className="w-full border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-neutral-500 block mb-1">
                  Телефон *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-neutral-500 block mb-1">
                  Комментарий
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Пожелания, даты, количество человек..."
                  rows={3}
                  className="w-full border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-red-500 text-sm">Ошибка отправки. Попробуйте позже.</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-black text-white py-3 uppercase text-sm tracking-wide hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50"
              >
                {status === "loading" ? "Отправляем..." : "Отправить заявку"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
