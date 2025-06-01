import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";

const FilterableTable = ({ title, data,  addLabel, icon: Icon, color, type }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');

  // Get unique roles for filter dropdown
  const uniqueRoles = [...new Set(data.map(item => item.role))];

  // Filter data based on search criteria
  const filteredData = data.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || item.role === roleFilter;
    const matchesEmail = item.email.toLowerCase().includes(emailFilter.toLowerCase());
    return matchesSearch && matchesRole && matchesEmail;
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 hover:shadow-xl transition-all duration-300" style={{ borderLeftColor: color }}>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}15` }}>
            <Icon className="h-6 w-6" style={{ color }} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{filteredData.length} of {data.length} items</p>
          </div>
        </div>
      </div>

      {/* Enhanced Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="relative">
          <label className="block text-xs font-medium text-gray-600 mb-1">Search by Name</label>
          <input
            type="text"
            placeholder="Type to search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
            style={{ focusRingColor: `${color}50` }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2 top-7 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Filter by Email</label>
          <input
            type="text"
            placeholder="Email filter..."
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
            style={{ focusRingColor: `${color}50` }}
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Filter by Role</label>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
            style={{ focusRingColor: `${color}50` }}
          >
            <option value="">All Roles</option>
            {uniqueRoles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Summary */}
      {(searchTerm || roleFilter || emailFilter) && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700">
            Showing {filteredData.length} result{filteredData.length !== 1 ? 's' : ''} 
            {searchTerm && ` for "${searchTerm}"`}
            {roleFilter && ` with role "${roleFilter}"`}
            {emailFilter && ` with email containing "${emailFilter}"`}
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setRoleFilter('');
              setEmailFilter('');
            }}
            className="text-xs text-blue-600 hover:text-blue-800 underline mt-1"
          >
            Clear all filters
          </button>
        </div>
      )}
 {/* Enhanced Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Email Address
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr 
                  key={item.id} 
                  className={`hover:bg-gray-50 transition-colors duration-150 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div 
                          className="h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                          style={{ backgroundColor: color }}
                        >
                          {item.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className="inline-flex px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: color }}
                    >
                      {item.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Icon className="h-12 w-12 text-gray-300" />
                    <p className="text-gray-500 font-medium">No {type} found</p>
                    <p className="text-sm text-gray-400">
                      {searchTerm || roleFilter || emailFilter 
                        ? 'Try adjusting your filters' 
                        : `Add your first ${type} to get started`
                      }
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Statistics */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Total: {data.length} {type}</span>
          <span>Filtered: {filteredData.length} showing</span>
        </div>
      </div>
    </div>
  );
};

export default FilterableTable;