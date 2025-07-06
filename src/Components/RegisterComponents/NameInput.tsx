import React, { useState } from 'react';
import style from './register.module.css';

interface Props {
  setUserFirstName: React.Dispatch<React.SetStateAction<string>>;
  setUserLastName: React.Dispatch<React.SetStateAction<string>>;
}

const NameInputs: React.FC<Props> = function ({
  setUserFirstName,
  setUserLastName,
}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSetName = (e: React.ChangeEvent<HTMLInputElement>, nameType: string) => {
    const value = e.target.value;
    if (nameType === 'firstName') {
      setFirstName(value);
      setUserFirstName(value);
    } else if (nameType === 'lastName') {
      setLastName(value);
      setUserLastName(value);
    }
  };

  return (
    <div className={style.register_input_wrapper}>
      {/* First Name input */}
      <div className={style.register_firstName_container}>
        <label htmlFor="first_name" className={style.register_firstName_label}>
          First Name
        </label>
        <input
          data-testid="first_name"
          id="first_name"
          name='first_name'
          type='text'
          placeholder='First Name'
          className={style.register_firstName_input}
          value={firstName}
          onChange={(e) => handleSetName(e, 'firstName')}
          aria-label="First Name"
          aria-required="true"
        />
      </div>
      {/* Last Name input */}
      <div className={style.register_lastName_container}>
        <label htmlFor="last_name" className={style.register_lastName_label}>
          Last Name
        </label>
        <input
          data-testid="last_name"
          id="last_name"
          name='last_name'
          type='text'
          placeholder='Last Name'
          className={style.register_lastName_input}
          value={lastName}
          onChange={(e) => handleSetName(e, 'lastName')}
          aria-label="Last Name"
          aria-required="true"
        />
      </div>
    </div>
  );
};

export default NameInputs;