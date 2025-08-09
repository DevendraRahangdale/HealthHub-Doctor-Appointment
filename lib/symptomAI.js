export async function analyzeSymptoms(symptoms) {
  const lowerSymptoms = symptoms.toLowerCase();

  const conditionRules = [
    { keywords: ["fever", "chills"], condition: "Possible Viral Infection" },
    { keywords: ["cough", "breath"], condition: "Possible Respiratory Issue" },
    { keywords: ["headache", "nausea"], condition: "Possible Migraine" },
    { keywords: ["throat", "runny nose"], condition: "Possible Common Cold" },
  ];

  const matchedConditions = conditionRules
    .filter(rule => rule.keywords.some(keyword => lowerSymptoms.includes(keyword)))
    .map(rule => rule.condition);

  if (matchedConditions.length === 0) {
    matchedConditions.push("No clear condition detected. Please consult a doctor.");
  }

  return matchedConditions;
}
