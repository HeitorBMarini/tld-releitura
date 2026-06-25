import { Share2, Camera, Tv } from "lucide-react"

const links = {
  Empresa: ["Sobre nós", "Certificações", "Registro de Produto", "Riders Pro — Fidelidade", "Carreiras", "Afiliados", "Login para Revendedores"],
  Suporte: ["Fale Conosco", "Consulta para Revendedores", "Manuais e Catálogos", "Pedidos e Envio", "Garantia e Devoluções", "Guia de Tamanhos", "Perguntas Frequentes"],
  "Minha Conta": ["Minha Conta", "Lojas Físicas", "Distribuidores Internacionais", "Revendedores Online", "Cartão Presente"],
}

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/5">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <a
              href="/"
              className="text-3xl text-white block mb-4"
              style={{ fontFamily: "var(--font-family-display, 'Bebas Neue', sans-serif)", letterSpacing: "0.05em" }}
            >
              RIDERS
            </a>
            <p className="text-white/30 text-xs leading-relaxed mb-6">
              Equipamentos de motorsport para quem leva a pilotagem a sério.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 border border-white/10 hover:border-red-600 flex items-center justify-center text-white/30 hover:text-red-500 transition-all">
                <Camera size={14} />
              </a>
              <a href="#" className="w-8 h-8 border border-white/10 hover:border-red-600 flex items-center justify-center text-white/30 hover:text-red-500 transition-all">
                <Share2 size={14} />
              </a>
              <a href="#" className="w-8 h-8 border border-white/10 hover:border-red-600 flex items-center justify-center text-white/30 hover:text-red-500 transition-all">
                <Tv size={14} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-4">{group}</h4>
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-xs text-white/30 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">© 2025 Riders Co. Todos os direitos reservados.</p>
          <div className="flex gap-5">
            <a href="#" className="text-white/20 hover:text-white/50 text-xs transition-colors">Termos de Uso</a>
            <a href="#" className="text-white/20 hover:text-white/50 text-xs transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
