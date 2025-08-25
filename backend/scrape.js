const axios = require("axios");
const mongoose = require("mongoose");
require("dotenv").config();

// Import Plant model
const Plant = require("./models/Plant");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

async function getCategories() {
  try {
    const res = await axios.get("https://www.urvann.com/api/1/entity/ms.categories", {
      params: {
        limit: 50,
        start: 0,
        filters: JSON.stringify([{ field: "publish", type: "manual", value: "1" }])
      },
      headers: { "app_request": "1", "frontend": "1", "ajax": "1" }
    });

    return res.data?.data?.map(cat => cat.alias) || [];
  } catch (err) {
    console.error("❌ Error fetching categories:", err.message);
    return [];
  }
}

async function scrapeCategory(category) {
  let allPlants = [];
  let start = 0;
  const limit = 50;
  let hasMore = true;

  while (hasMore) {
    try {
      const res = await axios.get("https://www.urvann.com/api/1/entity/ms.products", {
        params: {
          limit,
          start,
          filters: JSON.stringify([
            { field: "categories", type: "manual", value: [category] },
            { field: "publish", type: "manual", value: "1" }
          ])
        },
        headers: { "app_request": "1", "frontend": "1", "ajax": "1" }
      });

      const baseUrl = res.data?.fileBaseUrl || "";
      const products = res.data?.data || [];

      if (products.length === 0) {
        hasMore = false;
        break;
      }

      const plants = products.map(p => ({
        name: p.name,
        price: p.our_price || p.list_price || 0,
        categories: p.categories || [category],
        availability: p.available === 1,
        image: p.images?.length ? baseUrl + p.images[0].image : null,
        description: p.description || "",
        features: p.features || []
      }));

      allPlants = allPlants.concat(plants);
      console.log(`🌱 [${category}] Fetched ${plants.length} (total so far: ${allPlants.length})`);

      start += limit;
    } catch (err) {
      console.error(`❌ Error scraping category ${category}:`, err.message);
      break;
    }
  }

  return allPlants;
}

async function scrapeAll() {
  const categories = await getCategories();
  console.log("📂 Found categories:", categories);

  let grandTotal = [];

  for (const cat of categories) {
    const plants = await scrapeCategory(cat);
    grandTotal = grandTotal.concat(plants);

    // Save to MongoDB (upsert to avoid duplicates)
    for (const plant of plants) {
      await Plant.findOneAndUpdate(
        { name: plant.name },
        plant,
        { upsert: true, new: true }
      );
    }
  }

  console.log("✅ Total plants scraped:", grandTotal.length);
  mongoose.connection.close();
}

scrapeAll();
