import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ConditionalNavigation } from "@/components/conditional-navigation";

export const metadata: Metadata = {
  title: "SK AI — независимый (цифровой) член СД",
  description:
    "SK AI — система искусственного интеллекта для поддержки принятия решений советом директоров",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className="antialiased bg-[linear-gradient(180deg,#EFEFEF_0%,#D7CDAD_100%)]">
        <Providers>
          <main className="min-h-screen py-6">
            {/* БЕЛАЯ ПАПКА */}
            <div className="relative mx-auto w-[min(1440px,92vw)]">
              <div className="relative rounded-[36px] bg-white ring-1 ring-black/5 shadow-[0_60px_120px_-60px_rgba(15,23,42,0.35)]">
                {/* УШИ */}
                <div className="pointer-events-none absolute -top-12 left-0 h-24 w-80 rounded-tl-lg rounded-tr-[100px] bg-white" />
                <div className="pointer-events-none absolute -top-12 right-0 h-24 w-80 rounded-tl-[100px] rounded-tr-lg bg-white" />

              {/* ===== ДЕКОРАТИВНЫЕ ЛИНИИ НА ФОНЕ ===== */}
                <div className="pointer-events-none absolute inset-0 z-[5] rounded-[36px] overflow-hidden">
                  {/* левый слой с линиями */}
                  <div
                    className="
                      absolute left-0 top-0 h-full w-[58%]
                      bg-[url('/Group.png')] bg-no-repeat
                      bg-[length:880px_auto] bg-[position:40px_-60px]
                      opacity-80
                      [mask-image:linear-gradient(180deg,rgba(0,0,0,.8),rgba(0,0,0,0))]
                    "
                  />
                </div>
                {/* РЯД НАВИГАЦИИ: СИДИТ НА КРОМКЕ МЕЖДУ «УШАМИ» */}
                <div className="absolute inset-x-0 -top-10 z-20 px-8">
                  <div className="mx-auto flex h-10 max-w-[min(1200px,92vw)] items-center justify-between">
                    <ConditionalNavigation />
                  </div>
                </div>

                {/* Контент — отступ сверху, чтобы не перекрывал nav */}
                <div className="relative z-10 px-6 pt-12 pb-8">
                  {children}
                </div>
              </div>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
