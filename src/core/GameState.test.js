import { GameState } from './GameState';
import { verbs } from './verbs';

describe('GameState', () => {
  let gameState;

  beforeEach(() => {
    localStorage.clear();
    gameState = new GameState();
  });

  test('should initialize with phase 1 and score 0', () => {
    expect(gameState.currentPhase).toBe(1);
    expect(gameState.score).toBe(0);
  });

  test('should load saved state', () => {
    localStorage.setItem('verbGameState', JSON.stringify({ phase: 3, score: 250 }));
    const loadedState = new GameState();
    expect(loadedState.currentPhase).toBe(3);
    expect(loadedState.score).toBe(250);
  });

  test('should generate phase verbs with correct structure', () => {
    let phaseVerbs = gameState.getPhaseVerbs(verbs);
    expect(phaseVerbs.length).toBe(5);
    expect(phaseVerbs[0]).toHaveProperty('infinitiveKey');
    expect(phaseVerbs[0]).toHaveProperty('displayInfinitive');
    gameState.score = 100;
    expect(gameState.checkPhaseProgress(100)).toBe(true);
    expect(gameState.currentPhase).toBe(2);
    phaseVerbs = gameState.getPhaseVerbs(verbs);
    expect(phaseVerbs.length).toBe(10);

    

  });

  test('should progress to next phase when score threshold met', () => {
    gameState.score = 100;
    expect(gameState.checkPhaseProgress(100)).toBe(true);
    expect(gameState.currentPhase).toBe(2);
  });
});
