const Evento = require("../models/Event");

const getEventos = async (req, res) => {
   const eventos = await Evento.find().populate("user", "name");
   try {
      return res.status(200).json({
         ok: true,
         eventos
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: "hable con el admin"
      });
   }
};

const crearEvento = async (req, res) => {
   const evento = new Evento(req.body);

   try {
      evento.user = req.uid;
      const eventoGuardado = await evento.save();

      return res.status(200).json({
         ok: true,
         evento: eventoGuardado
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: "hable con el admin"
      });
   }
};

const eliminarEvento = async (req, res) => {
   const eventId = req.params.id;

   try {
      const evento = await Evento.findById(eventId);

      if (!evento) {
         return res.status(404).json({
            ok: false,
            msg: "Evento no existe"
         });
      }

      if (evento.user.toString() !== req.uid) {
         return res.status(401).json({
            ok: false,
            msg: "No estas autorizado"
         });
      }

      await Evento.findByIdAndDelete(eventId);

      res.status(200).json({
         ok: true,
         msg: "Evento Eliminado"
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: "hable con el admin"
      });
   }
};

const actualizarEvento = async (req, res) => {
   const eventId = req.params.id;

   try {
      const evento = await Evento.findById(eventId);

      if (!evento) {
         return res.status(404).json({
            ok: false,
            msg: "Evento no existe"
         });
      }

      if (evento.user.toString() !== req.uid) {
         return res.status(401).json({
            ok: false,
            msg: "No estas autorizado"
         });
      }

      const nuevoEvento = {
         ...req.body,
         user: req.uid
      };

      const eventoActualizado = await Evento.findByIdAndUpdate(eventId, nuevoEvento, { new: true });

      res.status(200).json({
         ok: true,
         evento: eventoActualizado
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: "hable con el admin"
      });
   }
};

module.exports = {
   actualizarEvento,
   crearEvento,
   eliminarEvento,
   getEventos
};
