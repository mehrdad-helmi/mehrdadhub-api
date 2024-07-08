import { ForbiddenException } from '@nestjs/common';
import { MHEntityEnums } from '@mehrdadhub/common';
import { MESSAGES } from '@mehrdadhub/locales/en';

export class OwnershipException extends ForbiddenException {
	constructor(entity: MHEntityEnums) {
		super(MESSAGES.COMMON.OWNERSHIP_ERROR, { cause: entity });
	}
}
