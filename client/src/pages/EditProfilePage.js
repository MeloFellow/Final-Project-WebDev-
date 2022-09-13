import styled from "styled-components";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const EditProfilePage = () => {
  const { _id } = useParams();
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState();

  console.log("currentUserId", _id);

  const patchProfileInformation = async () => {
    console.log(`PATCH ProfileInformation function is called`);
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phonenumber", phonenumber);
    formData.append("location", location);
    formData.append("image", image);

    const formDataObj = Object.fromEntries(formData.entries());

    console.log("FORM DATA OBJ", formDataObj);

    const response = await fetch(`/api/edit-user/${_id}`, {
      method: "POST",
      body: formData,
    });

    if (response.status === 200) {
      history.push(`/profile/${_id}`);
      return response;
    }
    console.log("RESPONSE", response);
    return response;
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const formValidation = (event) => {
    event.preventDefault();

    patchProfileInformation();
  };

  return (
    <>
      <Background />
      <FormWrapper>
        <Form onSubmit={formValidation}>
          <UserFormLabel>First Name</UserFormLabel>
          <Input
            type="text"
            id="firstName"
            placeholder="First Name"
            minLength={2}
            maxLength={50}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <UserFormLabel>Last Name</UserFormLabel>
          <Input
            type="text"
            id="lastName"
            placeholder="Last Name"
            minLength={2}
            maxLength={50}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <UserFormLabel>Email</UserFormLabel>
          <Input
            type="text"
            id="email"
            placeholder="Last Name"
            minLength={2}
            maxLength={50}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <UserFormLabel>Phone Number</UserFormLabel>
          <Input
            type="number"
            id="phonenumber"
            minLength={10}
            placeholder="Phone Number"
            value={phonenumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <UserFormLabel>Location</UserFormLabel>
          <Input
            type="text"
            id="location"
            placeholder="Location"
            value={location}
            minLength={8}
            maxLength={80}
            onChange={(e) => setLocation(e.target.value)}
          />
          <UserFormLabel>Image</UserFormLabel>
          <UploadFile
            type="file"
            accept="image/*"
            id="image"
            placeholder="Image"
            onChange={fileSelected}
            required
          />

          <ConfirmButton type="submit" value="Confirm">
            Confirm
          </ConfirmButton>
        </Form>
      </FormWrapper>
    </>
  );
};

const FormWrapper = styled.div`
  position: absolute;
  top: 30%;
`;

const Background = styled.div`
  height: 100vh;
  width: 100%;
  background: #0f2027; /* fallback for old browsers */
  background: linear-gradient(to right, #2c5364, #203a43, #0f2027);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #fff;
`;

const UserFormLabel = styled.label`
  margin-left: 20px;
  margin-right: 5px;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const ConfirmButton = styled.button`
  background-color: #457b9dff;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 20px;
  margin-left: 10%;
  margin-right: auto;
  text-align: center;
  width: 80%;
  :hover {
    color: rgba(255, 255, 255, 1);
    background-color: #1ad88c;
    background-position: -100% 100%;
  }
`;

const UploadFile = styled.input`
  transition: all 0.3s;
  background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-size: 18px;
  height: 10%;
  outline: 0;
  padding: 10px 20px 10px;
  width: 100%;
  margin-bottom: 10px;
`;

const Input = styled.input`
  background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-size: 18px;
  height: 20%;
  outline: 0;
  padding: 10px 20px 10px;
  width: 100%;
  margin-bottom: 10px;
`;

const Form = styled.form`
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 20px;
  width: 30%;
  margin-left: auto;
  margin-right: auto;
`;

export default EditProfilePage;
