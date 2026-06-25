import { createClient } from "@/lib/supabase/server"
import TogglePaymentButton from "./TogglePaymentButton"
import EditPaymentForm from "./EditPaymentForm"

const typeLabel: Record<string, string> = {
  pix: "Pix",
  boleto: "Boleto Bancário",
  credit_card: "Cartão de Crédito",
  debit_card: "Cartão de Débito",
}

const typeColor: Record<string, string> = {
  pix: "text-green-400 bg-green-600/10",
  boleto: "text-yellow-400 bg-yellow-600/10",
  credit_card: "text-blue-400 bg-blue-600/10",
  debit_card: "text-purple-400 bg-purple-600/10",
}

export default async function AdminPayments() {
  const supabase = await createClient()
  const { data: methods } = await supabase.from("payment_methods").select("*").order("created_at")

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Formas de Pagamento</h1>
        <p className="text-white/30 text-sm mt-1">Configure as opções de pagamento da loja</p>
      </div>

      <div className="grid gap-4">
        {methods?.map((m) => (
          <div key={m.id} className="bg-[#111] border border-white/5 p-5">
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <h3 className="text-white font-bold text-sm">{m.name}</h3>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 ${typeColor[m.type] ?? "text-white/40 bg-white/5"}`}>
                    {typeLabel[m.type] ?? m.type}
                  </span>
                  <TogglePaymentButton id={m.id} isActive={m.is_active} />
                </div>
                <EditPaymentForm method={m} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
