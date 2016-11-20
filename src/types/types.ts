interface Artist  extends Item  {
    albums: Album[],
}
interface Album extends Item {
    tracks: Track[],
}
interface Track {
    name: string,
    duration: number,
    isActive: boolean,
    id: string,
}

interface Item {
    id: string,
    name: string,
    image: string,
}