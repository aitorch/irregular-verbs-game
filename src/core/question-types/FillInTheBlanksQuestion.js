export class FillInTheBlanksQuestion {
  getRandomForm() {
    const forms = ['infinitive', 'past', 'participle'];
    return forms[Math.floor(Math.random() * forms.length)];
  }

  generate(verb) {
    const revealed = this.getRandomForm();
    const answerForms = ['infinitive', 'past', 'participle'].filter(f => f !== revealed);
    
    return {
      template: this.createTemplate(verb, revealed, answerForms),
      answers: this.getAnswers(verb, answerForms),
      verb
    };
  }

  createTemplate(verb, revealed) {
    let answerIndex = 0;
    return ['infinitive', 'past', 'participle'].flatMap((form, index, arr) => {
      const elements = [];
      
      if (form === revealed) {
        elements.push({ 
          type: 'text', 
          value: verb[`display${form.charAt(0).toUpperCase() + form.slice(1)}`] || verb[form] 
        });
      } else {
        elements.push({
          type: 'input',
          placeholder: `${form} form`,
          expected: verb[`${form}Key`] || verb[form],
          answerIndex: answerIndex++
        });
      }
  
      if (index < arr.length - 1) {
        elements.push({ type: 'separator', value: ', ' });
      }
  
      return elements;
    });
  }
  getAnswers(verb, answerForms) {
    return answerForms.map(form => verb[`${form}Key`]);
  }

  check(userAnswers, correctAnswers) {
    try {
      return userAnswers.every((answer, index) => {
        // Normalize user input and compare with stored key
        const normalizedAnswer = answer
          .trim()
          .toLowerCase()
          .replace(/ /g, '_');
        return normalizedAnswer === correctAnswers[index].toLowerCase();
      });
    } catch {
      return false;
    }
  }

  getHint(attempts, correctAnswers) {
    const revealedChars = Math.max(0, attempts - 3);
    return correctAnswers.map(answer => {
      // Convert internal underscores back to spaces for display
      const displayAnswer = answer.replace(/_/g, ' ');
      return displayAnswer
        .split('')
        .map((char, index) => index < revealedChars ? char : '_')
        .join('');
    });
  }
}
