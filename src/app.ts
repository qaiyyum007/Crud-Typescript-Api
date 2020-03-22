import * as express from "express"
import { Request, Response } from 'express'
import { ApiLoginSignup } from "./ApiLoginSignup"
import { JsonWebTokenError } from "jsonwebtoken"
const app: express.Application = express()
import {Database} from './Database'
import *as jwt from 'jsonwebtoken'
import { Payment } from "./OnlinePayment"
app.use(express.json())
app.listen(8383)
console.log('server is Start')
app.all("/api/*",(req,res,next) => {
    try{
          const token:any=req.headers["token"]
          console.log(`token ${token}`)
          if(!token)
                res.status(403).send()
          else{
                jwt.verify(token,"secretKey",(err:Error,decoded:any) => {
                      if(!err)
                            next()
                      else res.status(500).send('token is not found')
                      })
                }
          } catch (err) {}  
    })

app.use('/api/v1', new Payment().OnlineRouter)
app.use('/', new ApiLoginSignup().dataRouter)

export { app }