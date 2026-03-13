const BranchsController = {};

import Branchs from "../models/branches.js"

BranchsController.getBranch = async (req, res) => {
    const branchs = await Branchs.find();
    res.json(branchs)
};

BranchsController.putBranch = async (req, res) => {
    const {name, adress, schedule, isActive} = req.body;
    const newBranch = new Branchs({name, adress, schedule, isActive});
    await newBranch.save();
    res.json({message: "Branchs save"})
};

BranchsController.deleteBranch = async (req, res) => {
    await Branchs.findByIdAndDelete(req.params.id);
    res.json({ message: "branch deleted" });
}

//UPDATE
BranchsController.updateBranch = async (req, res) => {
    const { name, adress, schedule, isActive } = req.body;
    await Branchs.findByIdAndUpdate(req.params.id, { name, adress, schedule, isActive },{ new: true })
    res.json({ message: "Branch updated" });
}

export default BranchsController;