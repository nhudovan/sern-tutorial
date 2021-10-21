
import db from "../models/index";
import  bcrypt from "bcryptjs";


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData={};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exists
                let user = await db.User.findOne({
                    where:{
                        email: email
                    },
                    attributes:['email','password','roleId'],
                    raw: true,
                })
                if (user) {
                    // compare password 
                    let check = await bcrypt.compareSync(password, user.password);
                    console.log("pass :",password,"hash password :",user.password)
                    // let check =  bcrypt.compare(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errorMessage = `ok`;
                        delete user.password
                        userData.user = user;
                    }else{
                        userData.errCode = 3;
                        userData.errorMessage = `Wrong password`;

                    }
                }else{
                    userData.errCode = 2;
                    userData.errorMessage = `user not found`
                }
            }else{
                userData.errCode = 1;
                userData.errorMessage = `Your's email address isn't exist in system`
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    })
    
}


let checkUserEmail = (userEmail) =>{
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where:{
                    email: userEmail,
                }
            })
            if (user) {
                resolve(true);
            }else{
                resolve(false);
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports ={
    handleUserLogin,
    checkUserEmail,
}