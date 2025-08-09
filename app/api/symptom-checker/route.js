import { analyzeSymptoms } from "@/lib/symptomAI";

export async function POST(request) {
  const { symptoms } = await request.json();

  const conditions = await analyzeSymptoms(symptoms);

  return Response.json({ conditions });
}
