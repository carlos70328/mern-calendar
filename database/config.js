const mongoose = require("mongoose");

const dbConnection = async () => {
   try {
      mongoose.set("strictQuery", false);
      await mongoose.connect(process.env.DB_CNN, {});

      console.log("DB online");
   } catch (error) {
      console.log(error);
      throw new Error("error a la hora inicializar bd");
   }
};

module.exports = { dbConnection };
