import { useEffect, useMemo, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import logo from '../../assets/scholarship-logo.png';
import {
  FaCheckCircle,
  FaChevronDown,
  FaClock,
  FaInbox,
  FaPaperPlane,
  FaPrint,
  FaRobot,
  FaSearch,
  FaStar,
  FaTachometerAlt,
  FaTimesCircle,
  FaUserCircle,
  FaUserGraduate,
  FaUsers,
  FaImage,
  FaUpload,
  FaEdit,
  FaTrash,
  FaPlus,
} from 'react-icons/fa';
import * as XLSX from 'xlsx';

Chart.register(...registerables);

const initialVilmaData = {
  applicants: [
    {
      name: 'Jashia Deveza',
      lastName: 'Deveza',
      firstName: 'Jashia',
      middleName: 'M.',
      maidenName: '',
      dob: '2005-08-20',
      pob: 'Batangas City',
      sex: 'Female',
      citizenship: 'Filipino',
      street: '789 Maple Ave',
      barangay: 'Poblacion Barangay 3',
      municipality: 'Lipa City',
      province: 'Batangas',
      zipCode: '4217',
      mobileNumber: '09170002222',
      emailAddress: 'jashia.deveza@example.com',
      disabilityType: 'None',
      tribalMembership: 'None',
      educationalAssistance: 'No',
      educationalAssistanceDetails: '',
      year: '2nd',
      course: 'BSIT',
      school: 'XYZ School',
      schoolId: '87654321',
      schoolAddress: 'Batangas City',
      schoolSector: 'Private',
      grade: 92,
      financial: 'Low',
      location: 'Poblacion Barangay 3, Adya, Batangas',
      family: {
        father: { name: 'John', status: 'Living', job: 'Teacher', phone: '09172345678' },
        mother: { name: 'Mary', status: 'Living', job: 'Nurse', phone: '09173456789' },
        grossIncome: '250,000',
        siblingsCount: 2
      },
      studentContact: { phone: '09170002222', email: 'jashia.deveza@example.com' },
      education: 'Graduated with honors',
      signature: 'https://i.imgur.com/2h7z2S.jpg',
      indigencyFiles: [
        { src: 'https://i.imgur.com/2h7z2S.jpg', type: 'image/jpeg' },
        { src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', type: 'video/mp4' },
      ],
      certificateFiles: [
        { src: 'https://i.imgur.com/2h7z2S.jpg', type: 'image/jpeg' },
        { src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', type: 'video/mp4' },
      ],
      gradesFiles: [
        { src: 'https://i.imgur.com/2h7z2S.jpg', type: 'image/jpeg' },
        { src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', type: 'video/mp4' }
      ],
      idFiles: [
        { src: 'https://i.imgur.com/2h7z2S.jpg', type: 'image/jpeg' },
        { src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', type: 'video/mp4' },
      ],
    },
    {
      name: 'Abeth Andal',
      lastName: 'Andal',
      firstName: 'Abeth',
      middleName: 'G.',
      maidenName: '',
      dob: '2004-12-15',
      pob: 'Lipa City',
      sex: 'Female',
      citizenship: 'Filipino',
      street: '101 Pine St',
      barangay: 'Tambo',
      municipality: 'Lipa City',
      province: 'Batangas',
      zipCode: '4217',
      mobileNumber: '09170002223',
      emailAddress: 'abeth.andal@example.com',
      disabilityType: 'None',
      tribalMembership: 'None',
      educationalAssistance: 'No',
      educationalAssistanceDetails: '',
      year: '3rd',
      course: 'Nursing',
      school: 'Holy Cross Academy',
      schoolId: '44556677',
      schoolAddress: 'Tambo, Batangas',
      schoolSector: 'Private',
      grade: 89,
      financial: 'Low',
      location: 'Tambo, Adya, Batangas',
      family: {
        father: { name: 'Juan Andal', status: 'Deceased', job: 'Construction Worker', phone: 'N/A' },
        mother: { name: 'Rosa Andal', status: 'Living', job: 'Caregiver', phone: '09173456790' },
        grossIncome: '80,000',
        siblingsCount: 3
      },
      studentContact: { phone: '09170002223', email: 'abeth.andal@example.com' },
      education: 'Dedicated student, consistent performer',
      signature: 'https://i.imgur.com/2h7z2S.jpg',
      indigencyFiles: [
        { src: 'https://i.imgur.com/2h7z2S.jpg', type: 'image/jpeg' },
        { src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', type: 'video/mp4' },
      ],
      certificateFiles: [{ src: 'https://i.imgur.com/2h7z2S.jpg', type: 'image/jpeg' }],
      gradesFiles: [{ src: 'https://i.imgur.com/2h7z2S.jpg', type: 'image/jpeg' }],
      idFiles: [
        { src: 'https://i.imgur.com/2h7z2S.jpg', type: 'image/jpeg' },
        { src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', type: 'video/mp4' },
      ],
    },
  ],
  accepted: [],
  declined: [],
  inbox: [
    {
      id: '3',
      studentName: 'Jashia Deveza',
      studentEmail: 'jashia.deveza@example.com',
      studentPhone: '09170002222',
      subject: 'Scholarship Requirements',
      message: 'Good day! I would like to know more about the scholarship requirements and eligibility criteria.',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      read: true,
      starred: false,
      replies: [
        {
          id: 'r1',
          text: 'Thank you for your inquiry. Please check the scholarship details page for all requirements.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          from: 'Admin',
        },
      ],
    },
  ],
  scholarshipPosts: [
    {
      id: '1',
      title: 'Vilma Excellence Scholarship 2026',
      deadline: '2026-03-20',
      eligibility: 'Adya residents with minimum 80% grade',
      slots: 25,
      description: 'Special scholarship program for outstanding students from Adya. Covers partial tuition and book allowance.',
      images: [
        { id: 1, name: 'vilma-scholarship.jpg', url: 'https://i.imgur.com/2h7z2S.jpg' }
      ],
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    },
    {
      id: '2',
      title: 'Community Service Scholarship',
      deadline: '2026-04-15',
      eligibility: 'Students with active community service involvement',
      slots: 15,
      description: 'Scholarship for students who demonstrate exceptional commitment to community service and leadership.',
      images: [
        { id: 2, name: 'community-service.jpg', url: 'https://i.imgur.com/2h7z2S.jpg' }
      ],
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    }
  ],
  historicalData: {
    monthlyApplications: [
      { month: '2025-06', applications: 32, accepted: 8, declined: 5 },
      { month: '2025-07', applications: 38, accepted: 10, declined: 7 },
      { month: '2025-08', applications: 28, accepted: 7, declined: 4 },
      { month: '2025-09', applications: 45, accepted: 12, declined: 8 },
      { month: '2025-10', applications: 52, accepted: 15, declined: 10 },
      { month: '2025-11', applications: 61, accepted: 18, declined: 12 },
      { month: '2025-12', applications: 68, accepted: 20, declined: 14 },
      { month: '2026-01', applications: 58, accepted: 17, declined: 11 },
      { month: '2026-02', applications: 55, accepted: 16, declined: 9 },
    ],
    courseDistribution: [
      { course: 'Nursing', count: 38, percentage: 35 },
      { course: 'BSIT', count: 32, percentage: 30 },
      { course: 'Education', count: 22, percentage: 20 },
      { course: 'Business', count: 16, percentage: 15 },
    ],
    financialBreakdown: [
      { level: 'Very Low', count: 42, percentage: 39 },
      { level: 'Low', count: 48, percentage: 44 },
      { level: 'Medium', count: 14, percentage: 13 },
      { level: 'High', count: 4, percentage: 4 },
    ],
    locationStats: [
      { location: 'Adya', count: 12, percentage: 5 },
      { location: 'Anilao', count: 15, percentage: 6 },
      { location: 'Anilao-Labac', count: 8, percentage: 3 },
      { location: 'Antipolo del Norte', count: 10, percentage: 4 },
      { location: 'Antipolo del Sur', count: 9, percentage: 4 },
      { location: 'Bagong Pook', count: 14, percentage: 6 },
      { location: 'Balintawak', count: 20, percentage: 8 },
      { location: 'Banaybanay', count: 18, percentage: 7 },
      { location: 'Bolbok', count: 25, percentage: 10 },
      { location: 'Bugtong na Pulo', count: 7, percentage: 3 },
      { location: 'Bulacnin', count: 12, percentage: 5 },
      { location: 'Bulaklakan', count: 5, percentage: 2 },
      { location: 'Calamias', count: 6, percentage: 2 },
      { location: 'Cumba', count: 4, percentage: 2 },
      { location: 'Dagatan', count: 16, percentage: 7 },
      { location: 'Duhatan', count: 8, percentage: 3 },
      { location: 'Halang', count: 11, percentage: 5 },
      { location: 'Inosloban', count: 22, percentage: 9 },
      { location: 'Kayumanggi', count: 13, percentage: 5 },
      { location: 'Latag', count: 17, percentage: 7 },
      { location: 'Lodlod', count: 15, percentage: 6 },
      { location: 'Lumbang', count: 9, percentage: 4 },
      { location: 'Mabini', count: 10, percentage: 4 },
      { location: 'Malagonlong', count: 6, percentage: 2 },
      { location: 'Malitlit', count: 7, percentage: 3 },
      { location: 'Marauoy', count: 14, percentage: 6 },
      { location: 'Mataas na Lupa', count: 19, percentage: 8 },
      { location: 'Munting Pulo', count: 5, percentage: 2 },
      { location: 'Pagolingin Bata', count: 4, percentage: 2 },
      { location: 'Pagolingin East', count: 6, percentage: 2 },
      { location: 'Pagolingin West', count: 5, percentage: 2 },
      { location: 'Pangao', count: 8, percentage: 3 },
      { location: 'Pinagkawitan', count: 12, percentage: 5 },
      { location: 'Pinagtongulan', count: 7, percentage: 3 },
      { location: 'Plaridel', count: 9, percentage: 4 },
      { location: 'Poblacion Barangay 1', count: 11, percentage: 5 },
      { location: 'Poblacion Barangay 2', count: 10, percentage: 4 },
      { location: 'Poblacion Barangay 3', count: 13, percentage: 5 },
      { location: 'Poblacion Barangay 4', count: 12, percentage: 5 },
      { location: 'Poblacion Barangay 5', count: 14, percentage: 6 },
      { location: 'Poblacion Barangay 6', count: 11, percentage: 5 },
      { location: 'Poblacion Barangay 7', count: 10, percentage: 4 },
      { location: 'Poblacion Barangay 8', count: 9, percentage: 4 },
      { location: 'Poblacion Barangay 9', count: 8, percentage: 3 },
      { location: 'Poblacion Barangay 9-A', count: 7, percentage: 3 },
      { location: 'Poblacion Barangay 10', count: 6, percentage: 2 },
      { location: 'Poblacion Barangay 11', count: 5, percentage: 2 },
      { location: 'Poblacion Barangay 12', count: 4, percentage: 2 },
      { location: 'Pusil', count: 7, percentage: 3 },
      { location: 'Quezon', count: 8, percentage: 3 },
      { location: 'Rizal', count: 11, percentage: 5 },
      { location: 'Sabang', count: 21, percentage: 9 },
      { location: 'Sampaguita', count: 6, percentage: 2 },
      { location: 'San Benito', count: 5, percentage: 2 },
      { location: 'San Carlos', count: 18, percentage: 7 },
      { location: 'San Celestino', count: 7, percentage: 3 },
      { location: 'San Francisco', count: 10, percentage: 4 },
      { location: 'San Guillermo', count: 6, percentage: 2 },
      { location: 'San Isidro (formerly Sapac)', count: 9, percentage: 4 },
      { location: 'San Jose', count: 11, percentage: 5 },
      { location: 'San Lucas', count: 15, percentage: 6 },
      { location: 'San Salvador', count: 8, percentage: 3 },
      { location: 'San Sebastian (Balagbag)', count: 12, percentage: 5 },
      { location: 'Santo Niño', count: 7, percentage: 3 },
      { location: 'Santo Toribio', count: 6, percentage: 2 },
      { location: 'Sico', count: 14, percentage: 6 },
      { location: 'Talisay', count: 5, percentage: 2 },
      { location: 'Tambo', count: 23, percentage: 9 },
      { location: 'Tangob', count: 4, percentage: 2 },
      { location: 'Tanguay', count: 6, percentage: 2 },
      { location: 'Tibig', count: 8, percentage: 3 },
      { location: 'Tipacan', count: 9, percentage: 4 },
    ],
    gradeRanges: [
      { range: '90-100', count: 22, percentage: 20 },
      { range: '85-89', count: 35, percentage: 33 },
      { range: '80-84', count: 28, percentage: 26 },
      { range: '75-79', count: 18, percentage: 17 },
      { range: 'Below 75', count: 3, percentage: 4 },
    ],
    performanceMetrics: {
      averageProcessingTime: 3.8, // days
      acceptanceRate: 30.2, // percentage
      applicationCompletionRate: 82.1, // percentage
      satisfactionScore: 4.7, // out of 5
    }
  }
};

export default function DashVilma() {
  // Get user name from localStorage
  const userName = localStorage.getItem('userName') || 'Admin';
  const userFirstName = localStorage.getItem('userFirstName') || 'Admin';

  const [section, setSection] = useState('track');
  const [trackTab, setTrackTab] = useState('all');
  const [data, setData] = useState(initialVilmaData);
  const [searchTrack, setSearchTrack] = useState('');
  const [viewApplicant, setViewApplicant] = useState(null); // { listType, index }
  const [inboxSearch, setInboxSearch] = useState('');
  const [inboxFilter, setInboxFilter] = useState('all'); // all | pending | accepted
  const [viewMessage, setViewMessage] = useState(null); // { messageId }
  const [replyText, setReplyText] = useState('');
  const [recommendationModal, setRecommendationModal] = useState(false);
  const [recommended, setRecommended] = useState([]);
  const [imageModalSrc, setImageModalSrc] = useState(null);
  const [scholarshipImages, setScholarshipImages] = useState([]);
  const [manageMode, setManageMode] = useState('list'); // create | edit | list
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    deadline: '',
    eligibility: '',
    slots: '',
    description: ''
  });
  const pieRef = useRef(null);
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const courseChartRef = useRef(null);
  const financialChartRef = useRef(null);
  const chartInstance = useRef(null);
  const lineChartInstance = useRef(null);
  const barChartInstance = useRef(null);
  const courseChartInstance = useRef(null);
  const financialChartInstance = useRef(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
      file: file
    }));
    setScholarshipImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (imageId) => {
    setScholarshipImages(prev => {
      const image = prev.find(img => img.id === imageId);
      if (image && image.url.startsWith('blob:')) {
        URL.revokeObjectURL(image.url);
      }
      return prev.filter(img => img.id !== imageId);
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      deadline: '',
      eligibility: '',
      slots: '',
      description: ''
    });
    setScholarshipImages([]);
    setEditingPost(null);
    setManageMode('create');
  };

  useEffect(() => {
    if (section === 'manage' && manageMode !== 'list') {
      setManageMode('list');
      resetForm();
    }
  }, [section]);

  const saveScholarshipPost = () => {
    if (!formData.title || !formData.deadline || !formData.eligibility || !formData.slots || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    const newPost = {
      id: manageMode === 'edit' ? editingPost.id : Date.now().toString(),
      title: formData.title,
      deadline: formData.deadline,
      eligibility: formData.eligibility,
      slots: parseInt(formData.slots),
      description: formData.description,
      images: scholarshipImages,
      createdAt: manageMode === 'edit' ? editingPost.createdAt : new Date().toISOString(),
      status: 'active'
    };

    if (manageMode === 'edit') {
      setData(prev => ({
        ...prev,
        scholarshipPosts: prev.scholarshipPosts.map(post =>
          post.id === editingPost.id ? newPost : post
        )
      }));
    } else {
      setData(prev => ({
        ...prev,
        scholarshipPosts: [...prev.scholarshipPosts, newPost]
      }));
    }

    resetForm();
    setManageMode('list');
  };

  const editPost = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      deadline: post.deadline,
      eligibility: post.eligibility,
      slots: post.slots.toString(),
      description: post.description
    });
    setScholarshipImages(post.images || []);
    setManageMode('edit');
  };

  const deletePost = (postId) => {
    if (confirm('Are you sure you want to delete this scholarship post?')) {
      setData(prev => ({
        ...prev,
        scholarshipPosts: prev.scholarshipPosts.filter(post => post.id !== postId)
      }));
    }
  };

  const stats = useMemo(() => {
    const total = data.applicants.length + data.accepted.length + data.declined.length;
    return { total, accepted: data.accepted.length, declined: data.declined.length, pending: data.applicants.length };
  }, [data]);

  useEffect(() => {
    if (section !== 'reports') return;

    // Cleanup function for all charts
    const cleanupCharts = () => {
      if (chartInstance.current) { chartInstance.current.destroy(); chartInstance.current = null; }
      if (lineChartInstance.current) { lineChartInstance.current.destroy(); lineChartInstance.current = null; }
      if (barChartInstance.current) { barChartInstance.current.destroy(); barChartInstance.current = null; }
      if (courseChartInstance.current) { courseChartInstance.current.destroy(); courseChartInstance.current = null; }
      if (financialChartInstance.current) { financialChartInstance.current.destroy(); financialChartInstance.current = null; }
    };

    // Pie Chart for Status Overview
    if (pieRef.current) {
      const ctx = pieRef.current.getContext('2d');
      if (chartInstance.current) chartInstance.current.destroy();
      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Accepted', 'Declined', 'Pending'],
          datasets: [{
            data: [stats.accepted, stats.declined, stats.pending],
            backgroundColor: ['#198754', '#dc3545', '#ffc107'],
            borderWidth: 2,
            borderColor: '#fff',
          }],
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } },
      });
    }

    // Line Chart for Application Trends
    if (lineChartRef.current) {
      const ctx = lineChartRef.current.getContext('2d');
      if (lineChartInstance.current) lineChartInstance.current.destroy();
      lineChartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.historicalData.monthlyApplications.map(m => m.month),
          datasets: [
            {
              label: 'Applications',
              data: data.historicalData.monthlyApplications.map(m => m.applications),
              borderColor: '#800020',
              backgroundColor: 'rgba(128, 0, 32, 0.1)',
              tension: 0.4
            },
            {
              label: 'Accepted',
              data: data.historicalData.monthlyApplications.map(m => m.accepted),
              borderColor: '#198754',
              backgroundColor: 'rgba(25, 135, 84, 0.1)',
              tension: 0.4
            },
            {
              label: 'Declined',
              data: data.historicalData.monthlyApplications.map(m => m.declined),
              borderColor: '#dc3545',
              backgroundColor: 'rgba(220, 53, 69, 0.1)',
              tension: 0.4
            }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } },
      });
    }

    // Bar Chart for Grade Distribution
    if (barChartRef.current) {
      const ctx = barChartRef.current.getContext('2d');
      if (barChartInstance.current) barChartInstance.current.destroy();
      barChartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.historicalData.gradeRanges.map(g => g.range),
          datasets: [{
            label: 'Number of Students',
            data: data.historicalData.gradeRanges.map(g => g.count),
            backgroundColor: '#800020',
          }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } },
      });
    }

    // Doughnut Chart for Course Distribution
    if (courseChartRef.current) {
      const ctx = courseChartRef.current.getContext('2d');
      if (courseChartInstance.current) courseChartInstance.current.destroy();
      courseChartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: data.historicalData.courseDistribution.map(c => c.course),
          datasets: [{
            data: data.historicalData.courseDistribution.map(c => c.count),
            backgroundColor: ['#800020', '#650018', '#a00028', '#c44569'],
          }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } },
      });
    }

    // Doughnut Chart for Financial Background
    if (financialChartRef.current) {
      const ctx = financialChartRef.current.getContext('2d');
      if (financialChartInstance.current) financialChartInstance.current.destroy();
      financialChartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: data.historicalData.financialBreakdown.map(f => f.level),
          datasets: [{
            data: data.historicalData.financialBreakdown.map(f => f.count),
            backgroundColor: ['#198754', '#ffc107', '#fd7e14', '#dc3545'],
          }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } },
      });
    }

    return cleanupCharts;
  }, [section, stats, data.historicalData]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  const viewApplicantFn = (index, listType = 'all') => {
    setViewApplicant({ listType, index });
    setSection('view-applicant');
  };

  const recommendStudents = () => {
    const top = [...data.applicants].sort((a, b) => b.grade - a.grade).slice(0, 3);
    setRecommended(top);
    setRecommendationModal(true);
  };

  const acceptRecommended = (applicant) => {
    const idx = data.applicants.findIndex((a) => a.studentContact?.email === applicant.studentContact?.email || a.name === applicant.name);
    if (idx >= 0) {
      setData((d) => ({
        ...d,
        applicants: d.applicants.filter((_, i) => i !== idx),
        accepted: [...d.accepted, d.applicants[idx]],
      }));
    }
    setRecommendationModal(false);
  };

  const declineRecommended = (applicant) => {
    const idx = data.applicants.findIndex((a) => a.studentContact?.email === applicant.studentContact?.email || a.name === applicant.name);
    if (idx >= 0) {
      setData((d) => ({
        ...d,
        applicants: d.applicants.filter((_, i) => i !== idx),
        declined: [...d.declined, d.applicants[idx]],
      }));
    }
    setRecommendationModal(false);
  };

  const acceptApplicant = () => {
    if (!viewApplicant || viewApplicant.listType !== 'all') return;
    const { index } = viewApplicant;
    setData((d) => {
      const applicant = d.applicants[index];
      if (!applicant) return d;
      return { ...d, applicants: d.applicants.filter((_, i) => i !== index), accepted: [...d.accepted, applicant] };
    });
    setViewApplicant(null);
    setSection('track');
    setTrackTab('accepted');
  };

  const declineApplicant = () => {
    if (!viewApplicant || viewApplicant.listType !== 'all') return;
    const { index } = viewApplicant;
    setData((d) => {
      const applicant = d.applicants[index];
      if (!applicant) return d;
      return { ...d, applicants: d.applicants.filter((_, i) => i !== index), declined: [...d.declined, applicant] };
    });
    setViewApplicant(null);
    setSection('track');
    setTrackTab('declined');
  };

  const cancelApplicant = (listType, index) => {
    setData((d) => {
      const list = d[listType] || [];
      const applicant = list[index];
      if (!applicant) return d;
      return { ...d, applicants: [...d.applicants, applicant], [listType]: list.filter((_, i) => i !== index) };
    });
    setTrackTab('all');
  };

  const getStudentStatus = (email, name) => {
    const inList = (list) => list.some((a) => a.studentContact?.email === email || a.name === name);
    if (inList(data.accepted)) return 'Accepted';
    if (inList(data.declined)) return 'Declined';
    if (inList(data.applicants)) return 'Pending';
    return 'Unknown';
  };

  const groupMessagesByStudent = (messages) => {
    const grouped = {};
    messages.forEach((m) => {
      const key = m.studentEmail || m.studentName;
      if (!grouped[key]) grouped[key] = { studentName: m.studentName, studentEmail: m.studentEmail, studentPhone: m.studentPhone, messages: [], unreadCount: 0, lastMessage: null };
      grouped[key].messages.push(m);
      if (!m.read) grouped[key].unreadCount += 1;
      if (!grouped[key].lastMessage || new Date(m.timestamp) > new Date(grouped[key].lastMessage.timestamp)) grouped[key].lastMessage = m;
    });
    return Object.values(grouped).sort((a, b) => new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp));
  };

  const markAsRead = (messageId) => setData((d) => ({ ...d, inbox: d.inbox.map((m) => (m.id === messageId ? { ...m, read: true } : m)) }));
  const toggleStar = (messageId) => setData((d) => ({ ...d, inbox: d.inbox.map((m) => (m.id === messageId ? { ...m, starred: !m.starred } : m)) }));
  const sendReply = (messageId) => {
    if (!replyText.trim()) return;
    const reply = { id: Date.now().toString(), text: replyText, timestamp: new Date().toISOString(), from: 'Admin' };
    setData((d) => ({ ...d, inbox: d.inbox.map((m) => (m.id === messageId ? { ...m, replies: [...(m.replies || []), reply] } : m)) }));
    setReplyText('');
  };

  const allMessages = data.inbox || [];
  const unreadCount = allMessages.filter((m) => !m.read).length;
  const conversations = useMemo(() => groupMessagesByStudent(allMessages), [allMessages]);
  const currentMessage = viewMessage ? allMessages.find((m) => m.id === viewMessage.messageId) : null;
  const currentConversation = currentMessage ? conversations.find((c) => c.studentEmail === currentMessage.studentEmail || c.studentName === currentMessage.studentName) : null;
  const filteredConversations = useMemo(() => {
    let filtered = conversations;

    // Apply status filter
    if (inboxFilter !== 'all') {
      filtered = filtered.filter((c) => {
        const studentStatus = getStudentStatus(c.studentEmail, c.studentName);
        if (inboxFilter === 'pending') {
          return studentStatus === 'Pending';
        } else if (inboxFilter === 'accepted') {
          return studentStatus === 'Accepted';
        }
        return true;
      });
    }

    // Apply search filter
    if (inboxSearch.trim()) {
      const q = inboxSearch.toLowerCase();
      filtered = filtered.filter((c) => c.studentName.toLowerCase().includes(q) || (c.studentEmail || '').toLowerCase().includes(q) || c.messages.some((m) => m.subject.toLowerCase().includes(q) || m.message.toLowerCase().includes(q)));
    }

    return filtered;
  }, [conversations, inboxSearch, inboxFilter]);

  const renderManage = () => {
    if (manageMode === 'list') {
      return (
        <section className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between gap-3 flex-wrap mb-6">
            <h3 className="text-xl font-semibold text-[#800020]">Vilma Scholarship - Manage Posts</h3>
            <button
              type="button"
              onClick={() => {
                resetForm();
                setManageMode('create');
              }}
              className="px-4 py-2 rounded-lg bg-[#800020] text-white font-semibold flex items-center gap-2 hover:bg-[#650018] transition-colors"
            >
              <FaPlus /> Add New Post
            </button>
          </div>

          <div className="space-y-4">
            {data.scholarshipPosts.length > 0 ? (
              data.scholarshipPosts.map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-[#800020] mb-2">{post.title}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                        <div><strong>Deadline:</strong> {post.deadline}</div>
                        <div><strong>Slots:</strong> {post.slots}</div>
                        <div><strong>Eligibility:</strong> {post.eligibility}</div>
                        <div><strong>Status:</strong> <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">{post.status}</span></div>
                      </div>
                      <p className="text-sm text-gray-700 mt-3 line-clamp-2">{post.description}</p>
                      {post.images && post.images.length > 0 && (
                        <div className="flex gap-2 mt-3">
                          {post.images.slice(0, 3).map((img) => (
                            <img key={img.id} src={img.url} alt={img.name} className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                          ))}
                          {post.images.length > 3 && (
                            <div className="w-16 h-16 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-xs text-gray-600">
                              +{post.images.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                      <div className="text-xs text-gray-500 mt-3">
                        Created: {formatDate(post.createdAt)}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        type="button"
                        onClick={() => editPost(post)}
                        className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                        title="Edit Post"
                      >
                        <FaEdit />
                      </button>
                      <button
                        type="button"
                        onClick={() => deletePost(post.id)}
                        className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                        title="Delete Post"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <FaImage className="text-4xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No scholarship posts yet. Create your first post!</p>
              </div>
            )}
          </div>
        </section>
      );
    }

    return (
      <section className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between gap-3 mb-6">
          <h3 className="text-xl font-semibold text-[#800020]">
            {manageMode === 'edit' ? 'Edit Scholarship Post' : 'Create New Scholarship Post'}
          </h3>
          <button
            type="button"
            onClick={() => setManageMode('list')}
            className="px-4 py-2 rounded-lg bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-colors"
          >
            ← Back to List
          </button>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); saveScholarshipPost(); }}>
          <div>
            <label className="block text-sm font-semibold text-[#800020] mb-1">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="e.g. Vilma Scholarship 2026"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#800020] mb-1">Deadline *</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#800020] mb-1">Eligibility *</label>
            <input
              type="text"
              name="eligibility"
              value={formData.eligibility}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="e.g. Adya residents with minimum 80% grade"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#800020] mb-1">Slots *</label>
            <input
              type="number"
              name="slots"
              value={formData.slots}
              onChange={handleFormChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#800020] mb-1">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 min-h-[120px]"
              placeholder="Full details about the scholarship..."
              required
            />
          </div>

          {/* Picture Upload Section */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#800020] mb-3">
              <FaImage className="inline mr-2" />
              Scholarship Images
            </label>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#800020] transition-colors">
              <input
                type="file"
                id="image-upload-vilma"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="image-upload-vilma"
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-[#800020] text-white rounded-lg hover:bg-[#650018] transition-colors"
              >
                <FaUpload />
                Choose Images
              </label>
              <p className="text-sm text-gray-500 mt-2">Upload scholarship photos, banners, or promotional images</p>
            </div>

            {/* Image Preview Grid */}
            {scholarshipImages.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-[#800020] mb-2">Uploaded Images ({scholarshipImages.length})</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {scholarshipImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTimesCircle className="text-xs" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 rounded-b-lg truncate">
                        {image.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-2 flex justify-end gap-2">
            <button type="button" onClick={resetForm} className="px-4 py-2 rounded-lg bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-[#800020] text-white font-semibold hover:bg-[#650018] transition-colors">
              {manageMode === 'edit' ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </form>
      </section>
    );
  };

  const renderTrack = () => {
    const filterList = (list) => {
      return list.filter((a) => {
        return a.name.toLowerCase().includes(searchTrack.toLowerCase());
      });
    };

    const allList = filterList(data.applicants);
    const acceptedList = filterList(data.accepted);
    const declinedList = filterList(data.declined);

    return (
      <section className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
          <h3 className="text-xl font-semibold text-[#800020]">Vilma Scholarship - Track Applicants</h3>
          <button
            type="button"
            onClick={recommendStudents}
            className="px-4 py-2 rounded-lg bg-[#800020] text-white font-semibold flex items-center gap-2 hover:bg-[#650018] transition-colors"
          >
            <FaRobot /> AI Recommend
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {['all', 'accepted', 'declined'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTrackTab(t)}
              className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${trackTab === t ? 'bg-[#800020] text-white' : 'bg-[#800020]/10 text-[#800020] border border-[#800020]'
                }`}
            >
              {t === 'all' && <FaUsers />}
              {t === 'accepted' && <FaCheckCircle />}
              {t === 'declined' && <FaTimesCircle />}
              {t === 'all' ? 'All Applicants' : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 mb-6 max-w-md shadow-sm">
          <FaSearch className="text-[#800020]" />
          <input
            type="text"
            placeholder="Search applicants by name..."
            value={searchTrack}
            onChange={(e) => setSearchTrack(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-sm font-medium"
          />
        </div>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead><tr className="bg-[#800020] text-white"><th className="px-4 py-3 text-left font-semibold">Name</th><th className="px-4 py-3 text-left font-semibold">Grade</th><th className="px-4 py-3 text-left font-semibold">Financial</th><th className="px-4 py-3 text-left font-semibold">Action</th></tr></thead>
            <tbody>
              {trackTab === 'all' && allList.map((a) => { const idx = data.applicants.indexOf(a); return (<tr key={`${a.name}-${idx}`} className="border-b border-gray-200 hover:bg-gray-50"><td className="px-4 py-3">{a.name}</td><td className="px-4 py-3">{a.grade}</td><td className="px-4 py-3">{a.financial}</td><td className="px-4 py-3"><button type="button" onClick={() => viewApplicantFn(idx, 'all')} className="px-3 py-1 rounded bg-[#800020] text-white text-xs font-semibold hover:bg-[#650018] transition-colors">View</button></td></tr>); })}
              {trackTab === 'accepted' && acceptedList.map((a) => { const idx = data.accepted.indexOf(a); return (<tr key={`${a.name}-${idx}`} className="border-b border-gray-200 hover:bg-gray-50"><td className="px-4 py-3">{a.name}</td><td className="px-4 py-3">{a.grade}</td><td className="px-4 py-3">{a.financial}</td><td className="px-4 py-3"><button type="button" onClick={() => viewApplicantFn(idx, 'accepted')} className="px-3 py-1 rounded bg-[#800020] text-white text-xs font-semibold mr-1 hover:bg-[#650018] transition-colors">View</button><button type="button" onClick={() => cancelApplicant('accepted', idx)} className="px-3 py-1 rounded bg-amber-500 text-gray-900 text-xs font-semibold">Cancel</button></td></tr>); })}
              {trackTab === 'declined' && declinedList.map((a) => { const idx = data.declined.indexOf(a); return (<tr key={`${a.name}-${idx}`} className="border-b border-gray-200 hover:bg-gray-50"><td className="px-4 py-3">{a.name}</td><td className="px-4 py-3">{a.grade}</td><td className="px-4 py-3">{a.financial}</td><td className="px-4 py-3"><button type="button" onClick={() => viewApplicantFn(idx, 'declined')} className="px-3 py-1 rounded bg-[#800020] text-white text-xs font-semibold mr-1 hover:bg-[#650018] transition-colors">View</button><button type="button" onClick={() => cancelApplicant('declined', idx)} className="px-3 py-1 rounded bg-amber-500 text-gray-900 text-xs font-semibold">Cancel</button></td></tr>); })}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

  const exportToExcel = () => {
    const { historicalData } = data;

    // Create worksheet for Location Stats
    const locationData = historicalData.locationStats.map(item => ({
      Barangay: item.location,
      Count: item.count,
      Percentage: `${item.percentage}%`
    }));
    const locationWS = XLSX.utils.json_to_sheet(locationData);

    // Create worksheet for Course Distribution
    const courseWS = XLSX.utils.json_to_sheet(historicalData.courseDistribution.map(item => ({
      Course: item.course,
      Count: item.count,
      Percentage: `${item.percentage}%`
    })));

    // Create worksheet for Performance Metrics
    const metricsData = [
      { Metric: 'Acceptance Rate', Value: `${historicalData.performanceMetrics.acceptanceRate}%` },
      { Metric: 'Avg. Processing Time', Value: `${historicalData.performanceMetrics.averageProcessingTime} days` },
      { Metric: 'Application Completion Rate', Value: `${historicalData.performanceMetrics.applicationCompletionRate}%` },
      { Metric: 'Satisfaction Score', Value: `${historicalData.performanceMetrics.satisfactionScore}/5` }
    ];
    const metricsWS = XLSX.utils.json_to_sheet(metricsData);

    // Create worksheet for Monthly Trends
    const trendsWS = XLSX.utils.json_to_sheet(historicalData.monthlyApplications);

    // Create workbook and append sheets
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, locationWS, 'Location Statistics');
    XLSX.utils.book_append_sheet(wb, courseWS, 'Course Distribution');
    XLSX.utils.book_append_sheet(wb, metricsWS, 'Performance Metrics');
    XLSX.utils.book_append_sheet(wb, trendsWS, 'Monthly Trends');

    // Export the workbook
    XLSX.writeFile(wb, 'Vilma_Scholarship_Report.xlsx');
  };

  const renderReports = () => {
    const { historicalData } = data;

    const kpiCards = [
      { label: 'Total Applicants', value: stats.total.toLocaleString(), trend: '+10.2%', color: 'blue' },
      { label: 'New Applicants', value: data.applicants.length.toLocaleString(), trend: '+4.5%', color: 'green' },
      { label: 'Accepted', value: stats.accepted.toLocaleString(), trend: '+6.8%', color: 'purple' },
      { label: 'Declined', value: stats.declined.toLocaleString(), trend: '-1.2%', color: 'red' },
      { label: 'Avg. Processing', value: `${historicalData.performanceMetrics.averageProcessingTime}d`, trend: '-0.3d', color: 'amber' },
      { label: 'Completion Rate', value: `${historicalData.performanceMetrics.applicationCompletionRate}%`, trend: '+0.8%', color: 'indigo' },
    ];

    return (
      <div className="space-y-6">
        {/* Header with Export Buttons */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h3 className="text-2xl font-bold text-[#800020]">Vilma Scholarship Analytics</h3>
            <p className="text-gray-500 text-sm">Comprehensive KPI report and periodic trends</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={exportToExcel}
              className="px-6 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm"
            >
              <FaPrint className="text-green-600" /> Export to Excel
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-6 py-2 rounded-xl bg-[#800020] text-white font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg"
            >
              <FaPrint /> Print PDF
            </button>
          </div>
        </div>

        {/* Top KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpiCards.map((card, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">{card.label}</span>
              <span className="text-2xl font-black text-gray-800 mb-1">{card.value}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${card.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                {card.trend}
              </span>
            </div>
          ))}
        </div>

        {/* Charts Middle Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Monthly Trends - Line Chart */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-bold text-gray-800">Monthly Applications</h4>
              <div className="flex gap-4 text-xs font-bold uppercase tracking-tighter text-gray-400">
                <span className="flex items-center gap-1"><div className="w-3 h-1 bg-[#800020] rounded"></div> Apps</span>
                <span className="flex items-center gap-1"><div className="w-3 h-1 bg-[#198754] rounded"></div> Pass</span>
              </div>
            </div>
            <div className="h-[280px]">
              <canvas ref={lineChartRef} />
            </div>
          </div>

          {/* Course Distribution - Horizontal Bars */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h4 className="text-lg font-bold text-gray-800 mb-6 font-primary">Course Distribution</h4>
            <div className="h-[280px]">
              <canvas ref={barChartRef} />
            </div>
          </div>

          {/* Location/Stats - Doughnut */}
          <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h4 className="text-lg font-bold text-gray-800 mb-6">Location Split</h4>
            <div className="h-[220px] mb-4">
              <canvas ref={courseChartRef} />
            </div>
            <div className="space-y-2 mt-4">
              {historicalData.courseDistribution.slice(0, 4).map((c, i) => (
                <div key={i} className="flex items-center justify-between text-[10px] font-bold">
                  <span className="text-gray-500">{c.course}</span>
                  <span className="text-gray-800">{c.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Data Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Location Stats Table */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <h4 className="text-lg font-bold text-gray-800 mb-6">Location Analytics</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-4 py-3 font-bold text-gray-500 uppercase tracking-widest text-[10px]">Barangay</th>
                    <th className="px-4 py-3 font-bold text-gray-500 uppercase tracking-widest text-[10px]">Applicants</th>
                    <th className="px-4 py-3 font-bold text-gray-500 uppercase tracking-widest text-[10px]">% Distribution</th>
                    <th className="px-4 py-3 font-bold text-gray-500 uppercase tracking-widest text-[10px]">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {historicalData.locationStats.slice(0, 10).map((loc, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-[#800020]">{loc.location}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${loc.count > 15 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          {loc.count}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="w-full bg-gray-100 rounded-full h-1.5 max-w-[100px]">
                          <div className="bg-[#800020] h-1.5 rounded-full" style={{ width: `${loc.percentage}%` }}></div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-bold text-green-600 text-[10px]">{loc.percentage > 5 ? '↑ HIGH' : '→ STABLE'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Performance Metrics Table */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h4 className="text-lg font-bold text-gray-800 mb-6">Performance Details</h4>
            <div className="space-y-4">
              {[
                { label: 'Acceptance Rate', value: `${historicalData.performanceMetrics.acceptanceRate}%`, color: 'bg-green-500' },
                { label: 'Avg. Processing Time', value: `${historicalData.performanceMetrics.averageProcessingTime} days`, color: 'bg-blue-500' },
                { label: 'Application Completion', value: `${historicalData.performanceMetrics.applicationCompletionRate}%`, color: 'bg-purple-500' },
                { label: 'Satisfaction Score', value: `${historicalData.performanceMetrics.satisfactionScore}/5.0`, color: 'bg-amber-500' },
              ].map((metric, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="font-bold text-gray-600 text-sm">{metric.label}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-black text-gray-800">{metric.value}</span>
                    <div className={`w-2 h-8 rounded-full ${metric.color}`}></div>
                  </div>
                </div>
              ))}
              <div className="mt-6 p-4 bg-blue-50/50 rounded-xl border border-blue-100 italic text-[11px] text-blue-800 leading-relaxed">
                "Trends indicate an efficiency boost in the last quarter, reducing average processing time by 12% across all scholarship categories."
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderViewApplicant = () => {
    if (!viewApplicant) return null;
    const { listType, index } = viewApplicant;
    const list = listType === 'all' ? data.applicants : data[listType];
    const a = list[index];
    if (!a) return null;
    const isPending = listType === 'all';

    const renderMediaGrid = (files) => {
      if (!files || files.length === 0) return <p className="text-gray-400 italic text-xs">No documents uploaded</p>;
      return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {files.map((f, idx) => (
            <div key={idx} className="relative group cursor-pointer border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
              {f.type.startsWith('image') ? (
                <img
                  src={f.src}
                  alt="Document"
                  className="w-full h-28 object-cover group-hover:scale-105 transition-transform"
                  onClick={() => setImageModalSrc(f.src)}
                  onError={(e) => {
                    e.target.src = 'https://i.imgur.com/2h7z2S.jpg';
                  }}
                />
              ) : f.type.startsWith('video') ? (
                <video src={f.src} controls className="w-full h-28 object-cover rounded-lg" />
              ) : null}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] py-0.5 text-center font-bold">
                {f.type.startsWith('image') ? 'IMAGE' : 'VIDEO'}
              </div>
            </div>
          ))}
        </div>
      );
    };

    return (
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-5xl mx-auto my-4 overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-[#800020]">
          <h2 className="text-2xl font-black text-[#800020] uppercase tracking-tight">Applicant Dossier</h2>
          <div className="flex gap-2">
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${isPending ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
              {isPending ? 'Pending Review' : 'Active Student'}
            </span>
            <button
              onClick={() => { setViewApplicant(null); setSection('track'); }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaTimesCircle className="text-gray-400 text-xl" />
            </button>
          </div>
        </div>

        {/* STUDENT INFORMATION SECTION */}
        <div className="mb-10">
          <h3 className="bg-[#800020] text-white px-4 py-2 text-sm font-black uppercase tracking-widest mb-4 rounded-t-lg">Student Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 border-2 border-gray-100 rounded-b-lg overflow-hidden">
            {/* Row 1: Names */}
            <div className="p-4 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/50">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Last Name</p>
              <p className="font-bold text-gray-800">{a.lastName || (a.name && a.name.split(' ').pop())}</p>
            </div>
            <div className="p-4 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/50">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">First Name</p>
              <p className="font-bold text-gray-800">{a.firstName || (a.name && a.name.split(' ')[0])}</p>
            </div>
            <div className="p-4 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/50">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Middle Name</p>
              <p className="font-bold text-gray-800">{a.middleName || 'N/A'}</p>
            </div>
            <div className="p-4 bg-gray-50/50">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Maiden Name</p>
              <p className="font-bold text-gray-800">{a.maidenName || 'N/A'}</p>
            </div>

            {/* Row 2: Address */}
            <div className="p-4 border-t border-r border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Street & Barangay</p>
              <p className="font-bold text-gray-800">{a.street ? `${a.street}, ${a.barangay}` : (a.location && a.location.split(',')[0])}</p>
            </div>
            <div className="p-4 border-t border-r border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Town/City/Municipality</p>
              <p className="font-bold text-gray-800">{a.municipality || 'N/A'}</p>
            </div>
            <div className="p-4 border-t border-r border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Province</p>
              <p className="font-bold text-gray-800">{a.province || 'N/A'}</p>
            </div>
            <div className="p-4 border-t border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Zip Code</p>
              <p className="font-bold text-gray-800">{a.zipCode || '4217'}</p>
            </div>

            {/* Row 3: Personal Details */}
            <div className="p-4 border-t border-r border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Date of Birth</p>
              <p className="font-bold text-gray-800">{a.dob || 'N/A'}</p>
            </div>
            <div className="p-4 border-t border-r border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Place of Birth</p>
              <p className="font-bold text-gray-800">{a.pob || 'N/A'}</p>
            </div>
            <div className="p-4 border-t border-r border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Sex</p>
              <p className="font-bold text-gray-800">{a.sex || 'N/A'}</p>
            </div>
            <div className="p-4 border-t border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Citizenship</p>
              <p className="font-bold text-gray-800">{a.citizenship || 'Filipino'}</p>
            </div>

            {/* Row 4: Contact & Course */}
            <div className="p-4 border-t border-r border-gray-100 col-span-2">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">E-mail Address</p>
              <p className="font-bold text-gray-800 truncate">{a.emailAddress || (a.studentContact && a.studentContact.email)}</p>
            </div>
            <div className="p-4 border-t border-r border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Mobile Number</p>
              <p className="font-bold text-gray-800">{a.mobileNumber || (a.studentContact && a.studentContact.phone)}</p>
            </div>
            <div className="p-4 border-t border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Course</p>
              <p className="font-bold text-gray-800">{a.course}</p>
            </div>

            {/* Row 5: Special Info */}
            <div className="p-4 border-t border-r border-gray-100 col-span-2 bg-yellow-50/30">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Type of Disability (if applicable)</p>
              <p className="font-bold text-gray-800">{a.disabilityType || 'N/A'}</p>
            </div>
            <div className="p-4 border-t border-gray-100 col-span-2 bg-yellow-50/30">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Tribal Membership (if applicable)</p>
              <p className="font-bold text-gray-800">{a.tribalMembership || 'N/A'}</p>
            </div>

            {/* Row 6: School Attended */}
            <div className="p-4 border-t border-r border-gray-100 col-span-2">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">School Attended</p>
              <p className="font-bold text-gray-800">{a.school}</p>
            </div>
            <div className="p-4 border-t border-r border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">School ID Number</p>
              <p className="font-bold text-gray-800">{a.schoolId || 'N/A'}</p>
            </div>
            <div className="p-4 border-t border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Year Level</p>
              <p className="font-bold text-gray-800">{a.year}</p>
            </div>

            {/* Row 7: School Address */}
            <div className="p-4 border-t border-r border-gray-100 col-span-3">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">School Address</p>
              <p className="font-bold text-gray-800 text-xs">{a.schoolAddress || 'N/A'}</p>
            </div>
            <div className="p-4 border-t border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">School Sector</p>
              <p className="font-bold text-gray-800">{a.schoolSector || 'N/A'}</p>
            </div>

            <div className="p-4 border-t border-gray-100 col-span-4 bg-rose-50/30">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Are you enjoying other educational financial assistance?</p>
              <div className="flex gap-8 mt-1 mb-3">
                <span className="flex items-center gap-2 text-sm font-bold">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${a.educationalAssistance === 'Yes' ? 'bg-[#800020] border-[#800020]' : 'border-gray-300'}`}>
                    {a.educationalAssistance === 'Yes' && <FaCheckCircle className="text-white text-xs" />}
                  </div>
                  YES
                </span>
                <span className="flex items-center gap-2 text-sm font-bold">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${a.educationalAssistance === 'No' ? 'bg-[#800020] border-[#800020]' : 'border-gray-300'}`}>
                    {a.educationalAssistance === 'No' && <FaCheckCircle className="text-white text-xs" />}
                  </div>
                  NO
                </span>
              </div>
              {a.educationalAssistance === 'Yes' && (
                <div className="mt-2 pt-2 border-t border-rose-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1 italic">If yes, please specify:</p>
                  <p className="text-sm font-bold text-gray-800">1. {a.educationalAssistanceDetails || 'N/A'}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FAMILY BACKGROUND SECTION */}
        <div className="mb-10">
          <h3 className="bg-[#800020] text-white px-4 py-2 text-sm font-black uppercase tracking-widest mb-4 rounded-t-lg">Family Background</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 border-2 border-gray-100 rounded-lg overflow-hidden">
            <div className="p-4 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/50">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-3">Father Information</p>
              <div className="space-y-2">
                <p className="text-sm"><strong>Name:</strong> {a.family.father.name}</p>
                <div className="flex gap-4 text-xs font-bold items-center">
                  <span>Status:</span>
                  <span className="flex items-center gap-1.5">
                    <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${a.family.father.status === 'Living' ? 'bg-[#800020] border-[#800020]' : 'border-gray-300'}`}>
                      {a.family.father.status === 'Living' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                    </div>
                    Living
                  </span>
                  <span className="flex items-center gap-1.5">
                    <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${a.family.father.status === 'Deceased' ? 'bg-[#800020] border-[#800020]' : 'border-gray-300'}`}>
                      {a.family.father.status === 'Deceased' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                    </div>
                    Deceased
                  </span>
                </div>
                <p className="text-sm"><strong>Occupation:</strong> {a.family.father.job}</p>
                <p className="text-sm"><strong>Phone:</strong> {a.family.father.phone}</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50/50">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-3">Mother Information</p>
              <div className="space-y-2">
                <p className="text-sm"><strong>Name:</strong> {a.family.mother.name}</p>
                <div className="flex gap-4 text-xs font-bold items-center">
                  <span>Status:</span>
                  <span className="flex items-center gap-1.5">
                    <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${a.family.mother.status === 'Living' ? 'bg-[#800020] border-[#800020]' : 'border-gray-300'}`}>
                      {a.family.mother.status === 'Living' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                    </div>
                    Living
                  </span>
                  <span className="flex items-center gap-1.5">
                    <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${a.family.mother.status === 'Deceased' ? 'bg-[#800020] border-[#800020]' : 'border-gray-300'}`}>
                      {a.family.mother.status === 'Deceased' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                    </div>
                    Deceased
                  </span>
                </div>
                <p className="text-sm"><strong>Occupation:</strong> {a.family.mother.job}</p>
                <p className="text-sm"><strong>Phone:</strong> {a.family.mother.phone}</p>
              </div>
            </div>
            <div className="p-4 border-t border-r border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Parents Gross Income</p>
              <p className="font-bold text-[#800020]">PHP {a.family.grossIncome || 'N/A'}</p>
            </div>
            <div className="p-4 border-t border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">No. of Siblings</p>
              <p className="font-bold text-gray-800">{a.family.siblingsCount || '0'}</p>
            </div>
          </div>
        </div>

        {/* DOCUMENTS SECTION */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="bg-[#800020] text-white px-4 py-2 text-sm font-black uppercase tracking-widest rounded-lg">Uploaded Documents</h3>
            <div className="flex gap-3">
              <div className="bg-yellow-50 border border-yellow-200 px-3 py-1 rounded-full flex items-center gap-2">
                <span className="text-[10px] font-black text-[#800020] uppercase">Avg Grade:</span>
                <span className="text-sm font-black text-gray-800">{a.grade}</span>
              </div>
              <div className="bg-rose-50 border border-rose-200 px-3 py-1 rounded-full flex items-center gap-2">
                <span className="text-[10px] font-black text-[#800020] uppercase">Income:</span>
                <span className="text-sm font-black text-gray-800">{a.financial}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-2 border-gray-100 rounded-lg">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-gray-500 uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#800020]"></span> Indigency Proof
              </p>
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                {renderMediaGrid(a.indigencyFiles)}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black text-gray-500 uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#800020]"></span> Enrollment Certificate
              </p>
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                {renderMediaGrid(a.certificateFiles)}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black text-gray-500 uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#800020]"></span> Grades / Transcript (supports video)
              </p>
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                {renderMediaGrid(a.gradesFiles)}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black text-gray-500 uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#800020]"></span> ID (Front & Back)
              </p>
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                {renderMediaGrid(a.idFiles)}
              </div>
            </div>
          </div>
        </div>

        {/* SIGNATURE SECTION */}
        <div className="mt-12 pt-8 border-t-2 border-dashed border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-xs w-full">
              <div className="border-b-2 border-gray-300 mb-2 h-20 flex items-center justify-center overflow-hidden">
                {a.signature ? (
                  <img
                    src={a.signature}
                    alt="Digital Signature"
                    className="max-h-full cursor-zoom-in hover:scale-110 transition-transform"
                    onClick={() => setImageModalSrc(a.signature)}
                  />
                ) : (
                  <span className="text-gray-300 italic text-sm">No signature on file</span>
                )}
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Signature over Printed Name of Applicant</p>
              <p className="font-bold text-gray-800 text-sm italic underline">{a.firstName} {a.lastName}</p>
            </div>

            <div className="max-w-xs w-full">
              <div className="border-b-2 border-gray-300 mb-2 h-20 flex items-end justify-center pb-2">
                <p className="font-bold text-gray-800">{new Date().toLocaleDateString()}</p>
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase">Date Accomplished</p>
            </div>
          </div>
          <p className="text-center text-[10px] text-gray-400 italic mt-8 font-medium">
            I hereby certify that the foregoing statements are true and correct.
          </p>
        </div>

        <div className="sticky bottom-0 bg-white/80 backdrop-blur-md pt-6 mt-8 border-t border-gray-100 flex gap-3 justify-end">
          {isPending && (
            <>
              <button
                type="button"
                onClick={acceptApplicant}
                className="px-8 py-3 rounded-xl bg-green-600 text-white font-black uppercase tracking-widest text-xs hover:bg-green-700 shadow-lg shadow-green-100 transition-all flex items-center gap-2"
              >
                <FaCheckCircle /> Approve
              </button>
              <button
                type="button"
                onClick={declineApplicant}
                className="px-8 py-3 rounded-xl bg-red-600 text-white font-black uppercase tracking-widest text-xs hover:bg-red-700 shadow-lg shadow-red-100 transition-all flex items-center gap-2"
              >
                <FaTimesCircle /> Decline
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => { setViewApplicant(null); setSection('track'); }}
            className="px-8 py-3 rounded-xl bg-gray-100 text-gray-600 font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all"
          >
            Close Dossier
          </button>
        </div>
      </section>
    );
  };





  const renderInbox = () => (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="relative overflow-hidden bg-gradient-to-br from-[#800020] via-[#650018] to-[#a00028] rounded-2xl shadow-xl p-6 text-white mb-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.06\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-80" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"><FaInbox className="text-xl text-white" /></div>
            <div>
              <h2 className="text-xl font-bold">Vilma Scholarship Messenger</h2>
              <p className="text-white/90 text-sm">Hello, {userFirstName}! {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}</p>
            </div>
          </div>
          <button type="button" onClick={() => setSection('track')} className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white font-medium">← Track</button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        <div className="w-80 flex-shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <FaSearch className="text-gray-400" />
              <input type="text" placeholder="Search conversations..." value={inboxSearch} onChange={(e) => setInboxSearch(e.target.value)} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] text-sm" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setInboxFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${inboxFilter === 'all'
                  ? 'bg-[#800020] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                All
              </button>
              <button
                onClick={() => setInboxFilter('pending')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${inboxFilter === 'pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                Pending
              </button>
              <button
                onClick={() => setInboxFilter('accepted')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${inboxFilter === 'accepted'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                Accepted
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {filteredConversations.map((conv) => {
                  const isActive = currentConversation && (currentConversation.studentEmail === conv.studentEmail || currentConversation.studentName === conv.studentName);
                  return (
                    <div key={conv.studentEmail || conv.studentName} onClick={() => { if (conv.messages.length > 0) { setViewMessage({ messageId: conv.lastMessage.id }); conv.messages.forEach((m) => { if (!m.read) markAsRead(m.id); }); } }} className={`p-4 cursor-pointer transition-colors hover:bg-blue-50/50 ${isActive ? 'bg-blue-50 border-l-4 border-[#800020]' : ''} ${conv.unreadCount > 0 ? 'bg-blue-50/30' : ''}`}>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#800020] to-[#650018] flex items-center justify-center text-white font-semibold flex-shrink-0">{conv.studentName.charAt(0).toUpperCase()}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-gray-900 truncate text-sm">{conv.studentName}</span>
                            {conv.unreadCount > 0 && <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full flex-shrink-0">{conv.unreadCount}</span>}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gray-100 text-gray-700 border border-gray-200">
                              {getStudentStatus(conv.studentEmail, conv.studentName)}
                            </span>
                            <p className="text-xs text-gray-600 truncate mb-1 flex-1">{conv.lastMessage?.subject || ''}</p>
                          </div>
                          <span className="text-xs text-gray-400">{conv.lastMessage ? formatDate(conv.lastMessage.timestamp) : ''}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-6">
                <FaInbox className="text-4xl text-gray-300 mb-3" />
                <p className="text-gray-500 text-sm text-center">{inboxSearch ? 'No conversations found' : 'No messages yet'}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
          {currentConversation && currentMessage ? (
            <>
              <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#800020] to-[#650018] flex items-center justify-center text-white font-semibold">{currentConversation.studentName.charAt(0).toUpperCase()}</div>
                  <div><h3 className="font-semibold text-gray-900">{currentConversation.studentName}</h3><p className="text-xs text-gray-500">{currentConversation.studentEmail}</p><p className="text-[10px] text-gray-500">Status: <span className="font-semibold">{getStudentStatus(currentConversation.studentEmail, currentConversation.studentName)}</span></p></div>
                </div>
                <button type="button" onClick={() => setViewMessage(null)} className="text-sm text-gray-600 hover:text-[#800020]">← Back</button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {currentConversation.messages.slice().sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).map((msg) => (
                  <div key={msg.id} className="space-y-2">
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900 text-sm">{msg.studentName}</span>
                        <span className="text-xs text-gray-500 flex items-center gap-1"><FaClock className="text-[10px]" /> {formatDate(msg.timestamp)}</span>
                      </div>
                      <p className="text-sm font-medium text-[#800020] mb-1">{msg.subject}</p>
                      <p className="text-gray-700 whitespace-pre-wrap text-sm">{msg.message}</p>
                      <div className="mt-2 flex items-center justify-end gap-2">
                        <button type="button" onClick={() => toggleStar(msg.id)} className={`p-2 rounded-lg hover:bg-gray-100 ${msg.starred ? 'text-yellow-500' : 'text-gray-400'}`}><FaStar /></button>
                      </div>
                    </div>
                    {msg.replies && msg.replies.length > 0 && (
                      <div className="ml-8 space-y-2">
                        {msg.replies.map((r) => (
                          <div key={r.id} className="bg-[#800020] text-white rounded-2xl p-4">
                            <div className="flex items-center justify-between mb-2"><span className="font-semibold text-sm">{r.from}</span><span className="text-xs text-white/70">{formatDate(r.timestamp)}</span></div>
                            <p className="text-sm whitespace-pre-wrap">{r.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex gap-2">
                  <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Type a message..." className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020] resize-none" rows={2} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (replyText.trim()) sendReply(currentMessage.id); } }} />
                  <button type="button" onClick={() => sendReply(currentMessage.id)} disabled={!replyText.trim()} className="px-6 py-3 rounded-xl bg-[#800020] text-white font-semibold hover:bg-[#650018] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"><FaPaperPlane /> Send</button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center px-6">
                <FaInbox className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Select a conversation</h3>
                <p className="text-gray-500">All applicants (pending/accepted/declined) can message here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50/30 pt-20">
      <aside className="w-72 flex-shrink-0 bg-gradient-to-b from-[#800020] to-[#650018] text-white shadow-2xl flex flex-col">
        <div className="p-8 border-b border-white/10 mb-2">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md p-2 shadow-inner border border-white/20 flex items-center justify-center group overflow-hidden">
              <img src={logo} alt="Scholarship Logo" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight leading-tight uppercase">Vilma</h2>
              <p className="text-[10px] font-bold text-rose-200 tracking-[0.2em] uppercase opacity-70">Scholarship Program</p>
            </div>
          </div>
        </div>
        <nav className="flex-1">
          {['manage', 'track', 'reports', 'inbox'].map((id) => (
            <button key={id} type="button" onClick={() => setSection(id)} className={`w-full px-4 py-3 flex items-center justify-between hover:bg-[#650018] border-l-4 ${section === id ? 'border-rose-200 bg-[#650018]' : 'border-transparent'}`}>
              <span className="flex items-center gap-2">
                {id === 'manage' && <FaChevronDown className="opacity-0" />}
                {id === 'track' && <FaUsers />}
                {id === 'reports' && <FaTachometerAlt />}
                {id === 'inbox' && <FaInbox />}
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </span>
              <FaChevronDown className="opacity-0" />
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        <header className="bg-white rounded-xl shadow-sm px-6 py-4 mb-6 flex items-center gap-2 text-[#800020] font-bold text-xl"><FaTachometerAlt className="text-blue-600" /> Vilma Scholarship Dashboard</header>
        {section === 'manage' && renderManage()}
        {section === 'track' && renderTrack()}
        {section === 'reports' && renderReports()}
        {section === 'inbox' && renderInbox()}
        {section === 'view-applicant' && renderViewApplicant()}
      </main>

      {/* AI Recommendation Modal */}
      {recommendationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setRecommendationModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-[#800020] text-center mb-4">AI Recommended Applicants</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommended.map((s, i) => (
                <div key={`${s.name}-${i}`} className="border-2 border-gray-200 rounded-xl p-4 bg-rose-50/40 hover:border-[#800020] hover:shadow-lg transition-all">
                  <div className="font-bold text-[#800020] mb-2">{i + 1}. {s.name}</div>
                  <p className="text-sm text-gray-600"><strong>Grade:</strong> {s.grade}</p>
                  <p className="text-sm text-gray-600"><strong>Financial:</strong> {s.financial}</p>
                  <div className="flex gap-2 mt-3">
                    <button type="button" onClick={() => acceptRecommended(s)} className="flex-1 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold">Accept</button>
                    <button type="button" onClick={() => declineRecommended(s)} className="flex-1 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold">Decline</button>
                    <button type="button" onClick={() => { const idx = data.applicants.findIndex(a => a.studentContact?.email === s.studentContact?.email || a.name === s.name); if (idx >= 0) viewApplicantFn(idx, 'all'); setRecommendationModal(false); }} className="py-2 px-3 rounded-lg bg-[#800020] text-white text-sm font-semibold">View</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-right mt-4"><button type="button" onClick={() => setRecommendationModal(false)} className="px-4 py-2 rounded-lg bg-gray-500 text-white font-semibold">Close</button></div>
          </div>
        </div>
      )}

      {/* Fullscreen Image Modal */}
      {imageModalSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setImageModalSrc(null)}>
          <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img src={imageModalSrc} alt="Full size" className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl" />
            <button type="button" onClick={() => setImageModalSrc(null)} className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#800020]">×</button>
          </div>
        </div>
      )}
    </div>
  );
}

