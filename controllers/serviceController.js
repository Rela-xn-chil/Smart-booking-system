import db from '../models/index.js';

const Service = db.Service;

export const createService = async (req, res) => {
  try {
    console.log(req.body); // ✅ ADD THIS
    const newService = await Service.create(req.body);
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
