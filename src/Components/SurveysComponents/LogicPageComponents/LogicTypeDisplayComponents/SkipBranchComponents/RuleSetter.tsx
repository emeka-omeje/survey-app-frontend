import React from 'react';
import styles from './skip_branch.module.css';
import AvailableQuestionListDisplay from './AvailableQuestionListDisplay';

const RuleSetter = () => {
    const [logicIfQuestion, setLogicIfQuestion] = React.useState<string | null>(null);
    const [logicConditionStatement, setLogicConditionStatement] = React.useState<string | null>(null);
    const [logicConditionValue, setLogicConditionValue] = React.useState<string | number | boolean | null>(null);
    // const [thenAction, setThenAction] = React.useState<string | null>(null);

    return (
    <div className={styles.ruleSetter_wrapper}>
          <h2>If</h2>
          <span>
              <AvailableQuestionListDisplay />
          </span>
    </div>
  );
}

export default RuleSetter;