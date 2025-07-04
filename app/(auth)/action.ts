'use server'
import { contactSchema, zodFirstError } from "@/lib/schemas/contactSchema";
import { ContactFormType } from '@/lib/schemas/contactSchema'
import { ContactEmailTemplate } from '@/components/email-templates/contact'
import { resend } from '@/config/resend'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

// sendContactEmail.ts (e.g., inside app/(auth)/action.ts)
export async function sendContactEmail(data: ContactFormType): Promise<{ success: boolean; message?: string, status: number }> {
  const validation = contactSchema.safeParse(data);
  if (!validation.success) {
    return {
      success: false,
      message: zodFirstError(validation.error.flatten().fieldErrors),
      status: 202,
    };
  }
  try {
    const { data: sendData, error } = await resend.emails.send({
      from: `Contact Form <${process.env.NEXT_PUBLIC_BUSINESS_MAIL!}>`, // your verified domain email
      to: process.env.NEXT_PUBLIC_MY_EMAIL!, // ✅ your email where you want to receive form submissions
      subject: 'New Contact Form Submission',
      replyTo: data.Email, // ✅ this lets you reply directly to the user
      react: await ContactEmailTemplate({ email: data.Email, firstName: data.Name, message: data.Message, phone: data.Phone }),
    });

    if (error) {
      return { success: false, message: error.message, status: 404 };
    }
    return { success: true, message: "Successfully sended to Admin", status: 200 }
  } catch (error) {
    return { success: false, message: error as string, status: 500 };
  }

}

