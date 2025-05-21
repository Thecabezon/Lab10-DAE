import { useParams, useNavigate } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
import { useEffect, useState } from "react";

// Datos de ejemplo de categorías
const categoriesData = [
    { cod: 1, nom: "Horror", des: "Películas de terror y suspenso" },
    { cod: 2, nom: "Comedy", des: "Contenido humorístico" },
    { cod: 3, nom: "Action", des: "Películas de acción y aventura" },
    { cod: 4, nom: "Drama", des: "Series dramáticas" }
];

function CategoryFormPage() {
    const { codigo } = useParams();
    const navigate = useNavigate();

    // Estados para el formulario
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    // Verifica si estamos en modo edición
    const esEdicion = Boolean(codigo);

    // Carga los datos si estamos editando
    useEffect(() => {
        if (codigo) {
            const categoria = categoriesData.find(cat => cat.cod.toString() === codigo);
            if (categoria) {
                setNombre(categoria.nom);
                setDescripcion(categoria.des);
            }
        }
    }, [codigo]);

    // Maneja el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();
        const categoriaData = {
            cod: codigo ? parseInt(codigo) : Date.now(),
            nom: nombre,
            des: descripcion
        };
        console.log("Categoría guardada:", categoriaData);
        alert(`Categoría ${codigo ? 'editada' : 'creada'} con éxito`);
        navigate("/categories");
    };

    return (
        <>
            <HeaderComponent />
            <div className="container mt-3">
                <div className="border-bottom pb-3 mb-3">
                    <h3>{codigo ? 'Editar - Categoría' : 'Nueva - Categoría'}</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="inputName" className="form-label">Nombre</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputName" 
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputDescription" className="form-label">Descripción</label>
                        <textarea 
                            className="form-control" 
                            id="inputDescription" 
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required 
                            rows="3"
                        />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary me-2">
                            Guardar
                        </button>
                        <button 
                            type="button"
                            className="btn btn-secondary" 
                            onClick={() => navigate("/categories")}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CategoryFormPage;