import { useState, useEffect } from 'react';
import './index.css';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetching from the deployed backend on Render
        const response = await fetch('https://store-backend-jpze.onrender.com/api/products');
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Nuestra Colección</h1>
        <p>Descubre nuestra selección de productos premium diseñados para destacar.</p>
      </header>

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando catálogo...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <h2>Oops! Algo salió mal</h2>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <main className="products-grid">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-image-container">
                <img 
                  src={product.imagen_url} 
                  alt={product.nombre} 
                  className="product-image"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=800&auto=format&fit=crop';
                  }}
                />
              </div>
              <div className="product-details">
                <h2 className="product-title">{product.nombre}</h2>
                <p className="product-description">{product.descripcion}</p>
                
                <div className="product-meta">
                  <span className="product-price">${product.precio}</span>
                  <span className="product-stock">Stock: {product.stock}</span>
                </div>
                
                <button className="buy-button">
                  Añadir al carrito
                </button>
              </div>
            </article>
          ))}
        </main>
      )}
    </div>
  );
}

export default App;
