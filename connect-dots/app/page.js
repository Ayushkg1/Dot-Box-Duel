'use client'

import styles from "./page.module.css";
import React, {useState, useRef} from "react";
import { connectWithSocket, updateState, joinRoom } from "./services";


export default function Home() {
  const num_of_dots = 168, row = 7, col = 24, obj={r:false, u:false, d:false, l:false, active:false, player:0};

  let init_dots = [], joined_room = {}, input_room = ""; for(let i=0; i<num_of_dots; i++){ init_dots.push( {...obj} ) };

  let no_swap = false, dots_to_set = {};

  const [dots, setDots] = useState(init_dots);
  const [player, setPlayer] = useState(-1);
  const [curr_player, setCurrPlayer] = useState(1);
  const [joinedRoom, setJoinedRoom] = useState(false);

  const start_id    = useRef(-1);
  const end_id      = useRef(-1);
  const socket      = useRef(null);
  const room_name   = useRef(null);

  const swap = () => { let tmp = start_id.current; start_id.current = end_id.current; end_id.current = tmp; };

  const handleStart = (e) => {
    let target = e.currentTarget.id;
    setActive(target.substr(4), "st");
  };

  const handleEnd = (e) => {
    let target = e.currentTarget.id;
    setActive(target.substr(4), "en");
  }

  const handleRoomJoining = () => {
    if( input_room.length < 4 ){
      alert("Room name length should be atleast of 4 letters.");
    }else{
      joinRoom(input_room, dots, setCurrPlayer, setJoinedRoom, setDots, setPlayer);
    }
  }

  const handleRoomLeaving = () => {
    localStorage.removeItem('room');
    localStorage.removeItem('player');
    setJoinedRoom(false);
  }

  React.useEffect( () => {
    socket.current    = socket.current ? socket.current : connectWithSocket();
    input_room        = localStorage.getItem("room") || "";
    if( localStorage.getItem('player') && player == -1 ){
      setPlayer(localStorage.getItem('player'));
    }
    input_room ? handleRoomJoining() : 0;
    console.log('hello hello useEffect');
  }, []);

  console.log('current player --> ', curr_player);

  const checkBox = (align) => {
    let bonus_chance = false;
    if( align == "h" ){
      if( start_id.current < (num_of_dots - col) && dots_to_set[start_id.current].d && dots_to_set[start_id.current + col].r && dots_to_set[end_id.current].d ){
        dots_to_set[start_id.current].player = curr_player;
        bonus_chance = true;
      }
      if( start_id.current >= col && dots_to_set[start_id.current].u && dots_to_set[start_id.current - col].r && dots_to_set[end_id.current].u ){
        dots_to_set[start_id.current - col].player = curr_player;
        bonus_chance = true;
      }
    }
    else{
      if( ( start_id.current - col + 1 ) % col != 0 && dots_to_set[start_id.current].r && dots_to_set[start_id.current + 1].d && dots_to_set[end_id.current].r ){
        dots_to_set[start_id.current].player = curr_player;
        bonus_chance = true;
      }
      if( ( start_id.current ) % col != 0 && dots_to_set[start_id.current].l && dots_to_set[start_id.current - 1].d && dots_to_set[end_id.current].l ){
        dots_to_set[start_id.current - 1].player = curr_player;
        bonus_chance = true;
      }
    }     
    bonus_chance ? no_swap = true : no_swap = false;
  }

  const setActive = (id, pos) => {
    id = parseInt(id);
    if( isNaN(id) || id < 0 || id >= num_of_dots ) return;
    pos == "st" ? start_id.current = id : end_id.current = id;
    dots_to_set = {...dots}; 
    // let new_dots = JSON.parse(JSON.stringify(dots));
    dots_to_set[id].active = true;
    if ( pos == "en" && validate()){
      for(let i=0; i<num_of_dots; i++) dots_to_set[i].active = false;
      let curr_p = no_swap ? curr_player : curr_player ^ 3;
      curr_p == curr_player ? 0 : setCurrPlayer(curr_p);
      socket.current ? updateState(dots_to_set, curr_p) : 0;
    }
    if( pos != "en" || no_swap ){
      setDots(dots_to_set);
    }
  }



  const validate = () => {
    start_id.current < end_id.current ? 0 : swap();
    if ( ( start_id.current - col + 1 ) % col != 0 && end_id.current == start_id.current + 1 && !dots_to_set[start_id.current].r && !dots_to_set[end_id.current].l){
      dots_to_set[start_id.current].r = true; dots_to_set[end_id.current].l = true;
      checkBox("h");
      return true;
    }
    if ( start_id.current < (num_of_dots - col) && end_id.current == start_id.current + col && !dots_to_set[start_id.current].d && !dots_to_set[end_id.current].u ){
      dots_to_set[start_id.current].d = true; dots_to_set[end_id.current].u = true;
      checkBox("v");
      return true;
    }
    return false;
  }

  let dots_template = [];
  for (let index = 0; index < num_of_dots; index++) {
    dots_template.push(
      <div key={index} id={"dot-" + index} onTouchStart={handleStart} onTouchEnd={handleEnd} onMouseDown={handleStart} onMouseUp={handleEnd} 
      className={`${styles.dot_area} ${ player == curr_player ? styles.enable_pointer : styles.disable_pointer }`}>
        <div id={"dot--" + index} className={dots[index].active ? styles.active_dot : styles.inactive_dot}></div>
        { dots[index].u ? <div className={styles.path_up}></div> : null}
        { dots[index].r ? <div className={styles.path_right}></div> : null}
        { dots[index].d ? <div className={styles.path_down}></div> : null}
        { dots[index].l ? <div className={styles.path_left}></div> : null}
        { dots[index].player ? <div className={styles.player_symbol}>{dots[index].player}</div> : null}
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Dot Box Duel</p>
        <div>
          <span>Made by Ayush</span>
        </div>
      </div>
      {
        joinedRoom ? 
        <div className={styles.room_part}>
          <button className={styles.join_room} onClick={handleRoomLeaving}>Leave Room</button>
        </div>  
        :
        <div className={styles.room_part}>
          <input type="text" id="input" onChange={(e)=> input_room = e.target.value} className={styles.input_field} placeholder="Enter room name" ></input>
          <button className={styles.join_room} onClick={handleRoomJoining}>Join Room</button>
        </div>
      }
      <div className={`${styles.center} ${ player == curr_player ? styles.no_wait : styles.wait }`}>{dots_template}</div>
      <div className={styles.player}>Player : {player}</div>
    </main>
  );
}




//  hold game state
//  switch player
//  disable the player