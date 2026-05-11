import { getPersonalitiesByCategory } from "./personalities";

export function calculateResult(answers: string[]) {
  const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
  answers.forEach((a) => {
    if (counts[a] !== undefined) counts[a]++;
  });

  const maxCount = Math.max(...Object.values(counts));
  const topCategories = Object.entries(counts)
    .filter(([, c]) => c === maxCount)
    .map(([k]) => k);

  const chosen = topCategories[Math.floor(Math.random() * topCategories.length)];
  const pool = getPersonalitiesByCategory(chosen);
  const personality = pool[Math.floor(Math.random() * pool.length)];

  return {
    personality,
    scores: counts,
    dominantCategory: chosen,
  };
}
