"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  fetchCateringServices,
  fetchMusicServices,
  fetchDecorationServices,
  fetchPhotographyServices
} from "./services/api";

import Link from "next/link"
import { useAuth } from "./utils/auth"

// **Definir las interfaces de los servicios**
interface CateringService {
  id_catering: string;
  name: string;
  price: number;
}

interface MusicService {
  id_music: string;
  name: string;
  price: number;
}

interface DecorationService {
  id_decoration: string;
  name: string;
  price: number;
}

interface PhotographyService {
  id_photograhy: string;
  name: string;
  price: number;
}

export default function BookingForm() {
  const router = useRouter();
  
  const user = useAuth()

  // **Estados para almacenar los servicios**
  
  const [cateringServices, setCateringServices] = useState<CateringService[]>([]);
  const [musicServices, setMusicServices] = useState<MusicService[]>([]);
  const [decorationServices, setDecorationServices] = useState<DecorationService[]>([]);
  const [photographyServices, setPhotographyServices] = useState<PhotographyService[]>([]);

  const [loading, setLoading] = useState({
    catering: true,
    music: true,
    decoration: true,
    photography: true,
  });

  const [formData, setFormData] = useState({
    clientName: "",
    eventDate: "",
    location: "",
    selectedServices: {
      catering: "",
      music: "",
      decoration: "",
      photography: "",
    },
  });

  useEffect(() => {
    const loadServices = async () => {
      try {
        // Cargar Catering Services
        const cateringData = await fetchCateringServices();
        console.log("Catering Services in useEffect:", cateringData);
        setCateringServices(cateringData);
        setLoading((prev) => ({ ...prev, catering: false }));

        // Cargar Music Services
        const musicData = await fetchMusicServices();
        console.log("Music Services in useEffect:", musicData);
        setMusicServices(musicData);
        setLoading((prev) => ({ ...prev, music: false }));

        // Cargar Decoration Services
        const decorationData = await fetchDecorationServices();
        console.log("Decoration Services in useEffect:", decorationData);
        setDecorationServices(decorationData);
        setLoading((prev) => ({ ...prev, decoration: false }));

        // Cargar Photography Services
        const photographyData = await fetchPhotographyServices();
        console.log("Photography Services in useEffect:", photographyData);
        setPhotographyServices(photographyData);
        setLoading((prev) => ({ ...prev, photography: false }));

      } catch (error) {
        console.error("Error loading services:", error);
        setLoading({ catering: false, music: false, decoration: false, photography: false });
      }
    };

    loadServices();
  }, []);

  const handleServiceSelect = (service: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: {
        ...prev.selectedServices,
        [service]: value,
      },
    }));
  };

  const handleSubmit = () => {
    let total = 0;

    // Calcular el total para cada servicio seleccionado
    const selectedCatering = cateringServices.find(
      (service) => service.id_catering === formData.selectedServices.catering
    );
    if (selectedCatering) {
      total += selectedCatering.price;
    }

    const selectedMusic = musicServices.find(
      (service) => service.id_music === formData.selectedServices.music
    );
    if (selectedMusic) {
      total += selectedMusic.price;
    }

    const selectedDecoration = decorationServices.find(
      (service) => service.id_decoration === formData.selectedServices.decoration
    );
    if (selectedDecoration) {
      total += selectedDecoration.price;
    }

    const selectedPhotography = photographyServices.find(
      (service) => service.id_photograhy === formData.selectedServices.photography
    );
    if (selectedPhotography) {
      total += selectedPhotography.price;
    }

    // Crear el objeto de reserva
    const booking = {
      ...formData,
      total,
      services: [
        ...(selectedCatering ? [{ category: "catering", name: selectedCatering.name, price: selectedCatering.price }] : []),
        ...(selectedMusic ? [{ category: "music", name: selectedMusic.name, price: selectedMusic.price }] : []),
        ...(selectedDecoration ? [{ category: "decoration", name: selectedDecoration.name, price: selectedDecoration.price }] : []),
        ...(selectedPhotography ? [{ category: "photography", name: selectedPhotography.name, price: selectedPhotography.price }] : []),
      ],
    };

    localStorage.setItem("currentBooking", JSON.stringify(booking));
    router.push("/booking-summary");
  };

  if (!user) {
    return null // o un spinner de carga
  }


  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Servicios para tu Boda</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Información del Cliente</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Label htmlFor="clientName">Nombre del Cliente</Label>
            <Input id="clientName" value={formData.clientName} onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} />

            <Label htmlFor="eventDate">Fecha del Evento</Label>
            <Input id="eventDate" type="date" value={formData.eventDate} onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })} />

            <Label htmlFor="location">Ubicación</Label>
            <Input id="location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {[
            { category: "catering", services: cateringServices, loading: loading.catering, label: "Catering" },
            { category: "music", services: musicServices, loading: loading.music, label: "Música" },
            { category: "decoration", services: decorationServices, loading: loading.decoration, label: "Decoración" },
            { category: "photography", services: photographyServices, loading: loading.photography, label: "Fotografía" }
          ].map(({ category, services, loading, label }) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle>{label}</CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={(value) => handleServiceSelect(category, value)} value={formData.selectedServices[category]} disabled={loading}>
                  <SelectTrigger>
                    <SelectValue placeholder={loading ? "Cargando..." : `Selecciona ${label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id_catering || service.id_music || service.id_decoration || service.id_photograhy} value={service.id_catering || service.id_music || service.id_decoration || service.id_photograhy}>
                        {service.name} - ${service.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button className="w-full" size="lg" onClick={handleSubmit}>Guardar Reserva</Button>

        <Button
          variant="outline"
          className="mt-4 w-full"
          onClick={() => {
            localStorage.removeItem("currentUser")
            router.push("/login")
          }}
        >
          Cerrar Sesión
        </Button>
      
      </div>
    </div>
  );
}
