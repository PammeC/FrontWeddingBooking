import { Accordion } from "@/components/ui/accordion"
import CateringServices from "./CateringServices"
import DecorationServices from "./DecorationServices"
import MusicServices from "./MusicServices"
import PhotographyServices from "./PhotographyServices"

export default function WeddingServiceBooking() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <CateringServices />
      <DecorationServices />
      <MusicServices />
      <PhotographyServices />
    </Accordion>
  )
}

