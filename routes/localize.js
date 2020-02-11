class Token{
    constructor(token){
        this.token_admin = token;
        this.token_staff = token;
        this.token_student = token;
    }
    setToken = (node,token) => {
        switch (node.toLowerCase()) {
            case 'admin':this.token_admin=token;break;
            case 'staff':this.token_staff=token;break;
            case 'student':this.token_student=token;break;
        }
    }
    getToken = () => {
        return [this.token_admin,this.token_staff,this.token_student]
    }
    clearToken = () => {
        this.token_admin=null;
        this.token_staff=null;
        this.token_student=null;
    }
}

Tokenize = new Token(null)


module.exports = Tokenize