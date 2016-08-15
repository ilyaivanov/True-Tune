
class PlaylistsModel {

    static createPlaylist() {
        var newPlaylist = {name: "new playlist", items: []};
        var newPlaylists = this.playlists;
        newPlaylists.push(newPlaylist);
        this.playlists = newPlaylists;

        this.inform();

    }

    static editPlaylist(playlist) {
        playlist.isEditing = true;
        this.inform();
    }

    static stopEditingPlaylist(playlist) {
        console.log(playlist);
        playlist.isEditing = false;
        this.inform();
    }

    static setPlaylistName(playlist, name) {
        playlist.name = name;
        this.inform();
    }

    static addTo(playlist, item) {
        playlist.items.push(item);
        this.inform();
    }

    static selectPlaylist(playlist) {
        this.currentPlaylist = playlist;
        this.inform();
    }

    static getPlaylists(){
        return this.playlists;
    }

    static getSelectedPlaylists(){
        return this.currentPlaylist;
    }

    static subscribe(onChange) {
        this.onChanges.push(onChange);
    }

    static inform() {
        this.onChanges.forEach(cb => cb());
    }


}

PlaylistsModel.playlists = [];

PlaylistsModel.onChanges = [];

export default PlaylistsModel;