import { FillInTheBlanksQuestion } from './FillInTheBlanksQuestion';

describe('FillInTheBlanksQuestion', () => {
  let questionType;
  const testVerb = {
    infinitive: 'go',
    past: 'went',
    participle: 'gone',
    infinitiveKey: 'go',
    pastKey: 'went',
    participleKey: 'gone'
  };

  beforeEach(() => {
    questionType = new FillInTheBlanksQuestion();
  });

  test('should generate question template', () => {
    const question = questionType.generate(testVerb);
    expect(question.template).toEqual(expect.arrayContaining([
      expect.objectContaining({ type: expect.any(String) })
    ]));
  });

  test('should validate normalized answers', () => {
    const question = questionType.generate(testVerb);
    const normalizedAnswers = question.answers.map(a => a.toLowerCase());
    
    expect(questionType.check(normalizedAnswers, question.answers)).toBe(true);
    expect(questionType.check(['wrong'], question.answers)).toBe(false);
  });
});
