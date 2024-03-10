
class Token {
    public value: string;
    public expire: number;
    public constructor({ value, expire }: {value: string; expire: number;}) {
        this.value = value;
        this.expire = expire;
    }
}

class TokenStore {
    private tokenList: Token[];
    
    public push(value: string) {
        this.tokenList.push(new Token({ value, expire: Date.now() + 1000 * 60 * 60 * 12 }));
    }

    public check(value: string) {
        return this.tokenList.some((token) => token.value === value && token.expire > Date.now());
    }

    public remove(value: string) {
        this.tokenList = this.tokenList.filter((token) => token.value !== value);
    }

    public clear() {
        this.tokenList = [];
    }

}

const tokenStore = new TokenStore();

export const push = tokenStore.push.bind(tokenStore);
export const check = tokenStore.check.bind(tokenStore);
export const remove = tokenStore.remove.bind(tokenStore);
export const clear = tokenStore.clear.bind(tokenStore);