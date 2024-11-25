import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS } from '../../types/search';
import type { SearchPreferences } from '../../types/search';

interface QuestionFlowProps {
  preferences: SearchPreferences;
  onUpdate: (preferences: Partial<SearchPreferences>) => void;
}

export function QuestionFlow({ preferences, onUpdate }: QuestionFlowProps) {
  const currentQuestion = QUESTIONS.find(q => !preferences[q.id]);

  if (!currentQuestion) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-2xl mx-auto px-4 sm:px-0"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 text-center">
            {currentQuestion.text}
          </h3>

          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {currentQuestion.options.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => onUpdate({ [currentQuestion.id]: option.value })}
                className={`w-full p-3 sm:p-4 rounded-lg transition-all duration-300 text-center ${
                  option.value === 'all'
                    ? 'bg-indigo-600/20 hover:bg-indigo-600/30 text-white'
                    : 'bg-white/5 hover:bg-white/10 text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xl sm:text-2xl">{option.icon}</span>
                  <span className="font-medium text-sm sm:text-base">{option.label}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}