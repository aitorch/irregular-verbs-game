import { FillInTheBlanksQuestion } from './question-types/FillInTheBlanksQuestion';

export class QuestionManager {
  constructor(verbs) {
    this.verbs = verbs;
    this.questionTypes = {
      'fill-blanks': new FillInTheBlanksQuestion()
    };
  }

  generateQuestion(phaseVerbs) {
    if (!phaseVerbs || phaseVerbs.length === 0) {
      console.error("No verbs available for question generation!");
      return null;
    }
  
    const verb = this.getRandomVerb(phaseVerbs);
    const type = 'fill-blanks';
    const questionData = this.questionTypes[type].generate(verb);
  
    console.log("Generated question data:", questionData); // Debug log
  
    return {
      type,
      ...questionData,
      verb
    };
  }

  checkAnswer(userAnswers, currentQuestion) {
    if (!currentQuestion || !currentQuestion.answers) {
      console.error("Invalid question or answers:", currentQuestion);
      return false;
    }
  
    console.log("User answers:", userAnswers);
    console.log("Correct answers:", currentQuestion.answers);
  
    try {
      const isCorrect = userAnswers.every((answer, index) => {
        const normalizedAnswer = answer.trim().toLowerCase();
        const correctAnswer = currentQuestion.answers[index].toLowerCase();
        console.log(`Comparing "${normalizedAnswer}" with "${correctAnswer}"`);
        return normalizedAnswer === correctAnswer;
      });
  
      console.log("Answer is correct:", isCorrect);
      return isCorrect;
    } catch (error) {
      console.error("Error checking answers:", error);
      return false;
    }
  }

  getHint(attempts, currentQuestion) {
    if (!currentQuestion || !currentQuestion.type) {
      console.error("Invalid question object:", currentQuestion);
      return [];
    }
  
    return this.questionTypes[currentQuestion.type].getHint(
      attempts,
      currentQuestion.answers
    );
  }

  getRandomVerb(verbs) {
    return verbs[Math.floor(Math.random() * verbs.length)];
  }
}
