import reservationRouter from "./reservationRouter";
import userRouter from "./userRouter";  
//import credendialRouter from "./credentialRouter";
import {Router} from "express";

const indexRouter: Router = Router();

//indexRouter.use("/", homeRouter);
indexRouter.use("/users", userRouter);
indexRouter.use("/reservations", reservationRouter);
//indexRouter.use("/credentials", credendialRouter);

export default indexRouter