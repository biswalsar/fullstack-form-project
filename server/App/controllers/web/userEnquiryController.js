const enquiryModel = require("../../models/enquiry.model");


let enquiryInsert = (req,res)=>{
    let {sName, sEmail, sPhone, sMessage} = req.body;
    let enquiry = new enquiryModel({
        name:sName,
        email:sEmail,
        phone:sPhone,
        message:sMessage
    })
    enquiry.save().then(()=>{
        res.send({status:1,message:"Enquiry saved successfully"});
    }).catch((err)=>{
        res.send({status:0,message:"Error while saving enquiry",error:err.message});
    })
}

let enquiryList = async (req,res)=>{
    let enquiryList = await enquiryModel.find();
    res.status(200).json({status:1,message:"Enquiry list",data:[enquiryList]})
}

let deleteenquiry = async (req,res)=>{
    let enquiryId = req.params.id;
    let deleteenquiry = await enquiryModel.deleteOne({_id:enquiryId});
    res.send({status:1,message:'Enquiry deleted successfully',id:enquiryId,delRes:deleteenquiry});
}

let updateenquiry = async (req,res)=>{
    let enquiryId = req.params.id;
    let {sName, sEmail, sPhone, sMessage} = req.body;
    let updateObj = {
        name:sName,
        email:sEmail,
        phone:sPhone,
        message:sMessage
    }
    let updateRes = await enquiryModel.updateOne({_id:enquiryId},updateObj);
    res.send({status:1,message:"Enquiry update successfully",updateRes})
}
module.exports={enquiryInsert,enquiryList,deleteenquiry,updateenquiry}