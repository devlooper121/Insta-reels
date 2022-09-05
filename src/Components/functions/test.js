const emailValidation = (email) => {
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
            // console.log(p2);
            return "Sorry, after @ symbol . only have in middle and no special character"
        }else if(!p2.substring(1, p2.length-1).includes(".")){
            // console.log(p2.substring(1, p2.length-1));
            return "Sorry, after @ symbol must include . in middle"
        }
        return true
    }   
    return "must include @ in email";
}

console.log(emailValidation("dheeraj@gmail.com"));