/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Camera, Eye, EyeOff } from "lucide-react";
import { Form, FormField, FormItem, FormControl, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { useState } from "react";
import { signInSchema } from "@/zod/user.validation"; // your zod schema
import { loginUser } from "@/services/auth/loginUser"; // your server action
import Swal from "sweetalert2";

type SignInFormValues = z.infer<typeof signInSchema>;

const LoginForm = ({onClose}: {onClose: () => void}) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const form = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result as string);
        reader.readAsDataURL(file);
    };

    const onSubmit = async (data: SignInFormValues) => {
        try {
            setIsPending(true);

            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => formData.append(key, value as any));

            // append uploaded image if exists
            const fileInput = document.getElementById("profile-image") as HTMLInputElement;
            if (fileInput?.files?.[0]) formData.append("file", fileInput.files[0]);

            // Call your server login function
            const result = await loginUser(null, formData);
            if (result?.success) {
                Swal.fire({
                    icon: "success",
                    title: "Login successful Welcome back!",
                });
                onClose();
            } else {
                Swal.fire({
                    icon: "error",
                    title: result?.message || "Login failed",
                });
            }
            console.log("Login Result:", result);
        } catch (err) {
            console.error(err);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Avatar Upload */}
                <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full border border-gray-300 overflow-hidden flex items-center justify-center bg-gray-100">
                            {previewImage ? (
                                <Image fill src={previewImage} alt="Profile preview" className="object-cover" />
                            ) : (
                                <span className="text-2xl font-bold text-gray-600">U</span>
                            )}
                        </div>
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

                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                                Email: <span>*</span>
                            </label>
                            <FormControl>
                                <input
                                    {...field}
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full border-2 border-gray-300 px-3 py-2 text-sm focus:border-black outline-none bg-white"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                                Password: <span>*</span>
                            </label>
                            <div className="relative">
                                <FormControl>
                                    <input
                                        {...field}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className="w-full border-2 border-gray-300 px-3 py-2 text-sm focus:border-black outline-none bg-white"
                                    />
                                </FormControl>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Remember Me */}
                <FormField
                    control={form.control}
                    name="remember"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center justify-between text-xs">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <FormControl>
                                        <input
                                            type="checkbox"
                                            checked={field.value}
                                            onChange={field.onChange}
                                            className="w-4 h-4 border-gray-300 focus:ring-black"
                                        />
                                    </FormControl>
                                    <span className="text-gray-600">Remember me</span>
                                </label>
                                <a href="#" className="font-bold hover:underline">
                                    Forgot Password?
                                </a>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-black text-white font-bold uppercase text-sm py-2.5 cursor-pointer transition-colors"
                >
                    {isPending ? "Logging in..." : "Sign In"}
                </button>
            </form>
        </Form>
    );
};

export default LoginForm;
