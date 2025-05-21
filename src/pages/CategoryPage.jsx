import HeaderComponent from "../components/HeaderComponent";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CategoryPage() {
    const navigate = useNavigate();
    
    // Convertimos las categorías en estado para poder modificarlas
    const [categories, setCategories] = useState([
        {cod:1, nom:"Horror"},
        {cod:2, nom:"Comedy"},
        {cod:3, nom:"Action"},
        {cod:4, nom:"Drama"},
    ]);
    
    const gotoUrl = (codigo) => {
        navigate("/categories/edit/" + codigo);
    }

    // Función para eliminar categoría
    const handleDelete = (codigo) => {
        if (window.confirm("¿Está seguro que desea eliminar esta categoría?")) {
            // Filtrar las categorías, excluyendo la que queremos eliminar
            const updatedCategories = categories.filter(cat => cat.cod !== codigo);
            setCategories(updatedCategories);
            alert("Categoría eliminada con éxito");
        }
    }

    return (
        <>
            <HeaderComponent />
            <div className="container mt-3">
                <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                    <h3>Categorías</h3>
                    <div>
                        <button 
                            className="btn btn-primary" 
                            onClick={() => navigate("/categories/new")}
                        >
                            Nuevo
                        </button>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th className="text-center">Id</th>
                            <th className="text-center" style={{width: "100px"}}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((item) => (
                            <tr key={item.cod}>
                                <td>{item.nom}</td>
                                <td className="text-center">{item.cod}</td>
                                <td className="text-center">
                                    <button 
                                        className="btn btn-secondary me-2 btn-sm"
                                        onClick={() => gotoUrl(item.cod)}
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </button> 
                                    <button 
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(item.cod)}
                                    >
                                        <i className="bi bi-trash-fill"></i>
                                    </button> 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {categories.length === 0 && (
                    <div className="text-center mt-3">
                        <p>No hay categorías disponibles</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default CategoryPage;