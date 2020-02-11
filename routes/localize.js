class Token{
    constructor(token){
        this.token_admin = token;
        this.token_staff = token;
    }
    setToken = (node,token) => {
        switch (node.toLowerCase()) {
            case 'admin':this.token_admin=token;break;
            case 'staff':this.token_staff=token;break;
        }
    }
    getToken = () => {
        return [this.token_admin,this.token_staff]
    }
    clearToken = () => {
        this.token_admin=null;
        this.token_staff=null;
    }
}

Tokenize = new Token(null)


module.exports = Tokenize