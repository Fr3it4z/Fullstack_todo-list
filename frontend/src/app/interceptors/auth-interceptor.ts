import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Vai ao bolso secreto do browser ver se temos um Token guardado
  const token = localStorage.getItem('token');

  // 2. Se houver Token, clonamos o pedido e colamos o Token no cabeçalho (Header)
  if (token) {
    const pedidoComToken = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // Mandamos o estafeta seguir viagem com o envelope carimbado
    return next(pedidoComToken);
  }

  // 3. Se não houver Token (ex: na página de Login), o estafeta segue viagem normal
  return next(req);
};