var db = require('../db');
var jwt=require('jsonwebtoken')

module.exports = {
    authenticate(req, res){
        var user = {
            username:req.body.username,
            password:req.body.password,
        }
      
        db.query('SELECT * FROM users WHERE username = ?',[user.username], function (error, results, fields) {
          if (error) {
              res.json({
                status:false,
                message:'error with query'
                })
          }else{
            if(results.length >0){
                if(user.password===results[0].password){
                    var token=jwt.sign(user,process.env.SECRET_KEY,{
                        expiresIn:5000
                    });
                    res.json({
                        status:true,
                        token:token,
                        message:"Se ha logueado exitosamente"

                    })
                }else{
                    res.json({
                      status:false,                  
                      message:"El user and password no coincide"
                     });
                }
             
            }
            else{
              res.json({
                  status:false,
                    message:"Usuario no existe"
              });
            }
          }
        });
    }
}