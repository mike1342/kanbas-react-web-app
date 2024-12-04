type QuizType = 'gradedQuiz' | 'practiceQuiz' | 'gradedSurvey' | 'ungradedSurvey';
type AssignmentType = 'quiz' | 'exam' | 'assignment' | 'project';

interface Question {
  _id: string;
  title: string;
  question: string;
  points: number;
  questionType: string;
};

interface QuestionAttempt extends Question {}

export interface MCQuestion extends Question {
  choices: string[];
  correctAnswer: string;
}

export interface MCQuestionAttempt extends QuestionAttempt, MCQuestion {
  selectedChoice: string;
}

export interface TFQuestion extends Question {
  correctAnswer: boolean;
}

export interface TFQuestionAttempt extends QuestionAttempt, TFQuestion {
  selectedAnswer: boolean;
}

export interface FillInQuestion extends Question {
  correctAnswers: string[];
}

export interface FillInQuestionAttempt extends QuestionAttempt, FillInQuestion {
  selectedAnswer: string;
}

export interface QuizAttempt {
  _id: string;
  quizId: string;
  studentId: string;
  score: number;
  timeStarted: Date;
  timeEnded: Date;
  answers: QuestionAttempt[];
}

export interface Quiz {
  _id: string;
  title: string;
  quizType: QuizType;
  points: number;
  assignmentGroup: AssignmentType;
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  howManyAttempts: number;
  showCorrectAnswers: boolean;
  accessCode?: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: Date;
  availableFrom: Date;
  availableUntil: Date;
  questions: Question[];
  quizAttempts: QuizAttempt[];
};