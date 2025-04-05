import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']; // Obtener el token del encabezado
   if (!token) {
        throw new UnauthorizedException('Token not found'); // Si no se encuentra el token, lanzar error
    }

    try {
         // Verificar y decodificar el token usando la clave secreta
        const decoded = jwt.verify(token, 'yourSecretKey'); // Cambia 'your-secret-key' por tu clave secreta
        request.user = decoded; // Guardar la información decodificada en el objeto request
        return true;
      } catch (error) {
          throw new UnauthorizedException('Invalid token or token expired');
      }
    // Aquí podrías agregar lógica para verificar si el token es válido.
    // Por ejemplo, podrías verificar si el token se puede decodificar, etc.

    
  }
}
