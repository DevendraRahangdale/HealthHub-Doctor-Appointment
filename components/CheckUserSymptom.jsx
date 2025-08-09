"use client";
import { useState } from "react";

const CheckUserSymptom = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    // Simulate API call
setTimeout(() => {
  const input = symptoms.toLowerCase();

  if (input.includes("fever")) {
    setResult(["Common Cold", "Flu", "Viral Infection", "Typhoid"]);
  } else if (input.includes("cold") || input.includes("cough")) {
    setResult(["Common Cold", "Flu", "Allergic Rhinitis"]);
  } else if (input.includes("headache")) {
    setResult(["Migraine", "Tension Headache", "Sinusitis"]);
  } else if (input.includes("stomach") || input.includes("abdominal")) {
    setResult(["Gastritis", "Food Poisoning", "Irritable Bowel Syndrome"]);
  } else if (input.includes("nausea") || input.includes("vomit")) {
    setResult(["Food Poisoning", "Stomach Infection", "Gastritis"]);
  } else if (input.includes("diarrhea")) {
    setResult(["Food Poisoning", "Gastroenteritis", "Irritable Bowel Syndrome"]);
  } else if (input.includes("rash") || input.includes("skin")) {
    setResult(["Allergic Reaction", "Eczema", "Fungal Infection"]);
  } else if (input.includes("sore throat")) {
    setResult(["Tonsillitis", "Strep Throat", "Pharyngitis"]);
  } else if (input.includes("fatigue") || input.includes("tired")) {
    setResult(["Anemia", "Thyroid Disorder", "Chronic Fatigue Syndrome"]);
  } else if (input.includes("chest pain")) {
    setResult(["Muscle Strain", "Heartburn", "Consult a Doctor Immediately"]);
  } else if (input.includes("breathless") || input.includes("shortness of breath")) {
    setResult(["Asthma", "Bronchitis", "Consult a Doctor Immediately"]);
  } else if (input.includes("dizzy") || input.includes("dizziness")) {
    setResult(["Dehydration", "Low Blood Pressure", "Vertigo"]);
  } else if (input.includes("pain")) {
    setResult(["Muscle Strain", "Arthritis", "Injury"]);
  } else {
    setResult(["No clear condition detected. Please consult a doctor."]);
  }

  setLoading(false);
}, 1500);




  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="bg-[#111827] border border-emerald-900/20 hover:border-emerald-700/40 transition-all rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-emerald-400">
          AI Symptom Checker
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Describe your symptoms..."
            className="w-full h-40 bg-black border border-emerald-900/30 rounded-lg p-4 text-lg text-white placeholder-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Symptoms"}
          </button>
        </form>

        {result.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3 text-emerald-300">
              Possible Conditions:
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              {result.map((cond, idx) => (
                <li key={idx}>{cond}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckUserSymptom;
