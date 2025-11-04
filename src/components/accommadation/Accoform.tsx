import React, { useState } from "react";
import "./accoform.css";

// Types
type FormDataShape = {
  fullName: string;
  email: string;
  mobile: string;
  dob: string;
  gender: string;
  address: string;
  idType: string;
  idFile: File | null;
  organization: string;
  accommodationDates: string;
  termsAccepted: boolean;
};

type AdditionalPerson = { gender: string };

type AccommodationFormProps = {
  onDataChange?: (data: { totalPeople: number; termsAccepted: boolean; formData?: FormDataShape }) => void;
};

// AccommodationForm Component
const AccommodationForm: React.FC<AccommodationFormProps> = ({ onDataChange }) => {
  const [formData, setFormData] = useState<FormDataShape>({
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    address: "",
    idType: "Aadhaar",
    idFile: null,
    organization: "",
    accommodationDates: "7 AM Jan 7 – 7 AM Jan 8",
    termsAccepted: false,
  });

  const [additionalPeople, setAdditionalPeople] = useState<AdditionalPerson[]>([]);
  const [showTerms, setShowTerms] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, type } = target;
    const value = type === "checkbox" ? (target.checked as boolean) : target.value;
    const newFormData = {
      ...formData,
      [name]: value,
    } as FormDataShape;
    setFormData(newFormData);

    onDataChange?.({
      totalPeople: 1 + additionalPeople.length,
      termsAccepted: newFormData.termsAccepted,
      formData: newFormData,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    const newFormData = { ...formData, idFile: file };
    setFormData(newFormData);
    onDataChange?.({ totalPeople: 1 + additionalPeople.length, termsAccepted: newFormData.termsAccepted, formData: newFormData });
  };

  const addPerson = () => {
    const newPeople = [...additionalPeople, { gender: "" }];
    setAdditionalPeople(newPeople);
    onDataChange?.({
      totalPeople: 1 + newPeople.length,
      termsAccepted: formData.termsAccepted,
    });
  };

  const removePerson = (index: number) => {
    const newPeople = additionalPeople.filter((_, i) => i !== index);
    setAdditionalPeople(newPeople);
    onDataChange?.({
      totalPeople: 1 + newPeople.length,
      termsAccepted: formData.termsAccepted,
    });
  };

  const updatePersonGender = (index: number, gender: string) => {
    const newPeople = [...additionalPeople];
    newPeople[index].gender = gender;
    setAdditionalPeople(newPeople);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2"  >
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 bg-white/20 border border-white/30  text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 bg-white/20 border border-white/30  text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Mobile Number <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              required
              maxLength={10}
              pattern="[0-9]{10}"
              className="w-full px-4 py-2 bg-white/20 border border-white/30  text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="10-digit number"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/20 border border-white/30  text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Gender
            </label>
            <div className="flex gap-6">
              <label className="flex items-center text-white cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center text-white cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Female
              </label>
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 bg-white/20 border border-white/30  text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your address"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              ID Type
            </label>
            <select
              name="idType"
              value={formData.idType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/20 border border-white/30  text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Aadhaar" className="bg-gray-800">
                Aadhaar
              </option>
              <option value="PAN" className="bg-gray-800">
                PAN
              </option>
              <option value="Driving License" className="bg-gray-800">
                Driving License
              </option>
              <option value="College ID" className="bg-gray-800">
                College ID
              </option>
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Upload ID File
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white h-12 file:mr-4 file:h-full file:py-0 file:px-4 file:rounded file:border-0 file:bg-amber-600 file:text-white hover:file:bg-amber-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Organization <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 bg-white/20 border border-white/30  text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your organization"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Accommodation Dates
            </label>
            <select
              name="accommodationDates"
              value={formData.accommodationDates}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/20 border border-white/30  text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="7 AM Jan 7 – 7 AM Jan 8" className="bg-gray-800">
                7 AM Jan 7 – 7 AM Jan 8
              </option>
            </select>
          </div>

          <div className="pt-4 flex items-center">
            <label className="flex items-start text-white cursor-pointer">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                className="mt-1 mr-1"
              />
              <span className="text-sm ">
                I accept the Terms & Conditions{" "}
                <button
                  type="button"
                  onClick={() => setShowTerms((s) => !s)}
                  className="ml-2 text-blue-300 hover:text-blue-200 underline"
                >
                  Read More
                </button>
                {showTerms && (
                  <span className="block mt-2 text-sm md:text-base">
                    My name is sameer kumar. Please read the following terms and
                    conditions carefully before proceeding with the
                    accommodation registration. By accepting, you agree to abide
                    by the rules.
                  </span>
                )}
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Additional Members Section */}
      <div className="border-t border-white/20 pt-6">
        <h3 className="text-white text-lg  mb-4">
          Add Additional Members
        </h3>

        <div className="space-y-4 ">
          {additionalPeople.map((person, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-pink/10 backdrop-blur-md border border-white/30 p-4 "
            >
              <span className="text-white font-medium">
                Person {index + 2}:
              </span>
              <div className="flex gap-6 flex-1">
                <label className="flex items-center text-white cursor-pointer">
                  <input
                    type="radio"
                    name={`gender-${index}`}
                    value="male"
                    checked={person.gender === "male"}
                    onChange={() => updatePersonGender(index, "male")}
                    className="mr-2"
                  />
                  Male
                </label>
                <label className="flex items-center text-white cursor-pointer">
                  <input
                    type="radio"
                    name={`gender-${index}`}
                    value="female"
                    checked={person.gender === "female"}
                    onChange={() => updatePersonGender(index, "female")}
                    className="mr-2"
                  />
                  Female
                </label>
              </div>
              <button
                onClick={() => removePerson(index)}
                aria-label={`Remove person ${index + 2}`}
                title="Remove member"
                className="w-10 h-10 flex items-center justify-center bg-red-600 hover:bg-red-800 text-white transition"
              >
                <img src="/close2.png" alt="" className="w-5 h-5 object-contain" />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addPerson}
          className="mt-4 px-6 py-2 bg-amber-700 hover:bg-amber-800 text-white backdrop-blur-md border border-white/30 font-medium transition"
        >
          + Add Person
        </button>
      </div>
    </div>
  );
};
export default AccommodationForm;
