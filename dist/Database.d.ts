import { MongoClient } from "mongodb";
export declare class Database {
    client: MongoClient;
    db: string;
    constructor();
    createOne(insertParams: any): Promise<import("mongodb").InsertOneWriteOpResult<any>>;
    readOne(readOneParams: any): Promise<import("mongodb").InsertOneWriteOpResult<any>>;
    deleteOne(insertParams: any): Promise<void>;
}
