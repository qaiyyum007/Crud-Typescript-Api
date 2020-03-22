import { Request, Response } from 'express'
import * as express from 'express'
import { paymentSchema } from './OnlinePaymentSchema'
import { Database } from './Database'
import { ObjectID } from 'mongodb'

const expressRouter = express.Router()

export class Payment {
    OnlineRouter: any
    constructor() {
        this.OnlineRouter = expressRouter
        this.OnlineRouter.post('/payment', paymentSchema.createOnlinepayment(),paymentSchema.handlesError, async (req: Request, res: Response) => {

            try {

                const docs = new Database().createOne({
                    collection: 'wallet',
                    criteria: {},
                    data: req.body
                })
                res.status(200).send(docs)

            }
            catch (err) {
                res.status(500).send(`${err.Message}-${err.stack}`)
                console.log(`${err.Message}-${err.stack}`)
            }

        })
        


        this.OnlineRouter.get('/payment',  async (req: Request, res: Response) => {

            try {

                const docs = new Database().read({
                    collection: 'wallet',
                   
                })
                res.status(200).send(docs)

            }
            catch (err) {
                res.status(500).send(`${err.Message}-${err.stack}`)
                console.log(`${err.Message}-${err.stack}`)
            }

        })


        this.OnlineRouter.put("/payment/:id",paymentSchema.updatelinepayment(),paymentSchema.handlesError ,async (req:Request,res:Response,next:express.NextFunction)=>{
            try {
                let dat:any ={$set: {
                    product:req.body.product,
                    price:req.body.price
                   
                 }
                }
                const docs:any = await new Database().updateOne({
                    collection: "wallet",
                    criteria:{ "_id": new ObjectID(req.params.id)},
                    projection:{},
                    data:dat
                })
                res.status(200).send(docs) 
            }         
                catch (err) {
                res.status(500).send(`${err.message}-${err.stack}`);
                console.log(`${err.message}-${err.stack}`)   
        }
            });

        
        
            this.OnlineRouter.delete("/payment/:id" ,async (req:Request,res:Response,next:express.NextFunction)=>{
                try {
                   
                    const docs:any = await new Database().deleteOne({
                        collection: "wallet",
                        criteria:{ "_id": new ObjectID(req.params.id)},
                        projection:{},
                       
                    })
                    res.status(200).send(docs) 
                }         
                    catch (err) {
                    res.status(500).send(`${err.message}-${err.stack}`);
                    console.log(`${err.message}-${err.stack}`)   
            }
                });
    
            
            
    }
}