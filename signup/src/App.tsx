import React, { useState } from "react";
import axios from "axios";
import "./App.css"
// import Hello from "./Hello"

function SignUpPage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState<Blob | null>(null);
  const [errorMessage, setErrorMessage] = useState("");


  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleMobileNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMobileNumber(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setPicture(file);
    }
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const formData = new FormData();
    if (picture) {
      // Do something with the image
      console.log('Picture:', picture);
    } else {
      console.log('No picture selected');
    }
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("email", email);
    formData.append("mobileNumber", mobileNumber);
    formData.append("password", password);
    formData.append("picture", picture);
    // TODO: send the form data to the backend server

    try {
      const response = await axios.post("/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      // do something with response data
    } catch (error) {
      setErrorMessage("Error signing up. Please try again.");
      console.error(error);
    }

  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <label>
          Surname:
          <input type="text" value={surname} onChange={handleSurnameChange} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          Mobile Number:
          <input type="tel" value={mobileNumber} onChange={handleMobileNumberChange} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <label>
          Picture:
          <input type="file" accept="image/*" onChange={handlePictureChange} />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}

      {/* <Hello /> */}
    </>
  );
}

export default SignUpPage;
