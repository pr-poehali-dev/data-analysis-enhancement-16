import Icon from "@/components/ui/icon";

export default function Contacts() {
  return (
    <div id="contact" className="bg-white px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase text-xs tracking-widest text-neutral-500 mb-3">Контакты</p>
        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-12">
          Свяжитесь с нами
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <a
            href="tel:+79141793873"
            className="group flex flex-col gap-4 p-8 border border-neutral-200 hover:border-black transition-colors duration-300"
          >
            <div className="w-12 h-12 bg-black flex items-center justify-center">
              <Icon name="Phone" size={20} className="text-white" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Телефон</p>
              <p className="text-lg font-bold text-neutral-900 group-hover:underline">
                +7 (914) 179-38-73
              </p>
              <p className="text-sm text-neutral-500 mt-1">Звонки и WhatsApp</p>
            </div>
          </a>

          <a
            href="https://wa.me/79141793873"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-4 p-8 border border-neutral-200 hover:border-black transition-colors duration-300"
          >
            <div className="w-12 h-12 bg-black flex items-center justify-center">
              <Icon name="MessageCircle" size={20} className="text-white" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">WhatsApp</p>
              <p className="text-lg font-bold text-neutral-900 group-hover:underline">
                +7 (914) 179-38-73
              </p>
              <p className="text-sm text-neutral-500 mt-1">Напишите нам прямо сейчас</p>
            </div>
          </a>

          <a
            href="https://t.me/vyacheslav_shishikin"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-4 p-8 border border-neutral-200 hover:border-black transition-colors duration-300"
          >
            <div className="w-12 h-12 bg-black flex items-center justify-center">
              <Icon name="Send" size={20} className="text-white" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Telegram</p>
              <p className="text-lg font-bold text-neutral-900 group-hover:underline">
                @vyacheslav_shishikin
              </p>
              <p className="text-sm text-neutral-500 mt-1">Быстрый ответ в мессенджере</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
