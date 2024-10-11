import { Router } from "express";
import { query , validationResult, checkSchema , matchedData} from "express-validator";
import {users} from "../utils/constants.mjs"
import {creteUserValidationSchema} from "../utils/validationSchemas.mjs"
import { resolveIndexByUserId} from "../utils/middlewares.mjs"

const router = Router();

router.get(
  "/api/users",
  query(`filter`)
    .isString()
    .notEmpty()
    .withMessage(`must not be empty`)
    .isLength({ min: 3, max: 5 })
    .withMessage("must be at least 3 - 5 chars"),
  (req, res) => {
    console.log(req.sessionID)
    req.sessionStore.get(req.session.id , (err, sessionData)=>{
      if(err){
        console.log(err);
        throw err
      }
      console.log(sessionData)
    })
    const result = validationResult(req);
    console.log(result);
    console.log(req.query);
    //destructure query parameter
    const { filter, value } = req.query;

    if (filter && value) {
      return res.send(users.filter((user) => user[filter].includes(value)));
    }
    return res.send(users);
  }
);


// Route params
router.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { findUserIndex } = req
    const findUser = users[findUserIndex]
    if (!findUser) return res.sendStatus(404);
    return res.send(findUser);
  });
// post method to add new users
router.post(`/api/users`,checkSchema(creteUserValidationSchema),
  (req, res) => {

    const result = validationResult(req)
    console.log(result)

    if(!result.isEmpty()){
      return res.status(400).send({errors: result.array()})
    }

    const data = matchedData(req)
    console.log(data)
    const newUser = { id: users[users.length - 1].id + 1, ...data }; // create new user
    users.push(newUser);
    //console.log(JSON.stringify(users))
    return res.status(201).send();
  });


  // Modify the Entire value 
router.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { body, findUserIndex } = req;
    // keep the id the sand modified the data into user shared one
    users[findUserIndex] = { id: users[findUserIndex].id, ...body };
    return res.sendStatus(200);
  });
  
  // Modify specific value 
  router.patch(`/api/users/:id`, resolveIndexByUserId, (req, res) => {
    const { body, findUserIndex } = req;
  
    users[findUserIndex] = { ...users[findUserIndex], ...body };
    return res.sendStatus(200);
  });
  
  // delete a specific user 
  router.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { findUserIndex } = req;
  
    users.splice(findUserIndex, 1);
    return res.sendStatus(200);
  });
export default router
