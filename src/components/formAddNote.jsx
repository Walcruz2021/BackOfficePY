import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import Swal from "sweetalert2";
import { addNote } from "../reducer/actions";
import { useDispatch } from "react-redux";

function formAddNote() {
  const dispatch = useDispatch();
  const [stateType, setStateType] = useState();

  //state updated arrayImg because it would have to have a default element
  const [stateImgArray, setStateImgArray] = useState([
    {
      id: 1,
      //value: "inputImg1",
      type: "text",
      name: "img1",
      placeholder: "img1",
      typeInput: "img",
    },
  ]);

  const [inputElements, setInputElements] = useState([
    {
      id: 1,
      //value: "inputTitle1",
      type: "text",
      name: "title1",
      placeholder: "title1",
      typeInput: "title",
    },
    {
      id: 2,
      //value: "inputParagraph1",
      type: "text",
      name: "paragraph1",
      placeholder: "paragraph1",
      typeInput: "paragraph",
    },
    {
      id: 3,
      //value: "inputImg1",
      type: "text",
      name: "img1",
      placeholder: "img1",
      typeInput: "img",
    },
  ]);

  const [activeInputIndex, setActiveInputIndex] = useState(null);
  const [stateCantInput, setStateCantInput] = useState({
    cantParagraph: 1,
    cantImg: 1,
    cantTitle: 1,
  });
  const [arrayImg, setArrayImg] = useState([]);
  const [copyValues, setCopyValues] = useState();
console.log(copyValues,"COPY")
  const handleInputClick = (index) => {
    setActiveInputIndex(index);
    //console.log(index,"position")
  };

  // function addInputImg(prop){
  //   setArrayImg((prevImages) => [
  //     ...prevImages,
  //     { [prop]:prop},
  //   ]);
  // }

  function addInput(prop) {
    if (activeInputIndex !== null) {
      if (prop === "paragraph") {
        setStateCantInput((prevState) => ({
          ...prevState,
          cantParagraph: prevState.cantParagraph + 1,
        }));
        const newInput = {
          id: inputElements.length + 1,
          //value: `InputParagraph ${inputElements.length + 1}`,
          name: `paragraph${stateCantInput.cantParagraph + 1}`,
          placeholder: `paragraph${stateCantInput.cantParagraph + 1}`,
          type: "text",
          typeInput: "paragraph",
        };

        const updatedElements = [...inputElements];
        updatedElements.splice(activeInputIndex + 1, 0, newInput);

        setInputElements(updatedElements);
        setActiveInputIndex(null);
      } else if (prop === "img") {
        setStateCantInput((prevState) => ({
          ...prevState,
          cantImg: prevState.cantImg + 1,
        }));
        const newInput = {
          id: inputElements.length + 1,
          //value: `InputImg ${inputElements.length + 1}`,
          name: `img${stateCantInput.cantImg + 1}`,
          placeholder: `img${stateCantInput.cantImg + 1}`,
          type: "text",
          typeInput: "img",
        };

        const newInputImg = {
          id: inputElements.length + 1,
          //value: `InputImg ${inputElements.length + 1}`,
          name: `img${stateCantInput.cantImg + 1}`,
          placeholder: `img${stateCantInput.cantImg + 1}`,
          type: "file",
          typeInput: "img",
        };

        const updatedElements = [...inputElements];
        updatedElements.splice(activeInputIndex + 1, 0, newInput);
        setInputElements(updatedElements);
        setActiveInputIndex(null);

        const arrayElementsImg = [...stateImgArray];
        arrayElementsImg.splice(arrayElementsImg.length, 0, newInputImg);
        setStateImgArray(arrayElementsImg);
        //addInputImg(`img${stateCantInput.cantImg + 1}`)
      } else {
        setStateCantInput((prevState) => ({
          ...prevState,
          cantTitle: prevState.cantTitle + 1,
        }));
        const newInput = {
          id: inputElements.length + 1,
          //value: `InputTiTle ${inputElements.length + 1}`,
          name: `title${stateCantInput.cantTitle + 1}`,
          placeholder: `title${stateCantInput.cantTitle + 1}`,
          type: "text",
          typeInput: "title",
        };

        const updatedElements = [...inputElements];
        updatedElements.splice(activeInputIndex + 1, 0, newInput);

        setInputElements(updatedElements);
        setActiveInputIndex(null);
      }
    } else {
      alert(
        "Haz clic en un input para seleccionarlo antes de agregar uno nuevo."
      );
    }
  }

  function deleteInput(prop) {
    if (activeInputIndex !== null) {
      if (prop === "paragraph") {
        //NO SE DISMINUYE LA CANTIDAD YA QUE SI SE HACE ESO, LUEGO AL AGREGAR UNO QUEDARIA REPETIDO LOS
        //COMPONENTES (el nuevo que se agreggo con el ultimo que habia quedado)
        // setStateCantInput((prevState) => ({
        //   ...prevState,
        //   cantParagraph: prevState.cantParagraph + 1,
        // }));
        const updatedElements = [...inputElements];
        updatedElements.splice(activeInputIndex, 1);
        setInputElements(updatedElements);
        setActiveInputIndex(null);
      } else if (prop === "img") {
        const updatedElements = [...inputElements];
        updatedElements.splice(activeInputIndex, 1);
        setInputElements(updatedElements);
        setActiveInputIndex(null);
      } else {
        const updatedElements = [...inputElements];
        updatedElements.splice(activeInputIndex, 1);
        setInputElements(updatedElements);
        setActiveInputIndex(null);
      }
    } else {
      alert("debe hacer click en input");
    }
  }

  //state that have link's image uppload img1, img2, etc
  const [image, setImage] = useState([]);

  //en este caso como es una funcion que recibe un parametro se realiza una funcion que devuelva otra funcion
  const uploadtoServer = (prop) => {
    return async (e) => {
      const imageFile = e.target.files[0];
      const url = `https://api.imgbb.com/1/upload?key=76bd5b89b4760413cf6cc5c8463cda08&name=${imageFile.name}`;
      const data = new FormData();
      data.append("image", imageFile);
      try {
        const response = await fetch(url, {
          method: "POST",
          body: data,
        });
        const responseData = await response.json();

        //a function is passed as an argument to update the state based on the previous state.
        setImage((prevImages) => [
          ...prevImages,
          { [prop]: responseData.data.url },
        ]);
      } catch (error) {
        console.error(error);
      }
    };
  };

  const mergeInput = () => {
    var cant = 0;
    if (stateImgArray && copyValues) {
      image.forEach((img) => {
        Object.keys(copyValues).forEach((key2) => {
            if (copyValues[key2] && Object.keys(img)[0] === copyValues[key2]) {
               copyValues[key2]=img[Object.keys(img)[0]]
            }
          //copyValues[key2],"valor ingresado en el input")
          console.log(img[Object.keys(img)[0]],"sprint image's links")
          //console.log(Object.keys(img)[0]) //sprint name farm of image array
        });
      });
    }
    return cant;
  };
  
  console.log(mergeInput(), "xxx");
  function filterInputs(valueInput) {
    setCopyValues(valueInput);
    mergeInput();
  }

  return (
    <>
      <h1>Dynamic Inputs</h1>
      <button onClick={() => addInput("title")}>Add Input Title</button>
      <button onClick={() => addInput("paragraph")}>Add Input Paragraph</button>
      <button onClick={() => addInput("img")}>Add Input Img</button>
      <button onClick={() => deleteInput(stateType)}>Delete Input</button>
      {/* enctype="multipart/form-data" es crucial para permitir la transferencia de archivos. */}
      <Formik
        initialValues={{}}
        // validate={(values) => {
        //   const errors = {};

        //   if (!values.img) {
        //     errors.img = "por favor ingresar nombre de Mascota";
        //   }

        //   //Letras y espacios, pueden llevar acentos.y Mayusuclas
        //   //Z0 es para numeros
        //   if (!/^[a-zA-ZÀ-ÿ\s]{1,15}$/.test(values.title)) {
        //     errors.title =
        //       "no se permite ingresar mas de 15 caracteres y caracteres especiales";
        //   }

        //   if (!values.paragraph) {
        //     errors.paragraph = "por favor ingresar nota de Mascota";
        //   }

        //   if (!/^[a-zA-Z0-ZÀ-ÿ\s]{1,50}$/.test(values.paragraph)) {
        //     errors.paragraph =
        //       "no se permite ingresar mas de 50 caracteres y caracteres especiales";
        //   }

        //   return errors;
        // }}
        onSubmit={(values, { resetForm }) => {
          //console.log(values);
          filterInputs(values);
          //dispatch(addNote(values));
          MySwal.fire({
            title: "¡Nota Creada Correctamente!",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "rgb(21, 151, 67)",
          }).then((result) => {
            if (result.isConfirmed) {
              //window.location.reload() RESFRESCA LA PAGINA
              //window.location.reload();
              //dispatch(getClients());
              resetForm();
              //history.push("/home")
              //<Redirect to='/home'/>
              //<Route path="*" element={<Navigate to ="/" />}/>
              // const element = <Navigate to="/home" />;
              // return element;
            }
          });
        }}
      >
        {({
          errors,
          handleSubmit,
          /* and other goodies */
        }) => (
          <Form onSubmit={handleSubmit}>
            {inputElements.map((input, index) =>
              input.typeInput === "img" ? (
                <Field
                  key={input.id}
                  onClick={() => {
                    handleInputClick(index), setStateType(input.typeInput);
                  }}
                  name={input.name}
                  type={input.type}
                  placeholder={input.placeholder}
                />
              ) : (
                <Field
                  key={input.id}
                  // value={input.value}
                  onClick={() => {
                    handleInputClick(index), setStateType(input.typeInput);
                  }}
                  name={input.name}
                  placeholder={input.placeholder}
                  type={input.type}
                />
              )
            )}

            {/* <ErrorMessage
              className="error"
              name={input.value}
              component={() => <div className="error">{errors.input.value}</div>}
            ></ErrorMessage> */}

            <button type="submit">Agregar Informacion</button>
          </Form>
        )}
      </Formik>
      <div>
        {stateImgArray
          ? stateImgArray.map((inputImg) => {
              return (
                <input
                  name={inputImg.name}
                  type="file"
                  onChange={uploadtoServer(inputImg.name)}
                />
              );
            })
          : null}
      </div>
    </>
  );
}

export default formAddNote;

// <Field
//   key={input.id}
//   onClick={() => {
//     handleInputClick(index), setStateType(input.typeInput);
//   }}
//   name={input.name}
//   type={input.type}
//   placeholder={input.placeholder}
//   onChange={uploadtoServer(input.name)}
// />