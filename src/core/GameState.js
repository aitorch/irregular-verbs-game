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
    const start = (this.currentPhase - 1) * 5;
    return allVerbs
      .slice(0, start + 10)
      .map(verb => this.normalizeVerb(verb));
  }

  progressPhase() {
    this.currentPhase = Math.min(this.currentPhase + 1, 5); // Limit to 5 phases
    this.save();
  }

  normalizeVerb(verb) {
    return {
      ...verb,
      // Internal processing versions
      infinitiveKey: verb.infinitive.replace(/ /g, '_'),
      pastKey: verb.past.replace(/ /g, '_'),
      participleKey: verb.participle.replace(/ /g, '_'),
      // Original display versions
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
