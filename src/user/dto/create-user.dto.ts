import {IsEmail, Length, Min} from "class-validator"

export class CreateUserDto {
    fullname:string
    @IsEmail()
    email:string
    @Length(6)
    password?:string
}
