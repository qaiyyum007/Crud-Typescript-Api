import * as request from 'supertest';
import {app} from '../src/app';
import {Database} from '../src/Database'
let token="";
describe("API Spec Test Suite",() => {

        beforeAll(async ()=>{
            await new Database().deleteOne({collection:"Admindata",criteria:{email:"aleem@gmail.com"}})
        })
   
    test("POST /signup should  create , if schema is valid",async done=>{
        const response =await request(app).post("/signup").send({
            "name":"qaiyyum",
            "email":"aleem@gmail.com",
            "password":"aleem",
            "country":"India",
            "state":"Maharastra",
            "city":"Mumbai"
        })
        const {status,body}=response
        console.log(body)
        
        expect (status).toEqual(200)
        done()
    })


    test("POST /signup should  create , if schema is Invalid",async done=>{
        const response =await request(app).post("/signup").send({
            "name":"",
            "email":"aleem@gmail.com",
            "password":"aleem",
            "country":"India",
            "state":"Maharastra",
            "city":"Mumbai"
        })
        const {status,body}=response
        console.log(body)
        
        expect (status).toEqual(422)
        done()
    })


    test("Post /login api must issue valid token", async done =>{
        const response= await request(app).post("/login").send({"email":"aleem@gmail.com","password":"aleem"})
        const {status,body,text} = response
        token=response.text;
        console.error(body)
        expect(status).toEqual(200)
        done()
    })


    test("Post /login should not issue token if schema is invalid", async done =>{
        const response= await request(app).post("/login").send({"email":"aleem@gmail.com","password":"ale"})
        const {status,body,text} = response
        expect(status).toEqual(422)
        done()
    });
    

    
test("Api/payment must not get  payment, if token is absent.", async done=>{
    const response= await request(app).get("/api/v1/Payment")
    const {status,body,text} = response
    expect(status).toEqual(403)
    done()
});

test("Api must Post Payment, if token is present.", async done=>{
    const response= await request(app).post("/api/v1/payment").set({'token':token}).send({
        "product":"Mobile",
        "price":"1000"
    }
       
    );
    const {status,body,text} = response
    console.error(body)
    expect(status).toEqual(200)
    done()
});


test("Api must Post not get Payment, if token is present.", async done=>{
    const response= await request(app).post("/api/v1/payment").set({'token':token}).send({
        "product":"Mobile",
        "price":""
    }
       
    );
    const {status,body,text} = response
    console.error(body)
    expect(status).toEqual(422)
    done()
});


test("Api must GET  get Payment, if token is present.", async done=>{
    const response= await request(app).get("/api/v1/payment").set({'token':token})

    const {status,body,text} = response
    console.error(body)
    console.log(body)
    expect(status).toEqual(200)
    done()
});
  
test("Api must GET , get not  Payment, if token is absent.", async done=>{
    const response= await request(app).get("/api/v1/payment")
    const {status,body,text} = response
    expect(status).toEqual(403)
    done()
});

test("api must update from Payment Data, if token present.", async done=>{
    const response= await request(app).put("/api/v1/payment/5e75fa37d5952c1784b36fb5").set({'token':token}).send({"product":"Laptop","price":"25000"});
    const {status,body,text} = response
    expect(status).toEqual(200)
    done()
});


test("api must update from Payment Data, if token Absent.", async done=>{
    const response= await request(app).put("/api/v1/payment/5e75fa37d5952c1784b36fb5").send({"product":"Laptop","price":"25000"});
    const {status,body,text} = response
    expect(status).toEqual(403)
    done()
});


test("api must update from Payment Data, if  Schema   is invalid.", async done=>{
    const response= await request(app).put("/api/v1/payment/5e75fa37d5952c1784b36fb5").set({'token':token}).send({"product":"Laptop","price":""});
    const {status,body,text} = response
    expect(status).toEqual(422)
    done()
});
 
test("api must not delete data from  Payment Data, if the token is absent.", async done=>{
    const response= await request(app).delete("/api/v1/payment/5e75fbf2e0f2b318806bbabb");
    const {status,body,text} = response
    expect(status).toEqual(403)
    done()
});


test("api must not delete data from  Payment Data, if token is present.", async done=>{
    const response= await request(app).delete("/api/v1/payment/5e75fa37d5952c1784b36fb5").set({'token':token});
    const {status,body,text} = response
    expect(status).toEqual(200)
    done()
});


    

})