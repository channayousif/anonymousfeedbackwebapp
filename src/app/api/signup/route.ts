import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import bcrypt from "bcryptjs"
import SendverificationEmail from "@/helpers/sendverificationemail";


export async function POST(request:Request) {
    await dbConnect()

    try {
        const {username, email, password} = await request.json()
        const existingUserVerifiedbyusername=await UserModel
        .findOne({
            username,
            isVerified:true
        })
        if (existingUserVerifiedbyusername) {
            return Response.json({
                success:false,
                message:"User already exists"

            },{status:400})
          }
          const existingUserByEmail= await UserModel.findOne({email})
          const otp=Math.floor(100000+Math.random()*900000).toString()
          if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success:false,
                    message:"User with this email already exists"
                },
                {status:400})
                
            }else{
                const hashedpassword = await bcrypt.hash(password,10)
                existingUserByEmail.password=hashedpassword
                existingUserByEmail.verifyCode=otp;
                existingUserByEmail.verifyCodeExpiry=new Date(Date.now()+3600000)
                existingUserByEmail.save()
           
                   
                }
            
         
            
          }else{
            const hashedpassword = await bcrypt.hash(password,10)
            const verifyCodeExpiry= new Date()
            verifyCodeExpiry.setHours(verifyCodeExpiry.getHours()+1)

            const newUser=new UserModel({
                username,
                email,
                password: hashedpassword,
                verifyCode: otp,
                verifyCodeExpiry,
                isVerified: false,
                isAcceptingMessages: true,
                messages: []
            })
            newUser.save()
          }
          //Send verificION EMAIL
          const emailResponse= await SendverificationEmail(email,username, otp)
          if (!emailResponse.Success) {
            return Response.json({
                success:false,
                massage:emailResponse.message

            },{
                status:500
            })
            
          }else{
            return Response.json({
                success:true,
                massage:"User registered successfully, please verify your email addresss"
            },{
                status:200
            })

          }
      
    } catch (error) {
        console.error("Error registering user", error)

        return Response.json({
            success:false,
            message:"Error registering user"
        },
        {
            status:500
        }
    )
    }
    
}