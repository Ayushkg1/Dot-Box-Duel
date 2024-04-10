console.log("Server starting...");

const redis = require("redis");

let redis_client;

async function initializeConnectionPool(opts) {

  redis_client = redis.createClient({url: `redis://${opts.host}:${opts.port}`});

  redis_client.on("connect", function () {
    console.log("Connected to Redis");
  });


  redis_client.on("error", function (err) {
    console.log("Redis Error:", err);
  });


  redis_client.on('ready', function () {
    console.log('Redis Connection Ready to use');
  });

  await redis_client.connect();
}

async function connectToRedis() {
  try {
    console.log("starting redis...");
    await initializeConnectionPool({host:"127.0.0.1", port:"6379"});
  } catch (error) {
    console.log(error);
  }
}

connectToRedis();


const io = require('socket.io')(5000, {
    cors : {
        origin: ['http://localhost:3000'],
    },
});

io.on('connection', socket => {
    console.log('socket id --> ', socket.id);

    socket.on("join-room", async (room, game_state, curr_player) => {
      let room_mem_cnt  = await redis_client.get(room) || 0;
      let saved_state   = await redis_client.get('g-'+room);
      let player_turn   = await redis_client.get('p-'+room);
      console.log('cnt ', room_mem_cnt, ' ', socket.id, " --> in room --> ", room, ' curr player ', curr_player, ' game_state ', game_state.length, ' save game bool ', !saved_state, ' save player bool ', !player_turn);
      
      if( (+room_mem_cnt) >= 2 ){
        socket.emit("room-response", "failed", "room has already 2 players");
        return;
      }
      !saved_state ? await redis_client.set('g-'+room, game_state) : 0;
      !player_turn ? await redis_client.set('p-'+room, curr_player) : 0;
      await redis_client.set(room, +room_mem_cnt+1);
      socket.join(room);
      socket.emit("room-response", "successful", room, saved_state || game_state, +room_mem_cnt+1);
      return;
    });

    socket.on("update-state", async (game_state, player, room) => {
        // console.log(data, player);
        await redis_client.set('p-'+room, player);
        await redis_client.set('g-'+room, game_state);

        socket.to(room).emit("update-response", "successful", game_state, player);
    });

    socket.on("disconnecting", async () => {
      console.log('Disconnecting ', socket.rooms); // the Set contains at least the socket ID
      let room = Array.from(socket.rooms).pop();
      console.log('rooms -->  ', socket.rooms);
      if( room != socket.id ){
        let cnt = await redis_client.get(room);
        console.log('cnt  -->>  ', cnt);
        await redis_client.set(room, +cnt-1);
      }
    });
  
    socket.on("disconnect", () => {
      console.log('Disconnect done.', socket.id); // socket.rooms.size === 0
    });

});
