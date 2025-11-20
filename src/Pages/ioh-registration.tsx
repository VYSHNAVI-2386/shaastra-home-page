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
  // Centralized Error State
  const [errors, setErrors] = useState<any>({});

  const [registerUser] = useMutation(REGISTER_IOH);
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

  // State for the declaration form
  const [declarationForm, setDeclarationForm] = useState<File | null>(null);

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
      // Clear any errors from teacher fields if they are being copied
      setErrors((prev: any) => ({
        ...prev,
        teacherName: undefined,
        teacherEmail: undefined,
        teacherContact: undefined,
      }));
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
      // Clear errors on copy
      setErrors((prev: any) => ({
        ...prev,
        teacherName: undefined,
        teacherEmail: undefined,
        teacherContact: undefined,
      }));
    } else {
      setTeacherInChargeData({
        name: "",
        email: "",
        contact: "",
      });
    }
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
    // Clear error on change
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: undefined }));
    }
  };

  const totalPeople = adultCount + childCount;

  // --- VALIDATION HELPERS ---

  const validateName = (name: string): string => {
    if (!name || name.trim() === "") {
      return "Name is required and cannot be just spaces.";
    }
    return ""; // No error
  };

  const validateEmail = (email: string): string => {
    if (!email || email.trim() === "") {
      return "Email is required.";
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return "Please enter a valid email address (e.g., name@example.com).";
    }
    return ""; // No error
  };

  const validateContact = (contact: string): string => {
    const regex = /^\d{10}$/;
    if (!contact) {
      return "Contact number is required.";
    }
    if (!regex.test(contact)) {
      return "Contact number must be exactly 10 digits.";
    }
    return ""; // No error
  };

  const validateAadhar = (value: string): string => {
    if (!value) {
      return "Aadhaar number is required.";
    }
    if (!/^\d{12}$/.test(value)) {
      return "Aadhaar number must be a 12-digit number.";
    }
    if (!/^[2-9]\d{11}$/.test(value)) {
      return "Invalid Aadhaar number format.";
    }
    return "";
  };

  const validateRequired = (
    value: string,
    fieldName: string = "This field"
  ): string => {
    if (!value || value.trim() === "") {
      return `${fieldName} is required.`;
    }
    return "";
  };

  // --- COMPREHENSIVE VALIDATION FUNCTION ---

  const validateForm = (): boolean => {
    const newErrors: any = {};

    // 1. General Information
    newErrors.name = validateName(formData.name);
    newErrors.email = validateEmail(formData.email);
    newErrors.contact = validateContact(formData.contact);
    newErrors.state = validateRequired(formData.state, "State");
    newErrors.city = validateRequired(formData.city, "City");
    newErrors.aadharNum = validateAadhar(formData.aadharNum);
    if (!formData.aadhar) {
      newErrors.aadhar = "Aadhaar card upload is required.";
    }

    // 2. Slot Selection
    if (!selectedSlot) {
      newErrors.selectedSlot = "Please select a time slot.";
    }

    // 3. Individual Registration
    if (registrationType === "INDIVIDUAL") {
      if (!individualType) {
        newErrors.individualType = "Please select a category.";
      } else if (individualType === "INDUSTRY_PROFESSIONAL") {
        newErrors.companyName = validateRequired(
          industryData.companyName,
          "Company Name"
        );
        newErrors.companySector = validateRequired(
          industryData.companySector,
          "Company Sector"
        );
        newErrors.designation = validateRequired(
          industryData.designation,
          "Designation"
        );
      } else if (individualType === "ACADEMICIAN") {
        newErrors.instituteName = validateRequired(
          academicianData.instituteName,
          "Institute Name"
        );
        newErrors.designation = validateRequired(
          academicianData.designation,
          "Designation"
        );
        newErrors.departmentName = validateRequired(
          academicianData.departmentName,
          "Department Name"
        );
      } else if (individualType === "COLLEGE_STUDENT") {
        newErrors.collegeName = validateRequired(
          studentData.collegeName,
          "College Name"
        );
      } else if (individualType === "OTHERS") {
        newErrors.otherProfession = validateRequired(
          othersData.otherProfession,
          "Occupation"
        );
      }
    }

    // 4. Group Registration
    if (registrationType === "GROUP") {
      if (!groupType) {
        newErrors.groupType = "Please select a group type.";
      } else if (groupType === "FAMILY") {
        if (adultCount < 1) {
          newErrors.adultCount = "At least 1 adult is required.";
        }
        if (totalPeople > 4) {
          newErrors.familySize = "Maximum family size is 4."; // This is for submit-time check
        }
      } else if (groupType === "INSTITUTE") {
        if (!instituteType) {
          newErrors.instituteType = "Please select an institute type.";
        } else if (instituteType === "SCHOOL" || instituteType === "COLLEGE") {
          // Institute Details
          newErrors.institutionName = validateRequired(
            instituteData.institutionName,
            "Institute Name"
          );
          newErrors.institutionState = validateRequired(
            instituteData.institutionState,
            "State"
          );
          newErrors.institutionCity = validateRequired(
            instituteData.institutionCity,
            "City"
          );

          // Principal Details
          newErrors.principalName = validateRequired(
            principalData.name,
            "Principal's Name"
          );
          newErrors.principalEmail = validateEmail(principalData.email);
          newErrors.principalContact = validateContact(principalData.contact);
          newErrors.principalGender = validateRequired(
            principalData.gender,
            "Gender"
          );

          // Teacher In-Charge Details
          newErrors.teacherName = validateRequired(
            teacherInChargeData.name,
            "Teacher's Name"
          );
          newErrors.teacherEmail = validateEmail(teacherInChargeData.email);
          newErrors.teacherContact = validateContact(
            teacherInChargeData.contact
          );

          // Counts
          if (numStudents < 0) newErrors.numStudents = "Cannot be negative.";
          if (numTeachers < 0) newErrors.numTeachers = "Cannot be negative.";
          if (numStudents === 0 && numTeachers === 0) {
            newErrors.numStudents =
              "At least one student or teacher is required.";
            newErrors.numTeachers =
              "At least one student or teacher is required.";
          }

          // Declaration Form
          if (numStudents > 5 && !declarationForm) {
            newErrors.declarationForm = "Declaration form is required.";
          }
        } else if (instituteType === "OTHERS") {
          if (!instituteOtherType) {
            newErrors.instituteOtherType = "Please select a category.";
          } else {
            if (otherInstituteCount > 5) {
              newErrors.otherInstituteCount = "Maximum is 5 people.";
            }
            if (otherInstituteCount < 1) {
              newErrors.otherInstituteCount = "At least 1 person is required.";
            }

            if (instituteOtherType === "INDUSTRY_PROFESSIONAL") {
              newErrors.othersCompanyName = validateRequired(
                instituteOthersIndustryData.companyName,
                "Company Name"
              );
              newErrors.othersCompanySector = validateRequired(
                instituteOthersIndustryData.companySector,
                "Company Sector"
              );
              newErrors.othersDesignation = validateRequired(
                instituteOthersIndustryData.designation,
                "Designation"
              );
            } else if (instituteOtherType === "ACADEMICIAN") {
              newErrors.othersInstituteName = validateRequired(
                instituteOthersAcademicianData.instituteName,
                "Institute Name"
              );
              newErrors.othersInstituteDesignation = validateRequired(
                instituteOthersAcademicianData.designation,
                "Designation"
              );
              newErrors.othersDepartmentName = validateRequired(
                instituteOthersAcademicianData.departmentName,
                "Department Name"
              );
            }
          }
        }
      }
    }

    // Filter out undefined/empty string errors
    const
 filteredErrors = Object.entries(newErrors).reduce(
      (acc, [key, value]) => {
        if (value) {
          acc[key] = value;
        }
        return acc;
      },
      {} as any
    );

    setErrors(filteredErrors);
    return Object.keys(filteredErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Run the comprehensive validation
    if (!validateForm()) {
      // alert("Please fix the errors in the form."); // Optional: show a general alert
      return; // Stop submission if validation fails
    }

    // --- Validation Passed, Proceed to Upload ---

    let aadharFilePath;
    try {
      if (formData.aadhar) {
        aadharFilePath = await upload("aadhar", formData.aadhar);
        console.log("uploading aadhaar. file path: ", aadharFilePath);
      }
    } catch (uploadError) {
      console.error("Aadhaar upload error:", uploadError);
      setErrors((prev: any) => ({
        ...prev,
        aadhar: "File upload failed. Please try again.",
      }));
      return;
    }

    let declarationFormPath;
    try {
      if (declarationForm) {
        declarationFormPath = await upload("declaration", declarationForm);
        console.log(
          "uploading declaration form. file path: ",
          declarationFormPath
        );
      }
    } catch (uploadError) {
      console.error("Declaration form upload error:", uploadError);
      setErrors((prev: any) => ({
        ...prev,
        declarationForm: "File upload failed. Please try again.",
      }));
      return;
    }

    // Build the input data object
    const inputData: any = {
      name: formData.name.trim(),
      phone: formData.contact,
      email: formData.email.trim(),
      state: formData.state,
      city: formData.city,
      aadharNumber: formData.aadharNum,
      aadharFilePath: aadharFilePath,
      selectedSlot,
      registerType: registrationType,
    };

    // INDIVIDUAL REGISTRATION
    if (registrationType === "INDIVIDUAL") {
      inputData.individualCategory = individualType;

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
          if (declarationFormPath) {
            inputData.declarationFormPath = declarationFormPath;
          }
        }

        // Others (Industry Professional / Academician)
        if (instituteType === "OTHERS") {
          inputData.othersProfession = instituteOtherType;
          inputData.othersCount = otherInstituteCount; // Make sure backend accepts this

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
    } catch (err: any) {
      console.error("Registration error:", err);
      alert("Registration failed! " + (err?.message || "Unknown error"));
    }
  };

  // Helper function to manage simple field changes (text, email, tel)
  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    stateSetter: React.Dispatch<React.SetStateAction<any>>,
    stateObject: any
  ) => {
    const { name, value } = e.target;
    stateSetter({
      ...stateObject,
      [name]: value,
    });
    // Clear the error for this field
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: undefined }));
    }
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
      <div className="min-h-screen py-38 px-4 sm:px-6 lg:px-8">
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
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    className={`w-full px-4 py-2 border ${
                      errors.name ? "border-red-500" : "border-gray-600"
                    } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                      errors.name ? "focus:ring-red-500" : "focus:ring-yellow-500"
                    } focus:border-transparent`}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) {
                        setErrors((prev: any) => ({ ...prev, name: undefined }));
                      }
                    }}
                    onBlur={(e) => {
                      setErrors((prev: any) => ({
                        ...prev,
                        name: validateName(e.target.value),
                      }));
                    }}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-400 mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    required
                    className={`w-full px-4 py-2 border ${
                      errors.contact ? "border-red-500" : "border-gray-600"
                    } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                      errors.contact
                        ? "focus:ring-red-500"
                        : "focus:ring-yellow-500"
                    } focus:border-transparent`}
                    value={formData.contact}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^0-9]/g, "");
                      if (numericValue.length <= 10) {
                        setFormData({ ...formData, contact: numericValue });
                        if (errors.contact) {
                          setErrors((prev: any) => ({
                            ...prev,
                            contact: undefined,
                          }));
                        }
                      }
                    }}
                    onBlur={(e) => {
                      setErrors((prev: any) => ({
                        ...prev,
                        contact: validateContact(e.target.value),
                      }));
                    }}
                    aria-describedby="contact-error"
                  />
                  {errors.contact && (
                    <p id="contact-error" className="text-sm text-red-400 mt-1">
                      {errors.contact}
                    </p>
                  )}
                </div>

                {/* Email ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email ID *
                  </label>
                  <input
                    type="email"
                    required
                    className={`w-full px-4 py-2 border ${
                      errors.email ? "border-red-500" : "border-gray-600"
                    } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                      errors.email
                        ? "focus:ring-red-500"
                        : "focus:ring-yellow-500"
                    } focus:border-transparent`}
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) {
                        setErrors((prev: any) => ({
                          ...prev,
                          email: undefined,
                        }));
                      }
                    }}
                    onBlur={(e) => {
                      setErrors((prev: any) => ({
                        ...prev,
                        email: validateEmail(e.target.value),
                      }));
                    }}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-400 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    className={`w-full px-4 py-2 border ${
                      errors.state ? "border-red-500" : "border-gray-600"
                    } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                      errors.state
                        ? "focus:ring-red-500"
                        : "focus:ring-yellow-500"
                    } focus:border-transparent`}
                    value={formData.state}
                    onChange={(e) => {
                      setFormData({ ...formData, state: e.target.value });
                      if (errors.state) {
                        setErrors((prev: any) => ({
                          ...prev,
                          state: undefined,
                        }));
                      }
                    }}
                    onBlur={(e) => {
                      setErrors((prev: any) => ({
                        ...prev,
                        state: validateRequired(e.target.value, "State"),
                      }));
                    }}
                  />
                  {errors.state && (
                    <p className="text-sm text-red-400 mt-1">{errors.state}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    className={`w-full px-4 py-2 border ${
                      errors.city ? "border-red-500" : "border-gray-600"
                    } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                      errors.city
                        ? "focus:ring-red-500"
                        : "focus:ring-yellow-500"
                    } focus:border-transparent`}
                    value={formData.city}
                    onChange={(e) => {
                      setFormData({ ...formData, city: e.target.value });
                      if (errors.city) {
                        setErrors((prev: any) => ({ ...prev, city: undefined }));
                      }
                    }}
                    onBlur={(e) => {
                      setErrors((prev: any) => ({
                        ...prev,
                        city: validateRequired(e.target.value, "City"),
                      }));
                    }}
                  />
                  {errors.city && (
                    <p className="text-sm text-red-400 mt-1">{errors.city}</p>
                  )}
                </div>

                {/* Aadhaar Number */}
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
                        if (errors.aadharNum) {
                          setErrors((prev: any) => ({
                            ...prev,
                            aadharNum: undefined,
                          }));
                        }
                      }
                    }}
                    onBlur={(e) => {
                      setErrors((prev: any) => ({
                        ...prev,
                        aadharNum: validateAadhar(e.target.value),
                      }));
                    }}
                    className={`w-full px-4 py-2 border ${
                      errors.aadharNum ? "border-red-500" : "border-gray-600"
                    } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                      errors.aadharNum
                        ? "focus:ring-red-500"
                        : "focus:ring-yellow-500"
                    } focus:border-transparent`}
                  />
                  {errors.aadharNum && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.aadharNum}
                    </p>
                  )}
                </div>

                {/* Aadhaar Card Upload */}
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
                        errors.aadhar
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
                          setErrors((prev: any) => ({
                            ...prev,
                            aadhar: undefined,
                          }));
                        } else {
                          setErrors((prev: any) => ({
                            ...prev,
                            aadhar: "Aadhaar card upload is required.",
                          }));
                        }
                      }}
                    />
                  </div>
                  {errors.aadhar && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.aadhar}
                    </p>
                  )}
                  {formData.aadhar && !errors.aadhar && (
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
                      onChange={(e) => {
                        setIndividualType(e.target.value);
                        if (errors.individualType) {
                          setErrors((prev: any) => ({
                            ...prev,
                            individualType: undefined,
                          }));
                        }
                      }}
                      className={`w-full px-4 py-2 border ${
                        errors.individualType
                          ? "border-red-500"
                          : "border-gray-600"
                      } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                        errors.individualType
                          ? "focus:ring-red-500"
                          : "focus:ring-yellow-500"
                      } focus:border-transparent`}
                    >
                      <option value="">Choose an option</option>
                      <option value="INDUSTRY_PROFESSIONAL">
                        Industry Professional
                      </option>
                      <option value="ACADEMICIAN">Academician</option>
                      <option value="COLLEGE_STUDENT">College Student</option>
                      <option value="OTHERS">Others</option>
                    </select>
                    {errors.individualType && (
                      <p className="text-sm text-red-400 mt-1">
                        {errors.individualType}
                      </p>
                    )}
                  </div>

                  {individualType === "INDUSTRY_PROFESSIONAL" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {/* Company Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          required
                          name="companyName"
                          value={industryData.companyName}
                          onChange={(e) =>
                            handleFieldChange(
                              e,
                              setIndustryData,
                              industryData
                            )
                          }
                          onBlur={(e) =>
                            setErrors((prev: any) => ({
                              ...prev,
                              companyName: validateRequired(
                                e.target.value,
                                "Company Name"
                              ),
                            }))
                          }
                          className={`w-full px-4 py-2 border ${
                            errors.companyName
                              ? "border-red-500"
                              : "border-gray-600"
                          } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                            errors.companyName
                              ? "focus:ring-red-500"
                              : "focus:ring-yellow-500"
                          } focus:border-transparent`}
                        />
                        {errors.companyName && (
                          <p className="text-sm text-red-400 mt-1">
                            {errors.companyName}
                          </p>
                        )}
                      </div>
                      {/* Company Sector */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Company Sector *
                        </label>
                        <input
                          type="text"
                          required
                          name="companySector"
                          value={industryData.companySector}
                          onChange={(e) =>
                            handleFieldChange(
                              e,
                              setIndustryData,
                              industryData
                            )
                          }
                          onBlur={(e) =>
                            setErrors((prev: any) => ({
                              ...prev,
                              companySector: validateRequired(
                                e.target.value,
                                "Company Sector"
                              ),
                            }))
                          }
                          className={`w-full px-4 py-2 border ${
                            errors.companySector
                              ? "border-red-500"
                              : "border-gray-600"
                          } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                            errors.companySector
                              ? "focus:ring-red-500"
                              : "focus:ring-yellow-500"
                          } focus:border-transparent`}
                        />
                        {errors.companySector && (
                          <p className="text-sm text-red-400 mt-1">
                            {errors.companySector}
                          </p>
                        )}
                      </div>
                      {/* Designation */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Designation *
                        </label>
                        <input
                          type="text"
                          required
                          name="designation"
                          value={industryData.designation}
                          onChange={(e) =>
                            handleFieldChange(
                              e,
                              setIndustryData,
                              industryData
                            )
                          }
                          onBlur={(e) =>
                            setErrors((prev: any) => ({
                              ...prev,
                              designation: validateRequired(
                                e.target.value,
                                "Designation"
                              ),
                            }))
                          }
                          className={`w-full px-4 py-2 border ${
                            errors.designation
                              ? "border-red-500"
                              : "border-gray-600"
                          } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                            errors.designation
                              ? "focus:ring-red-500"
                              : "focus:ring-yellow-500"
                          } focus:border-transparent`}
                        />
                        {errors.designation && (
                          <p className="text-sm text-red-400 mt-1">
                            {errors.designation}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {individualType === "ACADEMICIAN" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {/* Institute Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Institute Name *
                        </label>
                        <input
                          type="text"
                          required
                          name="instituteName"
                          value={academicianData.instituteName}
                          onChange={(e) =>
                            handleFieldChange(
                              e,
                              setAcademicianData,
                              academicianData
                            )
                          }
                          onBlur={(e) =>
                            setErrors((prev: any) => ({
                              ...prev,
                              instituteName: validateRequired(
                                e.target.value,
                                "Institute Name"
                              ),
                            }))
                          }
                          className={`w-full px-4 py-2 border ${
                            errors.instituteName
                              ? "border-red-500"
                              : "border-gray-600"
                          } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                            errors.instituteName
                              ? "focus:ring-red-500"
                              : "focus:ring-yellow-500"
                          } focus:border-transparent`}
                        />
                        {errors.instituteName && (
                          <p className="text-sm text-red-400 mt-1">
                            {errors.instituteName}
                          </p>
                        )}
                      </div>
                      {/* Designation */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Designation *
                        </label>
                        <input
                          type="text"
                          required
                          name="designation"
                          value={academicianData.designation}
                          onChange={(e) =>
                            handleFieldChange(
                              e,
                              setAcademicianData,
                              academicianData
                            )
                          }
                          onBlur={(e) =>
                            setErrors((prev: any) => ({
                              ...prev,
                              designation: validateRequired(
                                e.target.value,
                                "Designation"
                              ),
                            }))
                          }
                          className={`w-full px-4 py-2 border ${
                            errors.designation
                              ? "border-red-500"
                              : "border-gray-600"
                          } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                            errors.designation
                              ? "focus:ring-red-500"
                              : "focus:ring-yellow-500"
                          } focus:border-transparent`}
                        />
                        {errors.designation && (
                          <p className="text-sm text-red-400 mt-1">
                            {errors.designation}
                          </p>
                        )}
                      </div>
                      {/* Department Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Department Name *
                        </label>
                        <input
                          type="text"
                          required
                          name="departmentName"
                          value={academicianData.departmentName}
                          onChange={(e) =>
                            handleFieldChange(
                              e,
                              setAcademicianData,
                              academicianData
                            )
                          }
                          onBlur={(e) =>
                            setErrors((prev: any) => ({
                              ...prev,
                              departmentName: validateRequired(
                                e.target.value,
                                "Department Name"
                              ),
                            }))
                          }
                          className={`w-full px-4 py-2 border ${
                            errors.departmentName
                              ? "border-red-500"
                              : "border-gray-600"
                          } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                            errors.departmentName
                              ? "focus:ring-red-500"
                              : "focus:ring-yellow-500"
                          } focus:border-transparent`}
                        />
                        {errors.departmentName && (
                          <p className="text-sm text-red-400 mt-1">
                            {errors.departmentName}
                          </p>
                        )}
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
                        name="collegeName"
                        value={studentData.collegeName}
                        onChange={(e) =>
                          handleFieldChange(e, setStudentData, studentData)
                        }
                        onBlur={(e) =>
                          setErrors((prev: any) => ({
                            ...prev,
                            collegeName: validateRequired(
                              e.target.value,
                              "College Name"
                            ),
                          }))
                        }
                        className={`w-full px-4 py-2 border ${
                          errors.collegeName
                            ? "border-red-500"
                            : "border-gray-600"
                        } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                          errors.collegeName
                            ? "focus:ring-red-500"
                            : "focus:ring-yellow-500"
                        } focus:border-transparent`}
                      />
                      {errors.collegeName && (
                        <p className="text-sm text-red-400 mt-1">
                          {errors.collegeName}
                        </p>
                      )}
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
                        name="otherProfession"
                        value={othersData.otherProfession}
                        onChange={(e) =>
                          handleFieldChange(e, setOthersData, othersData)
                        }
                        onBlur={(e) =>
                          setErrors((prev: any) => ({
                            ...prev,
                            otherProfession: validateRequired(
                              e.target.value,
                              "Occupation"
                            ),
                          }))
                        }
                        className={`w-full px-4 py-2 border ${
                          errors.otherProfession
                            ? "border-red-500"
                            : "border-gray-600"
                        } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                          errors.otherProfession
                            ? "focus:ring-red-500"
                            : "focus:ring-yellow-500"
                        } focus:border-transparent`}
                      />
                      {errors.otherProfession && (
                        <p className="text-sm text-red-400 mt-1">
                          {errors.otherProfession}
                        </p>
                      )}
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
                      onChange={(e) => {
                        setGroupType(e.target.value);
                        if (errors.groupType) {
                          setErrors((prev: any) => ({
                            ...prev,
                            groupType: undefined,
                          }));
                        }
                      }}
                      className={`w-full px-4 py-2 border ${
                        errors.groupType
                          ? "border-red-500"
                          : "border-gray-600"
                      } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                        errors.groupType
                          ? "focus:ring-red-500"
                          : "focus:ring-yellow-500"
                      } focus:border-transparent`}
                    >
                      <option value="">Choose an option</option>
                      <option value="FAMILY">Family</option>
                      <option value="INSTITUTE">Institute</option>
                    </select>
                    {errors.groupType && (
                      <p className="text-sm text-red-400 mt-1">
                        {errors.groupType}
                      </p>
                    )}
                  </div>

                  {groupType === "FAMILY" && (
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Adult Count *
                          </label>

                          <input
                            type="number"
                            min="1"
                            required
                            value={adultCount === 0 ? "" : adultCount}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "") {
                                setAdultCount(0);
                                return;
                              }
                              const num = Number(value);
                              if (!isNaN(num) && num >= 1) {
                                setAdultCount(num);
                                if (errors.adultCount) {
                                  setErrors((prev: any) => ({
                                    ...prev,
                                    adultCount: undefined,
                                  }));
                                }
                              }
                            }}
                            onBlur={(e) => {
                              if (Number(e.target.value) < 1) {
                                setErrors((prev: any) => ({
                                  ...prev,
                                  adultCount: "At least 1 adult is required.",
                                }));
                              }
                            }}
                            className={`w-full px-4 py-2 border ${
                              errors.adultCount
                                ? "border-red-500"
                                : "border-gray-600"
                            } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                              errors.adultCount
                                ? "focus:ring-red-500"
                                : "focus:ring-yellow-500"
                            } focus:border-transparent`}
                          />
                          {errors.adultCount && (
                            <p className="text-sm text-red-400 mt-1">
                              {errors.adultCount}
                            </p>
                          )}
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

                      {(totalPeople > 4 || errors.familySize) && (
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
                          onChange={(e) => {
                            setInstituteType(e.target.value);
                            if (errors.instituteType) {
                              setErrors((prev: any) => ({
                                ...prev,
                                instituteType: undefined,
                              }));
                            }
                          }}
                          className={`w-full px-4 py-2 border ${
                            errors.instituteType
                              ? "border-red-500"
                              : "border-gray-600"
                          } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                            errors.instituteType
                              ? "focus:ring-red-500"
                              : "focus:ring-yellow-500"
                          } focus:border-transparent`}
                        >
                          <option value="">Choose an option</option>
                          <option value="SCHOOL">School</option>
                          <option value="COLLEGE">College</option>
                          <option value="OTHERS">Others</option>
                        </select>
                        {errors.instituteType && (
                          <p className="text-sm text-red-400 mt-1">
                            {errors.instituteType}
                          </p>
                        )}
                      </div>

                      {(instituteType === "SCHOOL" ||
                        instituteType === "COLLEGE") && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Institution Name */}
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
                                name="institutionName"
                                value={instituteData.institutionName}
                                onChange={(e) =>
                                  handleFieldChange(
                                    e,
                                    setInstituteData,
                                    instituteData
                                  )
                                }
                                onBlur={(e) =>
                                  setErrors((prev: any) => ({
                                    ...prev,
                                    institutionName: validateRequired(
                                      e.target.value,
                                      "Institute Name"
                                    ),
                                  }))
                                }
                                className={`w-full px-4 py-2 border ${
                                  errors.institutionName
                                    ? "border-red-500"
                                    : "border-gray-600"
                                } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                                  errors.institutionName
                                    ? "focus:ring-red-500"
                                    : "focus:ring-yellow-500"
                                } focus:border-transparent`}
                              />
                              {errors.institutionName && (
                                <p className="text-sm text-red-400 mt-1">
                                  {errors.institutionName}
                                </p>
                              )}
                            </div>
                            {/* Institution State */}
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                State *
                              </label>
                              <input
                                type="text"
                                required
                                name="institutionState"
                                value={instituteData.institutionState}
                                onChange={(e) =>
                                  handleFieldChange(
                                    e,
                                    setInstituteData,
                                    instituteData
                                  )
                                }
                                onBlur={(e) =>
                                  setErrors((prev: any) => ({
                                    ...prev,
                                    institutionState: validateRequired(
                                      e.target.value,
                                      "State"
                                    ),
                                  }))
                                }
                                className={`w-full px-4 py-2 border ${
                                  errors.institutionState
                                    ? "border-red-500"
                                    : "border-gray-600"
                                } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                                  errors.institutionState
                                    ? "focus:ring-red-500"
                                    : "focus:ring-yellow-500"
                                } focus:border-transparent`}
                              />
                              {errors.institutionState && (
                                <p className="text-sm text-red-400 mt-1">
                                  {errors.institutionState}
                                </p>
                              )}
                            </div>
                            {/* Institution City */}
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                City *
                              </label>
                              <input
                                type="text"
                                required
                                name="institutionCity"
                                value={instituteData.institutionCity}
                                onChange={(e) =>
                                  handleFieldChange(
                                    e,
                                    setInstituteData,
                                    instituteData
                                  )
                                }
                                onBlur={(e) =>
                                  setErrors((prev: any) => ({
                                    ...prev,
                                    institutionCity: validateRequired(
                                      e.target.value,
                                      "City"
                                    ),
                                  }))
                                }
                                className={`w-full px-4 py-2 border ${
                                  errors.institutionCity
                                    ? "border-red-500"
                                    : "border-gray-600"
                                } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                                  errors.institutionCity
                                    ? "focus:ring-red-500"
                                    : "focus:ring-yellow-500"
                                } focus:border-transparent`}
                              />
                              {errors.institutionCity && (
                                <p className="text-sm text-red-400 mt-1">
                                  {errors.institutionCity}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="bg-gray-700 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-100 mb-3">
                              Principal/HOD Details
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Principal Name */}
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Name *
                                </label>
                                <input
                                  type="text"
                                  required
                                  name="name"
                                  value={principalData.name}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      e,
                                      setPrincipalData,
                                      principalData
                                    )
                                  }
                                  onBlur={(e) =>
                                    setErrors((prev: any) => ({
                                      ...prev,
                                      principalName: validateRequired(
                                        e.target.value,
                                        "Principal's Name"
                                      ),
                                    }))
                                  }
                                  className={`w-full px-4 py-2 border ${
                                    errors.principalName
                                      ? "border-red-500"
                                      : "border-gray-600"
                                  } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                                    errors.principalName
                                      ? "focus:ring-red-500"
                                      : "focus:ring-yellow-500"
                                  } focus:border-transparent`}
                                />
                                {errors.principalName && (
                                  <p className="text-sm text-red-400 mt-1">
                                    {errors.principalName}
                                  </p>
                                )}
                              </div>
                              {/* Principal Email */}
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Email ID *
                                </label>
                                <input
                                  type="email"
                                  required
                                  name="email"
                                  value={principalData.email}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      e,
                                      setPrincipalData,
                                      principalData
                                    )
                                  }
                                  onBlur={(e) =>
                                    setErrors((prev: any) => ({
                                      ...prev,
                                      principalEmail: validateEmail(
                                        e.target.value
                                      ),
                                    }))
                                  }
                                  className={`w-full px-4 py-2 border ${
                                    errors.principalEmail
                                      ? "border-red-500"
                                      : "border-gray-600"
                                  } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                                    errors.principalEmail
                                      ? "focus:ring-red-500"
                                      : "focus:ring-yellow-500"
                                  } focus:border-transparent`}
                                />
                                {errors.principalEmail && (
                                  <p className="text-sm text-red-400 mt-1">
                                    {errors.principalEmail}
                                  </p>
                                )}
                              </div>
                              {/* Principal Contact */}
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Contact Number *
                                </label>
                                <input
                                  type="tel"
                                  required
                                  name="contact"
                                  value={principalData.contact}
                                  onChange={(e) => {
                                    const { name, value } = e.target;
                                    const numericValue = value.replace(
                                      /[^0-9]/g,
                                      ""
                                    );
                                    if (numericValue.length <= 10) {
                                      setPrincipalData({
                                        ...principalData,
                                        [name]: numericValue,
                                      });
                                      if (errors.principalContact) {
                                        setErrors((prev: any) => ({
                                          ...prev,
                                          principalContact: undefined,
                                        }));
                                      }
                                    }
                                  }}
                                  onBlur={(e) =>
                                    setErrors((prev: any) => ({
                                      ...prev,
                                      principalContact: validateContact(
                                        e.target.value
                                      ),
                                    }))
                                  }
                                  className={`w-full px-4 py-2 border ${
                                    errors.principalContact
                                      ? "border-red-500"
                                      : "border-gray-600"
                                  } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                                    errors.principalContact
                                      ? "focus:ring-red-500"
                                      : "focus:ring-yellow-500"
                                  } focus:border-transparent`}
                                />
                                {errors.principalContact && (
                                  <p className="text-sm text-red-400 mt-1">
                                    {errors.principalContact}
                                  </p>
                                )}
                              </div>
                              {/* Principal Gender */}
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Gender *
                                </label>
                                <select
                                  required
                                  name="gender"
                                  value={principalData.gender}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      e,
                                      setPrincipalData,
                                      principalData
                                    )
                                  }
                                  onBlur={(e) =>
                                    setErrors((prev: any) => ({
                                      ...prev,
                                      principalGender: validateRequired(
                                        e.target.value,
                                        "Gender"
                                      ),
                                    }))
                                  }
                                  className={`w-full px-4 py-2 border ${
                                    errors.principalGender
                                      ? "border-red-500"
                                      : "border-gray-600"
                                  } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                                    errors.principalGender
                                      ? "focus:ring-red-500"
                                      : "focus:ring-yellow-500"
                                  } focus:border-transparent`}
                                >
                                  <option value="">Select</option>
                                  <option value="MALE">Male</option>
                                  <option value="FEMALE">Female</option>
                                  <option value="OTHER">Other</option>
                                </select>
                                {errors.principalGender && (
                                  <p className="text-sm text-red-400 mt-1">
                                    {errors.principalGender}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Number of Students */}
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                Number of Students *
                              </label>
                              <input
                                type="number"
                                min="0"
                                required
                                value={numStudents}
                                onChange={(e) => {
                                  setNumStudents(
                                    parseInt(e.target.value) || 0
                                  );
                                  if (errors.numStudents) {
                                    setErrors((prev: any) => ({
                                      ...prev,
                                      numStudents: undefined,
                                    }));
                                  }
                                }}
                                className={`w-full px-4 py-2 border ${
                                  errors.numStudents
                                    ? "border-red-500"
                                    : "border-gray-600"
                                } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                                  errors.numStudents
                                    ? "focus:ring-red-500"
                                    : "focus:ring-yellow-500"
                                } focus:border-transparent`}
                              />
                              {errors.numStudents && (
                                <p className="text-sm text-red-400 mt-1">
                                  {errors.numStudents}
                                </p>
                              )}
                            </div>
                            {/* Number of Teachers */}
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                Number of Teachers *
                              </label>
                              <input
                                type="number"
                                min="0"
                                required
                                value={numTeachers}
                                onChange={(e) => {
                                  setNumTeachers(
                                    parseInt(e.target.value) || 0
                                  );
                                  if (errors.numTeachers) {
                                    setErrors((prev: any) => ({
                                      ...prev,
                                      numTeachers: undefined,
                                    }));
                                  }
                                }}
                                className={`w-full px-4 py-2 border ${
                                  errors.numTeachers
                                    ? "border-red-500"
                                    : "border-gray-600"
                                } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                                  errors.numTeachers
                                    ? "focus:ring-red-500"
                                    : "focus:ring-yellow-500"
                                } focus:border-transparent`}
                              />
                              {errors.numTeachers && (
                                <p className="text-sm text-red-400 mt-1">
                                  {errors.numTeachers}
                                </p>
                              )}
                            </div>
                            {/* Number of Buses */}
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
                              name="vehicleNumber"
                              value={instituteData.vehicleNumber}
                              onChange={(e) =>
                                handleFieldChange(
                                  e,
                                  setInstituteData,
                                  instituteData
                                )
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
                              {/* Teacher Name */}
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Name *
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  value={teacherInChargeData.name}
                                  onChange={handleTeacherInChargeChange}
                                  onBlur={(e) =>
                                    setErrors((prev: any) => ({
                                      ...prev,
                                      teacherName: validateRequired(
                                        e.target.value,
                                        "Teacher's Name"
                                      ),
                                    }))
                                  }
                                  required
                                  className={`w-full px-4 py-2 border ${
                                    errors.teacherName
                                      ? "border-red-500"
                                      : "border-gray-600"
                                  } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                                    errors.teacherName
                                      ? "focus:ring-red-500"
                                      : "focus:ring-yellow-500"
                                  } focus:border-transparent`}
                                />
                                {errors.teacherName && (
                                  <p className="text-sm text-red-400 mt-1">
                                    {errors.teacherName}
                                  </p>
                                )}
                              </div>
                              {/* Teacher Email */}
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Email ID *
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  value={teacherInChargeData.email}
                                  onChange={handleTeacherInChargeChange}
                                  onBlur={(e) =>
                                    setErrors((prev: any) => ({
                                      ...prev,
                                      teacherEmail: validateEmail(
                                        e.target.value
                                      ),
                                    }))
                                  }
                                  required
                                  className={`w-full px-4 py-2 border ${
                                    errors.teacherEmail
                                      ? "border-red-500"
                                      : "border-gray-600"
                                  } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                                    errors.teacherEmail
                                      ? "focus:ring-red-500"
                                      : "focus:ring-yellow-500"
                                  } focus:border-transparent`}
                                />
                                {errors.teacherEmail && (
                                  <p className="text-sm text-red-400 mt-1">
                                    {errors.teacherEmail}
                                  </p>
                                )}
                              </div>
                              {/* Teacher Contact */}
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Contact Number *
                                </label>
                                <input
                                  type="tel"
                                  name="contact"
                                  value={teacherInChargeData.contact}
                                  onChange={(e) => {
                                    const { name, value } = e.target;
                                    const numericValue = value.replace(
                                      /[^0-9]/g,
                                      ""
                                    );
                                    if (numericValue.length <= 10) {
                                      setTeacherInChargeData((prev) => ({
                                        ...prev,
                                        [name]: numericValue,
                                      }));
                                      if (errors.teacherContact) {
                                        setErrors((prev: any) => ({
                                          ...prev,
                                          teacherContact: undefined,
                                        }));
                                      }
                                      if (copyFromGeneral) {
                                        setCopyFromGeneral(false);
                                      }
                                    }
                                  }}
                                  onBlur={(e) =>
                                    setErrors((prev: any) => ({
                                      ...prev,
                                      teacherContact: validateContact(
                                        e.target.value
                                      ),
                                    }))
                                  }
                                  required
                                  className={`w-full px-4 py-2 border ${
                                    errors.teacherContact
                                      ? "border-red-500"
                                      : "border-gray-600"
                                  } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                                    errors.teacherContact
                                      ? "focus:ring-red-500"
                                      : "focus:ring-yellow-500"
                                  } focus:border-transparent`}
                                />
                                {errors.teacherContact && (
                                  <p className="text-sm text-red-400 mt-1">
                                    {errors.teacherContact}
                                  </p>
                                )}
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
                                    href="#" // TODO: Add actual link to template
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
                                  <Upload
                                    className="text-gray-500"
                                    size={20}
                                  />
                                  <input
                                    type="file"
                                    required
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => {
                                      const file =
                                        e.target.files?.[0] || null;
                                      setDeclarationForm(file);
                                      if (file) {
                                        setErrors((prev: any) => ({
                                          ...prev,
                                          declarationForm: undefined,
                                        }));
                                      }
                                    }}
                                    className={`w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-800 file:text-yellow-200 hover:file:bg-yellow-700 file:cursor-pointer ${
                                      errors.declarationForm
                                        ? "border border-red-500 rounded-lg"
                                        : ""
                                    }`}
                                  />
                                </div>
                                {errors.declarationForm && (
                                  <p className="text-sm text-red-400 mt-1">
                                    {errors.declarationForm}
                                  </p>
                                )}
                                {declarationForm &&
                                  !errors.declarationForm && (
                                    <p className="text-green-400 text-sm mt-1">
                                      ✓ File selected: {declarationForm.name}
                                    </p>
                                  )}
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
                              onChange={(e) => {
                                setInstituteOtherType(e.target.value);
                                if (errors.instituteOtherType) {
                                  setErrors((prev: any) => ({
                                    ...prev,
                                    instituteOtherType: undefined,
                                  }));
                                }
                              }}
                              className={`w-full px-4 py-2 border ${
                                errors.instituteOtherType
                                  ? "border-red-500"
                                  : "border-gray-600"
                              } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                                errors.instituteOtherType
                                  ? "focus:ring-red-500"
                                  : "focus:ring-yellow-500"
                              } focus:border-transparent`}
                            >
                              <option value="">Choose an option</option>
                              <option value="INDUSTRY_PROFESSIONAL">
                                Industry Professional
                              </option>
                              <option value="ACADEMICIAN">Academician</option>
                            </select>
                            {errors.instituteOtherType && (
                              <p className="text-sm text-red-400 mt-1">
                                {errors.instituteOtherType}
                              </p>
                            )}
                          </div>

                          {instituteOtherType === "INDUSTRY_PROFESSIONAL" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                              {/* Company Name */}
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Company Name *
                                </label>
                                <input
                                  type="text"
                                  required
                                  name="companyName"
                                  value={
                                    instituteOthersIndustryData.companyName
                                  }
                                  onChange={(e) =>
                                    handleFieldChange(
                                      e,
                                      setInstituteOthersIndustryData,
                                      instituteOthersIndustryData
                                    )
                                  }
                                  onBlur={(e) =>
                                    setErrors((prev: any) => ({
                                      ...prev,
                                      othersCompanyName: validateRequired(
                                        e.target.value,
                                        "Company Name"
                                      ),
                                    }))
                                  }
                                  className={`w-full px-4 py-2 border ${
                                    errors.othersCompanyName
                                      ? "border-red-500"
                                      : "border-gray-600"
                                  } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                                    errors.othersCompanyName
                                      ? "focus:ring-red-500"
                                      : "focus:ring-yellow-500"
                                  } focus:border-transparent`}
                                />
                                {errors.othersCompanyName && (
                                  <p className="text-sm text-red-400 mt-1">
                                    {errors.othersCompanyName}
                                  </p>
                                )}
                              </div>
                              {/* Company Sector */}
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Company Sector *
                                </label>
                                <input
                                  type="text"
                                  required
                                  name="companySector"
                                  value={
                                    instituteOthersIndustryData.companySector
                                  }
                                  onChange={(e) =>
                                    handleFieldChange(
                                      e,
                                      setInstituteOthersIndustryData,
                                      instituteOthersIndustryData
                                    )
                                  }
                                  onBlur={(e) =>
                                    setErrors((prev: any) => ({
                                      ...prev,
                                      othersCompanySector: validateRequired(
                                        e.target.value,
                                        "Company Sector"
                                      ),
                                    }))
                                  }
                                  className={`w-full px-4 py-2 border ${
                                    errors.othersCompanySector
                                      ? "border-red-500"
                                      : "border-gray-600"
                                  } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                                    errors.othersCompanySector
                                      ? "focus:ring-red-500"
                                      : "focus:ring-yellow-500"
                                  } focus:border-transparent`}
                                />
                                {errors.othersCompanySector && (
                                  <p className="text-sm text-red-400 mt-1">
                                    {errors.othersCompanySector}
                                  </p>
                                )}
                              </div>
                              {/* Designation */}
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Designation *
                                </label>
                                <input
                                  type="text"
                                  required
                                  name="designation"
                                  value={
                                    instituteOthersIndustryData.designation
                                  }
                                  onChange={(e) =>
                                    handleFieldChange(
                                      e,
                                      setInstituteOthersIndustryData,
                                      instituteOthersIndustryData
                                    )
                                  }
                                  onBlur={(e) =>
                                    setErrors((prev: any) => ({
                                      ...prev,
                                      othersDesignation: validateRequired(
                                        e.target.value,
                                        "Designation"
                                      ),
                                    }))
                                  }
                                  className={`w-full px-4 py-2 border ${
                                    errors.othersDesignation
                                      ? "border-red-500"
                                      : "border-gray-600"
                                  } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                                    errors.othersDesignation
                                      ? "focus:ring-red-500"
                                      : "focus:ring-yellow-500"
                                  } focus:border-transparent`}
                                />
                                {errors.othersDesignation && (
                                  <p className="text-sm text-red-400 mt-1">
                                    {errors.othersDesignation}
                                  </p>
                                )}
                              </div>
                              {/* Number of People */}
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Number of People *
                                </label>
                                <input
                                  type="number"
                                  min="1"
                                  max="5"
                                  required
                                  value={otherInstituteCount}
                                  onChange={(e) => {
                                    setOtherInstituteCount(
                                      parseInt(e.target.value) || 1
                                    );
                                    if (errors.otherInstituteCount) {
                                      setErrors((prev: any) => ({
                                        ...prev,
                                        otherInstituteCount: undefined,
                                      }));
                                    }
                                  }}
                                  onBlur={(e) => {
                                    const count = parseInt(e.target.value);
                                    if (count > 5) {
                                      setErrors((prev: any) => ({
                                        ...prev,
                                        otherInstituteCount:
                                          "Maximum is 5 people.",
                                      }));
                                    } else if (count < 1) {
                                      setErrors((prev: any) => ({
                                        ...prev,
                                        otherInstituteCount:
                                          "At least 1 person is required.",
                                      }));
                                    }
                                  }}
                                  className={`w-full px-4 py-2 border ${
                                    errors.otherInstituteCount
                                      ? "border-red-500"
                                      : "border-gray-600"
                                  } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                                    errors.otherInstituteCount
                                      ? "focus:ring-red-500"
                                      : "focus:ring-yellow-500"
                                  } focus:border-transparent`}
                                />
                              </div>
                              {(otherInstituteCount > 5 ||
                                errors.otherInstituteCount) && (
                                <div className="md:col-span-2 bg-red-900/50 border border-red-700 rounded-lg p-4">
                                  <AlertCircle
                                    className="inline text-red-400 mr-2"
                                    size={20}
                                  />
                                  <span className="text-sm text-red-200 font-medium">
                                    {errors.otherInstituteCount ||
                                      "Maximum allowed for this category is 5 people. For more, please register separately."}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}

                          {instituteOtherType === "ACADEMICIAN" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                              {/* Institute Name */}
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Institute Name *
                                </label>
                                <input
                                  type="text"
                                  required
                                  name="instituteName"
                                  value={
                                    instituteOthersAcademicianData.instituteName
                                  }
                                  onChange={(e) =>
                                    handleFieldChange(
                                      e,
                                      setInstituteOthersAcademicianData,
                                      instituteOthersAcademicianData
                                    )
                                  }
                                  onBlur={(e) =>
                                    setErrors((prev: any) => ({
                                      ...prev,
                                      othersInstituteName: validateRequired(
                                        e.target.value,
                                        "Institute Name"
                                      ),
                                    }))
                                  }
                                  className={`w-full px-4 py-2 border ${
                                    errors.othersInstituteName
                                      ? "border-red-500"
                                      : "border-gray-600"
                                  } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                                    errors.othersInstituteName
                                      ? "focus:ring-red-500"
                                      : "focus:ring-yellow-500"
                                  } focus:border-transparent`}
                                />
                                {errors.othersInstituteName && (
                                  <p className="text-sm text-red-400 mt-1">
                                    {errors.othersInstituteName}
                                  </p>
                                )}
                              </div>
                              {/* Designation */}
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Designation *
                                </label>
                                <input
                                  type="text"
                                  required
                                  name="designation"
                                  value={
                                    instituteOthersAcademicianData.designation
                                  }
                                  onChange={(e) =>
                                    handleFieldChange(
                                      e,
                                      setInstituteOthersAcademicianData,
                                      instituteOthersAcademicianData
                                    )
                                  }
                                  onBlur={(e) =>
                                    setErrors((prev: any) => ({
                                      ...prev,
                                      othersInstituteDesignation:
                                        validateRequired(
                                          e.target.value,
                                          "Designation"
                                        ),
                                    }))
                                  }
                                  className={`w-full px-4 py-2 border ${
                                    errors.othersInstituteDesignation
                                      ? "border-red-500"
                                      : "border-gray-600"
                                  } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                                    errors.othersInstituteDesignation
                                      ? "focus:ring-red-500"
                                      : "focus:ring-yellow-500"
                                  } focus:border-transparent`}
                                />
                                {errors.othersInstituteDesignation && (
                                  <p className="text-sm text-red-400 mt-1">
                                    {errors.othersInstituteDesignation}
                                  </p>
                                )}
                              </div>
                              {/* Department Name */}
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Department Name *
                                </label>
                                <input
                                  type="text"
                                  required
                                  name="departmentName"
                                  value={
                                    instituteOthersAcademicianData.departmentName
                                  }
                                  onChange={(e) =>
                                    handleFieldChange(
                                      e,
                                      setInstituteOthersAcademicianData,
                                      instituteOthersAcademicianData
                                    )
                                  }
                                  onBlur={(e) =>
                                    setErrors((prev: any) => ({
                                      ...prev,
                                      othersDepartmentName: validateRequired(
                                        e.target.value,
                                        "Department Name"
                                      ),
                                    }))
                                  }
                                  className={`w-full px-4 py-2 border ${
                                    errors.othersDepartmentName
                                      ? "border-red-500"
                                      : "border-gray-600"
                                  } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                                    errors.othersDepartmentName
                                      ? "focus:ring-red-500"
                                      : "focus:ring-yellow-500"
                                  } focus:border-transparent`}
                                />
                                {errors.othersDepartmentName && (
                                  <p className="text-sm text-red-400 mt-1">
                                    {errors.othersDepartmentName}
                                  </p>
                                )}
                              </div>
                              {/* Number of People */}
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Number of People *
                                </label>
                                <input
                                  type="number"
                                  min="1"
                                  max="5"
                                  required
                                  value={otherInstituteCount}
                                  onChange={(e) => {
                                    setOtherInstituteCount(
                                      parseInt(e.target.value) || 1
                                    );
                                    if (errors.otherInstituteCount) {
                                      setErrors((prev: any) => ({
                                        ...prev,
                                        otherInstituteCount: undefined,
                                      }));
                                    }
                                  }}
                                  onBlur={(e) => {
                                    const count = parseInt(e.target.value);
                                    if (count > 5) {
                                      setErrors((prev: any) => ({
                                        ...prev,
                                        otherInstituteCount:
                                          "Maximum is 5 people.",
                                      }));
                                    } else if (count < 1) {
                                      setErrors((prev: any) => ({
                                        ...prev,
                                        otherInstituteCount:
                                          "At least 1 person is required.",
                                      }));
                                    }
                                  }}
                                  className={`w-full px-4 py-2 border ${
                                    errors.otherInstituteCount
                                      ? "border-red-500"
                                      : "border-gray-600"
                                  } bg-gray-700 text-white rounded-lg focus:ring-2 ${
                                    errors.otherInstituteCount
                                      ? "focus:ring-red-500"
                                      : "focus:ring-yellow-500"
                                  } focus:border-transparent`}
                                />
                              </div>
                              {(otherInstituteCount > 5 ||
                                errors.otherInstituteCount) && (
                                <div className="md:col-span-2 bg-red-900/50 border border-red-700 rounded-lg p-4">
                                  <AlertCircle
                                    className="inline text-red-400 mr-2"
                                    size={20}
                                  />
                                  <span className="text-sm text-red-200 font-medium">
                                    {errors.otherInstituteCount ||
                                      "Maximum allowed for this category is 5 people. For more, please register separately."}
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
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">
                <Calendar className="inline mr-2" size={24} />
                Select Time Slot *
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
                          : errors.selectedSlot
                          ? "border-red-500"
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
                        onChange={(e) => {
                          setSelectedSlot(e.target.value);
                          if (errors.selectedSlot) {
                            setErrors((prev: any) => ({
                              ...prev,
                              selectedSlot: undefined,
                            }));
                          }
                        }}
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
              {errors.selectedSlot && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.selectedSlot}
                </p>
              )}
            </div>

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