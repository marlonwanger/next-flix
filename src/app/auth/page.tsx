"use client";

import Input from "@/components/Input";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

export default function AuthPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toogleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      router.push("/");
    } catch (error) {
      console.log("Hero Error");
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      console.log("Register");
      await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, username, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src="/images/logo.png" alt="logo" height={48} width={177} />
        </nav>

        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full ">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>

            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Username"
                  onchange={(e: any) => setUsername(e.target.value)}
                  id="name"
                  value={username}
                />
              )}
              <Input
                label="Email"
                onchange={(e: any) => setEmail(e.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onchange={(e: any) => setPassword(e.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              disabled={variant === "login" ? !email : !username}
              className="bg-red-600 py-3 rounded-md text-white w-full mt-10 hover:bg-red-700 transition disabled:bg-neutral-700"
            >
              {variant === "login" ? "Sign in" : "Register"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                <div 
                  onClick={() => signIn("google", { callbackUrl: "/" })} 
                className="
                  w-10
                  h-10
                  bg-white
                  rounded-full
                  flex
                  items-center
                  justify-center
                  cursor-pointer
                  hover:opacity-80
                  transition
                ">
                  <FcGoogle size={30} />
                </div>

                <div
                  onClick={() => signIn("github", { callbackUrl: "/" })} 
                  className="
                    w-10
                    h-10
                    bg-white
                    rounded-full
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                    hover:opacity-80
                    transition
                  ">
                  <FaGithub size={30} />
                </div>
            </div>
            <p className="text-neutral-500 mt-12 text-sm">
              {variant === "login"
                ? "First time using Netflix ?"
                : "Already have an account?"}

              <span
                onClick={toogleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
