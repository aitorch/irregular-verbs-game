import { QuestionManager } from './QuestionManager';
import { verbs } from './verbs';
import { GameState } from './GameState';

describe('QuestionManager', () => {
  let questionManager;
  let gameState;

  beforeEach(() => {
    localStorage.clear();
    questionManager = new QuestionManager(verbs);
    gameState = new GameState();
  });

  test('should generate valid question structure', () => {
    const phaseVerbs = gameState.getPhaseVerbs(verbs);
    const question = questionManager.generateQuestion(phaseVerbs);
    
    expect(question).toHaveProperty('verb');
    expect(question.template.length).toBeGreaterThan(0);
    expect(question.answers.length).toBeGreaterThan(0);
  });

  test('should validate correct answers', () => {
    const testVerb = {
      infinitive: 'eat',
      past: 'ate',
      participle: 'eaten',
      infinitiveKey: 'eat',
      pastKey: 'ate',
      participleKey: 'eaten'
    };
    
    const question = {
      answers: ['ate', 'eaten'],
      type: 'fill-blanks'
    };

    expect(questionManager.checkAnswer(['ate', 'eaten'], question)).toBe(true);
    expect(questionManager.checkAnswer(['ate', 'wrong'], question)).toBe(false);
  });

  test('should generate progressive hints', () => {
    const question = {
      answers: ['ate', 'eaten'],
      type: 'fill-blanks'
    };

    expect(questionManager.getHint(3, question)).toEqual(['a__', 'e____']);
    expect(questionManager.getHint(4, question)).toEqual(['at_', 'ea___']);
  });
});
