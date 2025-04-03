let express=require("express");
const { enquiryInsert, enquiryList, deleteenquiry, updateenquiry } = require("../../controllers/web/userEnquiryController");

let enquiryRoutes = express.Router();

enquiryRoutes.post('/enquiry-insert',enquiryInsert)
enquiryRoutes.get('/enquiry-list',enquiryList)
enquiryRoutes.delete('/enquiry-delete/:id',deleteenquiry)
enquiryRoutes.put('/enquiry-update/:id',updateenquiry)

module.exports = enquiryRoutes;