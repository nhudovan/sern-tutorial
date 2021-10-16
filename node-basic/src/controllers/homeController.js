import CRUDService from '../services/CRUDService';
import db from "../models/index";


let getHomePage = async (req, res) =>{
    
    try {
        let data = await db.User.findAll();
        console.log(data)
        return res.render('homePage.ejs',{
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error);
    }
}

let getAboutPage = (req, res) =>{
    return res.render('test/about.ejs')
}

let getCRUD = (req, res) =>{
    return res.render('crud.ejs')
}

let postCRUD = async(req, res) =>{
    let message =   await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post crud from server');
}

let displayGetCRUD = async(req, res) =>{
    let data = await CRUDService.getAllUsers();
    console.log('---------------');
    console.log(data);
    console.log('---------------');
    return res.render('displayCRUD.ejs',{
        dataTable: data,
    });
}

let getEditCRUD = async(req, res) =>{
    let userId = req.query.id;
    console.log(userId);
    if(userId){
        let userData = await CRUDService.getUserInfoById(userId);
        console.log(userData);
        return res.render('edit-crud.ejs',{
          user: userData,
        })
    }else{
        return res.send('User not found');
    }
    
}

let putCRUD = async(req, res) =>{
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs',{
        dataTable:allUsers,
    });
}

module.exports = {
    getHomePage,
    getAboutPage,
    getCRUD,
    postCRUD,
    displayGetCRUD,
    getEditCRUD,
    putCRUD,
}