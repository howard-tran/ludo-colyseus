import { LudoChat } from './rooms/chat/LudoChat';
import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";
import { LudoGameplay } from "./rooms/gameplay/LudoGamePlay";


export default Arena({
  getId: () => "LudoGame Backend Socket",

  initializeGameServer: (gameServer) => {
    gameServer.define("gameplay", LudoGameplay);
    gameServer.define("chat", LudoChat)
  },

  initializeExpress: (app) => {
    app.get("/", (req, res) => {
      res.send("It's time to kick ass and chew bubblegum!");
    });

    // monitor room
    app.use("/colyseus", monitor());
  },

  beforeListen: () => {
  },
});
