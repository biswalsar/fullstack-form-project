import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toast
import EnquiryList from "./enquiry/EnquiryList";
import Swal from "sweetalert2";

export default function Enquiry() {
  const [enquiryList, setEnquiryList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: "",
  });

  // Fetch all enquiries
  const getAllenquiry = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/website/enquiry/view");
      if (res.data.status) {
        setEnquiryList(res.data.enquiryList);
      }
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      toast.error("Failed to fetch enquiries");
    }
  };

  // Handle form submission (Save/Update enquiry)
  const saveEnquiry = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        // Update enquiry
        await axios.put(`http://localhost:3001/api/website/enquiry/update/${formData._id}`, formData);
        toast.success("Enquiry Updated Successfully");
      } else {
        // Insert new enquiry
        await axios.post("http://localhost:3001/api/website/enquiry/insert", formData);
        toast.success("Enquiry Saved Successfully");
      }
      
      setFormData({ name: "", email: "", phone: "", message: "", _id: "" });
      getAllenquiry(); // Refresh the list after save/update
    } catch (error) {
      console.error("Error saving enquiry:", error);
      toast.error("Failed to save enquiry");
    }
  };

  // Handle input field changes
  const getValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getAllenquiry(); // Fetch enquiries on component mount
  }, []);

  return (
    <div>
      <ToastContainer />
      <h1 className="text-[35px] text-center py-6 font-bold">User Enquiry</h1>
      <div className="grid grid-cols-[30%_auto] gap-10">
        <div className="bg-gray-200 p-4">
          <h2 className="text-[20px] font-bold">Enquiry Form</h2>
          <form onSubmit={saveEnquiry}>
            <div className="py-3">
              <label className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={getValue}
                required
                placeholder="Enter Your Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="py-3">
              <label className="block mb-2 text-sm font-medium text-gray-900">Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={getValue}
                required
                placeholder="Enter Your Email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="py-3">
              <label className="block mb-2 text-sm font-medium text-gray-900">Your Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={getValue}
                required
                placeholder="Enter Your Phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="py-3">
              <label className="block mb-2 text-sm font-medium text-gray-900">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={getValue}
                placeholder="Message..."
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="py-3">
              <button
                type="submit"
                className="text-white w-[100%] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {formData._id ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
        <EnquiryList data={enquiryList} getAllenquiry={getAllenquiry} swal={Swal} setFormData={setFormData} />
      </div>
    </div>
  );
}
