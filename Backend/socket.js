import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { sendMessageController } from "./controllers/messages.js";
import redis from "./redisClient.js"; // ← client singleton esistente
import { getSessionId } from "./utils/mailer/session.js";

let io;

export const initSocket = async (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: [
                process.env.FRONTEND_HOST,
                "https://idea-sable.vercel.app",
            ],
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    //L'adattatore Redise si occupa di recapitare il messaggio all'utente anche se questo si trova inun altro server diverso
    const pubClient = redis;               
    const subClient = redis.duplicate();        

    io.adapter(createAdapter(pubClient, subClient));


    io.use(async (socket, next) => {
        try {
            const sessionId = socket.handshake.auth.sessionId;
            if (!sessionId) {
                return next(new Error("Unauthenticated"));
            }

            const session = await getSessionId(sessionId);
            if (!session) {
                return next(new Error("Unauthenticated"));
            }

            socket.userId = session.userId;

            socket.join(session.userId);
            next();
        } catch (err) {

            next(err);
        }
    });

    io.on("connection", (socket) => {

        socket.on("send_message", async (data) => {
            try {
                await sendMessageController(socket, data);
            } catch (err) {
                console.error("Errore send_message:", err);
            }
        });

        socket.on("disconnect", () => {
            console.log("❌ Utente disconnesso:", socket.userId);
        });
    });
};

export const getIo = () => {
    if (!io) throw new Error("Socket.io non inizializzato!");
    return io;
};