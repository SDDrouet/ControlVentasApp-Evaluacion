import axios from 'axios';
//variables de entorno


const createApiService = (baseURL) => {
  const api = axios.create({ baseURL });

  return {
    getAll: () => api.get('/'),
    getOne: (id) => api.get(`/${id}`),
    create: (data) => api.post('/', data),
    update: (id, data) => api.put(`/${id}`, data),
    delete: (id) => api.delete(`/${id}`),
  };
};

export const inventarioApi = createApiService(`http://${process.env.REACT_APP_INVENTARIO_HOST}:3001/api/inventario`);
export const clientesApi = createApiService(`http://${process.env.REACT_APP_CLIENTE_HOST}:3002/api/clientes`);
export const ventasApi = createApiService(`http://${process.env.REACT_APP_VENTAS_HOST}:3003/api/ventas`);