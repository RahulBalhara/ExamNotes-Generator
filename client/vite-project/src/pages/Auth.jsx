import React from "react";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { auth, provider } from "../utils/firebase.js";
import { serverUrl } from "../config/config.js";
import { getCurrentUser } from "../services/api.js";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);

      const user = response.user;

      const result = await axios.post(
        `${serverUrl}/api/auth/google`,
        {
          name: user.displayName,
          email: user.email,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Google sign-in successful:", result.data);

      // Fetch current user and update Redux
      await getCurrentUser(dispatch);

      // Navigate to Home
      navigate("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black px-4 md:px-6">
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto mt-6 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 px-6 md:px-8 py-5 shadow-[0_20px_45px_rgba(0,0,0,0.35)]"
      >
        <h1 className="text-2xl font-bold text-white">
          ExamNotes AI
        </h1>

        <p className="text-gray-300 mt-2">
          AI-powered exam-oriented notes generator that creates concise,
          high-quality notes, charts and PDFs in seconds.
        </p>
      </motion.header>

      <main className="max-w-6xl mx-auto py-12 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-transparent">
            Unlock Smart
            <br />
            AI Notes
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-lg">
            Create exam notes, project reports, charts, graphs and
            downloadable PDFs instantly using AI.
          </p>

          <motion.button
            onClick={handleGoogleAuth}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="mt-8 flex items-center gap-3 rounded-xl bg-black text-white px-8 py-3 font-semibold shadow-lg"
          >
            <FcGoogle size={24} />
            Continue with Google
          </motion.button>

          <p className="mt-6 text-gray-700">
            🎁 <span className="font-semibold">100 FREE Credits</span> on your
            first sign in.
          </p>

          <p className="mt-2 text-sm text-gray-500">
            No credit card required • Upgrade anytime
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          <Feature
            icon="🎁"
            title="100 Free Credits"
            desc="Start creating AI notes instantly."
          />

          <Feature
            icon="📘"
            title="Exam Notes"
            desc="High-quality revision-ready notes."
          />

          <Feature
            icon="📂"
            title="Project Notes"
            desc="Generate complete project documentation."
          />

          <Feature
            icon="📊"
            title="Charts & Graphs"
            desc="Visualize important concepts automatically."
          />

          <Feature
            icon="📥"
            title="PDF Download"
            desc="Download beautifully formatted PDFs."
          />

          <Feature
            icon="⚡"
            title="AI Powered"
            desc="Powered by Google's Gemini AI."
          />
        </motion.div>
      </main>
    </div>
  );
};

function Feature({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 250 }}
      className="rounded-2xl bg-black text-white p-6 shadow-xl"
    >
      <div className="text-4xl mb-4">{icon}</div>

      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      <p className="text-sm text-gray-300">{desc}</p>
    </motion.div>
  );
}

export default Auth;