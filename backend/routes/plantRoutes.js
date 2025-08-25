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

app.post("/", async (req, res) => {
  try {
    const { name, price, categories, availability } = req.body;

    const newPlant = new Plant({
      name,
      price,
      categories: Array.isArray(categories) ? categories : categories.split(","), 
      availability
    });

    await newPlant.save();
    res.status(201).json(newPlant);
  } catch (error) {
    console.error("Error adding plant:", error);
    res.status(500).json({ error: error.message });
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
