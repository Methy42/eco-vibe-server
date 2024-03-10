export class SocketEventDto<DataType> {
    constructor(
        public type: string,
        public data: DataType
    ) {}
}