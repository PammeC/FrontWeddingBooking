import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const photographyServices = [
  { id: 1, name: "Paquete Básico", description: "Cobertura de la ceremonia y recepción", price: "$1200" },
  { id: 2, name: "Paquete Completo", description: "Incluye sesión pre-boda y álbum de lujo", price: "$2500" },
  { id: 3, name: "Fotógrafo y Videógrafo", description: "Captura cada momento en foto y video", price: "$3000" },
  { id: 4, name: "Cabina de Fotos", description: "Diversión adicional para tus invitados", price: "$500" },
]

export default function PhotographyServices() {
  return (
    <AccordionItem value="photography">
      <AccordionTrigger>Servicios de Fotografía</AccordionTrigger>
      <AccordionContent>
        <div className="grid gap-4 md:grid-cols-2">
          {photographyServices.map((service) => (
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

