import Camera from "@/components/Camera";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center sm:items-start mt-[-96px]">
        <h1 className="w-full text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-8 text-center">
          Pokedex
        </h1>

        <Camera />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-xs lg:text-sm text-white/70 tracking-tight">
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://krishnanand-yadav-portfolio.vercel.app/"
            target="_blank"
            className="font-semibold text-white/85 hover:text-white transition-colors"
          >
            Krishnanand Yadav
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
