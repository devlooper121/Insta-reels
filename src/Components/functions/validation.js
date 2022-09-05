export const emailValidation = (email) => {
    if(email==="") return "email can not be empty"
    if (email.includes("@")){
        let idx = email.indexOf("@");
        let p1 = email.substring(0,idx);
        let p2 = email.substring(idx+1);
        if( p1.charAt(0) === "." ) return "Sorry, the first character of email must be an ascii letter (a-z) or number (0-9)."
        if(p1.charAt(p1.length-1) === "."){
            return "Sorry, the last character of email before @ must be an ascii letter (a-z) or number (0-9)"
        }
        if(p1.match(/[^a-zA-Z0-9.]/)){
            return "Sorry, only letters (a-z), numbers (0-9), and periods (.) are allowed."
        }
        if(p2.charAt(0) === "." || p2.charAt(p2.length-1) === "." || p2.match(/[^a-zA-Z0-9.]/)){
            return "Sorry, after @ symbol . only have in middle and no special character"
        }else if(!p2.substring(1, p2.length-1).includes(".")){
            return "Sorry, after @ symbol must include . in middle"
        }
        return true
    }   
    return "must include @ in email";
}


export const passwordValidator= (password)=>{
    if(password==="") return "password can not be empty"
    if(password.length < 8 || password.length > 20) return "Sorry, Password should be only 8-20 character long."
    if(password.match(/[a-z]/) && password.match(/[A-Z]/) && password.match(/[^a-zA-Z0-9]/)){
        return true
    }
    return "Sorry, Password should must contain at least one numeric digit, one special character, one uppercase and one lowercase letter."
}


export const userNameValidator = (name)=>{
    if(name==="") return "can not be empty"
    if(name.length < 3 || name.length > 50) return "must be 3-50 character long only.";
    if(name.match(/[^a-zA-Z0-9_]/)) return "username must not have any special character.";
    return true
}

export const nameValidator = (name)=>{
    if(name==="") return "name can not be empty"
    if(name.length < 3 || name.length > 30) return "name must be 3-30 character long only.";
    return true
}
