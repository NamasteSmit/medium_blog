"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInputValidation = exports.createBlogInputValidation = exports.signupInputValidation = exports.signinInputValidation = void 0;
const zod_1 = require("zod");
exports.signinInputValidation = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Please enter a valid email address" }),
    password: zod_1.z
        .string({ required_error: "Password is required" })
        .min(5, { message: "Password should be at least 5 characters long" })
        .trim()
});
exports.signupInputValidation = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name should be at least 3 characters long" }),
    email: zod_1.z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Please enter a valid email address" }),
    password: zod_1.z
        .string({ required_error: "Password is required" })
        .min(5, { message: "Password should be at least 5 characters long" })
        .trim()
});
exports.createBlogInputValidation = zod_1.z.object({
    title: zod_1.z
        .string({ required_error: "Title is required" })
        .trim()
        .min(3, { message: "Title should be at least 3 characters long" }),
    content: zod_1.z
        .string({ required_error: "Title is required" })
        .trim(),
});
exports.updateBlogInputValidation = zod_1.z.object({
    title: zod_1.z
        .string({ required_error: "Title is required" })
        .trim()
        .min(3, { message: "Title should be at least 3 characters long" }),
    content: zod_1.z
        .string({ required_error: "Title is required" })
        .trim(),
    authorId: zod_1.z.string()
});
