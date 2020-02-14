const jwt = require('jsonwebtoken')

class Token{
    constructor(token){
        this.current_page = null
        this.from_page = null
        this.token_admin = {
            secure : false,
            token : token
        };
        this.token_staff = {
            secure : false,
            token : token
        };
        this.token_student = {
            secure : false,
            token : token
        };
        this.admin = {
            HOME : 100210,
            LOGIN : 100211,
            DEPARTMENT : 100212,
            YEAR : 100213,
            READER : 100214,
            LOGOUT : 100215
        }
        this.valid_admin_redirects = {
            100210 : [
                this.admin.HOME,
                this.admin.LOGIN,
                this.admin.DEPARTMENT,
                this.admin.LOGOUT
            ],
            100211 : [
                this.admin.HOME
            ],
            100212 : [
                this.admin.HOME,
                this.admin.LOGIN,
                this.admin.DEPARTMENT,
                this.admin.YEAR
            ],
            100213:[
                this.admin.DEPARTMENT,
                this.admin.READER,
                this.admin.YEAR
            ],
            100214:[
                this.admin.YEAR,
                this.admin.READER
            ]
        }
    }
    sign = (data) => {
        return jwt.sign(data,process.env.TOKEN_SECRET,{"expiresIn":"6h"})
    }
    decode = (node) => {
        switch(node.toLowerCase()){
            case 'admin':
                return jwt.decode(this.token_admin.token,process.env.TOKEN_SECRET);
            case 'staff':
                return jwt.decode(this.token_staff.token,process.env.TOKEN_SECRET);
            case 'student':
                return jwt.decode(this.token_student.token,process.env.TOKEN_SECRET);
        }
    }
    setToken = (node,token) => {
        switch (node.toLowerCase()) {
            case 'admin':
                this.token_admin.token = token;
                this.token_admin.secure = true;
                break;
            case 'staff':
                this.token_staff.token = token;
                this.token_staff.secure = true;
                break;
            case 'student':
                this.token_student.token = token;
                this.token_student.secure = true;
                break;
        }
    }
    check_page = (node,page,from) => {
        switch(node.toLowerCase()){
            case 'admin':
                if(this.valid_admin_redirects[from].includes(page))
                    return true
                else return false
        }
    }
    getToken = () => {
        return [this.token_admin.token,this.token_staff.token,this.token_student.token]
    }
    clearToken = () => {
        this.token_admin.token=null;
        this.token_admin.secure=false;
        this.token_staff.token=null;
        this.token_staff.secure=false;
        this.token_student.token=null;
        this.token_student.secure=false;
    }
}

Tokenize = new Token(null)


module.exports = Tokenize