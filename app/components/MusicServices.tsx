import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const musicServices = [
  { id: 1, name: "DJ Profesional", description: "Música variada para todos los gustos", price: "$800" },
  { id: 2, name: "Banda en Vivo", description: "Música en directo para animar la fiesta", price: "$1500" },
  { id: 3, name: "Cuarteto de Cuerdas", description: "Música clásica para la ceremonia", price: "$1000" },
  { id: 4, name: "Solista Acústico", description: "Perfecto para la cena o momentos más íntimos", price: "$600" },
]

export default function MusicServices() {
  return (
    <AccordionItem value="music">
      <AccordionTrigger>Servicios de Música</AccordionTrigger>
      <AccordionContent>
        <div className="grid gap-4 md:grid-cols-2">
          {musicServices.map((service) => (
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

