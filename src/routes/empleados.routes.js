const { Router } = require("express");
const dbConnection = require("../database");

const router = Router();
router.get("/", (req, res) => {
  dbConnection.query("SELECT * FROM empleados", (err, rows, fields) => {
    if (!err) {
      res.render("index", { empleados: rows });
    } else {
      console.error(err);
    }
  });
});

router.get("/create", (req, res) => {
  res.render("ingresarEmpleadoForm");
});

router.post("/create", (req, res) => {
  const { num_documento, nombres, apellidos, edad } = req.body;
  console.log(req.body);
  dbConnection.query(
    "INSERT INTO empleados (num_documento,nombres,apellidos,edad) VALUES(?,?,?,?)",
    [num_documento, nombres, apellidos, edad],
    (err, rows, fields) => {
      if (!err) {
        res.redirect("/");
      } else {
        console.error(err);
      }
    }
  );
});
router.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  dbConnection.query(
    "SELECT * FROM empleados WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.render("editarEmpleadosForm", { id, rows });
      } else {
        console.error(err);
      }
    }
  );
});
router.post("/edit", (req, res) => {
  const { id, num_documento, nombres, apellidos, edad } = req.body;
  dbConnection.query(
    "UPDATE empleados SET num_documento=?,nombres=?,apellidos=?,edad=? WHERE id = ?",
    [num_documento, nombres, apellidos, edad, id],
    (err, rows, fields) => {
      if (!err) {
        res.redirect("/");
      } else {
        console.error(err);
        res.redirect("/edit/id");
      }
    }
  );
});

router.get("/remove/:id", (req, res) => {
  const { id } = req.params;
  dbConnection.query(
    "DELETE FROM empleados WHERE id=?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.redirect("/");
      } else {
        console.error(err);
        return;
      }
    }
  );
});

module.exports = router;
