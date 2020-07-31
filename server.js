const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const Joi = require('joi');

const db = require("./db");
const app = express();

const user = "user";
const customer = "customer";
const agent = "agent";
const ins = "ins_offered";
const insurance = "insurance";
const health = "health";
const travel = "travel";
const life = "life";
const vehicle = "vehicle";
const family = "family";

var userid="";
var cvr="";
var pre="";

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended:true
}));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'html/index.html'));
});

app.get('/loginn',(req,res)=>{
    res.sendFile(path.join(__dirname,'html/loginn.html'));
});
app.get('/lifechoose',(req,res)=>{
    res.sendFile(path.join(__dirname,'html/lifechoose.html'));
});
app.get('/healthchoose',(req,res)=>{
    res.sendFile(path.join(__dirname,'html/healthchoose.html'));
});
app.get('/travelchoose',(req,res)=>{
    res.sendFile(path.join(__dirname,'html/travelchoose.html'));
});
app.get('/vehiclechoose',(req,res)=>{
    res.sendFile(path.join(__dirname,'html/vehiclechoose.html'));
});

app.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname,'html/signup.html'));
});

app.get('/Agentlog',(req,res)=>{
    res.sendFile(path.join(__dirname,'html/Agentlog.html'));
});

app.get('/index',(req,res)=>{
    res.sendFile(path.join(__dirname,'html/index.html'));
});
app.get('/custhome',(req,res)=>{
    res.sendFile(path.join(__dirname,'html/custhome.html'));
});
app.get('/view',(req,res)=>{
    res.sendFile(path.join(__dirname,'html/view.html'));
});
app.get('/familyview',(req,res)=>{
    res.sendFile(path.join(__dirname,'html/familyview.html'));
});
app.get('/agenthome',(req,res)=>{
    res.sendFile(path.join(__dirname,'html/agenthome.html'));
});
app.get('/insurances',(req,res)=>{
    res.sendFile(path.join(__dirname,'html/insurances.html'));
});
app.get('/agent',(req,res)=>{
    res.sendFile(path.join(__dirname,'html/agent.html'));
});
app.get('/viewcust',(req,res)=>{
    res.sendFile(path.join(__dirname,'html/viewcust.html'));
});
app.get('/vehicle/:cover&:premium',(req,res)=>{
    cvr=req.params.cover;
    pre=req.params.premium;
    console.log(cvr);
    console.log(pre);
    res.sendFile(path.join(__dirname,'html/vehiclein.html'));
});
app.get('/life/:cover&:premium',(req,res)=>{
    cvr=req.params.cover;
    pre=req.params.premium;
    console.log(cvr);
    console.log(pre);
    res.sendFile(path.join(__dirname,'html/lifeins.html'));
});
app.get('/health/:cover&:premium',(req,res)=>{
    cvr=req.params.cover;
    pre=req.params.premium;
    console.log(cvr);
    console.log(pre);
    res.sendFile(path.join(__dirname,'html/healthin.html'));
});
app.get('/travel/:cover&:premium',(req,res)=>{
    cvr=req.params.cover;
    pre=req.params.premium;
    console.log(cvr);
    console.log(pre);
    res.sendFile(path.join(__dirname,'html/travelins.html'));
});


app.get('/cust_info',(req,res)=>{
    db.getDB().collection(customer).find({"agent_id" : userid}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            res.json(documents);
        }
    });
});
app.get('/family_info',(req,res)=>{
    db.getDB().collection(family).find({"head_id": userid}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            console.log(documents);
            res.json(documents);
        }
    });
});
app.get('/cust_ins',(req,res)=>{
    db.getDB().collection(insurance).find({"cust_id" : userid}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            console.log(documents);
            res.json(documents);
        }
    });
});
app.get('/vehiclechoose_1',(req,res)=>{
    db.getDB().collection(ins).find({"ins_type" : "vehicle"}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            console.log(documents);
            res.json(documents);
        }
    });
});
app.get('/lifechoose_1',(req,res)=>{
    db.getDB().collection(ins).find({"ins_type" : "life"}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            console.log(documents);
            res.json(documents);
        }
    });
});
app.get('/healthchoose_1',(req,res)=>{
    db.getDB().collection(ins).find({"ins_type" : "health"}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            console.log(documents);
            res.json(documents);
        }
    });
});
app.get('/travelchoose_1',(req,res)=>{
    db.getDB().collection(ins).find({"ins_type" : "travel"}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            console.log(documents);
            res.json(documents);
        }
    });
});
app.get('/getins',(req,res)=>{
    db.getDB().collection(ins).find({}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            res.json(documents);
            console.log(documents);
        }
    });
});
app.post('/signup',function(req,res,next){
    var cust_id=req.body.cust_id;
    var fname=req.body.fname;
    var mname=req.body.mname;
    var lname=req.body.lname;
    var date=req.body.date;
    var gender=req.body.Gender;
    var address=req.body.Address;
    var contact=req.body.Contact;
    var email=req.body.email;
    var agent_id=req.body.agent_id;
    var pass=req.body.pass;
    userid = cust_id;
    var data1 = {
        "_id" : cust_id,
        "password" : pass
    }
    var data2 = {
        "_id" : cust_id,
        "F_name" : fname,
        "M_name" : mname,
        "L_name" : lname,
        "DOB" : new Date(date),
        "Gender" : gender,
        "Add" : address,
        "Cont" : contact,
        "Email" : email,
        "agent_id" : agent_id
    }
    db.getDB().collection(user).insertOne(data1,function(err,collection){
        if(err) throw err;
        console.log(collection);
        console.log("Record inserted Successfully");
    });
    db.getDB().collection(customer).insertOne(data2,function(err,collection){
        if(err) throw err;
        console.log(collection);
        console.log("Record inserted successfully");
    });
    res.redirect('/custhome');
});
app.post('/agent',function(req,res,next){
    console.log(req.body);
    var type = req.body.type;
    var cover = req.body.cover;
    var premium = req.body.premium;

    var data1 = {
        "ins_type" : type,
        "sum_insured" : cover,
        "Premium" : premium,
        "avail" : "Y"
    }
    db.getDB().collection(ins).insertOne(data1,function(err,collection){
        if(err) throw err;
        console.log(collection);
        console.log("Record inserted Successfully");
    });
    res.redirect('/agent');

    
});
app.post('/vehiclein',function(req,res,next){
    console.log(req.body);
    
    var pid= req.body.pid;
    var exp= req.body.exp;
    var name= req.body.name;
    var year_of_purchase= req.body.year_of_purchase;
    var reg_no= req.body.reg_no;
    var reg_year= req.body.reg_year;
    var dl_no= req.body.dl_no;
    var eng_no = req.body.eng_no;


    var data1 = {
        "_id" : pid,
        "cust_id" : userid,
        "Premium" : pre,
        "Expiry" : new Date(exp),
        "Type_of_ins" : "vehicle",
        "Sum_insured" : cvr
    }

    var data2 = {
        "_id" : pid,
        "name" : name,
        "Year_of_purchase" : year_of_purchase,
        "Reg_no" : reg_no,
        "Reg_year" : reg_year,
        "DL_no" : dl_no,
        "Eng_no" : eng_no
    }
    db.getDB().collection(insurance).insertOne(data1,function(err,collection){
        if(err) throw err;
        console.log(collection);
        console.log("Record inserted Successfully");
    });
    db.getDB().collection(vehicle).insertOne(data2,function(err,collection){
        if(err) throw err;
        console.log(collection);
        console.log("Record inserted Successfully");
    });
    cvr="";
    pre="";
    res.redirect('/custhome');

}); 
app.post('/lifeins',function(req,res,next){
    console.log(req.body);
    
    var pid= req.body.pid;
    var exp= req.body.exp;
    var terms= req.body.terms;
    var nominee= req.body.nominee;
    var nominee_rel= req.body.nominee_rel;
    var health_history= req.body.health_history;

    var data1 = {
        "_id" : pid,
        "cust_id" : userid,
        "Premium" : pre,
        "Expiry" : new Date(exp),
        "Type_of_ins" : "life",
        "Sum_insured" : cvr
    }

    var data2 = {
        "_id" : pid,
        "Cover" : cvr,
        "terms" : terms,
        "Nominee" : nominee,
        "Nominee_rel" : nominee_rel,
        "Health_history" : health_history
    }
    db.getDB().collection(insurance).insertOne(data1,function(err,collection){
        if(err) throw err;
        console.log(collection);
        console.log("Record inserted Successfully");
    });
    db.getDB().collection(life).insertOne(data2,function(err,collection){
        if(err) throw err;
        console.log(collection);
        console.log("Record inserted Successfully");
    });
    cvr="";
    pre="";
    res.redirect('/custhome');

});
app.post('/travelins',function(req,res,next){
    console.log(req.body);
    
    var pid= req.body.pid;
    var exp= req.body.exp;
    var placeofvisit= req.body.placeofvisit;
    var riskfactor= req.body.riskfactor;
    var lagcov= req.body.lagcov;
    var triptype= req.body.triptype;
    var traveldate= req.body.traveldate;
    var travelduration = req.body.travelduration;


    var data1 = {
        "_id" : pid,
        "cust_id" : userid,
        "Premium" : pre,
        "Expiry" : new Date(exp),
        "Type_of_ins" : "travel",
        "Sum_insured" : cvr
    }

    var data2 = {
        "_id" : pid,
        "Place_of_visit" : placeofvisit,
        "Risk_factor" : riskfactor,
        "Lag_cov" : lagcov,
        "Trip_type": triptype,
        "Travel_date" : new Date(traveldate),
        "Travel_duration" : travelduration
    }
    db.getDB().collection(insurance).insertOne(data1,function(err,collection){
        if(err) throw err;
        console.log(collection);
        console.log("Record inserted Successfully");
    });
    db.getDB().collection(travel).insertOne(data2,function(err,collection){
        if(err) throw err;
        console.log(collection);
        console.log("Record inserted Successfully");
    });
    cvr="";
    pre="";
    res.redirect('/custhome');

});
app.post('/healthin',function(req,res,next){
    console.log(req.body);
    
    var pid= req.body.pid;
    var exp= req.body.exp;
    var bloodgroup= req.body.bloodgroup;
    var preex_con= req.body.preex_con;
    var familyid= req.body.familyid;
    var height= req.body.height;
    var weight= req.body.weight;


    var data1 = {
        "_id" : pid,
        "cust_id" : userid,
        "Premium" : pre,
        "Expiry" : new Date(exp),
        "Type_of_ins" : "health",
        "Sum_insured" : cvr
    }

    var data2 = {
        "_id" : pid,
        "Blood_grp" : bloodgroup,
        "Preex_con" : preex_con,
        "Family_id" : familyid,
        "Height" : height,
        "Weight" : weight
    }
    db.getDB().collection(insurance).insertOne(data1,function(err,collection){
        if(err) throw err;
        console.log(collection);
        console.log("Record inserted Successfully");
    });
    db.getDB().collection(health).insertOne(data2,function(err,collection){
        if(err) throw err;
        console.log(collection);
        console.log("Record inserted Successfully");
    });
    cvr="";
    pre="";
    res.redirect('/custhome');

});
app.post('/Agentlog',function(req,res,next){
    console.log(req.body);
    
    var agentid= req.body.agentid;
    var username= req.body.Username;
    var password= req.body.password;
    var date= req.body.date;
    var contact= req.body.Contact;
    var Commision= req.body.Commision;
    userid = username;

    var data1 = {
        "_id" : agentid,
        "password" : password
    }

    var data2 = {
        "_id" : agentid,
        "Name" : username,
        "DOB" : new Date(date),
        "Cont" : contact,
        "Comission" : Commision
    }
    db.getDB().collection(user).insertOne(data1,function(err,collection){
        if(err) throw err;
        console.log(collection);
        console.log("Record inserted Successfully");
    });
    db.getDB().collection(agent).insertOne(data2,function(err,collection){
        if(err) throw err;
        console.log(collection);
        console.log("Record inserted Successfully");
    });
    res.redirect('/agenthome');

});
app.post('/loginn', function(request, response,next) {
    var username = request.body._id;
    userid = username;
    var password = request.body.password;
	if (username && password) {
		db.getDB().collection(user).find({_id:username}).toArray((err, documents)=>{
            console.log(documents);
            if (documents[0].password == password){
                console.log("User verified");
                if(documents[0]._id[0]=='a'){
                    response.redirect('/agenthome');
                }
                else{
                    response.redirect('/custhome');
                }
            }
            else{
                const error = new Error("Wrong ID or Password");
                error.status=400;
                response.send(error);
                next(error);
            }
        });
    }
    else{
        const error = new Error("Invalid Input");
        error.status=400;
        response.send(error);
        next(error);
    }
});

app.delete('/ins/:id',(req,res)=>{
    console.log("in delete");
    const insID = req.params.id;
    console.log(insID);
    db.getDB().collection(ins).findOneAndDelete({_id : db.getPrimaryKey(insID)},(err,result)=>{
        if(err)
            console.log(err);
        else{
            res.json(result);
            console.log(result);
        }
    });
});

db.connect((err)=>{
    if(err){
        console.log('unable to connect to database');
        process.exit(1);
    }
    
    else{
        app.listen(3000,()=>{
            console.log('connected to database, app listening on port 3000');
        });
    }
});
