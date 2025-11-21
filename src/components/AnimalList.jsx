import React, { useState, useMemo } from "react";
import AnimalCard from "./AnimalCard";

export default function AnimalList({ animals, loading, typeFilter }) {
  
  const [ageFilter, setAgeFilter] = useState("all"); 
  const filteredAnimals = useMemo(() => {
    if (!animals || animals.length === 0) return [];

    return animals.filter((animal) => {
      const matchType =
        typeFilter === "all" || typeof typeFilter === "undefined"
          ? true
          : animal.type === typeFilter;

      let ageValue = null;
      if (animal.age !== undefined && animal.age !== null) {
        const n = Number(animal.age);
        ageValue = Number.isNaN(n) ? null : n;
      }

      const matchAge =
        ageFilter === "all" ||
        (ageFilter === "young" && ageValue !== null && ageValue < 2) ||
        (ageFilter === "adult" && ageValue !== null && ageValue >= 2);

      return matchType && matchAge;
    });
  }, [animals, typeFilter, ageFilter]);

  if (loading) {
    return <p>Cargando animales...</p>;
  }

  if (filteredAnimals.length === 0) {
    return (
      <div>
        {/* Controles deben seguir visibles */}
        <h3>Filtros</h3>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <label htmlFor="ageFilter">Edad:</label>
          <select
            id="ageFilter"
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
          >
            <option value="all">Todas</option>
            <option value="young">Menores de 2 años</option>
            <option value="adult">2 años o más</option>
          </select>
        </div>

        <p>No hay animales que coincidan con los filtros.</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Filtros</h3>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <label htmlFor="ageFilter">Edad:</label>
        <select
          id="ageFilter"
          value={ageFilter}
          onChange={(e) => setAgeFilter(e.target.value)}
        >
          <option value="all">Todas</option>
          <option value="young">Menores de 2 años</option>
          <option value="adult">2 años o más</option>
        </select>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filteredAnimals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
    </div>
  );
}
