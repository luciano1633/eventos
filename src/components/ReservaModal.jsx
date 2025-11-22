import { useState } from 'react';
import '../css/ReservaModal.css';

function ReservaModal({ evento, onClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    cantidadEntradas: 1
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    
    // Simular envío de reserva
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  const precioTotal = formData.cantidadEntradas * 15000;

  if (enviado) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content modal-exito" onClick={e => e.stopPropagation()}>
          <div className="icono-exito">✓</div>
          <h2>¡Reserva Exitosa!</h2>
          <p>Hemos enviado la confirmación a {formData.email}</p>
          <div className="detalle-reserva">
            <p><strong>Evento:</strong> {evento.nombre}</p>
            <p><strong>Entradas:</strong> {formData.cantidadEntradas}</p>
            <p><strong>Total:</strong> ${precioTotal.toLocaleString('es-CL')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2 className="modal-title">Reservar Entradas</h2>
        <p className="modal-evento">{evento.nombre}</p>
        
        <form onSubmit={handleSubmit} className="reserva-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Ingresa tu nombre"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono *</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              placeholder="+56 9 1234 5678"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cantidadEntradas">Cantidad de Entradas</label>
            <select
              id="cantidadEntradas"
              name="cantidadEntradas"
              value={formData.cantidadEntradas}
              onChange={handleChange}
              required
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div className="precio-total">
            <span>Total a pagar:</span>
            <span className="monto">${precioTotal.toLocaleString('es-CL')}</span>
          </div>

          <button type="submit" className="btn-confirmar">
            Confirmar Reserva
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReservaModal;
