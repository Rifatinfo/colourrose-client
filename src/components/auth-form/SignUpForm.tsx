/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Camera, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUpSchema } from "../../zod/user.validation";
import Image from "next/image";
import { useState } from "react";
import { registerClient } from "@/services/auth/registerUser";
import { Toast } from "../shared/Toast/Toast";

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUpForm = ({ onClose }: { onClose: () => void }) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [state, setState] = useState<any>(null); // store API response
    const [isPending, setIsPending] = useState(false);
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });
    console.log(state);

    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
        },
    });

    // Avatar preview handler
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    // Submit handler
    const onSubmit = async (data: SignUpFormValues) => {
        try {
            setIsPending(true);

            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) =>
                formData.append(key, value as any)
            );

            // Attach uploaded file
            const fileInput = document.getElementById(
                "profile-image"
            ) as HTMLInputElement;
            if (fileInput?.files?.[0]) {
                formData.append("file", fileInput.files[0]);
            }

            const result = await registerClient(null, formData);
            setState(result); // store API response

            if (result?.success) {
                Toast.fire({
                    icon: "success",
                    title: "registered successfully!",
                });
                form.reset(); // reset form
                setPreviewImage(null);
                onClose();
            } 
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 max-w-md mx-auto"
            >
                {/* Avatar Upload */}
                <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full border border-gray-300 overflow-hidden flex items-center justify-center bg-gray-100">
                            {previewImage ? (
                                <Image
                                    fill
                                    src={previewImage}
                                    alt="Profile preview"
                                    className="w-full h-full rounded-full object-cover"
                                    unoptimized
                                />
                            ) : (
                                <span className="text-2xl font-bold text-gray-600">
                                    {form.getValues("name")
                                        ? form.getValues("name").charAt(0).toUpperCase()
                                        : "U"}
                                </span>
                            )}
                        </div>

                        {/* Upload button */}
                        <label
                            htmlFor="profile-image"
                            className="absolute bottom-0 right-0 bg-black text-white rounded-full p-1.5 cursor-pointer"
                        >
                            <Camera className="w-4 h-4" />
                            <input
                                id="profile-image"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>
                </div>

                {/* Google Login Button */}
                <Button
                    type="button"
                    className="
            w-full
            bg-black
            text-white
            font-bold
            uppercase
            text-sm
            py-2.5
            rounded-none
            cursor-pointer
            transition-none
            hover:bg-black
            hover:text-white
            focus:bg-black
            active:bg-black
          "
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                            fill="currentColor"
                        />
                    </svg>
                    Login with Google
                </Button>

                {/* Form Fields */}
                {(["name", "email", "password", "confirmPassword"] as const).map(
                    (fieldName) => (
                        <FormField
                            key={fieldName}
                            control={form.control}
                            name={fieldName}
                            render={({ field }) => (
                                <FormItem className="relative">
                                    <label className="block text-xs font-bold text-gray-700 mb-1">
                                        {fieldName === "confirmPassword"
                                            ? "Confirm Password"
                                            : fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                                        : <span className="text-black">*</span>
                                    </label>
                                    <FormControl>
                                        <div className="relative">
                                            <input
                                                {...field}
                                                type={
                                                    fieldName === "password" || fieldName === "confirmPassword"
                                                        ? showPassword[fieldName] ? "text" : "password"
                                                        : "text"
                                                }
                                                placeholder={`Enter your ${fieldName.replace(
                                                    /([A-Z])/g,
                                                    " $1"
                                                ).toLowerCase()}`}
                                                className="w-full border-2 border-gray-300 px-3 py-2 text-sm focus:border-black outline-none bg-white pr-10"
                                            />
                                            {(fieldName === "password" || fieldName === "confirmPassword") && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowPassword((prev) => ({
                                                            ...prev,
                                                            [fieldName]: !prev[fieldName],
                                                        }))
                                                    }
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                                                >
                                                    {showPassword[fieldName] ? (
                                                        <EyeOff className="w-5 h-5" />
                                                    ) : (
                                                        <Eye className="w-5 h-5" />
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    )
                )}


                {/* Submit */}
                <button
                    type="submit"
                    disabled={isPending}
                    className="relative w-full py-2.5 text-sm font-bold uppercase text-white bg-black rounded-none flex items-center justify-center gap-2 overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {/* Spinner */}
                    {isPending && (
                        <svg
                            className="w-4 h-4 text-white animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="3"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                            />
                        </svg>
                    )}

                    {/* Button Text */}
                    <span className={`${isPending ? "opacity-70" : "opacity-100"} transition-opacity duration-300`}>
                        {isPending ? "Signing Up..." : "Sign Up"}
                    </span>
                </button>



            </form>
        </Form>
    );
};

export default SignUpForm;
