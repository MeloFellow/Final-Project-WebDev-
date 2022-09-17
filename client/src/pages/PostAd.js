import styled from "styled-components";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { InformationContext } from "../InformationProvider";
import { useContext } from "react";

const PostAd = () => {
  const data = useContext(InformationContext);
  const { latestUser, currentUserId } = data;
  let disabledStatus = false;

  const history = useHistory();

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
    console.log("FORM DATA", formData);
    const response = await fetch(
      "/api/post-item",
      {
        method: "POST",
        body: formData,
      }
      // console.log("response", response)
    );

    if (response.status === 200) {
      const newItemId = await response.json();
      console.log("item data", newItemId.data._id);
      // console.log("RESPONSE Data", response.json().data);
      history.push(`/confirmed/${newItemId.data._id}`);
      return response;
    }
    console.log("RESPONSE", response.status);
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
    postAdInformation();
  };

  return (
    <>
      <Background />
      <FormWrapper>
        <Form onSubmit={formValidation}>
          <UserFormLabel>Ad Name</UserFormLabel>
          <Input
            type="text"
            id="Name"
            placeholder="Be Engaging!"
            minLength={8}
            maxLength={50}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <UserFormLabel>Category</UserFormLabel>
          <Dropdown
            type="select"
            id="category"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
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
            required
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
            required
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
          <UserFormLabel>Description</UserFormLabel>
          <Description
            type="text"
            id="description"
            placeholder="Description"
            minLength={20}
            maxLength={500}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {category === "Real Estate" || category === "" ? (
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
                required
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
                required
              >
                <option value="">Select Size</option>
                <option value="2.5">Studio</option>
                <option value="3.5">1 Bedroom</option>
                <option value="4.5">2 Bedroom</option>
                <option value="5.5">3 Bedroom</option>
                <option value="5.5">4 Bedroom</option>
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
                required
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
                placeholder="Mileage"
                value={mileage}
                onChange={handleMileageChange}
                min={0}
                max={999999}
                required
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
  top: 20%;
`;

const Background = styled.div`
  /* height: 100vh; */
  width: 100%;
  background: #0f2027;
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

const Description = styled.textarea`
  background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 18px;
  height: 100px;
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

const Condition = styled.select`
  margin-bottom: 10px;
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
`;

const Size = styled.select`
  transition: all 0.3s;
  margin-bottom: 10px;
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
  padding: 20px 20px 20px;
`;

const Dropdown = styled.select`
  transition: all 0.3s;
  margin-bottom: 10px;
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

export default PostAd;
