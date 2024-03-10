export default class ResultVO<T> {
    code: number;
    message: string;
    data: T;
    constructor(code: number, message: string, data: T) {
        this.code = code;
        this.message = message;
        this.data = data;
    };

    static success<T>(data: T): ResultVO<T> {
        return new ResultVO<T>(0, 'success', data);
    }
}