import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaGlobeAfrica, FaUserGraduate, FaHandsHelping, FaTachometerAlt, FaChevronDown,
  FaSignInAlt, FaSignOutAlt, FaKey, FaUser, FaClock, FaCheckCircle, FaTimesCircle,
  FaFilter, FaSearch, FaUsersCog, FaChartBar, FaUserShield, FaEdit, FaTrash, FaBan, FaUnlock, FaPrint, FaPlus,
  FaHeadset, FaTicketAlt, FaExclamationCircle, FaUserTie, FaUserEdit
} from 'react-icons/fa';
import * as XLSX from 'xlsx';

export default function Dash() {
  const navigate = useNavigate();
  const [submenus, setSubmenus] = useState({ reports: false });
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard | manage-accounts | account-reports | support-hub
  const userRole = localStorage.getItem('userRole') || 'admin';

  // Advanced filters for Accounts
  const [accountScholarship, setAccountScholarship] = useState('All');
  const [accountType, setAccountType] = useState('Admin'); // Admin | Applicant

  // Get user name from localStorage
  const userName = localStorage.getItem('userName') || 'Admin';
  const userFirstName = localStorage.getItem('userFirstName') || 'Admin';

  // Support Hub Modal State
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  // Filter states
  const [selectedScholarship, setSelectedScholarship] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedActivityType, setSelectedActivityType] = useState('All'); // All | Admin | Applicant
  const [searchQuery, setSearchQuery] = useState('');

  // Support Hub Filter States
  const [supportPriorityFilter, setSupportPriorityFilter] = useState('All');
  const [supportStatusFilter, setSupportStatusFilter] = useState('All');

  // Sample activities data for each scholarship
  const [activities] = useState({
    africa: [
      { id: 1, user: 'Ana Arriola', activity: 'Login', date: '2026-02-17 09:30', status: 'success', icon: <FaSignInAlt />, scholarship: 'Africa' },
      { id: 2, user: 'Angela Cacao', activity: 'Change Password', date: '2026-02-17 10:15', status: 'success', icon: <FaKey />, scholarship: 'Africa' },
      { id: 3, user: 'Mikaela Lantafe', activity: 'Logout', date: '2026-02-17 11:45', status: 'success', icon: <FaSignOutAlt />, scholarship: 'Africa' },
      { id: 4, user: 'Ana Arriola', activity: 'Profile Update', date: '2026-02-17 14:20', status: 'success', icon: <FaUser />, scholarship: 'Africa' },
      { id: 11, user: 'John Doe', activity: 'Login Failed', date: '2026-02-17 15:30', status: 'failed', icon: <FaTimesCircle />, scholarship: 'Africa' },
    ],
    vilma: [
      { id: 5, user: 'Jashia Deveza', activity: 'Login', date: '2026-02-17 08:45', status: 'success', icon: <FaSignInAlt />, scholarship: 'Vilma' },
      { id: 6, user: 'Abeth Andal', activity: 'Change Password', date: '2026-02-17 09:30', status: 'success', icon: <FaKey />, scholarship: 'Vilma' },
      { id: 7, user: 'Jashia Deveza', activity: 'Logout', date: '2026-02-17 12:00', status: 'success', icon: <FaSignOutAlt />, scholarship: 'Vilma' },
      { id: 12, user: 'Jane Smith', activity: 'Password Reset', date: '2026-02-17 13:15', status: 'pending', icon: <FaClock />, scholarship: 'Vilma' },
    ],
    tulong: [
      { id: 8, user: 'Kurt Yermo', activity: 'Login', date: '2026-02-17 07:30', status: 'success', icon: <FaSignInAlt />, scholarship: 'Tulong' },
      { id: 9, user: 'Raven Belen', activity: 'Profile Update', date: '2026-02-17 10:45', status: 'success', icon: <FaUser />, scholarship: 'Tulong' },
      { id: 10, user: 'Kurt Yermo', activity: 'Logout', date: '2026-02-17 13:15', status: 'success', icon: <FaSignOutAlt />, scholarship: 'Tulong' },
      { id: 13, user: 'Mark Johnson', activity: 'Account Locked', date: '2026-02-17 16:00', status: 'failed', icon: <FaTimesCircle />, scholarship: 'Tulong' },
    ]
  });

  // Mock data for Manage Accounts
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'Main Admin', email: 'admin@iskomats.com', role: 'admin', scholarship: 'All', type: 'Admin', status: 'active', joined: '2025-01-10' },
    { id: 2, name: 'Africa Admin', email: 'africa@iskomats.com', role: 'africa', scholarship: 'Africa', type: 'Admin', status: 'active', joined: '2025-02-05' },
    { id: 3, name: 'Vilma Admin', email: 'vilma@iskomats.com', role: 'vilma', scholarship: 'Vilma', type: 'Admin', status: 'active', joined: '2025-02-12' },
    { id: 4, name: 'Tulong Admin', email: 'tulong@iskomats.com', role: 'tulong', scholarship: 'Tulong', type: 'Admin', status: 'active', joined: '2025-02-20' },
    { id: 5, name: 'Ana Arriola', email: 'ana.arriola@example.com', role: 'user', scholarship: 'Africa', type: 'Applicant', status: 'active', joined: '2026-03-01' },
    { id: 6, name: 'Angela Cacao', email: 'angela.cacao@example.com', role: 'user', scholarship: 'Africa', type: 'Applicant', status: 'active', joined: '2026-03-02' },
    { id: 7, name: 'Jashia Deveza', email: 'jashia.deveza@example.com', role: 'user', scholarship: 'Vilma', type: 'Applicant', status: 'active', joined: '2026-03-03' },
    { id: 8, name: 'Kurt Yermo', email: 'kurt.yermo@example.com', role: 'user', scholarship: 'Tulong', type: 'Applicant', status: 'active', joined: '2026-03-04' },
    { id: 9, name: 'Test User', email: 'test@example.com', role: 'user', scholarship: 'All', type: 'Applicant', status: 'suspended', joined: '2026-01-15' },
  ]);

  const [supportTickets, setSupportTickets] = useState([
    { id: 'TIC-001', user: 'Ana Arriola', subject: 'Login Issue', priority: 'High', status: 'Pending', date: '2026-03-08', message: 'I cannot log in to my account even after resetting my password. It says "Invalid credentials" every time.', adminNotes: '' },
    { id: 'TIC-002', user: 'Kurt Yermo', subject: 'Document Verification', priority: 'Medium', status: 'In Progress', date: '2026-03-07', message: 'I uploaded my COR last week but it still says "Pending Verification". Can you check if the file is clear enough?', adminNotes: 'Checked the file, it is a bit blurry. Need to ask for a rescan.' },
    { id: 'TIC-003', user: 'Admin Africa', subject: 'Report Generation Error', priority: 'Low', status: 'Resolved', date: '2026-03-05', message: 'The Excel export for Feb activities is missing 2 entries from the 15th.', adminNotes: 'Bug fixed in last update.' },
  ]);

  const [accountSearch, setAccountSearch] = useState('');

  // Combine all activities for filtering
  const allActivities = useMemo(() => {
    return [...activities.africa, ...activities.vilma, ...activities.tulong];
  }, [activities]);

  // Filter activities based on selected filters
  const filteredActivities = useMemo(() => {
    return allActivities.filter(activity => {
      const scholarshipMatch = activity.scholarship === selectedScholarship || selectedScholarship === 'All';
      const statusMatch = activity.status === selectedStatus || selectedStatus === 'All';

      // Heuristic for activity type: Assume Admin role means Admin activity, else Applicant
      const acc = accounts.find(a => a.name === activity.user);
      const isActuallyAdmin = acc ? acc.type === 'Admin' : false;
      const typeMatch = selectedActivityType === 'All' ||
        (selectedActivityType === 'Admin' && isActuallyAdmin) ||
        (selectedActivityType === 'Applicant' && !isActuallyAdmin);

      const searchMatch = activity.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.activity.toLowerCase().includes(searchQuery.toLowerCase());
      return scholarshipMatch && statusMatch && typeMatch && searchMatch;
    });
  }, [allActivities, selectedScholarship, selectedStatus, searchQuery]);

  // Calculate statistics
  const statistics = useMemo(() => {
    const total = allActivities.length;
    const successful = allActivities.filter(a => a.status === 'success').length;
    const pending = allActivities.filter(a => a.status === 'pending').length;
    const failed = allActivities.filter(a => a.status === 'failed').length;

    return { total, successful, pending, failed };
  }, [allActivities]);

  const toggleSubmenu = (menu) => {
    setSubmenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const showSectionId = (sectionId) => {
    if (sectionId === 'africa') navigate('/dash-africa');
    if (sectionId === 'vilma') navigate('/dash-vilma');
    if (sectionId === 'tulong') navigate('/dash-tulong');
  };

  const isMenuActive = (menuId) => {
    return false; // Main dashboard doesn't have active submenus
  };

  const getActivityIcon = (status) => {
    switch (status) {
      case 'success': return <FaCheckCircle className="text-green-600" />;
      case 'pending': return <FaClock className="text-yellow-600" />;
      case 'failed': return <FaTimesCircle className="text-red-600" />;
      default: return <FaClock className="text-gray-600" />;
    }
  };

  const exportAccountsToExcel = () => {
    const dataToExport = accounts.map(acc => ({
      Name: acc.name,
      Email: acc.email,
      Role: acc.role,
      Status: acc.status,
      'Joined Date': acc.joined
    }));
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Accounts Report');
    XLSX.writeFile(wb, 'Iskomats_Accounts_Report.xlsx');
  };

  const deleteAccount = (id) => {
    if (confirm('Are you sure you want to delete this account?')) {
      setAccounts(accounts.filter(acc => acc.id !== id));
    }
  };

  const toggleAccountStatus = (id) => {
    setAccounts(accounts.map(acc => {
      if (acc.id === id) {
        return { ...acc, status: acc.status === 'active' ? 'suspended' : 'active' };
      }
      return acc;
    }));
  };

  const updateTicketStatus = (id, newStatus) => {
    setSupportTickets(supportTickets.map(ticket => {
      if (ticket.id === id) return { ...ticket, status: newStatus };
      return ticket;
    }));
  };

  const saveTicketDetails = (id, newStatus, newNotes) => {
    setSupportTickets(supportTickets.map(ticket => {
      if (ticket.id === id) return { ...ticket, status: newStatus, adminNotes: newNotes };
      return ticket;
    }));
    setIsSupportModalOpen(false);
  };

  const openTicketManager = (ticket) => {
    setSelectedTicket(ticket);
    setIsSupportModalOpen(true);
  };

  const renderActivities = (scholarshipActivities, title) => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-[#800020] mb-4 flex items-center gap-2">
        {title === 'Africa' && <FaGlobeAfrica />}
        {title === 'Vilma' && <FaUserGraduate />}
        {title === 'Tulong' && <FaHandsHelping />}
        {title} Scholarship Activities
      </h3>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {scholarshipActivities.map(activity => (
          <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="text-[#800020]">
              {activity.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">{activity.user}</span>
                <span className="text-sm text-gray-600">{activity.activity}</span>
              </div>
              <div className="text-xs text-gray-500">{activity.date}</div>
            </div>
            <div className="flex items-center gap-2">
              {getActivityIcon(activity.status)}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => showSectionId(title.toLowerCase())}
        className="mt-4 w-full py-2 bg-[#800020] text-white rounded-lg hover:bg-[#650018] transition-colors font-semibold"
      >
        View Full {title} Dashboard
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50/30 pt-20">
      <aside className="w-64 flex-shrink-0 bg-gradient-to-b from-[#800020] to-[#650018] text-white shadow-xl flex flex-col">
        <h2 className="text-center text-xl font-bold py-6 flex items-center justify-center gap-2">
          <FaTachometerAlt className="text-2xl" /> Admin Dashboard
        </h2>
        <nav className="flex-1 px-4 space-y-2 py-4">
          <div className="text-xs font-bold uppercase tracking-wider opacity-50 mb-2">Main Menu</div>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'}`}
          >
            <FaTachometerAlt /> Dashboard
          </button>

          {(userRole === 'admin' || userRole === 'main' || !userRole) && (
            <>
              <button
                onClick={() => setActiveTab('manage-accounts')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'manage-accounts' ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'}`}
              >
                <FaUsersCog /> Manage Accounts
              </button>

              <button
                onClick={() => setActiveTab('account-reports')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'account-reports' ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'}`}
              >
                <FaChartBar /> Account Reports
              </button>

              <button
                onClick={() => setActiveTab('support-hub')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'support-hub' ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'}`}
              >
                <FaHeadset /> Support Hub
              </button>
            </>
          )}

        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        <header className="bg-white rounded-xl shadow-sm px-6 py-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#800020]">
            <FaTachometerAlt className="text-blue-600" />
            <span className="font-bold text-xl">Scholarship Activities Dashboard</span>
          </div>
          <div className="text-lg font-semibold text-[#800020]">
            Hello, {userFirstName}! 👋
          </div>
        </header>

        {/* Conditional Rendering based on activeTab */}
        {activeTab === 'dashboard' && (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#800020]/10 p-4 rounded-xl text-center border-l-4 border-[#800020]">
                <div className="text-2xl font-bold text-[#800020]">{statistics.total}</div>
                <div className="text-sm text-gray-600">Total Activities</div>
              </div>
              <div className="bg-green-50 p-4 rounded-xl text-center border-l-4 border-green-600">
                <div className="text-2xl font-bold text-green-600">{statistics.successful}</div>
                <div className="text-sm text-gray-600">Successful</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl text-center border-l-4 border-yellow-600">
                <div className="text-2xl font-bold text-yellow-600">{statistics.pending}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="bg-red-50 p-4 rounded-xl text-center border-l-4 border-red-600">
                <div className="text-2xl font-bold text-red-600">{statistics.failed}</div>
                <div className="text-sm text-gray-600">Failed</div>
              </div>
            </div>

            {/* Filter Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <FaFilter className="text-[#800020]" />
                <h3 className="text-lg font-semibold text-[#800020]">Filters</h3>
              </div>
              <div className="flex flex-wrap gap-4">
                <select
                  className="p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#800020]"
                  value={selectedScholarship}
                  onChange={(e) => setSelectedScholarship(e.target.value)}
                >
                  <option value="All">All Scholarships</option>
                  <option value="Africa">Africa</option>
                  <option value="Vilma">Vilma</option>
                  <option value="Tulong">Tulong</option>
                </select>

                <select
                  className="p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#800020] text-sm font-semibold"
                  value={selectedActivityType}
                  onChange={(e) => setSelectedActivityType(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Admin">Admin Activities</option>
                  <option value="Applicant">Applicant Activities</option>
                </select>

                <select
                  className="p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#800020]"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="success">Successful</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>

                <div className="flex-1 relative">
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by user or activity..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#800020] text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Activities Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-[#800020]">Activities ({filteredActivities.length})</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-[#800020] text-white">
                      <th className="px-6 py-3 text-left font-semibold">Scholarship</th>
                      <th className="px-6 py-3 text-left font-semibold">User</th>
                      <th className="px-6 py-3 text-left font-semibold">Activity</th>
                      <th className="px-6 py-3 text-left font-semibold">Date</th>
                      <th className="px-6 py-3 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredActivities.length > 0 ? (
                      filteredActivities.map(activity => (
                        <tr key={activity.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-3">
                            <div className="flex items-center gap-2">
                              {activity.scholarship === 'Africa' && <FaGlobeAfrica className="text-[#800020]" />}
                              {activity.scholarship === 'Vilma' && <FaUserGraduate className="text-[#800020]" />}
                              {activity.scholarship === 'Tulong' && <FaHandsHelping className="text-[#800020]" />}
                              {activity.scholarship}
                            </div>
                          </td>
                          <td className="px-6 py-3 font-medium">{activity.user}</td>
                          <td className="px-6 py-3">
                            <div className="flex items-center gap-2">
                              <span className="text-[#800020]">{activity.icon}</span>
                              {activity.activity}
                            </div>
                          </td>
                          <td className="px-6 py-3">{activity.date}</td>
                          <td className="px-6 py-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${activity.status === 'success' ? 'bg-green-100 text-green-800' :
                              activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                              {getActivityIcon(activity.status)}
                              {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                          No activities found matching the current filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'manage-accounts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h3 className="text-xl font-bold text-[#800020]">User Management</h3>
            </div>

            {/* Sub-navigation for Scholarships and Type */}
            <div className="bg-white p-2 rounded-xl shadow-sm flex flex-wrap gap-2 text-sm font-semibold mb-6">
              <button
                onClick={() => setAccountScholarship('All')}
                className={`px-4 py-2 rounded-lg transition-all ${accountScholarship === 'All' ? 'bg-[#800020] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                All Scholarships
              </button>
              <button
                onClick={() => setAccountScholarship('Africa')}
                className={`px-4 py-2 rounded-lg transition-all ${accountScholarship === 'Africa' ? 'bg-[#800020] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Africa
              </button>
              <button
                onClick={() => setAccountScholarship('Vilma')}
                className={`px-4 py-2 rounded-lg transition-all ${accountScholarship === 'Vilma' ? 'bg-[#800020] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Vilma
              </button>
              <button
                onClick={() => setAccountScholarship('Tulong')}
                className={`px-4 py-2 rounded-lg transition-all ${accountScholarship === 'Tulong' ? 'bg-[#800020] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Tulong
              </button>
              <div className="flex-1"></div>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setAccountType('Admin')}
                  className={`px-4 py-1.5 rounded-md transition-all flex items-center gap-2 ${accountType === 'Admin' ? 'bg-white text-[#800020] shadow-sm' : 'text-gray-500'}`}
                >
                  <FaUserTie /> Admins
                </button>
                <button
                  onClick={() => setAccountType('Applicant')}
                  className={`px-4 py-1.5 rounded-md transition-all flex items-center gap-2 ${accountType === 'Applicant' ? 'bg-white text-[#800020] shadow-sm' : 'text-gray-500'}`}
                >
                  <FaUserGraduate /> Applicants
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="relative mb-6">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${accountType.toLowerCase()}s by name or email...`}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#800020]"
                  value={accountSearch}
                  onChange={(e) => setAccountSearch(e.target.value)}
                />
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-[#800020] text-white text-xs uppercase tracking-wider">
                      <th className="px-6 py-3 text-left font-semibold">Name</th>
                      <th className="px-6 py-3 text-left font-semibold">Email</th>
                      <th className="px-6 py-3 text-left font-semibold">Scholarship</th>
                      <th className="px-6 py-3 text-left font-semibold">Status</th>
                      <th className="px-6 py-3 text-left font-semibold">Joined</th>
                      <th className="px-6 py-3 text-center font-semibold text-xs tracking-widest bg-[#650018]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {accounts.filter(acc =>
                      (accountScholarship === 'All' || acc.scholarship === accountScholarship) &&
                      (acc.type === accountType) &&
                      (acc.name.toLowerCase().includes(accountSearch.toLowerCase()) || acc.email.toLowerCase().includes(accountSearch.toLowerCase()))
                    ).map(account => (
                      <tr key={account.id} className="hover:bg-gray-50 transition-colors text-sm">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#800020]/10 flex items-center justify-center text-[#800020]">
                              <FaUser />
                            </div>
                            <span className="font-semibold text-gray-900">{account.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{account.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded text-xs font-semibold uppercase ${account.scholarship === 'Africa' ? 'bg-blue-100 text-blue-700' :
                            account.scholarship === 'Vilma' ? 'bg-purple-100 text-purple-700' :
                              account.scholarship === 'Tulong' ? 'bg-orange-100 text-orange-700' :
                                'bg-gray-100 text-gray-700'
                            }`}>
                            {account.scholarship}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${account.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">{account.joined}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => toggleAccountStatus(account.id)}
                              className={`p-2 rounded-lg transition-all ${account.status === 'active' ? 'text-amber-600 hover:bg-amber-50' : 'text-green-600 hover:bg-green-50'}`}
                              title={account.status === 'active' ? 'Deactivate' : 'Reactivate'}
                            >
                              {account.status === 'active' ? <FaBan /> : <FaUnlock />}
                            </button>
                            <button
                              onClick={() => deleteAccount(account.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              title="Remove Account"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'account-reports' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h3 className="text-xl font-bold text-[#800020]">Account Analytics & Reports</h3>
              <button
                onClick={exportAccountsToExcel}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2 font-semibold"
              >
                <FaPrint /> Export Account Data
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <FaUserShield className="text-6xl" />
                </div>
                <h4 className="text-gray-500 font-bold text-xs uppercase mb-1 tracking-wider">Role Distribution</h4>
                <div className="mt-4 space-y-3">
                  {['admin', 'africa', 'vilma', 'tulong', 'user'].map(role => {
                    const count = accounts.filter(a => a.role === role).length;
                    const percentage = (count / accounts.length) * 100;
                    return (
                      <div key={role} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize font-semibold">{role}</span>
                          <span className="text-gray-500">{count}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div className="bg-[#800020] h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="md:col-span-1 lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h4 className="text-gray-500 font-bold text-xs uppercase mb-4 tracking-wider">Recent Account Activities</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 border-b">
                        <th className="pb-3 font-semibold uppercase text-xs">Type</th>
                        <th className="pb-3 font-semibold uppercase text-xs">Description</th>
                        <th className="pb-3 font-semibold uppercase text-xs">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 pr-4"><span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Failed</span></td>
                        <td className="py-3">Multiple failed login attempts for 'test@example.com'</td>
                        <td className="py-3 text-gray-500">2026-02-17 15:30</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 pr-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">System</span></td>
                        <td className="py-3">Account 'test@example.com' suspended due to inactivity</td>
                        <td className="py-3 text-gray-500">2026-02-17 16:00</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 pr-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Security</span></td>
                        <td className="py-3">Password reset success for 'africa@iskomats.com'</td>
                        <td className="py-3 text-gray-500">2026-02-17 10:15</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'support-hub' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h3 className="text-xl font-bold text-[#800020]">Support Hub</h3>
              <div className="bg-white p-2 rounded-lg flex gap-4 text-xs font-bold border border-gray-100">
                <div className="flex items-center gap-2 text-amber-600">
                  <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
                  {supportTickets.filter(t => t.status === 'Pending').length} Pending
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  {supportTickets.filter(t => t.status === 'In Progress').length} Active
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-600"></span>
                  {supportTickets.filter(t => t.status === 'Resolved').length} Solved
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between flex-wrap gap-4">
                  <h4 className="font-bold text-[#800020]">Open Support Tickets</h4>

                  <div className="flex gap-2">
                    <select
                      className="p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#800020] text-xs font-bold"
                      value={supportPriorityFilter}
                      onChange={(e) => setSupportPriorityFilter(e.target.value)}
                    >
                      <option value="All">All Priority</option>
                      <option value="High">High Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="Low">Low Priority</option>
                    </select>

                    <select
                      className="p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#800020] text-xs font-bold"
                      value={supportStatusFilter}
                      onChange={(e) => setSupportStatusFilter(e.target.value)}
                    >
                      <option value="All">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="In Progress">Active</option>
                      <option value="Resolved">Solved</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FaTicketAlt /> {supportTickets.filter(t =>
                      (supportPriorityFilter === 'All' || t.priority === supportPriorityFilter) &&
                      (supportStatusFilter === 'All' || t.status === supportStatusFilter)
                    ).length} Total
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500 border-b border-gray-100">
                        <th className="px-6 py-3 font-semibold">Ticket ID</th>
                        <th className="px-6 py-3 font-semibold">User</th>
                        <th className="px-6 py-3 font-semibold">Issue</th>
                        <th className="px-6 py-3 font-semibold text-center">Priority</th>
                        <th className="px-6 py-3 font-semibold text-center">Status</th>
                        <th className="px-6 py-3 font-semibold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {supportTickets.filter(t =>
                        (supportPriorityFilter === 'All' || t.priority === supportPriorityFilter) &&
                        (supportStatusFilter === 'All' || t.status === supportStatusFilter)
                      ).map(ticket => (
                        <tr key={ticket.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 font-mono text-xs text-[#800020]">{ticket.id}</td>
                          <td className="px-6 py-4 font-semibold">{ticket.user}</td>
                          <td className="px-6 py-4">{ticket.subject}</td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${ticket.priority === 'High' ? 'bg-red-100 text-red-700' :
                              ticket.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                              {ticket.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <select
                              value={ticket.status}
                              onChange={(e) => updateTicketStatus(ticket.id, e.target.value)}
                              className={`text-[10px] font-bold border-none bg-transparent focus:ring-0 cursor-pointer ${ticket.status === 'Pending' ? 'text-amber-600' :
                                ticket.status === 'In Progress' ? 'text-blue-600' :
                                  'text-green-600'
                                }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Progress">Active</option>
                              <option value="Resolved">Solved</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => openTicketManager(ticket)}
                              className="text-[#800020] hover:underline font-bold text-xs"
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-[#800020] to-[#650018] p-6 rounded-xl text-white shadow-lg overflow-hidden relative">
                  <FaHeadset className="absolute -bottom-4 -right-4 text-8xl opacity-10" />
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <FaExclamationCircle /> Urgent Issues
                  </h4>
                  <div className="space-y-4">
                    {supportTickets.filter(t => t.priority === 'High').map(t => (
                      <div key={t.id} className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-mono text-white/70">{t.id}</span>
                          <span className="text-white/70">{t.date}</span>
                        </div>
                        <p className="text-sm font-semibold">{t.subject}</p>
                        <p className="text-xs text-white/80">{t.user}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h4 className="font-bold text-gray-900 border-b pb-3 mb-4">Support Stats</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Resolution Rate</span>
                      <span className="font-bold text-[#800020]">85%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="bg-[#800020] h-1.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Avg Response Time</span>
                      <span className="font-bold text-[#800020]">1.2 hrs</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="bg-[#800020] h-1.5 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Ticket Management Modal */}
      {isSupportModalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#800020] p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <FaTicketAlt /> Manage Ticket {selectedTicket.id}
                </h3>
                <p className="text-white/70 text-sm mt-1">Submitted by {selectedTicket.user} on {selectedTicket.date}</p>
              </div>
              <button
                onClick={() => setIsSupportModalOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <FaTimesCircle className="text-2xl" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Issue Subject</label>
                  <p className="font-semibold text-gray-900">{selectedTicket.subject}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Priority Level</label>
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${selectedTicket.priority === 'High' ? 'bg-red-100 text-red-700' :
                    selectedTicket.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                    {selectedTicket.priority}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-2">User's Message / Issue Detail</label>
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-gray-800 text-sm leading-relaxed italic">
                  "{selectedTicket.message}"
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Ticket Status</label>
                  <div className="flex gap-2">
                    {['Pending', 'In Progress', 'Resolved'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setSelectedTicket({ ...selectedTicket, status })}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg border-2 transition-all ${selectedTicket.status === status
                          ? 'bg-[#800020] border-[#800020] text-white'
                          : 'border-gray-200 text-gray-500 hover:border-[#800020]/30'
                          }`}
                      >
                        {status === 'In Progress' ? 'Active' : status === 'Resolved' ? 'Solved' : status}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Internal Notes</label>
                  <textarea
                    value={selectedTicket.adminNotes}
                    onChange={(e) => setSelectedTicket({ ...selectedTicket, adminNotes: e.target.value })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#800020] outline-none min-h-[80px]"
                    placeholder="Add private notes for admins..."
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setIsSupportModalOpen(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => saveTicketDetails(selectedTicket.id, selectedTicket.status, selectedTicket.adminNotes)}
                  className="flex-1 py-3 bg-[#800020] text-white font-bold rounded-xl hover:bg-[#650018] shadow-lg shadow-red-900/20 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
