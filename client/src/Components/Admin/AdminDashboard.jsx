import React, { useEffect, useState } from 'react';
import { Users, Store, Star, Plus, Edit, Trash2, Menu, X, UserCheck, Building, icons, DoorOpenIcon, LogOut } from 'lucide-react';
import DataTable from './DataTable';
import UserForm from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmin, getallStores, getallUsers } from '../../Redux/Slice/AdminSlice/adminSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FilterableTable from './FilterTable';
import { getAllReviews, userVerify } from '../../Redux/Slice/UserSlice/userSlice';

const AdminDashboard = () => {

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('activeTab') || 'dashboard';
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { getallusers } = useSelector((state) => state.user);
  const { getallstores } = useSelector((state) => state.user);
  const { getadmin } = useSelector((state) => state.user);
  const { register } = useSelector((state) => state.user);
  const { addstore } = useSelector((state) => state.user);
  const { getallreviews } = useSelector((state) => state.user2);
  const { userverify } = useSelector((state) => state.user2);
  const {deleteuser}=useSelector((state)=>state.user)

  // console.log(getallreviews);
  // console.log(userverify);

 
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  
  let users = [];
  let allusers = [];
  let stores = [];
  let admins = [];

  
  if (getallusers?.[0]) {
    allusers = getallusers[0].map((element) => ({
      id: element?.id,
      name: element?.username,
      email: element?.email,
      role: element?.role,
    }));

    // Filter users (exclude admins)
    users = getallusers[0]
      .filter((element) => element.role === "user" || element.role === "shopOwner")
      .map((element) => ({
        id: element?.id,
        name: element?.username,
        email: element?.email,
        role: element?.role,
        address: element?.address,
      }));
  }


  if (getallstores?.[0]) {
    stores = getallstores[0].map((element) => ({
      id: element?.id,
      name: element?.storename,
      email: element?.email,
      address: element?.address,
    }));
  }

  // Process admins data
  if (getadmin?.[0]) {
    admins = getadmin[0]
      .filter((element) => element.role === "admin")
      .map((element) => ({
        id: element?.id,
        name: element?.username,
        email: element?.email,
        address: element?.address,
      }));
  }

  const handleLogout = () => {
    if(userverify?.[0]?.[0]?.role == "admin"){

      localStorage.removeItem("Token");
      localStorage.removeItem("activeTab"); 
      setTimeout(() => {
        toast.success("Logout successfully");
        navigate("/");
      }, 1000);
    }
  };

  // Handle tab change
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  const handleAPICalling = ()=>{
     dispatch(getallUsers());
    dispatch(getallStores());
    dispatch(getAdmin());
    dispatch(userVerify())
    dispatch(getAllReviews())
  }

  useEffect(() => {
   handleAPICalling();
  }, [dispatch, register, addstore,deleteuser]);

  const totalRatings = 1247; // Sample rating count

  const openAddModal = (type) => {
    setModalType(type);
    setShowAddModal(true);
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Users },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'stores', label: 'Stores', icon: Store },
    { id: 'admins', label: 'Admins', icon: UserCheck },
    { id: 'logout', label: 'Logout', icon: LogOut }
  ];

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <Icon className="h-12 w-12 text-gray-400" />
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            
            // Handle logout separately
            if (item.id === 'logout') {
              return (
                <button
                  key={item.id}
                  onClick={handleLogout}
                  className="w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 transition-colors text-gray-700 hover:text-red-600"
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              );
            }
            
            // Handle regular navigation items
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 transition-colors ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                    : 'text-gray-700'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-semibold text-gray-900 capitalize">
              {activeTab === 'dashboard' ? 'Dashboard Overview' : activeTab}
            </h2>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  title="Total Users"
                  value={users?.length || 0}
                  icon={Users}
                  color="#3B82F6"
                />
                <StatCard
                  title="Total Stores"
                  value={stores?.length || 0}
                  icon={Store}
                  color="#10B981"
                />
                <StatCard
                  title="Total Ratings"
                  value={getallreviews?.[0]?.length}
                  icon={Star}
                  color="#F59E0B"
                />
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => openAddModal('user')}
                  className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500"
                >
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-blue-500" />
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">Add New User</h3>
                      <p className="text-sm text-gray-600">Create a new user account</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => openAddModal('store')}
                  className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500"
                >
                  <div className="flex items-center gap-3">
                    <Store className="h-8 w-8 text-green-500" />
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">Add New Store</h3>
                      <p className="text-sm text-gray-600">Register a new store</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => openAddModal('admin')}
                  className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-500"
                >
                  <div className="flex items-center gap-3">
                    <UserCheck className="h-8 w-8 text-purple-500" />
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">Add New Admin</h3>
                      <p className="text-sm text-gray-600">Create admin account</p>
                    </div>
                  </div>
                </button>
              </div>
              
              {/* Users Table */}
              <FilterableTable
                title="Quick Management"
                data={allusers || []}
                addLabel="Add User"
                icon={Users}
                color="#3B82F6"
                type="users"
              />
            </div>
          )}

          {activeTab === 'users' && (
            <DataTable
              title="Users Management"
              data={users || []}
              columns={['Name', 'Email', 'Role', 'address']}
              onAdd={() => openAddModal('user')}
              addLabel="Add User"
            />
          )}

          {activeTab === 'stores' && (
            <DataTable
              title="Stores Management"
              data={stores || []}
              columns={['store name', 'email', 'Location']}
              onAdd={() => openAddModal('store')}
              addLabel="Add Store"
            />
          )}

          {activeTab === 'admins' && (
            <DataTable
              title="Admins Management"
              data={admins || []}
              columns={['Name', 'Email', 'Address']}
              onAdd={() => openAddModal('admin')}
              addLabel="Add Admin"
            />
          )}
        </main>
      </div>

      {/* Modal */}
      {showAddModal && (
        <UserForm
          onClose={() => setShowAddModal(false)}
          title={modalType.charAt(0).toUpperCase() + modalType.slice(1)}
        />
      )}

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;