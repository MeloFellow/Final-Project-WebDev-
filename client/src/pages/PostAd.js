import styled from "styled-components";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { InformationContext } from "../InformationProvider";
import { useContext } from "react";
import Header from "../components/Header";
// import { useAuth0 } from "@auth0/auth0-react";

const PostAd = () => {
  const data = useContext(InformationContext);
  const { latestUser, currentUserId } = data;
  let disabledStatus = false;

  const history = useHistory();

  // const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
  // console.log("USER SIGNED IN IN POST AD", user);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState();
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [size, setSize] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [available, setAvailable] = useState(true);
  const [yearValue, setYearValue] = useState(1);

  const postAdInformation = async (data) => {
    console.log(`postAdInformation function is called`);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("condition", condition);
    formData.append("size", size);
    formData.append("year", year);
    formData.append("mileage", mileage);
    formData.append("available", available);
    formData.append("owner", currentUserId);

    const response = await fetch("/api/post-item", {
      method: "POST",
      body: formData,
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
    });
    // .then(// if status is 200 then make a popup that says success).catch(// if caught an error, display popup error try again);
    console.log("RESPONSE", response);
    return response;
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value.slice(0, 6));
  };

  const handleMileageChange = (event) => {
    setMileage(event.target.value.slice(0, 6));
  };

  const handleYearChange = (event) => {
    setYear(event.target.value.slice(0, 6));
  };

  const formValidation = (event) => {
    event.preventDefault();
    //   let flag1 = false;
    //   if (year < 1900 || (year > 2022 && year !== "")) {
    //     flag1 = true;
    //     alert("Year must be between '1900' and '2022'");
    //     return false;
    //   } else {
    postAdInformation();
    //   }
  };

  return (
    <>
      {/* <Header></Header> */}
      <Background />
      <FormWrapper>
        <Form onSubmit={formValidation}>
          <UserFormLabel>Name</UserFormLabel>
          <Input
            type="text"
            id="Name"
            placeholder="Ad Name"
            minLength={8}
            maxLength={50}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <UserFormLabel>Category</UserFormLabel>
          <Dropdown
            type="select"
            id="category"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Tools">Tools</option>
            <option value="Toys">Toys</option>
          </Dropdown>
          <UserFormLabel>Price</UserFormLabel>
          <Input
            type="number"
            id="Price"
            min={0}
            max={999999}
            placeholder="Price"
            value={price}
            onChange={handlePriceChange}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            // value={lastName}
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
          />
          <UserFormLabel>Description</UserFormLabel>
          <Input
            type="text"
            id="description"
            placeholder="Description"
            minLength={20}
            maxLength={500}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {category === "Real Estate" ? (
            <></>
          ) : (
            <>
              <UserFormLabel>Condition</UserFormLabel>
              <Condition
                type="text"
                id="condition"
                placeholder="Condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </Condition>
            </>
          )}
          {category === "Real Estate" ? (
            <>
              <UserFormLabel>Size</UserFormLabel>
              <Size
                type="text"
                id="size"
                placeholder="Size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="">Select Size</option>
                <option value="2.5">Studio</option>
                <option value="3.5">1 Bedroom</option>
                <option value="4.5">2 Bedroom</option>
                <option value="5.5">3 Bedroom</option>
                <option value="5.5">3 Bedroom</option>
              </Size>
            </>
          ) : (
            <></>
          )}
          {category === "Vehicles" ? (
            <>
              <UserFormLabel>Year</UserFormLabel>
              <Input
                type="number"
                id="size"
                placeholder="Year"
                value={year}
                min={1900}
                max={2022}
                onChange={handleYearChange}
              ></Input>
            </>
          ) : (
            <></>
          )}
          {category === "Vehicles" ? (
            <>
              <UserFormLabel>Mileage</UserFormLabel>
              <Input
                type="number"
                id="mileage"
                placeholder="Year"
                value={mileage}
                onChange={handleMileageChange}
                min={0}
                max={999999}
              ></Input>
            </>
          ) : (
            <></>
          )}

          <ConfirmButton
            type="submit"
            value="Confirm"
            disabled={disabledStatus}
          >
            Confirm
          </ConfirmButton>
        </Form>
      </FormWrapper>
    </>
  );
};

const FormWrapper = styled.div`
  position: absolute;
  width: 592px;
  height: 512px;
  left: 50%;
  top: 50%;
  background-color: #fff;
  margin-left: -296px; /*image width/2 */
  margin-top: -256px; /*image height/2 */
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
`;

const ConfirmButton = styled.button`
  display: inline-block;
  width: 100%;
  font: normal normal 300 1.3em "Open Sans";
  text-decoration: none;

  color: #457b9dff;
  brackground-color: transparent;
  border: 1px solid #457b9dff;
  border-radius: 100px;

  padding: 0.3em 1.2em;
  margin: 5px;

  background-size: 200% 100%;
  background-image: linear-gradient(to right, transparent 50%, #f1faeeff, 50%);
  transition: background-position 0.3s cubic-bezier(0.19, 1, 0.22, 1) 0.1s,
    color 0.5s ease 0s, background-color 0.5s ease;

  :hover {
    color: rgba(255, 255, 255, 1);
    background-color: #457b9dff;
    background-position: -100% 100%;
  }
`;

const UploadFile = styled.input`
  font-family: "Roboto", sans-serif;
  color: #333;
  font-size: 1rem;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  border-radius: 0.2rem;
  background-color: rgb(255, 255, 255);
  /* border: 1px solid; */
  width: 200%;
  display: block;
  /* border-bottom: 0.3rem solid transparent; */
  transition: all 0.3s;
`;

const Input = styled.input`
  font-family: "Roboto", sans-serif;
  color: #333;
  font-size: 1rem;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  border-radius: 0.2rem;
  background-color: rgb(255, 255, 255);
  border: 1px solid;
  width: 200%;
  display: block;
  height: 10px;
  /* border-bottom: 0.3rem solid transparent; */
  transition: all 0.3s;
`;

const Condition = styled.select`
  font-family: "Roboto", sans-serif;
  color: #333;
  font-size: 1rem;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  border-radius: 0.2rem;
  background-color: rgb(255, 255, 255);
  border: 1px solid;
  width: 200%;
  display: block;
  /* border-bottom: 0.3rem solid transparent; */
  transition: all 0.3s;
`;

const Size = styled.select`
  font-family: "Roboto", sans-serif;
  color: #333;
  font-size: 1rem;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  border-radius: 0.2rem;
  background-color: rgb(255, 255, 255);
  border: 1px solid;
  width: 200%;
  display: block;
  /* border-bottom: 0.3rem solid transparent; */
  transition: all 0.3s;
`;

const Dropdown = styled.select`
  font-family: "Roboto", sans-serif;
  color: #333;
  font-size: 1rem;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  border-radius: 0.2rem;
  background-color: rgb(255, 255, 255);
  border: 1px solid;
  width: 200%;
  display: block;
  /* border-bottom: 0.3rem solid transparent; */
  transition: all 0.3s;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border: 3px solid var(--color-alabama-crimson);
  padding: 1%;
  width: 40%;
  align-items: center;
`;

export default PostAd;
