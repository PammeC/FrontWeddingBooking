import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const decorationServices = [
  {
    id: 1,
    name: "Decoración Romántica",
    description: "Flores, velas y telas para un ambiente romántico",
    price: "$1500",
  },
  {
    id: 2,
    name: "Estilo Rústico",
    description: "Elementos naturales y vintage para un toque campestre",
    price: "$1800",
  },
  {
    id: 3,
    name: "Glamour y Elegancia",
    description: "Cristales, luces y detalles dorados para un ambiente sofisticado",
    price: "$2200",
  },
  {
    id: 4,
    name: "Minimalista Moderno",
    description: "Diseño limpio y contemporáneo con toques geométricos",
    price: "$1600",
  },
]

export default function DecorationServices() {
  return (
    <AccordionItem value="decoration">
      <AccordionTrigger>Servicios de Decoración</AccordionTrigger>
      <AccordionContent>
        <div className="grid gap-4 md:grid-cols-2">
          {decorationServices.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-bold mb-2">{service.price}</p>
                <Button>Reservar</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

