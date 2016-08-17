import Storage from './../common/localStorage';

class PlaylistsModel {

    static createPlaylist() {
        var newPlaylist = {name: "new playlist", items: []};
        var newPlaylists = this.playlists;
        newPlaylists.push(newPlaylist);
        this.playlists = newPlaylists;
        this.inform();
    }

    static editPlaylist(playlist, event) {
        if (event) {
            event.stopPropagation();
        }
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

    static addTo(event, playlist, item, type) {
        event.stopPropagation();
        item.type = type;
        playlist.items.push(item);
        this.inform();
    }

    static removeItemFromCurrentPlaylist(item) {
        this.currentPlaylist.items.splice(_.indexOf(this.currentPlaylist.items, item), 1);
        this.inform();
    }

    static selectPlaylist(playlist) {
        if (this.currentPlaylist) {
            this.currentPlaylist.isActive = false;
        }

        this.currentPlaylist = playlist;

        if (this.currentPlaylist) {
            this.currentPlaylist.isActive = true;
        }
        this.inform();
    }

    static getPlaylists() {
        return this.playlists;
    }

    static getSelectedPlaylists() {
        return this.currentPlaylist;
    }

    static subscribe(onChange) {
        this.onChanges.push(onChange);
    }

    static inform() {
        Storage.store('playlists', this.playlists);
        this.onChanges.forEach(cb => cb());
    }

}


//set binding to public methods
//avoiding using bind from clients onClick={PlaylistsModel.createPlaylist.bind(PlaylistsModel)}
//                      and allows onClick={PlaylistsModel.createPlaylist}
//maybe consider using loops to enumerate own static properties
PlaylistsModel.createPlaylist = PlaylistsModel.createPlaylist.bind(PlaylistsModel);


PlaylistsModel.playlists = Storage.store('playlists');

PlaylistsModel.onChanges = [];

export default PlaylistsModel;