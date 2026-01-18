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
import { Toast } from "../shared/Toast/Toast";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { useLogin } from "@/context/UIContext";
import { useRouter } from "next/navigation";
import { clearPostLoginRedirect, getPostLoginRedirect } from "@/utils/postLoginRedirect";

type SignInFormValues = z.infer<typeof signInSchema>;

const LoginForm = ({ onClose }: { onClose: () => void }) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const pathname = usePathname();


    const { closeLoginModal } = useLogin();
    const router = useRouter();


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
                //  Only here after async login
                Toast.fire({
                    icon: "success",
                    title: "Login successful!",
                });

                // Close global login modal
                closeLoginModal();

                // Redirect after login
                const redirect = getPostLoginRedirect() || "/checkout";
                clearPostLoginRedirect();
                router.replace(redirect);

                // Optional: close local drawer/modal
                onClose();
            } else {
                Toast.fire({
                    icon: "error",
                    title: result?.message || "Login failed",
                });
            }
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
                                <Image
                                    fill
                                    src={previewImage}
                                    alt="Profile preview"
                                    className="w-full h-full rounded-full object-cover"
                                    unoptimized
                                />
                            ) : (
                                <span className="text-2xl font-bold text-gray-600">
                                    {form.getValues("email")
                                        ? form.getValues("email").charAt(0).toUpperCase()
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
                    onClick={() => {
                        // send current page path to backend
                        window.location.href =
                            `http://localhost:5000/api/v1/auth/google/callback?redirect=${encodeURIComponent(
                                pathname
                            )}`;
                    }}
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
                    disabled={isPending}
                    className="relative w-full py-2.5 cursor-pointer text-sm font-bold uppercase text-white bg-black rounded-none flex items-center justify-center gap-2 overflow-hidden "
                >
                    {/* Spinner */}
                    {isPending && (
                        <svg
                            className="h-4 w-4 animate-spin mr-2"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                        </svg>
                    )}
                    {isPending ? "Logging in..." : "Sign In"}
                </button>
            </form>
        </Form>
    );
};

export default LoginForm;
