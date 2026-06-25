import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import TogglePaymentButton from "./TogglePaymentButton"
import EditPaymentForm from "./EditPaymentForm"

const typeLabel: Record<string, string> = {
  pix: "Pix",
  boleto: "Boleto Bancário",
  credit_card: "Cartão de Crédito",
  debit_card: "Cartão de Débito",
}

export default async function AdminPayments() {
  const supabase = await createClient()
  const { data: methods } = await supabase.from("payment_methods").select("*").order("created_at")

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Formas de Pagamento</h1>
        <p className="text-muted-foreground text-sm mt-1">Configure as opções de pagamento da loja</p>
      </div>

      <div className="flex flex-col gap-4">
        {methods?.map((m) => (
          <Card key={m.id}>
            <CardHeader className="px-5 pt-4 pb-3 flex flex-row items-center gap-3 space-y-0">
              <div className="flex-1 flex items-center gap-2 flex-wrap">
                <CardTitle className="text-sm font-semibold">{m.name}</CardTitle>
                <Badge variant="secondary" className="text-[10px]">{typeLabel[m.type] ?? m.type}</Badge>
              </div>
              <TogglePaymentButton id={m.id} isActive={m.is_active} />
            </CardHeader>
            <Separator />
            <CardContent className="px-5 py-4">
              <EditPaymentForm method={m} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
