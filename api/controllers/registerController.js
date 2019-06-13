var db = require('../db');

module.exports= {
    register(req,res){
        var today = new Date();
        var users={
            "name":req.body.name,
            "email":req.body.email,
            "username":req.body.username,
            "apellido":req.body.apellido,
            "password":req.body.password,
            "created_at":today,
            "updated_at":today
        }
        db.query('INSERT INTO users SET ?',users, function (error, results, fields) {
          if (error) {
            res.json({
                status:false,
                message:'Error en el query'
            })
          }else{
              res.json({
                status:true,
                data:results,
                message:'Usuario registrado exitosamente'
            })
          }
        });
    }
}
