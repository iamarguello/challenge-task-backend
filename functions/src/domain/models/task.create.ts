import { IsNotEmpty } from "class-validator";

export class TaskCreateDto {
    @IsNotEmpty({ message: "Title is required" })
    title!: string;    
    @IsNotEmpty({ message: "Description is required" })   
    description!: string;
    @IsNotEmpty({ message: "UserId is required" })   
    userId!: string;
}