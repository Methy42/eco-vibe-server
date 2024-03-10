export class PlayerDto {
    constructor(
        public name?: string,
        public account?: string,
        public password?: string,
        public description?: string,
        public character?: string
    ) {}
}
