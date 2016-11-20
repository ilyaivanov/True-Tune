interface Artist {
    id: string,
    name: string,
    image: string,
    albums: Album[],
}
interface Album {
    id: string,
    name: string,
    image: string,
    tracks: Track[],
}
interface Track {
    name: string,
    duration: number,
    isActive: boolean,
    id: string,
}