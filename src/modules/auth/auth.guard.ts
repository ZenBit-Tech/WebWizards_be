import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from 'src/shared/enums';

@Injectable()
export default class AuthGuard implements CanActivate {
  // eslint-disable-next-line class-methods-use-this
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    if (!user) {
      return false;
    }
    return user.roles.includes(Role);
  }
}
