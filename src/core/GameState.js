export class GameState {
  constructor() {
    this.currentPhase = 1;
    this.score = 0;
    this.phaseVerbs = [];
    this.load();
  }

  load() {
    const saved = localStorage.getItem('verbGameState');
    if (saved) {
      const { phase, score } = JSON.parse(saved);
      this.currentPhase = phase;
      this.score = score;
    }
  }

  save() {
    localStorage.setItem('verbGameState', JSON.stringify({
      phase: this.currentPhase,
      score: this.score
    }));
  }

  getPhaseVerbs(allVerbs) {
    const newVerbsStart = (this.currentPhase - 1) * 5;
    const newVerbsEnd = newVerbsStart + 5;
    
    // Get new verbs for this phase
    const newVerbs = allVerbs.slice(newVerbsStart, newVerbsEnd);
    
    // Get 5 random verbs from previous phases
    const previousVerbs = allVerbs.slice(0, newVerbsStart);
    const reviewVerbs = this.getRandomVerbs(previousVerbs, 5);
    
    return [...newVerbs, ...reviewVerbs].map(verb => this.normalizeVerb(verb));
  }

  getRandomVerbs(verbsArray, count) {
    return [...verbsArray]
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  }

  checkPhaseProgress(newScore) {
    const requiredScore = this.currentPhase * 100;
    if (newScore >= requiredScore) {
      this.currentPhase++;
      this.save();
      return true;
    }
    return false;
  }

  normalizeVerb(verb) {
    return {
      ...verb,
      infinitiveKey: verb.infinitive.replace(/ /g, '_'),
      pastKey: verb.past.replace(/ /g, '_'),
      participleKey: verb.participle.replace(/ /g, '_'),
      displayInfinitive: verb.infinitive,
      displayPast: verb.past,
      displayParticiple: verb.participle
    };
  }

  getDisplayForms(verb) {
    return {
      infinitive: verb.displayInfinitive,
      past: verb.displayPast,
      participle: verb.displayParticiple
    };
  }
}
