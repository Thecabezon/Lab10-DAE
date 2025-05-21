import { useParams, useNavigate } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
import { useEffect, useState } from "react";

// Datos de ejemplo
const seriesData = [
    {cod:1, nom:"Friends", cat:"Comedy", img:"friends.png"},
    {cod:2, nom:"Law & Order", cat:"Drama", img:"law-and-order.png"},
    {cod:3, nom:"The Big Bang Theory", cat:"Comedy", img:"the-big-bang.png"},
    {cod:4, nom:"Stranger Things", cat:"Horror", img:"stranger-things.png"},
    {cod:5, nom:"Dr. House", cat:"Drama", img:"dr-house.png"},
    {cod:6, nom:"The X-Files", cat:"Drama", img:"the-x-files.png"},
];

function SerieFormPage() {
    const { codigo } = useParams();
    const navigate = useNavigate();

    // Estados para el formulario
    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState('');
    const [imagen, setImagen] = useState('');
    const [imagenPreview, setImagenPreview] = useState("https://dummyimage.com/400x250/000/fff&text=Nueva+Imagen");

    // Verifica si estamos en modo edición
    const esEdicion = Boolean(codigo);

    // Carga los datos si estamos editando
    useEffect(() => {
        if (codigo) {
            const serie = seriesData.find(s => s.cod.toString() === codigo);
            if (serie) {
                setNombre(serie.nom);
                setCategoria(serie.cat);
                setImagen(serie.img);
                setImagenPreview(`https://dummyimage.com/400x250/000/fff&text=${serie.img}`);
            }
        }
    }, [codigo]);

    // Maneja el cambio de imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagenPreview(reader.result);
                setImagen(file.name);
            };
            reader.readAsDataURL(file);
        }
    };

    // Maneja el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();
        const serieData = {
            cod: codigo ? parseInt(codigo) : Date.now(),
            nom: nombre,
            cat: categoria,
            img: imagen
        };
        console.log("Serie guardada:", serieData);
        alert(`Serie ${codigo ? 'editada' : 'creada'} con éxito`);
        navigate("/series");
    };

    return (
        <>
            <HeaderComponent />
            <div className="container mt-3">
                <div className="border-bottom pb-3 mb-3">
                    <h3>{codigo ? 'Editar - Serie' : 'Nuevo - Serie'}</h3>
                </div>
                <form className="row" onSubmit={handleSubmit}>
                    <div className="col-md-4">
                        <img 
                            id="fileImg"
                            className="card-img-top mb-3" 
                            src={imagenPreview}
                            alt="Preview" 
                        />
                    </div>
                    <div className="col-md-8">
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
                            <label htmlFor="inputCategory" className="form-label">Categoria</label>
                            <select 
                                className="form-select" 
                                id="inputCategory" 
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                required 
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="Horror">Horror</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Action">Action</option>
                                <option value="Drama">Drama</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputImage" className="form-label">Imagen</label>
                            <input 
                                type="file" 
                                className="form-control" 
                                id="inputImage" 
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary me-2">
                                Guardar
                            </button>
                            <button 
                                type="button"
                                className="btn btn-secondary" 
                                onClick={() => navigate("/series")}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SerieFormPage;