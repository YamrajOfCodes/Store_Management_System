  import React, { useEffect } from "react";
import {  Plus, Edit, Trash2 } from 'lucide-react';
import { DeleteUser } from "../../Redux/Slice/AdminSlice/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { userVerify } from "../../Redux/Slice/UserSlice/userSlice";
import { toast } from "react-toastify";

  
  const DataTable = ({ title, data, columns, onAdd, addLabel }) => {

    const dispatch = useDispatch();
    
  const {deleteuser} = useSelector((state)=>state.user)
  const {userverify} = useSelector((state)=>state.user2)


  
   const handleDeleteuser = (userId)=>{  
       if(userverify?.[0]?.[0]?.role == "admin"){
         dispatch(DeleteUser(userId))  
       }else{
        toast.error("You does not have Autherity")
       }
     }

       useEffect(()=>{
       dispatch(userVerify())
  },[deleteuser])


   return (
     <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
          <Plus className="h-4 w-4" />
          {addLabel}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {column}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {Object.entries(item).filter(([key]) => key !== 'id').map(([key, value], cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {key === 'status' ? (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {value}
                      </span>
                    ) : value}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button className="text-red-600 hover:text-red-900" onClick={()=>{handleDeleteuser(data?.[index].id)}}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
)
  };
  
  export default DataTable