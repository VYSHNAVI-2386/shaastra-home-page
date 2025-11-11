import React, { useState, useEffect } from 'react';
import { Upload, Users, User, Calendar, AlertCircle, Download } from 'lucide-react';

export default function IOHRegistration() {
  const [registrationType, setRegistrationType] = useState('individual');
  const [individualType, setIndividualType] = useState('');
  const [groupType, setGroupType] = useState('');
  const [instituteType, setInstituteType] = useState('');
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [numStudents, setNumStudents] = useState(0);
  const [numTeachers, setNumTeachers] = useState(0);
  const [copyFromGeneral, setCopyFromGeneral] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [otherInstituteCount, setOtherInstituteCount] = useState(1); // For Institute -> Others

  // Form data states
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    state: '',
    city: '',
    aadhar: null
  });

  // State for Teacher In-Charge Details
  const [teacherInChargeData, setTeacherInChargeData] = useState({
    name: '',
    email: '',
    contact: ''
  });

  // Slot capacities (in a real app, these would come from a backend)
  const slotCapacities = {
    schoolCollege: {
      '2jan_forenoon': { max: 6500, current: 0 },
      '2jan_afternoon': { max: 4000, current: 0 },
      '3jan_forenoon': { max: 5500, current: 0 },
      '3jan_afternoon': { max: 3000, current: 0 }
    },
    overall: {
      '2jan_forenoon': { max: 13500, current: 0 },
      '2jan_afternoon': { max: 16000, current: 0 },
      '3jan_forenoon': { max: 14500, current: 0 },
      '3jan_afternoon': { max: 17000, current: 0 },
      '4jan_full': { max: 40000, current: 0 }
    }
  };

  // Effect to copy data when checkbox is ticked
  useEffect(() => {
    if (copyFromGeneral) {
      setTeacherInChargeData({
        name: formData.name,
        email: formData.email,
        contact: formData.contact
      });
    }
  }, [copyFromGeneral, formData.name, formData.email, formData.contact]);

  const handleCopyCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setCopyFromGeneral(isChecked);
    if (!isChecked) {
      // Clear fields when unchecking
      setTeacherInChargeData({
        name: '',
        email: '',
        contact: ''
      });
    }
  };

  const handleTeacherInChargeChange = (e) => {
    const { name, value } = e.target;
    setTeacherInChargeData(prevData => ({
      ...prevData,
      [name]: value
    }));
    // If user types manually, uncheck the copy box
    if (copyFromGeneral) {
      setCopyFromGeneral(false);
    }
  };

  const totalPeople = adultCount + childCount;
  const aadharNeeded = Math.ceil(totalPeople / 4);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use modal instead of alert
    setShowSuccessModal(true);
    // In a real app, you would submit the data to a backend here.
  };

  const getAvailableSlots = () => {
    const isSchoolCollege = registrationType === 'group' && groupType === 'institute' &&
      (instituteType === 'school' || instituteType === 'college');
    
    if (isSchoolCollege) {
      return [
        { value: '2jan_forenoon', label: '2nd Jan - Forenoon', capacity: slotCapacities.schoolCollege['2jan_forenoon'] },
        { value: '2jan_afternoon', label: '2nd Jan - Afternoon', capacity: slotCapacities.schoolCollege['2jan_afternoon'] },
        { value: '3jan_forenoon', label: '3rd Jan - Forenoon', capacity: slotCapacities.schoolCollege['3jan_forenoon'] },
        { value: '3jan_afternoon', label: '3rd Jan - Afternoon', capacity: slotCapacities.schoolCollege['3jan_afternoon'] }
      ];
    }
    
    return [
      { value: '2jan_forenoon', label: '2nd Jan - Forenoon', capacity: slotCapacities.overall['2jan_forenoon'] },
      { value: '2jan_afternoon', label: '2nd Jan - Afternoon', capacity: slotCapacities.overall['2jan_afternoon'] },
      { value: '3jan_forenoon', label: '3rd Jan - Forenoon', capacity: slotCapacities.overall['3jan_forenoon'] },
      { value: '3jan_afternoon', label: '3rd Jan - Afternoon', capacity: slotCapacities.overall['3jan_afternoon'] },
      { value: '4jan_full', label: '4th Jan - Full Day', capacity: slotCapacities.overall['4jan_full'] }
    ];
  };
const NUM_STARS = 120;
const stars = Array.from({ length: NUM_STARS }, () => ({
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: 0.5 + Math.random() * 1.5,
  opacity: 0.5 + Math.random() * 0.5
}));

function StarfieldBg() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        background: '#000',
        
        overflow: 'hidden',
        zIndex: -1
      }}
    >
      {stars.map((star, idx) => (
        <span
          key={idx}
          style={{
            position: 'fixed',
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: '50%',
            background: '#fff',
            backgroundRepeat:'repeat',
            opacity: star.opacity,
            pointerEvents: 'none'
          }}
        />
      ))}
    </div>
  );
}

  // CSS-in-JS for the starfield background
//   const starfieldStyle = {
//     backgroundColor: '#000',
//     backgroundImage: `
//       radial-gradient(circle, #fff 0.5px, transparent 0.5px), 
//       radial-gradient(circle, #fff 1px, transparent 1px)
//     `,
//     backgroundSize: '30px 30px, 60px 60px',
//     backgroundPosition: '0 0, 15px 15px',
//   };

  return (
    <>
    <StarfieldBg/>
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" >
        
      <div className="max-w-4xl mx-auto bg-gray-900 text-gray-200 rounded-2xl shadow-2xl shadow-yellow-500/10 p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">Shaastra Open House</h1>
          <p className="text-gray-400 text-lg">Registration Form</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Information */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">General Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Contact Number *</label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email ID *</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">State *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">City *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Aadhar Card Upload *</label>
                <div className="flex items-center space-x-2">
                  <Upload className="text-gray-500" size={20} />
                  <input
                    type="file"
                    required
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-800 file:cursor-pointer file:text-yellow-200 hover:file:bg-yellow-700"
                    onChange={(e) => setFormData({...formData, aadhar: e.target.files[0]})}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Registration Type Toggle */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Registration Type</h2>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                onClick={() => setRegistrationType('individual')}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center ${
                  registrationType === 'individual'
                    ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/30'
                    : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600 hover:cursor-pointer'
                }`}
              >
                <User className="inline mr-2" size={20} />
                Individual
              </button>
              
              <button
                type="button"
                onClick={() => setRegistrationType('group')}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center ${
                  registrationType === 'group'
                    ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/30'
                    : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600 hover:cursor-pointer'
                }`}
              >
                <Users className="inline mr-2" size={20} />
                Group
              </button>
            </div>
          </div>

          {/* Individual Registration */}
          {registrationType === 'individual' && (
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Individual Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Select Category *</label>
                  <select
                    required
                    value={individualType}
                    onChange={(e) => setIndividualType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="">Choose an option</option>
                    <option value="industry">Industry Professional</option>
                    <option value="academician">Academician</option>
                    <option value="student">College Student</option>
                    <option value="others">Others</option>
                  </select>
                </div>

                {individualType === 'industry' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Company Name *</label>
                      <input type="text" required className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Company Sector *</label>
                      <input type="text" required className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Designation *</label>
                      <input type="text" required className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                    </div>
                  </div>
                )}

                {individualType === 'academician' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Institute Name *</label>
                      <input type="text" required className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Designation *</label>
                      <input type="text" required className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Department Name *</label>
                      <input type="text" required className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                    </div>
                  </div>
                )}

                {individualType === 'student' && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1">College Name *</label>
                    <input type="text" required className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                  </div>
                )}

                {individualType === 'others' && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Please mention your occupation/designation *</label>
                    <input type="text" required className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Group Registration */}
          {registrationType === 'group' && (
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Group Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Group Type *</label>
                  <select
                    required
                    value={groupType}
                    onChange={(e) => setGroupType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="">Choose an option</option>
                    <option value="family">Family</option>
                    <option value="institute">Institute</option>
                  </select>
                </div>

                {groupType === 'family' && (
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Adult Count *</label>
                        <input
                          type="number"
                          min="1"
                          required
                          value={adultCount}
                          onChange={(e) => setAdultCount(parseInt(e.target.value) || 1)}
                          className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Children Count *</label>
                        <input
                          type="number"
                          min="0"
                          required
                          value={childCount}
                          onChange={(e) => setChildCount(parseInt(e.target.value) || 0)}
                          className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                      <AlertCircle className="inline text-yellow-400 mr-2" size={20} />
                      <span className="text-sm text-gray-200">
                        Total people: {totalPeople}
                      </span>
                    </div>

                    {/* NEW: Show error if family size is too large */}
                    {totalPeople > 4 && (
                      <div className="bg-red-900/50 border border-red-700 rounded-lg p-4">
                        <AlertCircle className="inline text-red-400 mr-2" size={20} />
                        <span className="text-sm text-red-200 font-medium">
                          Maximum allowed for family registration is 4 people.
                          For more, please register separately.
                        </span>
                      </div>
                    )}

                    {/* REMOVED: Old Aadhar upload logic
                    {Array.from({ length: aadharNeeded }).map((_, index) => (
                      <div key={index}>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Aadhar Card {index + 1} * {index === 0 ? '(Already uploaded above)' : ''}
                        </label>
                        {index > 0 && (
                          <div className="flex items-center space-x-2">
                            <Upload className="text-gray-500" size={20} />
                            <input
                              type="file"
                              required
                              accept=".pdf,.jpg,.jpeg,.png"
                              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-800 file:text-yellow-200 hover:file:bg-yellow-700 file:cursor-pointer"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    */}
                  </div>
                )}

                {groupType === 'institute' && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Institute Type *</label>
                      <select
                        required
                        value={instituteType}
                        onChange={(e) => setInstituteType(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      >
                        <option value="">Choose an option</option>
                        <option value="school">School</option>
                        <option value="college">College</option>
                        {/* <option value="company">Company</option> */}
                        <option value="others">Others</option>
                      </select>
                    </div>

                    {(instituteType === 'school' || instituteType === 'college') && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              {instituteType === 'school' ? 'School' : 'College'} Name *
                            </label>
                            <input type="text" required className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">State *</label>
                            <input type="text" required className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">City *</label>
                            <input type="text" required className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                          </div>
                        </div>

                        <div className="bg-gray-700 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-100 mb-3">Principal/HOD Details</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Name *</label>
                              <input type="text" required className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Email ID *</label>
                              <input type="email" required className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Contact Number *</label>
                              <input type="tel" required className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Gender *</label>
                              <select required className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Number of Students *</label>
                            <input
                              type="number"
                              min="0"
                              required
                              value={numStudents}
                              onChange={(e) => setNumStudents(parseInt(e.target.value) || 0)}
                              className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Number of Teachers *</label>
                            <input
                              type="number"
                              min="0"
                              required
                              value={numTeachers}
                              onChange={(e) => setNumTeachers(parseInt(e.target.value) || 0)}
                              className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Number of Buses *</label>
                            <input type="number" min="0" required className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Vehicle Number(s)</label>
                          <input type="text" placeholder="Optional" className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                        </div>

                        <div className="bg-gray-700 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-100 mb-3">Teacher In-Charge Details</h4>
                          <div className="mb-3">
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={copyFromGeneral}
                                onChange={handleCopyCheckboxChange}
                                className="w-4 h-4 text-yellow-500 rounded focus:ring-yellow-600"
                              />
                              <span className="text-sm text-gray-300">Copy from general information</span>
                            </label>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Name *</label>
                              <input
                                type="text"
                                name="name"
                                value={teacherInChargeData.name}
                                onChange={handleTeacherInChargeChange}
                                required
                                className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Email ID *</label>
                              <input
                                type="email"
                                name="email"
                                value={teacherInChargeData.email}
                                onChange={handleTeacherInChargeChange}
                                required
                                className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Contact Number *</label>
                              <input
                                type="tel"
                                name="contact"
                                value={teacherInChargeData.contact}
                                onChange={handleTeacherInChargeChange}
                                required
                                className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>

                        {numStudents > 5 && (
                          <div className="bg-yellow-900/50 border border-yellow-700 rounded-lg p-4">
                            <AlertCircle className="inline text-yellow-400 mr-2" size={20} />
                            <span className="text-sm text-yellow-200 font-medium">
                              Declaration form required for groups with more than 5 students
                            </span>
                            <div className="mt-3">
                              <p className="text-xs text-gray-400 mb-2">
                                Instructions: Print the form, get it stamped from HOD/Principal, and upload the signed copy.
                              </p>
                              <div className="mb-3">
                                <a
                                  href="#" // In a real app, this would be the path to the form PDF
                                  download
                                  className="inline-flex items-center text-sm font-medium text-yellow-400 hover:text-yellow-300 transition-colors"
                                >
                                  <Download size={16} className="mr-1" />
                                  Download Declaration Form Template
                                </a>
                              </div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                Upload Signed Declaration Form *
                              </label>
                              <div className="flex items-center space-x-2">
                                <Upload className="text-gray-500" size={20} />
                                <input
                                  type="file"
                                  required
                                  accept=".pdf,.jpg,.jpeg,.png"
                                  className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-800 file:text-yellow-200 hover:file:bg-yellow-700 file:cursor-pointer"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {instituteType === 'others' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Number of People *</label>
                          <input
                            type="number"
                            min="1"
                            required
                            value={otherInstituteCount}
                            onChange={(e) => setOtherInstituteCount(parseInt(e.target.value) || 1)}
                            className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          />
                        </div>

                        {/* NEW: Show error if institute "other" count is too large */}
                        {otherInstituteCount > 5 && (
                          <div className="bg-red-900/50 border border-red-700 rounded-lg p-4">
                            <AlertCircle className="inline text-red-400 mr-2" size={20} />
                            <span className="text-sm text-red-200 font-medium">
                              Maximum allowed for this category is 5 people.
                              For more, please register separately.
                            </span>
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Profession *</label>
                          <input type="text" required className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                          <select required className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                            <option value="">Choose an option</option>
                            <option value="industry">Industry Professional</option>
                            <option value="academician">Academician</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Slot Selection */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">
              <Calendar className="inline mr-2" size={24} />
              Select Time Slot
            </h2>
            
            <div className="space-y-3">
              {getAvailableSlots().map((slot) => {
                const isFull = slot.capacity.current >= slot.capacity.max;
                const remaining = slot.capacity.max - slot.capacity.current;
                
                return (
                  <label
                    key={slot.value}
                    className={`block p-4 border-2 rounded-lg transition-all ${
                      isFull
                        ? 'border-gray-700 bg-gray-800 cursor-not-allowed'
                        : 'border-gray-600 hover:border-yellow-500 cursor-pointer'
                    } ${
                      selectedSlot === slot.value
                        ? 'border-yellow-500 bg-gray-700'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="slot"
                      value={slot.value}
                      checked={selectedSlot === slot.value}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      disabled={isFull}
                      required
                      className="mr-3"
                    />
                    <span className="font-medium text-gray-100">{slot.label}</span>
                    <span className={`ml-3 text-sm ${isFull ? 'text-red-500 font-semibold' : 'text-green-400'}`}>
                      {isFull ? '(FULL)' : `(${remaining} spots remaining)`}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              type="submit"
              className="bg-yellow-500 text-black px-12 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-600 transition-colors shadow-lg shadow-yellow-500/30 w-full sm:w-auto hover:cursor-pointer"
            >
              Complete Registration
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center max-w-sm w-full">
            <h3 className="text-2xl font-bold text-green-400 mb-4">Success!</h3>
            <p className="text-gray-300 mb-6">Your registration has been submitted successfully.</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}