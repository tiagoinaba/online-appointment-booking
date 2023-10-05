import DateTimePickerDemo from "@/components/DateTimePickerDemo";
import ClientLayout from "@/components/layouts/ClientLayout";
import { CheckCircle } from "lucide-react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>TimeKeeper</title>
        <meta
          name="description"
          content="Aplicativo de agendamento de horários."
        />
      </Head>
      <ClientLayout>
        <main className="text-center">
          <header className="flex flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-200 via-red-200 to-white to-[50%] bg-[length:100%_125%] px-5 py-36 sm:px-10 lg:gap-8">
            <h1 className="text-lg font-bold sm:text-2xl md:text-3xl lg:text-4xl">
              <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                Simplifique
              </span>{" "}
              seus agendamentos!
            </h1>
            <h2 className="text-md sm:text-lg lg:text-2xl">
              Faça sua primeira reserva abaixo com apenas alguns cliques.
            </h2>
            <div className="flex justify-center gap-4">
              <Link
                rel="stylesheet"
                href="https://wa.me/+5516997082400"
                target="_blank"
                className="rounded bg-red-600 px-2 py-1 text-white hover:bg-red-500"
              >
                Comece já!
              </Link>
              <Link
                href="https://wa.me/+5516997082400"
                target="_blank"
                className="relative overflow-visible rounded border-2 px-2 py-1 text-sm text-black"
              >
                Saiba mais
              </Link>
            </div>
          </header>
          <div className="bg-[radial-gradient(ellipse_at_center_right,_var(--tw-gradient-stops))] from-indigo-200 via-red-200 to-white to-[50%] px-5">
            <section className="flex flex-col items-center justify-center gap-4 overflow-x-hidden pb-20 lg:gap-8">
              <h2 className="bg-gradient-to-r from-pink-500 to-red-400 bg-clip-text text-lg font-bold text-transparent">
                Demonstração
              </h2>
              <h3 className="relative z-10">
                Selecione um dia e horário e clique em Reservar. Simples assim!
              </h3>
              <DateTimePickerDemo />
            </section>

            <section className="flex flex-col items-center justify-center gap-4 overflow-x-hidden  pb-20 lg:gap-8">
              <h2 className="bg-gradient-to-r from-pink-500 to-red-400 bg-clip-text text-lg font-bold text-transparent">
                Como funciona
              </h2>
              <div className="card group flex w-full max-w-[400px] flex-col items-center gap-4 rounded-xl border border-purple-500 py-8">
                <h2 className="text-lg font-bold text-black transition duration-300 group-hover:text-white">
                  Standard
                </h2>
                <p className="text-2xl font-bold text-zinc-600 transition duration-300 group-hover:text-white">
                  R$50
                  <span className="text-base font-normal">/mês</span>
                </p>
                <div className="flex flex-col items-baseline gap-2 px-4 text-left text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-600 transition duration-300 group-hover:text-green-300" />
                    <span className="transition duration-300 group-hover:text-white">
                      Ofereça múltiplos serviços;
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-600 transition duration-300 group-hover:text-green-300" />
                    <span className="transition duration-300 group-hover:text-white">
                      Personalize seus dias e horários;
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-600 transition duration-300 group-hover:text-green-300" />
                    <span className="transition duration-300 group-hover:text-white">
                      Receba diretamente pelo MercadoPago;
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-600 transition duration-300 group-hover:text-green-300" />
                    <span className="transition duration-300 group-hover:text-white">
                      Painel de administrador fácil de navegar;
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <section className="flex flex-col items-center gap-4 px-10 pb-20 lg:gap-8">
            <h2 className="bg-gradient-to-r from-pink-500 to-red-400 bg-clip-text text-lg font-bold text-transparent">
              Contrate já
            </h2>
            <p className="text-center">
              Para seus agendamentos não recorrentes, use{" "}
              <span className="inline-block -skew-x-12 bg-gradient-to-r from-pink-500 via-red-400 via-[50%] to-black to-[50%] bg-[length:200%_100%] bg-clip-text bg-[position:100%_0%] text-transparent transition-all duration-500 hover:bg-[position:0_0]">
                TimeKeeper
              </span>
            </p>
            <Link
              rel="stylesheet"
              href="https://wa.me/+5516997082400"
              target="_blank"
              className="rounded bg-red-600 px-2 py-1 text-white hover:bg-red-500"
            >
              Contato
            </Link>
          </section>
        </main>
      </ClientLayout>
    </>
  );
}
