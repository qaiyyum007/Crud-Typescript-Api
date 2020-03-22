import { MongoClient, Db } from "mongodb";

export class Database{
    client:MongoClient
    db:string
    constructor(){

    const url='mongodb://localhost:27017'
    this.client=new MongoClient(url,{useNewUrlParser:true,useUnifiedTopology:true})
    this.db='quickwork'
        
    }
    
    async createOne(insertParams:any){
        try {
    const conn = await this.client.connect()
    const db=conn.db(this.db)
    const collection =db.collection(insertParams.collection)
    const docs = await collection.insertOne(insertParams.data)
   return docs
        }
      catch (err){
            throw err
      }

    }



    async readOne(readOneParams:any){
        try {
    const conn = await this.client.connect()
    const db=conn.db(this.db)
    const collection =db.collection(readOneParams.collection)
    const docs = await collection.insertOne(readOneParams.criteria)
   return docs
        }
      catch (err){
            throw err
      }

    }


    async read(readParams:any){
        try {
    const conn = await this.client.connect()
    const db=conn.db(this.db)
    const collection =db.collection(readParams.collection)
    const docs = await collection.find(readParams.criteria).toArray()
   return docs
        }
      catch (err){
            throw err
      }

    }




    async updateOne(updateParams:any){
        try {
    const conn = await this.client.connect()
    const db=conn.db(this.db)
    const collection =db.collection(updateParams.collection)
    const docs = await collection.updateOne(updateParams.criteria,updateParams.data)
   return docs
        }
      catch (err){
            throw err
      }

    }


    


    async deleteOne(insertParams:any){
        try {
    const conn = await this.client.connect()
    const db=conn.db(this.db)
    const collection =db.collection(insertParams.collection)
    const docs = await collection.deleteOne(insertParams.criteria,insertParams.projection)
   return docs
        }
      catch (err){
            throw err
      }

    }
}