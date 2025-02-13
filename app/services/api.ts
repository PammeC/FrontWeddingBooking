import { GET_CATERING_SERVICES, GET_MUSIC_SERVICES } from "../graphql/queries"

export async function fetchCateringServices() {
  try {
    const response = await fetch("http://44.208.178.247:8072/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_CATERING_SERVICES,
      }),
    })

    const data = await response.json();


    console.log("Response from API:", data); // Verificar la respuesta en consola

    if (!data.data || !data.data.getAllCatering) {
      console.error("Error: Datos de catering no disponibles");
      return [];
    }



    return data.data.getAllCatering
  } catch (error) {
    console.error("Error fetching catering services:", error)
    return []
  }
}

export async function fetchMusicServices() {
  try {
    const response = await fetch("http://54.173.57.181:8062/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            getAllMusic {
              id_music
              name
              price
            }
          }
        `,
      }),
    });

    const data = await response.json();
    console.log("Response from API (Music):", data); // LOG IMPORTANTE

    if (!data.data || !data.data.getAllMusic) {
      console.error("Error: Datos de música no disponibles");
      return [];
    }

    return data.data.getAllMusic;
  } catch (error) {
    console.error("Error fetching music services:", error);
    return [];
  }
}


export async function fetchDecorationServices() {
  try {
    const response = await fetch("http://44.212.202.69:8042/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            getAllDecoration {
              id_decoration
              name
              price
            }
          }
        `,
      }),
    });

    const data = await response.json();
    console.log("Response from API (Decoration):", data); // LOG IMPORTANTE

    if (!data.data || !data.data.getAllDecoration) {
      console.error("Error: Datos de decoration no disponibles");
      return [];
    }

    return data.data.getAllDecoration;
  } catch (error) {
    console.error("Error fetching decoration services:", error);
    return [];
  }
}


export async function fetchPhotographyServices() {
  try {
    const response = await fetch("http://3.229.141.153:8052/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            getAllPhotography {
              id_photograhy
              name
              price
            }
          }
        `,
      }),
    });

    const data = await response.json();
    console.log("Response from API (Photography):", data); // LOG IMPORTANTE

    if (!data.data || !data.data.getAllPhotography) {
      console.error("Error: Datos de photography no disponibles");
      return [];
    }

    return data.data.getAllPhotography;
  } catch (error) {
    console.error("Error fetching photography services:", error);
    return [];
  }
}
