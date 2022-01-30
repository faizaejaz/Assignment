const db = require("../models");
const Hobbies = db.hobbies;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Add Users and Hobbies
    const hobbies = {
      userid: req.body.userid,
      username: req.body.username,
      passion: req.body.passion ? req.body.passion : null,
      hobby: req.body.hobby ? req.body.hobby : null,
      year: req.body.year ? req.body.year : null,
    //   published: req.body.published ? req.body.published : false
    };
  
    // Save username in the database
    Hobbies.create(hobbies)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the hobbies's user."
        });
      });
  };

  exports.findAll = (req, res) => {
    const username = req.query.username;
    var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;
  
    Hobbies.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving hobbies."
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Hobbies.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Hobby with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Hobby with id=" + id
        });
      });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
    const username = req.params.username;
  
    Hobbies.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Hobby was added successfully."
          });
        } else {
          res.send({
            message: `Cannot add hobby with id=${id} - user=${username}. Maybe Hobby was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error adding Hobby with id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Hobbies.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Hobby was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Hobby with id=${id}. Maybe Hobby was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Hobby with id=" + id
        });
      });
  };

  exports.deleteAll = (req, res) => {
    Hobbies.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Hobbies were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all hobby."
        });
      });
  };

