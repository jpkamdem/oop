import { api } from "./src/api.ts";

type Album = {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

async function get() {
  const albums = await api.get<Album[]>("https://jsonplaceholder.typicode.com/photos")
  console.log(albums)
}

get()
