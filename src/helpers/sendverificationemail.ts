import type { NextApiRequest, NextApiResponse } from 'next';
import { EmailTemplate } from '@/emails/verificationemailtemplate';
import { resend } from '@/lib/resend'
import ApiResponse from '@/types/ApiResponse';


export default async function SendverificationEmail(
    email:string,
    userName:string,
    otp:string    
):Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [email],
            subject: 'Verification email',
            react: EmailTemplate({ userName: userName, otp:otp }),
          })
        return {
            Success:true,
            message:"Verification Email sent successfully"
        }
    } catch (Emailerror) {
        console.log("Error sending verification email", Emailerror)
        return {
            Success:false,
            message:"Failed to send email"
        }
    }
}

