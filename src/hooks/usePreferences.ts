import { useState, useCallback } from 'react';
import { MediaType, PreferenceState, Question } from '../types/preferences';
import { getNextQuestion, INITIAL_QUESTION } from '../data/questions';
import { MediaAPI } from '../services/api';

export function usePreferences() {
  const [preferences, setPreferences] = useState<PreferenceState>({
    mediaType: null
  });
  
  const currentQuestion = useCallback(() => {
    return getNextQuestion(preferences);
  }, [preferences]);

  const handleAnswer = useCallback((value: string) => {
    const question = currentQuestion();
    if (!question) return;

    const newPreferences = MediaAPI.processAnswer(preferences, question.id, value);
    setPreferences(newPreferences);
  }, [preferences, currentQuestion]);

  const isComplete = useCallback(() => {
    return currentQuestion() === null;
  }, [currentQuestion]);

  const reset = useCallback(() => {
    setPreferences({ mediaType: null });
  }, []);

  return {
    preferences,
    currentQuestion: currentQuestion(),
    handleAnswer,
    isComplete,
    reset
  };
}