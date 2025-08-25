const mongoose=require('mongoose');

//defined Schema

const PlantSchema=new mongoose.Schema({
    name:{type:String, required:true},
    price: { type: Number, required: true },
    categories: [{ type: String }], 
    availability: { type: Boolean, default: true },
    image: { type: String }
});

module.exports=mongoose.model("Plant",PlantSchema);