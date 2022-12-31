import React, { useState, useEffect } from 'react';
import './style.css';
import Alert from "./alert.js";
function RegistrationForm() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    age: '',
    date: '',
    batch: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, phone, gender, age, date, batch } =
      user;

      setFormErrors(validate(user));
    setIsSubmit(true);
    if (
        firstName&&
        lastName&&
        email&&
        phone &&
      gender &&
      age &&
      date &&
      batch
    ) {
      const res = await fetch(
        'https://registration-form-9f4f1-default-rtdb.firebaseio.com/yogaregistration.json',
        {
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phone,
            gender,
            age,
            date,
            batch,
          }),
        }
      );

      if (res) {
        setUser({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          gender: '',
          age: '',
          date: '',
          batch: '',
        });

        alert('sent');
      }
    } else {
      alert('fill All the form details' );
    }
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
    }
  });

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
      errors.firstName = "firstName is required!";
    }

    if (!values.lastName) {
        errors.lastName = "lastName is required!";
      }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }


    if (!values.phone) {
      errors.phone = "phone is required";
    } else if (values.phone.length < 10) {
      errors.phone = "incorrect Number";
    } else if (values.phone.length > 10) {
      errors.phone = "phone Number is invalid";
    }

    if (!values.age) {
        errors.age = "age is required";
      } else if (values.age < 18) {
        errors.age = "invalid age";
      } else if (values.age > 65) {
        errors.age = "age is greater";
      }


    return errors;
  };

  return (
    
    <div>{Object.keys(formErrors).length === 0 && isSubmit ? (
        <Alert/>
      ) : (
        <pre className="white">{JSON.stringify(user, undefined, 2)}</pre>
      )}
    <form action="" method="POST">
        
      <div className="form">
        <div className="form-body">
        
          <div className="username">
            <label className="form__label" for="firstName">
              First Name{' '}
            </label>
            <input
              className="form__input"
              type="text"
              value={user.firstName}
              onChange={handleInputChange}
              id="firstName"
              placeholder="First Name"
            />
            <p className="red">{formErrors.firstName}</p>
          </div>
          
          <div className="lastname">
            <label className="form__label" for="lastName">
              Last Name{' '}
            </label>
            <input
              type="text"
              name=""
              id="lastName"
              value={user.lastName}
              className="form__input"
              onChange={handleInputChange}
              placeholder="LastName"
            />
            <p className="red">{formErrors.lastName}</p>
          </div>
          
          <div className="email">
            <label className="form__label" for="email">
              Email{' '}
            </label>
            <input
              type="email"
              id="email"
              className="form__input"
              value={user.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <p className="red">{formErrors.email}</p>
          </div>

          <div className="phone">
            <label className="form__label" for="phone">
              Phone{' '}
            </label>
            <input
              type="phone"
              id="phone"
              className="form__input"
              value={user.phone}
              onChange={handleInputChange}
              placeholder="Phone"
            />
            <p className="red">{formErrors.phone}</p>
          </div>
          <div className="gender">
            <label className="form__label" for="gender">
              Gender{' '}
            </label>
            <select
              name="gender"
              id="gender"
              className="form__input"
              value={user.gender}
              onChange={handleInputChange}
              placeholder="Gender"
            >
                <option value="select">select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <p className="red">{formErrors.gender}</p>
            </select>
          </div>
          <div className="age">
            <label className="form__label" for="age">
              Age{' '}
            </label>
            <input
              className="form__input"
              type="number"
              id="age"
              value={user.age}
              onChange={handleInputChange}
              placeholder="age"
            />
            <p className="red">{formErrors.age}</p>
          </div>
          <div className="date">
            <label className="form__label" for="date">
              Date{' '}
            </label>
            <input
              className="form__input"
              type="date"
              id="date"
              value={user.date}
              onChange={handleInputChange}
              placeholder="Date"
            />
          </div>
          <div className="batch">
            <label className="form__label" for="batch">
              Batches{' '}
            </label>
            <select
              name="batch"
              id="batch"
              className="form__input"
              value={user.batch}
              onChange={handleInputChange}
              placeholder="Batch"
            >
                <option value="select">select</option>
              <option value="6-7AM">6-7AM</option>
              <option value="7-8AM">7-8AM</option>
              <option value="8-9AM">8-9AM</option>
              <option value="5-6PM">5-6PM</option>
            </select>
          </div>
          <div className="pay">
            <p>monthly payment - 500 INR</p>
          </div>
          
        </div>
        <div class="footer">
          <button onClick={postData} type="submit" class="btn">
            Register
          </button>
        </div>
      </div>
    </form>
    </div>
  );
}

export default RegistrationForm;
