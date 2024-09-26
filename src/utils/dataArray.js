const archivesData = Array.from({ length: 50 }).map((_, i) => ({
    titre: `Article ${i + 1}`,
    description: `Description de l'article ${i + 1}`,
    date_publication: `2024-09-${(i % 30) + 1}`
  }));

  export default archivesData