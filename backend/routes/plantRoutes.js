const Plant=require('../models/Plant');
const express=require('express');
const upload=require('../middleware/upload')

const app=express.Router();

app.get('/',async (req,res)=>{

    try {
    const { name, category } = req.query;
    let query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" }; // case-insensitive search
    }
    if (category) {
      query.categories = { $regex: category, $options: "i" };
    }

    const plants = await Plant.find(query);
    res.json(plants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
    
});

// POST add new plant (admin feature)
app.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, categories, availability } = req.body;

    console.log("REQ BODY:", req.body);

    let plantCategories = [];
    if (typeof categories === "string") {
      plantCategories = categories.split(",").map(c => c.trim());
    } else if (Array.isArray(categories)) {
      plantCategories = categories;
    }

    const newPlant = new Plant({
      name,
      price,
      categories: plantCategories,
      availability,
      image: req.file ? req.file.path : null,
    });

    await newPlant.save();
    res.status(201).json(newPlant);
  } catch (err) {
    console.error("Error adding plant:", err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
});



app.get("/:id", async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }
    res.json(plant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
