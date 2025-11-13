import React, { useState, useEffect } from "react";
import {
  Upload,
  Users,
  User,
  Calendar,
  AlertCircle,
  Download,
} from "lucide-react";
// import { useRegisterIohMutation } from "../generated/graphql";
import { REGISTER_IOH } from "../graphql/mutations";
import { useMutation } from "@apollo/client/react";
import { upload } from "../utils/fileUpload";

export default function IOHRegistration() {
  const [registerUser] = useMutation(REGISTER_IOH);

  const [aadharError, setAadharError] = useState("");
  const [aadharFileError, setAadharFileError] = useState("");
  const [registrationType, setRegistrationType] = useState("INDIVIDUAL");
  const [individualType, setIndividualType] = useState("");
  const [groupType, setGroupType] = useState("");
  const [instituteType, setInstituteType] = useState("");
  const [instituteOtherType, setInstituteOtherType] = useState("");
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [numStudents, setNumStudents] = useState(0);
  const [numTeachers, setNumTeachers] = useState(0);
  const [numBuses, setNumBuses] = useState(0);
  const [copyFromGeneral, setCopyFromGeneral] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [otherInstituteCount, setOtherInstituteCount] = useState(1);

  // Form data states
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    state: "",
    city: "",
    aadharNum: "",
    aadhar: null as File | null,
  });

  // Individual - Industry Professional
  const [industryData, setIndustryData] = useState({
    companyName: "",
    companySector: "",
    designation: "",
  });

  // Individual - Academician
  const [academicianData, setAcademicianData] = useState({
    instituteName: "",
    designation: "",
    departmentName: "",
  });

  // Individual - Student
  const [studentData, setStudentData] = useState({
    collegeName: "",
  });

  // Individual - Others
  const [othersData, setOthersData] = useState({
    otherProfession: "",
  });

  // Institute - School/College
  const [instituteData, setInstituteData] = useState({
    institutionName: "",
    institutionState: "",
    institutionCity: "",
    vehicleNumber: "",
  });

  const [principalData, setPrincipalData] = useState({
    name: "",
    email: "",
    contact: "",
    gender: "",
  });

  const [teacherInChargeData, setTeacherInChargeData] = useState({
    name: "",
    email: "",
    contact: "",
  });

  // Institute - Others (Industry/Academician)
  const [instituteOthersIndustryData, setInstituteOthersIndustryData] =
    useState({
      companyName: "",
      companySector: "",
      designation: "",
    });

  const [instituteOthersAcademicianData, setInstituteOthersAcademicianData] =
    useState({
      instituteName: "",
      designation: "",
      departmentName: "",
    });

  // Slot capacities
  const slotCapacities = {
    schoolCollege: {
      "2jan_forenoon": { max: 6500, current: 0 },
      "2jan_afternoon": { max: 4000, current: 0 },
      "3jan_forenoon": { max: 5500, current: 0 },
      "3jan_afternoon": { max: 3000, current: 0 },
    },
    overall: {
      "2jan_forenoon": { max: 13500, current: 0 },
      "2jan_afternoon": { max: 16000, current: 0 },
      "3jan_forenoon": { max: 14500, current: 0 },
      "3jan_afternoon": { max: 17000, current: 0 },
      "4jan_forenoon": { max: 20000, current: 0 },
      "4jan_afternoon": { max: 20000, current: 0 },
    },
  };

  // Effect to copy data when checkbox is ticked
  useEffect(() => {
    if (copyFromGeneral) {
      setTeacherInChargeData({
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
      });
    }
  }, [copyFromGeneral, formData.name, formData.email, formData.contact]);

  const handleCopyCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setCopyFromGeneral(isChecked);

    if (isChecked) {
      setTeacherInChargeData({
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
      });
    } else {
      setTeacherInChargeData({
        name: "",
        email: "",
        contact: "",
      });
    }
  };

  // Add this function inside your IOHRegistration component, before the return statement
  const isFormValid = (): boolean => {
    // Check Aadhaar validation
    if (aadharError) return false;

    // Check if Aadhaar file is uploaded
    if (!formData.aadhar) return false;

    // Check Family registration limits
    if (registrationType === "GROUP" && groupType === "FAMILY") {
      if (totalPeople > 4) return false;
      if (adultCount < 1) return false;
    }

    // Check Institute Others limits
    if (
      registrationType === "GROUP" &&
      groupType === "INSTITUTE" &&
      instituteType === "OTHERS" &&
      otherInstituteCount > 5
    ) {
      return false;
    }

    return true;
  };

  const handleTeacherInChargeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setTeacherInChargeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (copyFromGeneral) {
      setCopyFromGeneral(false);
    }
  };

  const totalPeople = adultCount + childCount;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate Aadhaar file is uploaded
    if (!formData.aadhar) {
      setAadharFileError("Please upload your Aadhaar card");
      // alert("Please upload your Aadhaar card before submitting");
      return;
    }

    let aadharFilePath;
    if (formData.aadhar) {
      aadharFilePath = await upload("aadhar", formData.aadhar);
      console.log("uploading aadhaar. file path: ", aadharFilePath);
    }

    // Build the input data object
    const inputData: any = {
      name: formData.name,
      phone: formData.contact,
      email: formData.email,
      state: formData.state,
      city: formData.city,
      aadharNumber: formData.aadharNum,
      aadharFilePath: aadharFilePath,
      selectedSlot,
      registerType: registrationType,
    };

    // INDIVIDUAL REGISTRATION
    if (registrationType === "INDIVIDUAL") {
      inputData.individualCategory = individualType; // Now correctly uppercase enum value

      if (individualType === "INDUSTRY_PROFESSIONAL") {
        inputData.companyName = industryData.companyName;
        inputData.companySector = industryData.companySector;
        inputData.designation = industryData.designation;
      } else if (individualType === "ACADEMICIAN") {
        inputData.instituteName = academicianData.instituteName;
        inputData.instituteDesignation = academicianData.designation;
        inputData.departmentName = academicianData.departmentName;
      } else if (individualType === "COLLEGE_STUDENT") {
        inputData.collegeName = studentData.collegeName;
      } else if (individualType === "OTHERS") {
        inputData.otherProfession = othersData.otherProfession;
      }
    }

    // GROUP REGISTRATION
    if (registrationType === "GROUP") {
      inputData.groupType = groupType;

      // FAMILY
      if (groupType === "FAMILY") {
        inputData.adultCount = adultCount;
        inputData.childCount = childCount;
      }

      // INSTITUTE
      if (groupType === "INSTITUTE") {
        inputData.instituteCategory = instituteType;

        // School/College
        if (instituteType === "SCHOOL" || instituteType === "COLLEGE") {
          inputData.institutionName = instituteData.institutionName;
          inputData.institutionState = instituteData.institutionState;
          inputData.institutionCity = instituteData.institutionCity;
          inputData.principalName = principalData.name;
          inputData.principalEmail = principalData.email;
          inputData.principalPhone = principalData.contact;
          inputData.principalGender = principalData.gender;
          inputData.studentCount = numStudents;
          inputData.teacherCount = numTeachers;
          inputData.busCount = numBuses;
          inputData.vehicleNumber = instituteData.vehicleNumber;
          inputData.teacherName = teacherInChargeData.name;
          inputData.teacherEmail = teacherInChargeData.email;
          inputData.teacherPhone = teacherInChargeData.contact;
          // TODO: Add declaration form path if numStudents > 5
        }

        // Others (Industry Professional / Academician)
        if (instituteType === "OTHERS") {
          inputData.othersProfession = instituteOtherType;

          if (instituteOtherType === "INDUSTRY_PROFESSIONAL") {
            inputData.othersCompanyName =
              instituteOthersIndustryData.companyName;
            inputData.othersCompanySector =
              instituteOthersIndustryData.companySector;
            inputData.othersDesignation =
              instituteOthersIndustryData.designation;
          } else if (instituteOtherType === "ACADEMICIAN") {
            inputData.othersInstituteName =
              instituteOthersAcademicianData.instituteName;
            inputData.othersInstituteDesignation =
              instituteOthersAcademicianData.designation;
            inputData.othersDepartmentName =
              instituteOthersAcademicianData.departmentName;
          }
        }
      }
    }

    try {
      const res = await registerUser({ variables: { data: inputData } });
      console.log("REGISTERED:", res);
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Registration error:", err);
      alert("Registration failed! " + (err?.message || "Unknown error"));
    }
  };

  const validateAadhar = (value: string): string => {
    if (!/^\d{12}$/.test(value)) {
      return "Aadhaar number must be a 12-digit number.";
    }
    if (!/^[2-9]\d{11}$/.test(value)) {
      return "Invalid Aadhaar number format.";
    }
    return "";
  };

  const getAvailableSlots = () => {
    const isSchoolCollege =
      registrationType === "GROUP" &&
      groupType === "INSTITUTE" &&
      (instituteType === "SCHOOL" || instituteType === "COLLEGE");

    if (isSchoolCollege) {
      return [
        {
          value: "2jan_forenoon",
          label: "2nd Jan - Forenoon",
          capacity: slotCapacities.schoolCollege["2jan_forenoon"],
        },
        {
          value: "2jan_afternoon",
          label: "2nd Jan - Afternoon",
          capacity: slotCapacities.schoolCollege["2jan_afternoon"],
        },
        {
          value: "3jan_forenoon",
          label: "3rd Jan - Forenoon",
          capacity: slotCapacities.schoolCollege["3jan_forenoon"],
        },
        {
          value: "3jan_afternoon",
          label: "3rd Jan - Afternoon",
          capacity: slotCapacities.schoolCollege["3jan_afternoon"],
        },
      ];
    }

    return [
      {
        value: "2jan_forenoon",
        label: "2nd Jan - Forenoon",
        capacity: slotCapacities.overall["2jan_forenoon"],
      },
      {
        value: "2jan_afternoon",
        label: "2nd Jan - Afternoon",
        capacity: slotCapacities.overall["2jan_afternoon"],
      },
      {
        value: "3jan_forenoon",
        label: "3rd Jan - Forenoon",
        capacity: slotCapacities.overall["3jan_forenoon"],
      },
      {
        value: "3jan_afternoon",
        label: "3rd Jan - Afternoon",
        capacity: slotCapacities.overall["3jan_afternoon"],
      },
      {
        value: "4jan_forenoon",
        label: "4th Jan - Forenoon",
        capacity: slotCapacities.overall["4jan_forenoon"],
      },
      {
        value: "4jan_afternoon",
        label: "4th Jan - Afternoon",
        capacity: slotCapacities.overall["4jan_afternoon"],
      },
    ];
  };

  const NUM_STARS = 120;
  const stars = Array.from({ length: NUM_STARS }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 0.5 + Math.random() * 1.5,
    opacity: 0.5 + Math.random() * 0.5,
  }));

  function StarfieldBg() {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          background: "#000",
          overflow: "hidden",
          zIndex: -1,
        }}
      >
        {stars.map((star, idx) => (
          <span
            key={idx}
            style={{
              position: "fixed",
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              borderRadius: "50%",
              background: "#fff",
              opacity: star.opacity,
              pointerEvents: "none",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <StarfieldBg />
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gray-900 text-gray-200 rounded-2xl shadow-2xl shadow-yellow-500/10 p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
              Shaastra Open House
            </h1>
            <p className="text-gray-400 text-lg">Registration Form</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Information */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">
                General Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    value={formData.contact}
                    onChange={(e) =>
                      setFormData({ ...formData, contact: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email ID *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Aadhaar Number *
                  </label>
                  <input
                    type="text"
                    maxLength={12}
                    required
                    value={formData.aadharNum}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setFormData({ ...formData, aadharNum: value });
                        const err = validateAadhar(value);
                        setAadharError(err);
                      }
                    }}
                    className={`w-full px-4 py-2 border ${
                      aadharError ? "border-red-500" : "border-gray-600"
                    } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                      aadharError
                        ? "focus:ring-red-500"
                        : "focus:ring-yellow-500"
                    } focus:border-transparent`}
                  />
                  {aadharError && (
                    <p className="text-red-400 text-sm mt-1">{aadharError}</p>
                  )}
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Aadhaar Card Upload *
                  </label>
                  <div className="flex items-center space-x-2">
                    <Upload className="text-gray-500" size={20} />
                    <input
                      type="file"
                      required
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-800 file:cursor-pointer file:text-yellow-200 hover:file:bg-yellow-700"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          aadhar: e.target.files?.[0] || null,
                        })
                      }
                    />
                  </div>
                </div> */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Aadhaar Card Upload *
                  </label>
                  <div className="flex items-center space-x-2">
                    <Upload className="text-gray-500" size={20} />
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className={`w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-800 file:cursor-pointer file:text-yellow-200 hover:file:bg-yellow-700 ${
                        aadharFileError
                          ? "border border-red-500 rounded-lg"
                          : ""
                      }`}
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setFormData({
                          ...formData,
                          aadhar: file,
                        });
                        if (file) {
                          setAadharFileError("");
                        } else {
                          setAadharFileError("Please upload your Aadhaar card");
                        }
                      }}
                    />
                  </div>
                  {aadharFileError && (
                    <p className="text-red-400 text-sm mt-1">
                      {aadharFileError}
                    </p>
                  )}
                  {formData.aadhar && (
                    <p className="text-green-400 text-sm mt-1">
                      ✓ File selected: {formData.aadhar.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Registration Type Toggle */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Registration Type
              </h2>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  onClick={() => setRegistrationType("INDIVIDUAL")}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center ${
                    registrationType === "INDIVIDUAL"
                      ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/30"
                      : "bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600 hover:cursor-pointer"
                  }`}
                >
                  <User className="inline mr-2" size={20} />
                  Individual
                </button>

                <button
                  type="button"
                  onClick={() => setRegistrationType("GROUP")}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center ${
                    registrationType === "GROUP"
                      ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/30"
                      : "bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600 hover:cursor-pointer"
                  }`}
                >
                  <Users className="inline mr-2" size={20} />
                  Group
                </button>
              </div>
            </div>

            {/* Individual Registration */}
            {registrationType === "INDIVIDUAL" && (
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Individual Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Select Category *
                    </label>
                    <select
                      required
                      value={individualType}
                      onChange={(e) => setIndividualType(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="">Choose an option</option>
                      <option value="INDUSTRY_PROFESSIONAL">
                        Industry Professional
                      </option>
                      <option value="ACADEMICIAN">Academician</option>
                      <option value="COLLEGE_STUDENT">College Student</option>
                      <option value="OTHERS">Others</option>
                    </select>
                  </div>

                  {individualType === "INDUSTRY_PROFESSIONAL" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={industryData.companyName}
                          onChange={(e) =>
                            setIndustryData({
                              ...industryData,
                              companyName: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Company Sector *
                        </label>
                        <input
                          type="text"
                          required
                          value={industryData.companySector}
                          onChange={(e) =>
                            setIndustryData({
                              ...industryData,
                              companySector: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Designation *
                        </label>
                        <input
                          type="text"
                          required
                          value={industryData.designation}
                          onChange={(e) =>
                            setIndustryData({
                              ...industryData,
                              designation: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}

                  {individualType === "ACADEMICIAN" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Institute Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={academicianData.instituteName}
                          onChange={(e) =>
                            setAcademicianData({
                              ...academicianData,
                              instituteName: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Designation *
                        </label>
                        <input
                          type="text"
                          required
                          value={academicianData.designation}
                          onChange={(e) =>
                            setAcademicianData({
                              ...academicianData,
                              designation: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Department Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={academicianData.departmentName}
                          onChange={(e) =>
                            setAcademicianData({
                              ...academicianData,
                              departmentName: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}

                  {individualType === "COLLEGE_STUDENT" && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        College Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={studentData.collegeName}
                        onChange={(e) =>
                          setStudentData({
                            ...studentData,
                            collegeName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  {individualType === "OTHERS" && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Please mention your occupation/designation *
                      </label>
                      <input
                        type="text"
                        required
                        value={othersData.otherProfession}
                        onChange={(e) =>
                          setOthersData({
                            ...othersData,
                            otherProfession: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Group Registration */}
            {registrationType === "GROUP" && (
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Group Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Group Type *
                    </label>
                    <select
                      required
                      value={groupType}
                      onChange={(e) => setGroupType(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="">Choose an option</option>
                      <option value="FAMILY">Family</option>
                      <option value="INSTITUTE">Institute</option>
                    </select>
                  </div>

                  {groupType === "FAMILY" && (
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Adult Count *
                          </label>
                          {/* <input
                            type="number"
                            min="1"
                            required
                            value={adultCount}
                            onChange={(e) =>
                              setAdultCount(parseInt(e.target.value) || 1)
                            }
                            className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          /> */}
                          <input
                            type="number"
                            min="1"
                            required
                            value={adultCount === 0 ? "" : adultCount}
                            onChange={(e) => {
                              const value = e.target.value;

                              if (value === "") {
                                // allow the user to backspace → show empty field
                                setAdultCount(0);
                                return;
                              }

                              const num = Number(value);

                              // Allow any positive number typed
                              if (!isNaN(num) && num >= 1) {
                                setAdultCount(num);
                              }
                            }}
                            className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Children Count *
                          </label>
                          <input
                            type="number"
                            min="0"
                            required
                            value={childCount}
                            onChange={(e) =>
                              setChildCount(parseInt(e.target.value) || 0)
                            }
                            className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                        <AlertCircle
                          className="inline text-yellow-400 mr-2"
                          size={20}
                        />
                        <span className="text-sm text-gray-200">
                          Total people: {totalPeople}
                        </span>
                      </div>

                      {totalPeople > 4 && (
                        <div className="bg-red-900/50 border border-red-700 rounded-lg p-4">
                          <AlertCircle
                            className="inline text-red-400 mr-2"
                            size={20}
                          />
                          <span className="text-sm text-red-200 font-medium">
                            Maximum allowed for family registration is 4 people.
                            For more, please register separately.
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {groupType === "INSTITUTE" && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Institute Type *
                        </label>
                        <select
                          required
                          value={instituteType}
                          onChange={(e) => setInstituteType(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        >
                          <option value="">Choose an option</option>
                          <option value="SCHOOL">School</option>
                          <option value="COLLEGE">College</option>
                          <option value="OTHERS">Others</option>
                        </select>
                      </div>

                      {(instituteType === "SCHOOL" ||
                        instituteType === "COLLEGE") && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                {instituteType === "SCHOOL"
                                  ? "School"
                                  : "College"}{" "}
                                Name *
                              </label>
                              <input
                                type="text"
                                required
                                value={instituteData.institutionName}
                                onChange={(e) =>
                                  setInstituteData({
                                    ...instituteData,
                                    institutionName: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                State *
                              </label>
                              <input
                                type="text"
                                required
                                value={instituteData.institutionState}
                                onChange={(e) =>
                                  setInstituteData({
                                    ...instituteData,
                                    institutionState: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                City *
                              </label>
                              <input
                                type="text"
                                required
                                value={instituteData.institutionCity}
                                onChange={(e) =>
                                  setInstituteData({
                                    ...instituteData,
                                    institutionCity: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              />
                            </div>
                          </div>

                          <div className="bg-gray-700 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-100 mb-3">
                              Principal/HOD Details
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Name *
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={principalData.name}
                                  onChange={(e) =>
                                    setPrincipalData({
                                      ...principalData,
                                      name: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Email ID *
                                </label>
                                <input
                                  type="email"
                                  required
                                  value={principalData.email}
                                  onChange={(e) =>
                                    setPrincipalData({
                                      ...principalData,
                                      email: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Contact Number *
                                </label>
                                <input
                                  type="tel"
                                  required
                                  value={principalData.contact}
                                  onChange={(e) =>
                                    setPrincipalData({
                                      ...principalData,
                                      contact: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Gender *
                                </label>
                                <select
                                  required
                                  value={principalData.gender}
                                  onChange={(e) =>
                                    setPrincipalData({
                                      ...principalData,
                                      gender: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                >
                                  <option value="">Select</option>
                                  <option value="MALE">Male</option>
                                  <option value="FEMALE">Female</option>
                                  <option value="OTHER">Other</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                Number of Students *
                              </label>
                              <input
                                type="number"
                                min="0"
                                required
                                value={numStudents}
                                onChange={(e) =>
                                  setNumStudents(parseInt(e.target.value) || 0)
                                }
                                className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                Number of Teachers *
                              </label>
                              <input
                                type="number"
                                min="0"
                                required
                                value={numTeachers}
                                onChange={(e) =>
                                  setNumTeachers(parseInt(e.target.value) || 0)
                                }
                                className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                Number of Buses{" "}
                              </label>
                              <input
                                type="number"
                                min="0"
                                placeholder="Optional"
                                value={numBuses || ""}
                                onChange={(e) =>
                                  setNumBuses(parseInt(e.target.value) || 0)
                                }
                                className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Vehicle Number(s)
                            </label>
                            <input
                              type="text"
                              placeholder="Optional"
                              value={instituteData.vehicleNumber}
                              onChange={(e) =>
                                setInstituteData({
                                  ...instituteData,
                                  vehicleNumber: e.target.value,
                                })
                              }
                              className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            />
                          </div>

                          <div className="bg-gray-700 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-100 mb-3">
                              Teacher In-Charge Details
                            </h4>
                            <div className="mb-3">
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={copyFromGeneral}
                                  onChange={handleCopyCheckboxChange}
                                  className="w-4 h-4 text-yellow-500 rounded focus:ring-yellow-600"
                                />
                                <span className="text-sm text-gray-300">
                                  Copy from general information
                                </span>
                              </label>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Name *
                                </label>
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
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Email ID *
                                </label>
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
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Contact Number *
                                </label>
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
                              <AlertCircle
                                className="inline text-yellow-400 mr-2"
                                size={20}
                              />
                              <span className="text-sm text-yellow-200 font-medium">
                                Declaration form required for groups with more
                                than 5 students
                              </span>
                              <div className="mt-3">
                                <p className="text-xs text-gray-400 mb-2">
                                  Instructions: Print the form, get it stamped
                                  from HOD/Principal, and upload the signed
                                  copy.
                                </p>
                                <div className="mb-3">
                                  <a
                                    href="#"
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

                      {instituteType === "OTHERS" && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Category *
                            </label>
                            <select
                              required
                              value={instituteOtherType}
                              onChange={(e) =>
                                setInstituteOtherType(e.target.value)
                              }
                              className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            >
                              <option value="">Choose an option</option>
                              <option value="INDUSTRY_PROFESSIONAL">
                                Industry Professional
                              </option>
                              <option value="ACADEMICIAN">Academician</option>
                            </select>
                          </div>

                          {instituteOtherType === "INDUSTRY_PROFESSIONAL" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Company Name *
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={
                                    instituteOthersIndustryData.companyName
                                  }
                                  onChange={(e) =>
                                    setInstituteOthersIndustryData({
                                      ...instituteOthersIndustryData,
                                      companyName: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Company Sector *
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={
                                    instituteOthersIndustryData.companySector
                                  }
                                  onChange={(e) =>
                                    setInstituteOthersIndustryData({
                                      ...instituteOthersIndustryData,
                                      companySector: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Designation *
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={
                                    instituteOthersIndustryData.designation
                                  }
                                  onChange={(e) =>
                                    setInstituteOthersIndustryData({
                                      ...instituteOthersIndustryData,
                                      designation: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Number of People *
                                </label>
                                <input
                                  type="number"
                                  min="1"
                                  required
                                  value={otherInstituteCount}
                                  onChange={(e) =>
                                    setOtherInstituteCount(
                                      parseInt(e.target.value) || 1
                                    )
                                  }
                                  className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                />
                              </div>
                              {otherInstituteCount > 5 && (
                                <div className="md:col-span-2 bg-red-900/50 border border-red-700 rounded-lg p-4">
                                  <AlertCircle
                                    className="inline text-red-400 mr-2"
                                    size={20}
                                  />
                                  <span className="text-sm text-red-200 font-medium">
                                    Maximum allowed for this category is 5
                                    people. For more, please register
                                    separately.
                                  </span>
                                </div>
                              )}
                            </div>
                          )}

                          {instituteOtherType === "ACADEMICIAN" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Institute Name *
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={
                                    instituteOthersAcademicianData.instituteName
                                  }
                                  onChange={(e) =>
                                    setInstituteOthersAcademicianData({
                                      ...instituteOthersAcademicianData,
                                      instituteName: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Designation *
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={
                                    instituteOthersAcademicianData.designation
                                  }
                                  onChange={(e) =>
                                    setInstituteOthersAcademicianData({
                                      ...instituteOthersAcademicianData,
                                      designation: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Department Name *
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={
                                    instituteOthersAcademicianData.departmentName
                                  }
                                  onChange={(e) =>
                                    setInstituteOthersAcademicianData({
                                      ...instituteOthersAcademicianData,
                                      departmentName: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Number of People *
                                </label>
                                <input
                                  type="number"
                                  min="1"
                                  required
                                  value={otherInstituteCount}
                                  onChange={(e) =>
                                    setOtherInstituteCount(
                                      parseInt(e.target.value) || 1
                                    )
                                  }
                                  className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                />
                              </div>
                              {otherInstituteCount > 5 && (
                                <div className="md:col-span-2 bg-red-900/50 border border-red-700 rounded-lg p-4">
                                  <AlertCircle
                                    className="inline text-red-400 mr-2"
                                    size={20}
                                  />
                                  <span className="text-sm text-red-200 font-medium">
                                    Maximum allowed for this category is 5
                                    people. For more, please register
                                    separately.
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Slot Selection */}
            {/* <div className="bg-gray-800 p-6 rounded-lg">
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
                          ? "border-gray-700 bg-gray-800 cursor-not-allowed"
                          : "border-gray-600 hover:border-yellow-500 cursor-pointer"
                      } ${
                        selectedSlot === slot.value
                          ? "border-yellow-500 bg-gray-700"
                          : ""
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
                      <span className="font-medium text-gray-100">
                        {slot.label}
                      </span>
                      <span
                        className={`ml-3 text-sm ${
                          isFull
                            ? "text-red-500 font-semibold"
                            : "text-green-400"
                        }`}
                      >
                        {isFull ? "(FULL)" : `(${remaining} spots remaining)`}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div> */}
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
                  const timeSlot = slot.value.includes("forenoon")
                    ? "9:00 AM onwards"
                    : "1:00 PM onwards";

                  return (
                    <label
                      key={slot.value}
                      className={`block p-4 border-2 rounded-lg transition-all ${
                        isFull
                          ? "border-gray-700 bg-gray-800 cursor-not-allowed"
                          : "border-gray-600 hover:border-yellow-500 cursor-pointer"
                      } ${
                        selectedSlot === slot.value
                          ? "border-yellow-500 bg-gray-700"
                          : ""
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
                      <span className="font-medium text-gray-100">
                        {slot.label}
                      </span>
                      <span
                        className={`ml-3 text-sm ${
                          isFull
                            ? "text-red-500 font-semibold"
                            : "text-gray-400"
                        }`}
                      >
                        {isFull ? "(FULL)" : `(${timeSlot})`}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            {/* <div className="text-center pt-6">
              <button
                type="submit"
                disabled={!isFormValid()}
                className={`px-12 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg w-full sm:w-auto ${
                  isFormValid()
                    ? "bg-yellow-500 text-black hover:bg-yellow-600 shadow-yellow-500/30 hover:cursor-pointer"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed shadow-gray-600/20 opacity-60"
                }`}
              >
                Complete Registration
              </button>
            </div> */}
            <div className="text-center pt-6">
              <button
                type="submit"
                className="px-12 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg w-full sm:w-auto bg-yellow-500 text-black hover:bg-yellow-600 shadow-yellow-500/30 hover:cursor-pointer"
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
              <h3 className="text-2xl font-bold text-green-400 mb-4">
                Success!
              </h3>
              <p className="text-gray-300 mb-6">
                Your registration has been submitted successfully.
              </p>
              {/* <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors w-full"
              >
                Close
              </button> */}
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  window.location.href = "https://www.shaastra.org";
                }}
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
