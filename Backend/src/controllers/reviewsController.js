const ReviewController = {};

import reviewModels from "../models/reviews.js"

ReviewController.getReviews = async ( req, res) => {
    const reviews= await reviewModels.find();
    res.json(reviews)
}

ReviewController.insertReview = async (req, res) => {
    //1# - solicita los datos
    const {idEmployee, idProducts, rating, comment} = req.body;
    //2# - rellenar el modelo con los datos que acabas de pedir
    const newReview = new reviewModels({
        idEmployee,
        idProducts,
        rating,
        comment
    });

    //3# - Guardo todo en la base de datos
    await newReview.save();

    res.json({message: "Review saved"})
}

ReviewController.deleteReview = async (req, res) => {
    await reviewModels.findByIdAndDelete(req.params.id);
    res.json({message: "review deleted"});
}

ReviewController.updateReview = async (req, res) => {
    //solicito los nuevos datos
    const {idEmployee, idProducts, rating, comment} = req.body;
    //Actualizo
    await reviewModels.findByIdAndUpdate(req.params.id,{
        idEmployee,
        idProducts,
        rating,
        comment
    },{
        new: true
    });

    res.json({message: "Review Update"})
}

export default ReviewController;