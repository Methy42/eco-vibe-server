import { WebSocketGateway, WebSocketServer, OnGatewayConnection, ConnectedSocket } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { PlayerService } from "./player/player.service";
import { SocketEventDto } from "./base/socketEvent.dto";
import { PlayerEntity } from "./player/player.entity";
import { JwtService } from "@nestjs/jwt";

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class AppGateway implements OnGatewayConnection {
    constructor(
        private readonly playerService: PlayerService,
        private readonly jwtService: JwtService
    ) { }

    @WebSocketServer()
    server: Server;

    async handleConnection(@ConnectedSocket() socket: Socket) {
        if (socket.handshake.auth && socket.handshake.auth.token) {
            /** to login */
            try {
                const player = await this.jwtService.verifyAsync<PlayerEntity>(socket.handshake.auth.token);

                const token = await this.playerService.login(player);

                socket.send(new SocketEventDto('SocketPlayerLogin', { player: await this.playerService.findOne(player.id), token }));
            } catch (error) {
                socket.send(new SocketEventDto('SocketError', { message: '登录失败', type: 'login' }));
                socket.disconnect();
            }
        }
        else if (socket.handshake.query && socket.handshake.query.name && socket.handshake.query.character) {
            /** to regist */
            try {
                const player = await this.playerService.create({
                    account: (socket.handshake.query as any).name,
                    name: (socket.handshake.query as any).name,
                    password: "Admin@123",
                    description: "",
                    character: (socket.handshake.query as any).character
                });

                const token = await this.playerService.login({
                    account: (socket.handshake.query as any).name,
                    name: (socket.handshake.query as any).name,
                    password: "Admin@123"
                });

                socket.send(new SocketEventDto('SocketPlayerLogin', { player, token }));
            } catch (error) {
                socket.send(new SocketEventDto('SocketError', { message: error.message }));
                socket.disconnect();
            }
        }
    }
}