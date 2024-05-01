const { Absensi } = require("../models");
const { Response } = require("../utils/response/response");
const { TimeZoneIndonesia, GetTime, GetDate } = require("../utils/times/timezone");

module.exports = {
   Live: async (req, res) => {
      try {
         const { userId, type, longitude, latitude, photo, id } = req.body

         // var sd = TimeZoneIndonesia().getDate()
         // console.log('LOGG-D', sd)
         var payload = {
            user_id: userId,
            clock_in: GetTime(),
            longitude_clockin: longitude,
            latitude_clockin: latitude,
            photo_clockin: photo,
            created_at: GetDate()
         }

         var condition = {
            where: {
               created_at: GetDate()
            }
         }

         if (type?.toUpperCase() === "CLOCK_OUT") {
            payload = {
               user_id: userId,
               clock_out: GetTime(),
               longitude_clockout: longitude,
               latitude_clockout: latitude,
               photo_clockout: photo,
               updated_at: GetDate()
            }

            condition = {
               where: {
                  id: id,
                  created_at: GetDate()
               }
            }
         }

         // const absensi = await Absensi.create(payload)
         // const absensi = await Absensi.findOne({
         //    where: {
         //       created_at: TimeZoneIndonesia().getDate()
         //    }
         // })
         const abs = Absensi
            .findOne(condition)
            .then(function (obj) {
               // update
               if (obj)
                  return Absensi.update(payload, condition);
               // insert
               return Absensi.create(payload);
            })

         console.log('LOG-Attendance', abs)

         res.set('Content-Type', 'application/json')
         res.status(201).send(Response(true, "201", "Success", null))
      } catch (err) {
         console.log('LOG-ERR-Get', err)
         res.set('Content-Type', 'application/json')
         res.status(500).send(Response(false, "500", "Internal Server Error", null))
      }
   },
}