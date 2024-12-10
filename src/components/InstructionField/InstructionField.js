import styles from './InstructionField.module.css'

import { useState } from 'react';

const InstructionField = ({ instructions, onInstructionsChange, required }) => {
  const [steps, setSteps] = useState(instructions.length > 0 ? instructions : ['']);

  const handleStepChange = (index, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = value;
    setSteps(updatedSteps);
    onInstructionsChange(updatedSteps);
  };

  const addStep = () => {
    setSteps((prev) => [...prev, '']);
  };

  const removeStep = (index) => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    setSteps(updatedSteps);
    onInstructionsChange(updatedSteps);
  };

  return (
    <div >
      <small>Zubereitungsschritte</small>
      <br></br>
      {steps.map((step, index) => (
        <div key={index} className={styles.instructions}>
          <label htmlFor={`step-${index}`}>Schritt {index + 1}:</label>
          <textarea
            required={true}
            id={`step-${index}`}
            value={step}
            onChange={(e) => handleStepChange(index, e.target.value)}
          />
          <button type="button" onClick={() => removeStep(index)} className={styles.remove_instructions_btn}>
            Schritt entfernen
          </button>
        </div>
      ))}
      <button type="button" onClick={addStep} className={styles.add_instructions_btn}>
        Weiteren Schritt hinzufügen
      </button>
    </div>
  );
};

export default InstructionField;