import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { UserStatus } from "../enum/user.status";
;

export class UserStatusValidationPipes implements PipeTransform{
    readonly allowTaskStatus = [
        UserStatus.ACTIVE,
        UserStatus.IN_ACTIVE,
    ];

    transform(value: any, metadata: ArgumentMetadata){
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`"${value}" is an invalid status`);
        }
        return value;
    }

    private isStatusValid(status: any){
        const idx = this.allowTaskStatus.indexOf(status)
        return idx !== -1;
    }
}