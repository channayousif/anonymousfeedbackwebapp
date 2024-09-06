import { Message } from "@/model/user";

export default interface ApiResponse{
    Success:boolean,
    message:string,
    isAcceptingMessages?:boolean,
    messages?:Array<Message>,
    
}