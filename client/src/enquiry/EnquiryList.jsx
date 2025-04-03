import axios from 'axios'
import React from 'react'
import { toast, ToastContainer } from 'react-toastify'

export default function EnquiryList({data,getAllenquiry,swal,setFormData}) {
  let deleteRow = (delid) => {

    swal.fire({
      title:"Do you want to save the changes",
      showDenyButton:true,
      showCancelButton:true,
      confirmButtonText:"Save"
    }).then((result)=>{
      if(result.isConfirmed){
        axios.delete(`http://localhost:8005/api/website/enquiry/delete/${delid}`)
        .then((res)=>{
          toast.success("Enquiry Deleted Successfully");
          getAllenquiry();
        })
      }else if(result.isDenied){
        swal.fire("Change are not saved","","info");
      }
    })
   
  }
  let editRow = (editId) => {
    axios.get(`http://localhost:8005/api/website/enquiry/single/${editId}`)
    .then((res)=>{
      let data = res.data;
      setFormData(data.enquiry);
    })
  }
  return (
    <div className="bg-gray-200 p-4">
      
          <h2 className="text-[20px] font-bold mb-4">Enquiry List</h2>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3" scope="col">
                    Sr No
                  </th>
                  <th className="px-6 py-3" scope="col">
                    Name
                  </th>
                  <th className="px-6 py-3" scope="col">
                    Email
                  </th>
                  <th className="px-6 py-3" scope="col">
                    Phone No
                  </th>
                  <th className="px-6 py-3" scope="col">
                    Message
                  </th>
                  <th className="px-6 py-3" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                data.length>=1?
                data.map((item,index)=>{
                  return (
                    <tr key={index} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.phone}</td>
                  <td className="px-6 py-4">{item.message}</td>
                  <td className="px-6 py-4">
                  <button onClick={()=>editRow(item._id)} className="bg-blue-500 text-white px-3 py-1 rounded m-2">Edit</button>
                    <button onClick={()=>deleteRow(item._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                  </td>
                </tr>
                  )
                })
                :
                <tr className="bg-white dark:bg-gray-800 dark:border-gray-700">
                  <th
                    className="text-center"
                    colSpan={7}
                  >
                    No Data Found
                  </th>
                </tr>  
                }
                
              </tbody>
            </table>
          </div>
        </div>
  )
}
