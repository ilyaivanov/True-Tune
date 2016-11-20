interface Album{
    name: string,
    image: string,
    tracks: Track[],
}
interface Track{
    name: string,
    duration: number,
    isActive: boolean,
    id: string,
}