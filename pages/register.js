import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import { profileColors } from "@/utils/constants";
import Loader from "@/components/Loader";
import { auth, db } from "@/firebase/firebase";
import { IoEye, IoEyeOff } from "react-icons/io5";

const gProvider = new GoogleAuthProvider();
const fProvider = new FacebookAuthProvider();

const Register = () => {
  const router = useRouter();
  const { currentUser, isLoading } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (!isLoading && currentUser) {
      router.push("/");
    }
  }, [currentUser, isLoading, router]);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, gProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithFacebook = async () => {
    try {
      await signInWithPopup(auth, fProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const colorIndex = Math.floor(Math.random() * profileColors.length);

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      alert("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      alert("Password must contain at least one lowercase letter.");
      return;
    }

    if (!/[0-9]/.test(password)) {
      alert("Password must contain at least one digit.");
      return;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      alert("Password must contain at least one special character.");
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName,
        email,
        color: profileColors[colorIndex],
      });

      await setDoc(doc(db, "userChats", user.uid), {});

      await updateProfile(user, {
        displayName,
      });

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return isLoading || (!isLoading && currentUser) ? (
    <Loader />
  ) : (
    <div className="flex justify-center items-center min-h-screen bg-c1">
      <div className="flex flex-col items-center max-w-md w-full p-6">
        <div className="text-center">
          <div className="text-4xl font-bold">Create New Account</div>
          <div className="mt-3 text-c3">
            Connect and chat with anyone, anywhere
          </div>
        </div>

        <div className="flex items-center gap-2 w-full mt-10 mb-5">
          <div
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-14 rounded-md cursor-pointer p-[1px]"
            onClick={signInWithGoogle}
          >
            <div className="flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md">
              <IoLogoGoogle size={24} />
              <span>Login with Google</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full mb-5">
          <div
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-14 rounded-md cursor-pointer p-[1px]"
            onClick={signInWithFacebook}
          >
            <div className="flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md">
              <IoLogoFacebook size={24} />
              <span>Login with Facebook</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <span className="w-5 h-[1px] bg-c3"></span>
          <span className="text-c3 font-semibold">OR</span>
          <span className="w-5 h-[1px] bg-c3"></span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-3 w-full"
        >
          <input
            type="text"
            placeholder="Display Name"
            className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3"
            autoComplete="off"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3"
            autoComplete="off"
          />
          <div className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 flex items-center">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-c5 outline-none text-c3"
              autoComplete="off"
            />
            <div
              className="cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <IoEyeOff size={24} /> : <IoEye size={24} />}
            </div>
          </div>

          <button className="mt-4 w-full h-14 rounded-xl outline-none text-base font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Sign Up
          </button>
        </form>

        <div className="flex justify-center gap-1 text-c3 mt-5">
          <span>Already have an account?</span>
          <Link
            href="/login"
            className="font-semibold text-white underline cursor-pointer"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
