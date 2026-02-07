export function calculateHappiness(hunger?: number | null, sleep?: number | null, activityBonus: number = 0): number {
  if (hunger == null || sleep == null) return 0;
  // Base happiness (70% weight) + activity bonus (up to 30 points)
  const baseHappiness = (hunger + sleep) / 2;
  const bonusContribution = (activityBonus / 100) * 30;
  return Math.min(100, Math.round(baseHappiness + bonusContribution));
}
