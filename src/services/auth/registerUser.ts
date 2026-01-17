/* eslint-disable @typescript-eslint/no-explicit-any */

import { zodValidator } from "@/lib/zodValidator";
import { signUpSchema } from "@/zod/user.validation";
import { loginUser } from "./loginUser";



export const registerClient = async (_currentState: any, formData: FormData): Promise<any> => {
    try {
        const payload = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
            terms: formData.get("terms") === "true",
        };

        if (zodValidator(payload, signUpSchema).success === false) {
            return zodValidator(payload, signUpSchema);
        }
        const validatedPayload: any = zodValidator(payload, signUpSchema).data;
        const registerData = {
            password: validatedPayload.password,
            name: validatedPayload.name,
            email: validatedPayload.email,
        }

        const newFormData = new FormData();
        newFormData.append("data", JSON.stringify(registerData));

        if (formData.get("file")) {
            newFormData.append("file", formData.get("file") as Blob);
        }

        const res = await fetch(`http://localhost:5000/api/v1/user/create`, {
            method: "POST",
            body: newFormData, // FormData
        });
        const result = await res.json();
        if (result.success) {
            await loginUser(_currentState, formData);
        }

        return result;

    } catch (error: any) {
        if (error?.digest?.startWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again"}` };
    }
}