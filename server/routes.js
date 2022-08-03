const express = require("express");
const router = express.Router();
const { Admin } = require("./schema/Admin");
const { Patient } = require("./schema/Patient");
const { Medic } = require("./schema/Medic");
const { Schedule } = require("./schema/Schedule");
const { Appointment } = require("./schema/Appointment");
const { Specialty } = require("./schema/Specialty");

router.get("/medics", async (req, res) => {
  console.log("GET /medics");
  const medics = await Medic.find();
  res.send(medics);
});

router.get("/specialties", async (req, res) => {
  console.log("GET /specialties");
  const specialties = await Specialty.find();
  res.send(specialties);
});

router.get("/medics/:medicId/appointments", async (req, res) => {
  console.log("GET /medics/:medicId/appointments");
  const medicId = req.params.medicId;
  const medic = await Medic.findOne({ _id: medicId }).populate("appointments");
  res.send(medic.appointmentsSorted);
});

router.get("/appointments/available", async (req, res) => {
  // TODO: to zrobic :D
  // FIXME: jestem niezrobiony :(

  console.log(req.query);
  const medics = await Medic.find({ "specialty.name": req.query.specialty });
  let startDate = new Date(req.query.startDate);
  let endDate = new Date(req.query.endDate);
  let availableAppointments = []
  let dateTaken = false
  for (let medic of medics) {
    let appointments = medic.appointmentsSorted;
    let appointmentStart = new Date(startDate);
    
    // begin from HH:30 or HH:00
    appointmentStart.setMinutes(30 * Math.ceil(startDate.getMinutes() / 30));
    appointmentStart.setSeconds(0);
    let appointmentEnd = new Date(appointmentStart);

    while (appointmentStart.getTime() < endDate.getTime()) {
        appointmentEnd.setMinutes(appointmentStart.getMinutes() + 30);
        for (let appointment of appointments) {
        // if chosen date intersects with one of the appointments
            if (
            (appointmentStart.getTime() >= new Date(appointment.startDate).getTime() &&
                appointmentStart.getTime() < new Date(appointment.endDate).getTime()) ||
            (appointmentEnd.getTime() > new Date(appointment.startDate).getTime() &&
                appointmentEnd.getTime() <= new Date(appointment.endDate).getTime())
            ) {
                dateTaken = true
                break
            }
        }
        if(dateTaken) {
            dateTaken = false
            appointmentStart.setMinutes(appointmentStart.getMinutes() + 30);
            continue
        }
        let newAppointment = {
            startDate: new Date(appointmentStart),
            endDate: new Date(appointmentEnd),
            medic: {...medic.toObject(), appointments: []} // ignore appointments
        }
        availableAppointments.push(newAppointment)
        appointmentStart.setMinutes(appointmentStart.getMinutes() + 30);
    }
  }
  res.send(availableAppointments);
});

router.post("/admin", async (req, res) => {
  console.log(`POST /admin`);
  try {
    const admin = new Admin({
      email: req.body.email,
      password: req.body.password,
    });
    await admin.save(res.send(admin));
  } catch (e) {
    console.error(e.message)
    res.status(400).send(e.message);
  }
});

router.post("/admin", async (req, res) => {
  console.log(`POST /admin`);
  try {
    const admin = new Admin({
      email: req.body.email,
      password: req.body.password,
    });
    await admin.save(res.send(admin));
  } catch (e) {
    console.error(e.message)
    res.status(400).send(e.message);
  }
});

router.post("/medics", async (req, res) => {
  console.log(`POST /medics`);
  try {
    const specialty = await Specialty.findOneAndUpdate(
      { name: req.body.specialty.name },
      { name: req.body.specialty.name },
      { new: true, upsert: true }
    );

    const medic = new Medic({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      specialty: specialty,
    });
    await medic.save(res.send(medic));
  } catch (e) {
    console.error(e.message)
    res.status(400).send(e.message);
  }
});

router.post("/medics/:medicId/appointments", async (req, res) => {
  console.log(`POST /medics/:medicId/appointments`);
  const medicId = req.params.medicId;
  let patient = null;
  try {
    let medic = await Medic.findOne({ _id: medicId });
    patient = new Patient({ ...req.body.patient });
    await patient.save();
    const appointment = new Appointment({
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      patient: patient,
      description: req.body.description,
    });
    medic.appointments.push(appointment);
    await medic.save(res.send(appointment));
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

router.delete("/appointments/:id", async (req, res) => {
  console.log(`DELETE /appointments`);
  let appointment = await Appointment.findOne({ _id: req.params.id });
  try {
    await Appointment.deleteOne({ _id: appointment._id });
    res.status(200).send(appointment);
  } catch (e) {
    console.error(e.message)
    res.status(400).send(e.message);
  }
});

router.put("/appointments/", async (req, res) => {
  console.log(`PUT /appointments`);
  Appointment.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (err) return res.status(400).send(err.message);
      console.log(doc);
      return res.status(200).send(doc);
    }
  );
});

module.exports = router;
