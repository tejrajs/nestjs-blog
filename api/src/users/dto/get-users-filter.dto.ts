import { IsOptional, IsIn, IsNotEmpty } from "class-validator";
import { UserStatus } from "../enum/user.status";


export class GetUsersFilterDto{
    @IsOptional()
    @IsIn([UserStatus.ACTIVE, UserStatus.IN_ACTIVE])
    status: UserStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}