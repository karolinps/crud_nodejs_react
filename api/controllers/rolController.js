var db = require('../db');

module.exports = {

    allRoles(req, res){
        db.query('SELECT * FROM roles', function(error, results, fields){
            if(error) throw error;
            return res.send({error: false, data: results, message:"Listado de roles"})
        })
    },

    allRoleId(req, res){
        let role_id = req.params.id;

        db.query('SELECT * FROM roles where id=?', role_id, function(error, results, fields){
            if(error) throw (error);
            return res.send({error: false, data: results[0], message:'Listado por id'})
        })
    },

    addRole(req, res){
        let nombre = req.body.nombre;

        if(!nombre){
            
            return res.status(400).send({error:true, message:'Proveer role'})
        }

        db.query("INSERT INTO roles SET ? " , { nombre: nombre }, function(error, results, fields){
            if (error) throw (error);

            return res.send({ error: false, data: results, message: 'Nuevo registro agregado.' });
        })
    },

    updateRole(req, res) {
        let role_id = req.params.id;
        let nombre = req.body.nombre;

        if(!role_id || !nombre) {
            return res.status(400).send({error:true, message:'Proveer role_id and nombre'})
        }

       db.query("UPDATE roles SET nombre  = ? where id = ?", [nombre, role_id], function(error, results, fields){
            if (error) throw (error);

            return res.send({ error: false, data: results, message: 'Registro actualizado.' });
       })
    },

    deleteRole(req, res){
        let role_id = req.params.id;

        db.query("DELETE FROM roles where id =?", role_id, function(error, results, fields){
            if(error) throw(error)

            return res.send({error: false, data: results, message:'Registro borrado'})
        })
    }
}