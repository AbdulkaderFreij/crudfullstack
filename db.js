const sqlite= require("sqlite");


const initializeDB = async () => {
  const db = await sqlite.open("./db.sqlite");
  
const getUsers= async()=>{
    const rows= await db.all('Select * from users');
    return rows;
}

const addUser = async props=>{
    const {username, password} = props;
    if(!props || !username || !password){
        throw new Error('you must provide a username and password');
    }
    try{
    const addUser= await db.run(`Insert into users (username, password) values ('${username}', '${password}')`);
    return addUser.stmt.lastID;
}
catch(err) {
    err.message;
    console.log(err.message);
    throw new Error('this combination doesnt work');
}};

const updateUser = async (id,props)=>{
    const {username, password} = props;
    console.log("here")
    if(!props || !props.username && !props.password){
        throw new Error('you must provide a username and password');
    }
    let stmt='';
    if (username && password){
        stmt=`update users set username='${username}', password='${password}' where id= ${id}`;
        console.log(stmt);
    }
    else if(username && !password){
        stmt=`update users set username='${username}' where id= ${id}`;
    }

    else if(password && !username){
        stmt= `update users set password='${password}' where id= ${id}`;
    }

    try{
    const updateUser = await db.run(stmt);
    console.log(updateUser);
    if (updateUser.stmt.changes == 0){
        throw new Error(`users with id ${id} doesnt exist`);
    }

    return true;
}
catch(err) {
    
    throw new Error(`Could not update users with id= ${id}` + err);
}};

const deleteUser = async(id)=>{
    try{
    const del= await db.run(`Delete from users where id =${id}`);
    return del;
}
catch(err) {
    err.message;
    console.log(err.message);
    throw new Error('this combination doesnt work');
}};
  

const controller = {
    getUsers,
    addUser,
    deleteUser,
    updateUser,
}
return controller;
}
module.exports= initializeDB;
