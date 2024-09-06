import * as React from 'react';
import { Html, Button } from "@react-email/components";
import { EmailTemplateProps } from '@/types/verificationemailtype';


export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  userName, otp,
}) => (
  
    <Html lang="en">
      <div>Dear {userName}<br/>This is your email verifiction code {otp}</div>
      <Button href={""}>Click me </Button>
    </Html>
);



export default EmailTemplate;