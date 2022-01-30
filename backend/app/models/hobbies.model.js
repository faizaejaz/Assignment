module.exports = (sequelize, Sequelize) => {
    const Hobbies = sequelize.define("hobbies", {
      userid: {
            type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      passion: {
        type: Sequelize.TEXT
      },
      hobby: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      }
    });
  
    return Hobbies;
  };