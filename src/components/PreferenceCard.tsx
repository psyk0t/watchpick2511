import React from 'react';
import { motion } from 'framer-motion';
import { Question } from '../types/preferences';

interface PreferenceCardProps {
  question: Question;
  onAnswer: (value: string) => void;
}

export function PreferenceCard({ question, onAnswer }: PreferenceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full"
    >
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        {question.text}
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(option.value)}
            className="w-full py-4 px-6 rounded-lg border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 text-lg font-medium text-gray-700 hover:text-indigo-600"
          >
            {option.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}