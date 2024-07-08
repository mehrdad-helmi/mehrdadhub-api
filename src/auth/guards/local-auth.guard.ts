import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

/**
 * Custom local authentication guard
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('auth-local-strategy') {}
