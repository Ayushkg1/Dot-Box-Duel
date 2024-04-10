import { io } from "socket.io-client";

const socket_server = 'http://localhost:5000';
let socket = null, isRoomJoined, isDotsSet, player_setter, player_turn;

const connectWithSocket = async () => {
    socket = io(socket_server);
    socket.on("connect", () => {
        console.log(socket.id)
        return socket;
    });
    listenResponse();
    roomResponse();
    updateResponse();
};

const updateState = (data, player) => {
    if( socket ){
        let room = localStorage.getItem("room") || "";
        if( room ) socket.emit("update-state", JSON.stringify(data), player.toString(), room);
    }
}

const joinRoom = (room_name, game_state, curr_player, setJoinedRoom, setDots, setPlayer) => {
    isRoomJoined  = setJoinedRoom;
    isDotsSet     = setDots;
    player_setter = setPlayer;
    player_turn   = curr_player;
    if( socket ){
        socket.emit("join-room", room_name, JSON.stringify(game_state), 1);
    }
}

const roomResponse = () => {
    if( socket ){
        socket.on("room-response", (result, room, game_state, player) => {
            if( result == 'successful' && isRoomJoined ){
                isRoomJoined(true);
                game_state = JSON.parse(game_state);
                isDotsSet(game_state);
                localStorage.setItem('room', room);
                localStorage.getItem('player') ? 0 : player_setter(+player);
                localStorage.getItem('player') ? 0 : localStorage.setItem('player', +player);
            }
            else{
                alert('Error : ', result);
            }
        })
    }
}

const updateResponse = () => {
    if( socket ){
        socket.on("update-response", (result, game_state, curr_player) => {
            debugger
            if( result == 'successful' ){
                game_state = JSON.parse(game_state);
                isDotsSet(game_state);
                player_turn(+curr_player);
            }else{
                alert('Some error occured ', result);
            }
        })
    }
}

const listenResponse = () => {
    if( socket ){
        socket.on("response", (result, msg) => {
            alert(result, ' : ', msg);
        })
    }
}

export{ connectWithSocket, updateState, joinRoom };