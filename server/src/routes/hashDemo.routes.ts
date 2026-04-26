import { Router } from "express";
import { hashingDemo } from "../controller/hashDemo.controller";



const hashDemoRouter = Router();


hashDemoRouter.post("/demo", hashingDemo);


export default hashDemoRouter;