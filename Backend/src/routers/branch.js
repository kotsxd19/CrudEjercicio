import express from 'express';
import BranchsController from '../controllers/branchController.js';

//Router() nos ayudara a colocar los metodos
//que tendra el endpoint
const router = express.Router();

router.route("/")
.get(BranchsController.getBranch)
.post(BranchsController.putBranch)

router.route("/:id")
.put(BranchsController.updateBranch)
.delete(BranchsController.deleteBranch)

export default router;