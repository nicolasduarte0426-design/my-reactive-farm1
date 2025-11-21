import React, { useState, useRef } from "react";

export default function AnimalForm({ onCreate }) {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    age: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const firstInputRef = useRef(null);

  React.useEffect(() => {
    if (firstInputRef.current) firstInputRef.current.focus();
  }, []);

  const validateField = (name, value) => {
    const next = {};

    if (name === "name") {
      if (!value || value.trim() === "") next.name = "El nombre es obligatorio";
      else if (value.trim().length < 2) next.name = "El nombre es muy corto";
    }

    if (name === "species") {
      if (!value || value.trim() === "") next.species = "La especie es obligatoria";
    }

    if (name === "age") {
      if (value === "") {
        next.age = "La edad es obligatoria";
      } else {
        const n = Number(value);
        if (Number.isNaN(n) || !Number.isFinite(n) || n < 0) {
          next.age = "Ingresa una edad válida";
        } else if (!Number.isInteger(n)) {
          next.age = "La edad debe ser un número entero";
        }
      }
    }

    return next;
  };

  const validateAll = (data) => {
    return {
      ...validateField("name", data.name),
      ...validateField("species", data.species),
      ...validateField("age", data.age),
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextForm = { ...formData, [name]: value };
    setFormData(nextForm);

    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, ...fieldError }));
    if (!fieldError[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const isFormValid = () => {
    const allErrors = validateAll(formData);
    return Object.keys(allErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allErrors = validateAll(formData);
    setErrors(allErrors);
    if (Object.keys(allErrors).length > 0) return;

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name.trim(),
        species: formData.species.trim(),
        age: Number(formData.age),
      };

      if (onCreate && typeof onCreate === "function") {
        await onCreate(payload);
      } else {
        console.log("Animal creado (simulado):", payload);
      }

      setSuccess("Animal creado correctamente");
      setFormData({ name: "", species: "", age: "" });
      setErrors({});
      if (firstInputRef.current) firstInputRef.current.focus();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setErrors({ submit: "Error al crear el animal, intenta de nuevo" });
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-live="polite" noValidate>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 420 }}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            name="name"
            ref={firstInputRef}
            value={formData.name}
            onChange={handleChange}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Ej: Luna"
            autoComplete="off"
            autoFocus
          />
          {errors.name && (
            <div id="name-error" role="alert" style={{ color: "crimson", fontSize: 13 }}>
              {errors.name}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="species">Especie</label>
          <input
            id="species"
            name="species"
            value={formData.species}
            onChange={handleChange}
            aria-describedby={errors.species ? "species-error" : undefined}
            placeholder="Ej: Perro"
            autoComplete="off"
          />
          {errors.species && (
            <div id="species-error" role="alert" style={{ color: "crimson", fontSize: 13 }}>
              {errors.species}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="age">Edad</label>
          <input
            id="age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            aria-describedby={errors.age ? "age-error" : undefined}
            placeholder="Ej: 3"
            min="0"
          />
          {errors.age && (
            <div id="age-error" role="alert" style={{ color: "crimson", fontSize: 13 }}>
              {errors.age}
            </div>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={submitting || !isFormValid()}
            aria-disabled={submitting || !isFormValid()}
          >
            {submitting ? "Creando..." : "Crear animal"}
          </button>
          {errors.submit && (
            <div role="alert" style={{ color: "crimson", marginTop: 8 }}>
              {errors.submit}
            </div>
          )}
          {success && (
            <div role="status" style={{ color: "green", marginTop: 8 }}>
              {success}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
