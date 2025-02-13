import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const cateringServices = [
  { id: 1, name: "Buffet Clásico", description: "Una amplia variedad de platos para todos los gustos", price: "$2000" },
  { id: 2, name: "Menú Gourmet", description: "Platos elaborados por chefs de renombre", price: "$3500" },
  { id: 3, name: "Estaciones Temáticas", description: "Diversas estaciones con comida internacional", price: "$2800" },
  { id: 4, name: "Coctelería y Tapas", description: "Perfecto para una recepción más informal", price: "$1800" },
]

export default function CateringServices() {
  return (
    <AccordionItem value="catering">
      <AccordionTrigger>Servicios de Catering</AccordionTrigger>
      <AccordionContent>
        <div className="grid gap-4 md:grid-cols-2">
          {cateringServices.map((service) => (
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

