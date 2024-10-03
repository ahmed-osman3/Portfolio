"use server";

import React from "react";
import { Resend } from "resend";
import ContactFormEmail from "@/components/EmailForm";
import { contactSchema } from "./schema";

const resend = new Resend(process.env.RESEND_API_KEY);


type FormState = {
    message: string;
    type: string;
  };

export const sendEmail = async (
  prevState: FormState,
    formData: FormData) : Promise<FormState>  => {
     const form = Object.fromEntries(formData);
     const {
        data: successData,
        success,
        error: zodError,
      } = contactSchema.safeParse(form);
  
      if (!success) {
        const fields: Record<string, string> = {};
        for (const key of Object.keys(form)) {
          fields[key] = form[key].toString();
        }
        console.log(
          zodError!.issues.map((issue) => ` ${issue.path} : ${issue.message}`)
        );
  
        return {
          message: "Invalid form data",
          type: "error",
        };
      }

      



  // simple server-side validation


  try {
   const  {
    data,
    error
   } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "ahmed.osman0308@gmail.com",
      subject: "Message from contact form",
      replyTo: successData.email,
      react: React.createElement(ContactFormEmail, {
        message: successData.message,
        senderEmail: successData.email,
      }),
    });
    if(error){
        throw error
    }
    return {
        message: data!.id,
        type: 'success'
    }
  } catch (error: any) {
    return {
      message: error.message,
      type: 'error'
    };
  }

  
};