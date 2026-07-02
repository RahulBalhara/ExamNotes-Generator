import React from "react";
import {motion} from "motion/react";
const Auth = () => {
  return (
   <div className="min-h-screen overflow-hidden bg-white text-black px-8">
  <motion.header
   initial={{ opacity: 0, y: -15 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.5 }}
    className="max-w-7xl mx-auto mt-8
    rounded-2xl bg-black/80 backdrop-blur-xl
    border border-white/10 px-8 py-6
    shadow-[0_20px_45px_rgba(0,0,0,0.5)]"
  >
    <h1 className="text-2xl font-bold text-white mb-4">ExamNotes AI</h1>
    <p className="text-gray-300 ">
      AI- poewered exam-oriented notes generator. Upload your notes and get a summary of the most important points for your exams.
    </p>    
  </motion.header>
  <main className="max=w=7xl mx-auto py-10 grid grid-cols-1 lg:cols-2 gap-20 item-center">
    
  </main>
</div>
  );
};

export default Auth;  