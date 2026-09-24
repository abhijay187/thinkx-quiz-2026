/**
 * THINKX QUIZ 2026 - Authoritative Presentation Data
 * Source: thnkx.pdf
 * Department: AIML Department
 * Association: INTELLIX
 */

const QUIZ_DATA = [
  {
    id: 0,
    type: "intro",
    category: "WELCOME",
    badge: "AIML DEPARTMENT PROGRAM",
    title: "ThinkX",
    subtitle: "QUIZ 2026",
    tagline: "General Knowledge • Technology • Logos • Visual Questions",
    footerText: "AIML Department Program • INTELLIX Association"
  },
  {
    id: 1,
    type: "rules",
    category: "RULES",
    badge: "GUIDELINES",
    title: "QUIZ RULES",
    rules: [
      { num: "01", text: "Each team will have 2 members." },
      { num: "02", text: "The quiz will consist of multiple rounds." },
      { num: "03", text: "Questions will include General Knowledge, Technology, Logos & Visual Questions." },
      { num: "04", text: "Each question will have 30 seconds to answer." },
      { num: "05", text: "Answers must be given within the allotted time." },
      { num: "06", text: "The team that presses the buzzer first will get the first chance to answer." },
      { num: "07", text: "No discussion with other teams or external help is allowed." },
      { num: "08", text: "Mobile phones and internet use are not allowed." },
      { num: "09", text: "Participants must maintain discipline and fair play." },
      { num: "10", text: "In case of a tie, a tie-breaker round will be conducted." },
      { num: "11", text: "Event Coordinators’ decision will be final." }
    ],
    footerText: "THINKX • QUIZ"
  },
  {
    id: 2,
    qNum: "01/30",
    index: 1,
    type: "mcq",
    category: "GENERAL KNOWLEDGE & TECH",
    badge: "QUESTION 01",
    question: "What does CPU stand for?",
    options: [
      { key: "A", text: "Central Processing Unit" },
      { key: "B", text: "Computer Processing Utility" },
      { key: "C", text: "Central Program Unit" },
      { key: "D", text: "Central Processing Utility" }
    ],
    footerText: "THINKX • QUIZ"
  },
  {
    id: 3,
    qNum: "02/30",
    index: 2,
    type: "mcq",
    category: "GENERAL KNOWLEDGE & TECH",
    badge: "QUESTION 02",
    question: "Which company developed the Android operating system?",
    options: [
      { key: "A", text: "Apple" },
      { key: "B", text: "Google" },
      { key: "C", text: "Microsoft" },
      { key: "D", text: "Samsung" }
    ],
    footerText: "THINKX • QUIZ"
  },
  {
    id: 4,
    qNum: "03/30",
    index: 3,
    type: "mcq",
    category: "GENERAL KNOWLEDGE & TECH",
    badge: "QUESTION 03",
    question: "Which programming language is widely used in AI and Machine Learning?",
    options: [
      { key: "A", text: "Java" },
      { key: "B", text: "C++" },
      { key: "C", text: "Python" },
      { key: "D", text: "Ruby" }
    ],
    footerText: "THINKX • QUIZ"
  },
  {
    id: 5,
    qNum: "04/30",
    index: 4,
    type: "mcq",
    category: "GENERAL KNOWLEDGE & TECH",
    badge: "QUESTION 04",
    question: "What does AI stand for?",
    options: [
      { key: "A", text: "Automated Internet" },
      { key: "B", text: "Artificial Intelligence" },
      { key: "C", text: "Advanced Information" },
      { key: "D", text: "Artificial Integration" }
    ],
    footerText: "THINKX • QUIZ"
  },
  {
    id: 6,
    qNum: "05/30",
    index: 5,
    type: "mcq",
    category: "GENERAL KNOWLEDGE & TECH",
    badge: "QUESTION 05",
    question: "Which company makes the GeForce series of GPUs?",
    options: [
      { key: "A", text: "AMD" },
      { key: "B", text: "Intel" },
      { key: "C", text: "NVIDIA" },
      { key: "D", text: "Qualcomm" }
    ],
    footerText: "THINKX • QUIZ"
  },
  {
    id: 7,
    qNum: "06/30",
    index: 6,
    type: "mcq",
    category: "GENERAL KNOWLEDGE & TECH",
    badge: "QUESTION 06",
    question: "What is the full form of USB?",
    options: [
      { key: "A", text: "Universal Serial Bus" },
      { key: "B", text: "Unified System Bus" },
      { key: "C", text: "Universal System Bridge" },
      { key: "D", text: "User Serial Board" }
    ],
    footerText: "THINKX • QUIZ"
  },
  {
    id: 8,
    qNum: "07/30",
    index: 7,
    type: "mcq",
    category: "GENERAL KNOWLEDGE & TECH",
    badge: "QUESTION 07",
    question: "Which technology creates an immersive computer-generated environment?",
    options: [
      { key: "A", text: "AR" },
      { key: "B", text: "VR" },
      { key: "C", text: "NFC" },
      { key: "D", text: "GPS" }
    ],
    footerText: "THINKX • QUIZ"
  },
  {
    id: 9,
    qNum: "08/30",
    index: 8,
    type: "mcq",
    category: "GENERAL KNOWLEDGE & TECH",
    badge: "QUESTION 08",
    question: "Which AI field deals with images?",
    options: [
      { key: "A", text: "Computer Vision" },
      { key: "B", text: "Natural Language Processing" },
      { key: "C", text: "Robotics" },
      { key: "D", text: "Cybersecurity" }
    ],
    footerText: "THINKX • QUIZ"
  },
  {
    id: 10,
    qNum: "09/30",
    index: 9,
    type: "mcq",
    category: "GENERAL KNOWLEDGE & TECH",
    badge: "QUESTION 09",
    question: "Which language is mainly used for web styling?",
    options: [
      { key: "A", text: "Python" },
      { key: "B", text: "Java" },
      { key: "C", text: "CSS" },
      { key: "D", text: "SQL" }
    ],
    footerText: "THINKX • QUIZ"
  },
  {
    id: 11,
    qNum: "10/30",
    index: 10,
    type: "logo",
    category: "LOGO ROUND",
    badge: "LOGO ROUND",
    question: "Identify the brand",
    image: "assets/images/quiz/q10_maserati.jpeg",
    footerText: "THINKX • QUIZ"
  },
  {
    id: 12,
    qNum: "11/30",
    index: 11,
    type: "logo",
    category: "LOGO ROUND",
    badge: "LOGO ROUND",
    question: "Identify the brand",
    image: "assets/images/quiz/q11_chevrolet.png",
    footerText: "THINKX • QUIZ"
  },
  {
    id: 13,
    qNum: "12/30",
    index: 12,
    type: "logo",
    category: "LOGO ROUND",
    badge: "LOGO ROUND",
    question: "Identify the brand",
    image: "assets/images/quiz/q12_skoda.jpeg",
    footerText: "THINKX • QUIZ"
  },
  {
    id: 14,
    qNum: "13/30",
    index: 13,
    type: "logo",
    category: "LOGO ROUND",
    badge: "LOGO ROUND",
    question: "Identify the brand",
    image: "assets/images/quiz/q13_cadillac.png",
    footerText: "THINKX • QUIZ"
  },
  {
    id: 15,
    qNum: "14/30",
    index: 14,
    type: "logo",
    category: "LOGO ROUND",
    badge: "LOGO ROUND",
    question: "Identify the brand",
    image: "assets/images/quiz/q14_koenigsegg.jpeg",
    footerText: "THINKX • QUIZ"
  },
  {
    id: 16,
    qNum: "15/30",
    index: 15,
    type: "logo",
    category: "LOGO ROUND",
    badge: "LOGO ROUND",
    question: "Identify the brand",
    image: "assets/images/quiz/q15_hm.jpeg",
    footerText: "THINKX • QUIZ"
  },
  {
    id: 17,
    qNum: "16/30",
    index: 16,
    type: "logo",
    category: "LOGO ROUND",
    badge: "LOGO ROUND",
    question: "Identify the brand",
    image: "assets/images/quiz/q16_infiniti.jpeg",
    footerText: "THINKX • QUIZ"
  },
  {
    id: 18,
    qNum: "17/30",
    index: 17,
    type: "logo",
    category: "LOGO ROUND",
    badge: "LOGO ROUND",
    question: "Identify the brand",
    image: "assets/images/quiz/q17_chrysler.png",
    footerText: "THINKX • QUIZ"
  },
  {
    id: 19,
    qNum: "18/30",
    index: 18,
    type: "logo",
    category: "LOGO ROUND",
    badge: "LOGO ROUND",
    question: "Identify the brand",
    image: "assets/images/quiz/q18_lexus.png",
    footerText: "THINKX • QUIZ"
  },
  {
    id: 20,
    qNum: "19/30",
    index: 19,
    type: "logo",
    category: "LOGO ROUND",
    badge: "LOGO ROUND",
    question: "Identify the brand",
    image: "assets/images/quiz/q19_brabus.jpeg",
    footerText: "THINKX • QUIZ"
  },
  {
    id: 21,
    qNum: "20/30",
    index: 20,
    type: "spot_difference",
    category: "SPOT THE DIFFERENCE",
    badge: "SPOT THE DIFFERENCE",
    question: "Which one is correct?",
    subPrompt: "A or B",
    image: "assets/images/quiz/q20_google.png",
    footerText: "THINKX • QUIZ"
  },
  {
    id: 22,
    qNum: "21/30",
    index: 21,
    type: "spot_difference",
    category: "SPOT THE DIFFERENCE",
    badge: "SPOT THE DIFFERENCE",
    question: "Which one is correct?",
    subPrompt: "A or B",
    image: "assets/images/quiz/q21_coca_cola.png",
    footerText: "THINKX • QUIZ"
  },
  {
    id: 23,
    qNum: "22/30",
    index: 22,
    type: "spot_difference",
    category: "SPOT THE DIFFERENCE",
    badge: "SPOT THE DIFFERENCE",
    question: "Which one is correct?",
    subPrompt: "A or B",
    image: "assets/images/quiz/q22_starbucks.jpeg",
    footerText: "THINKX • QUIZ"
  },
  {
    id: 24,
    qNum: "23/30",
    index: 23,
    type: "spot_difference",
    category: "SPOT THE DIFFERENCE",
    badge: "SPOT THE DIFFERENCE",
    question: "Which one is correct?",
    subPrompt: "A or B",
    image: "assets/images/quiz/q23_microsoft.jpeg",
    footerText: "THINKX • QUIZ"
  },
  {
    id: 25,
    qNum: "24/30",
    index: 24,
    type: "spot_difference",
    category: "SPOT THE DIFFERENCE",
    badge: "SPOT THE DIFFERENCE",
    question: "Which one is correct?",
    subPrompt: "A or B",
    image: "assets/images/quiz/q24_android.png",
    footerText: "THINKX • QUIZ"
  },
  {
    id: 26,
    qNum: "25/30",
    index: 25,
    type: "spot_difference",
    category: "SPOT THE DIFFERENCE",
    badge: "SPOT THE DIFFERENCE",
    question: "Which one is correct?",
    subPrompt: "A or B",
    image: "assets/images/quiz/q25_ford.jpeg",
    footerText: "THINKX • QUIZ"
  },
  {
    id: 27,
    qNum: "26/30",
    index: 26,
    type: "spot_difference",
    category: "SPOT THE DIFFERENCE",
    badge: "SPOT THE DIFFERENCE",
    question: "Which one is correct?",
    subPrompt: "A or B",
    image: "assets/images/quiz/q26_tesla.jpeg",
    footerText: "THINKX • QUIZ"
  },
  {
    id: 28,
    qNum: "27/30",
    index: 27,
    type: "spot_difference",
    category: "SPOT THE DIFFERENCE",
    badge: "SPOT THE DIFFERENCE",
    question: "Which one is correct?",
    subPrompt: "A or B",
    image: "assets/images/quiz/q27_shell.jpeg",
    footerText: "THINKX • QUIZ"
  },
  {
    id: 29,
    qNum: "28/30",
    index: 28,
    type: "spot_difference",
    category: "SPOT THE DIFFERENCE",
    badge: "SPOT THE DIFFERENCE",
    question: "Which one is correct?",
    subPrompt: "A or B",
    image: "assets/images/quiz/q28_bmw.jpeg",
    footerText: "THINKX • QUIZ"
  },
  {
    id: 30,
    qNum: "29/30",
    index: 29,
    type: "spot_difference",
    category: "SPOT THE DIFFERENCE",
    badge: "SPOT THE DIFFERENCE",
    question: "Which one is correct?",
    subPrompt: "A or B",
    image: "assets/images/quiz/q29_under_armour.png",
    footerText: "THINKX • QUIZ"
  },
  {
    id: 31,
    qNum: "30/30",
    index: 30,
    type: "spot_difference",
    category: "SPOT THE DIFFERENCE",
    badge: "SPOT THE DIFFERENCE",
    question: "Which one is correct?",
    subPrompt: "A or B",
    image: "assets/images/quiz/q30_twitter.jpeg",
    footerText: "THINKX • QUIZ"
  },
  {
    id: 32,
    type: "thank_you",
    category: "CONCLUSION",
    badge: "EVENT WRAP-UP",
    title: "Thank You",
    subtitle: "All the best!",
    brandText: "ThinkX",
    footerText: "AIML Department • INTELLIX Association"
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = QUIZ_DATA;
}
