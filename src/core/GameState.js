export class GameState {
  constructor() {
    this.currentPhase = 1;
    this.score = 0;
    this.unlockedPhases = [1]; // Start with phase 1 unlocked
    this.storage = typeof localStorage !== 'undefined' ? localStorage : {
      getItem: () => null,
      setItem: () => {}
    };
    this.phaseVerbs = [];
    this.load();
  }

  load() {
    const saved = this.storage.getItem('verbGameState');
    if (saved) {
      const { phase, score, unlocked } = JSON.parse(saved);
      this.currentPhase = phase;
      this.score = score;
      this.unlockedPhases = unlocked;
    }
  }

  save() {
    this.storage.setItem('verbGameState', JSON.stringify({
      phase: this.currentPhase,
      score: this.score,
      unlocked: this.unlockedPhases

    }));
  }

  getPhaseVerbs(allVerbs) {
    console.log(this.currentPhase)
    const newVerbsStart = (this.currentPhase - 1) * 5;
    const newVerbsEnd = newVerbsStart + 5;
    
    // Get new verbs for this phase
    const newVerbs = allVerbs.slice(newVerbsStart, newVerbsEnd);
    
    // Get 5 random verbs from previous phases
    const previousVerbs = allVerbs.slice(0, newVerbsStart);
    const reviewVerbs = this.getRandomVerbs(previousVerbs, 5);
    console.log(newVerbs + " " + reviewVerbs)
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
    this.save();
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
  unlockNextPhase() {
    const nextPhase = this.currentPhase + 1;
    if (!this.unlockedPhases.includes(nextPhase)) {
      this.unlockedPhases = [...this.unlockedPhases, nextPhase];
      this.save();
    }
  }
}
