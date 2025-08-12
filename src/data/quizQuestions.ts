import { QuizQuestion } from '@/types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the main method signature in Java?",
    options: [
      "public static void main(String[] args)",
      "public void main(String[] args)",
      "static void main(String[] args)",
      "public static main(String[] args)"
    ],
    correctAnswer: 0,
    explanation: "The main method must be public, static, void, and take String[] args as parameter."
  },
  {
    id: 2,
    question: "Which of these is NOT a Java primitive data type?",
    options: [
      "int",
      "String",
      "boolean",
      "double"
    ],
    correctAnswer: 1,
    explanation: "String is a class, not a primitive data type. Primitive types include int, boolean, double, etc."
  },
  {
    id: 3,
    question: "What does OOP stand for?",
    options: [
      "Object-Oriented Programming",
      "Object-Only Programming",
      "Operational-Oriented Programming",
      "Open-Object Programming"
    ],
    correctAnswer: 0,
    explanation: "OOP stands for Object-Oriented Programming, a programming paradigm based on objects and classes."
  },
  {
    id: 4,
    question: "Which keyword is used to inherit a class in Java?",
    options: [
      "implements",
      "extends",
      "inherits",
      "super"
    ],
    correctAnswer: 1,
    explanation: "The 'extends' keyword is used for class inheritance in Java."
  },
  {
    id: 5,
    question: "What is the size of an int in Java?",
    options: [
      "16 bits",
      "32 bits",
      "64 bits",
      "8 bits"
    ],
    correctAnswer: 1,
    explanation: "An int in Java is 32 bits (4 bytes) in size."
  },
  {
    id: 6,
    question: "Which of these is used to handle exceptions in Java?",
    options: [
      "try-catch",
      "if-else",
      "switch-case",
      "for-while"
    ],
    correctAnswer: 0,
    explanation: "try-catch blocks are used to handle exceptions in Java."
  },
  {
    id: 7,
    question: "What is the default value of a boolean variable in Java?",
    options: [
      "true",
      "false",
      "null",
      "0"
    ],
    correctAnswer: 1,
    explanation: "The default value of a boolean variable in Java is false."
  },
  {
    id: 8,
    question: "Which collection class allows duplicate elements?",
    options: [
      "Set",
      "HashSet",
      "ArrayList",
      "TreeSet"
    ],
    correctAnswer: 2,
    explanation: "ArrayList allows duplicate elements, while Set implementations do not."
  },
  {
    id: 9,
    question: "What is method overloading?",
    options: [
      "Having methods with same name but different parameters",
      "Having methods with same name and same parameters",
      "Creating multiple classes",
      "Using inheritance"
    ],
    correctAnswer: 0,
    explanation: "Method overloading allows multiple methods with the same name but different parameters."
  },
  {
    id: 10,
    question: "Which access modifier makes a variable accessible only within the same class?",
    options: [
      "public",
      "protected",
      "private",
      "default"
    ],
    correctAnswer: 2,
    explanation: "The 'private' access modifier restricts access to within the same class only."
  }
];

// Utility function to randomize questions and answers
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getRandomizedQuestions = (): QuizQuestion[] => {
  return shuffleArray(quizQuestions).map(question => ({
    ...question,
    options: shuffleArray(question.options.map((option, index) => ({ option, index }))).map(item => item.option),
    correctAnswer: question.options.findIndex(option => option === question.options[question.correctAnswer])
  }));
};