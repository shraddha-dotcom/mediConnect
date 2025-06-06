const Service = require('../models/Service');

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch {
    res.status(500).json({ message: 'Error fetching services' });
  }
};
