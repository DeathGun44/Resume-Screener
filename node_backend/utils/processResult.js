const processResult = (rawResult) => {
  const matched = rawResult.matched_keywords || [];
  const missing = rawResult.missing_keywords || [];
  const total = matched.length + missing.length;
  const matchPercent = total === 0 ? 0 : ((matched.length / total) * 100).toFixed(2);

  // Basic suggestions (can improve later)
  const suggestions = [];

  if (missing.includes("docker")) suggestions.push("Add experience with Docker and CI/CD pipelines.");
  if (missing.includes("ci/cd")) suggestions.push("Mention your CI/CD setup if any.");
  if (missing.includes("kubernetes")) suggestions.push("Include Kubernetes or container orchestration experience.");
  if (missing.includes("aws") || missing.includes("gcp")) suggestions.push("Mention cloud platforms like AWS or GCP.");
  if (missing.includes("system design")) suggestions.push("Include any system design or architecture experience.");
  if (missing.includes("react")) suggestions.push("Mention relevant frontend frameworks like React.");

  const feedback = {
    summary: matchPercent >= 75
      ? "Your resume is a strong match for this job."
      : matchPercent >= 50
      ? "Your resume is a moderate match. Some key skills are missing."
      : "Your resume lacks many critical skills for this role.",
    suggestions,
  };

  // Basic categorization
  const categories = {
    Backend: {
      matched: matched.filter(k => ["node.js", "java", "mongodb", "spring"].includes(k.toLowerCase())),
      missing: missing.filter(k => ["docker", "system design", "microservices"].includes(k.toLowerCase())),
    },
    DevOps: {
      matched: matched.filter(k => ["ci/cd", "kubernetes"].includes(k.toLowerCase())),
      missing: missing.filter(k => ["ci/cd", "kubernetes"].includes(k.toLowerCase())),
    },
    Cloud: {
      matched: matched.filter(k => ["aws", "gcp"].includes(k.toLowerCase())),
      missing: missing.filter(k => ["aws", "gcp"].includes(k.toLowerCase())),
    },
    Frontend: {
      matched: matched.filter(k => ["react", "angular", "frontend"].includes(k.toLowerCase())),
      missing: missing.filter(k => ["react", "angular", "frontend"].includes(k.toLowerCase())),
    }
  };

  return {
    ...rawResult,
    match_percent: parseFloat(matchPercent),
    matched_count: matched.length,
    missing_count: missing.length,
    total_keywords: total,
    feedback,
    categories,
  };
};

module.exports = { processResult };
