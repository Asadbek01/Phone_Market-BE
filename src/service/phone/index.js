import express from "express";
import PhoneModel from "../modules/shcema.js"
import q2m from "query-to-mongo"
import  CreateHttpError from "http-errors";
const phoneRouter = express.Router();
// 1
phoneRouter.post("/", async (req, res, next) => {
  try {
      const newPhone = PhoneModel(req.body)
      const {_id} =  await newPhone.save()
      res.status(201).send(newPhone)
  } catch (error) {
    next(error);
  }
});
// 2
phoneRouter.get("/", async (req, res, next) => {
  try {
    const selectQuery = q2m(req.query)
    const phone= await PhoneModel.find(selectQuery.criteria)
            .sort(selectQuery.options.sort)
            .skip(selectQuery.options.skip || 0)
            .limit(selectQuery.options.limit)
            res.send(phone)
    
  } catch (error) {
    next(error);
  }
});
// 3
phoneRouter.get("/:id", async (req, res, next) => {
  try {
      const phoneId = req.params.id 
      const getSingle = await PhoneModel.findById(phoneId)
      if(!phoneId.length===24) return CreateHttpError(404, `Id  could not be found`)
      if(getSingle){
          res.send(getSingle)}else{
            next(CreateHttpError(404, `phone with id ${phoneId} not found!`));
          }
  } catch (error) {
    next(error);
  }
});
// 4
phoneRouter.put("/:id", async (req, res, next) => {
  try {
       const phoneId = req.params.id
      const UpdatePhone = await PhoneModel.findByIdAndUpdate(phoneId, req.body, {new: true})
      if(UpdatePhone){
          res.send(UpdatePhone)
      }else{
        next(CreateHttpError(404, `phone with id ${phoneId} not found!`));
      }
    } catch (error) {
    next(error);
  }
});
// 5
phoneRouter.delete("/:id", async (req, res, next) => {
  try {
    const phoneId = req.params.id
    const deletePhone = await PhoneModel.findByIdAndDelete(phoneId)
    if(deletePhone){
        res.send(deletePhone)
    }else{
        next(CreateHttpError(404, `phone with id ${phoneId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});
export default phoneRouter;