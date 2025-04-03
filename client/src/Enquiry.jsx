import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import EnquiryList from "./enquiry/EnquiryList";
import Swal from "sweetalert2";

export default function Enquiry() {
  let [enquiryList,setEnquiryList] = useState([]);
  let [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id:""
  });

  let getAllenquiry = () => {
    axios.get("http://localhost:8005/api/website/enquiry/view")
    .then((res)=>{
      return res.data;
    }).then((finalData)=>{
       if(finalData.status){
        setEnquiryList(finalData.enquiryList)
       }
    })
  }

  let saveEnquiry = (e) => {
    e.preventDefault();

    if(formData._id){
      axios.put(`http://localhost:8005/api/website/enquiry/update/${formData._id}`,formData)
      .then((res)=>{
        toast.success("Enquiry Updated successfully");
        setFormData({
          name:"",
          email:"",
          phone:"",
          message:"",
          _id:""
        })
        getAllenquiry()
      })
    }else{
      axios
      .post("http://localhost:8005/api/website/enquiry/insert", formData)
      .then((res) => {
        console.log(res.data);
        toast.success("Enquiry Saved Successfully");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        getAllenquiry();
      });
    }

  };
  let getValue = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let oldData = { ...formData };
    oldData[inputName] = inputValue;
    setFormData(oldData);
  };

  useEffect(()=>{
    getAllenquiry();
  },[])
  return (
    <div>
      <ToastContainer/>
      <h1 className="text-[35px] text-center py-6 font-bold">User Enquiry</h1>
      <div className="grid grid-cols-[30%_auto] gap-10">
        <div className="bg-gray-200 p-4">
          <h2 className="text-[20px] font-bold">Enquiry Form</h2>
          <form action="" onSubmit={saveEnquiry}>
            <div className="py-3">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="name"
              >
                Your Name
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Your Name"
                onChange={getValue}
                value={formData.name}
                name="name"
                required
                type="text"
              />
            </div>
            <div className="py-3">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="email"
              >
                Your Email
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={getValue}
                value={formData.email}
                placeholder="Enter Your Email"
                name="email"
                required
                type="email"
              />
            </div>
            <div className="py-3">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="phone"
              >
                Your Phone
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Your Phone"
                onChange={getValue}
                value={formData.phone}
                name="phone"
                required
                type="text"
              />
            </div>
            <div className="py-3">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="message"
              >
                Your Message
              </label>
              <textarea
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="message"
                onChange={getValue}
                value={formData.message}
                placeholder="Message..."
                rows="4"
              />
            </div>
            <div className="py-3">
              <button
                className="text-white w-[100%] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="submit"
              >
                {formData._id?"Update":"Save"}
              </button>
            </div>
          </form>
        </div>
        <EnquiryList data={enquiryList} getAllenquiry={getAllenquiry} swal={Swal} setFormData={setFormData}/>
      </div>
    </div>
  );
}
