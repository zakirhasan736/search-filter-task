import React, { useEffect, useState } from 'react';
import { getBread, getBreadList, getSelectedBread, getSubBreadList } from './services';

const App: React.FC = () => {

  const [breed, setBreed] = useState([]);
  const [breedList, setList] = useState({});
  const [subBreedList, seSubtList] = useState([]);

  const [input, setInput] = useState({
    breed: "",
    sub_breed: "",
    n_image: ""
  });

  const handleChange = (e: any): void => {
    const value = e.target.value;
    setInput({
      ...input,
      [e.target.name]: value
    });
  }

  useEffect(() => {
    getBread()
      .then((res: any) => {
        setBreed(res.data.message.slice(0, 10));
      })
      .catch((e: Error) => {
        console.log(e);
      });
    return () => {
      //cleanup
      setBreed([])
    }
  }, [])

  useEffect(() => {
    getBreadList()
      .then((res: any) => {
        let list = Object.keys(res.data.message)
          .filter((k) => res.data.message[k].length > 0)
          .reduce((a, k) => ({ ...a, [k]: res.data.message[k] }), {});
        setList(list);
      })
      .catch((e: Error) => {
        console.log(e);
      });
    return () => {
      //cleanup
      setList({})
    }
  }, [])

  useEffect(() => {
    if (input.breed !== "") {
      getSubBreadList(input.breed)
        .then((res: any) => {
          seSubtList(res.data.message);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
    return () => {
      //cleanup
      seSubtList([])
    }
  }, [input.breed])


  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (input.breed === "") {
      e.target["breed"].style.border = "2px solid red";
      return false
    }
    else {
      e.target["breed"].style.border = "2px solid black";
    }
    if (input.sub_breed === "") {
      e.target["sub_breed"].style.border = "2px solid red";
      return false
    }
    else {
      e.target["sub_breed"].style.border = "2px solid black";
    }
    if (input.n_image === "") {
      e.target["n_image"].style.border = "2px solid red";
      return false
    }
    else {
      e.target["n_image"].style.border = "2px solid black";
    }
    getSelectedBread(input.breed, input.sub_breed, Number(input.n_image))
      .then((res: any) => {
        setBreed(res.data.message);
      })
      .catch((e: Error) => {
        console.log(e);
      });

  }
  if (breed.length === 0) {
    return (
      <div className='loader_container'>
        <span className="loader"></span>
      </div>
    )
  }
  return (
    <div className='app'>
      <form onSubmit={handleSubmit} className="app_header">
        <select name="breed" onChange={(e) => handleChange(e)}>
          <option value={""} disabled selected>select bread</option>
          {
            Object.keys(breedList).map((item => (
              <option key={item} value={item}>{item}</option>
            )))
          }
        </select>
        <select name="sub_breed" onChange={(e) => handleChange(e)}>
          <option value={""} disabled selected>select sub bread</option>
          {subBreedList.map(item => (
            <option value={item}>{item}</option>
          ))}
        </select>
        <select name="n_image" onChange={(e) => handleChange(e)}>
          <option value={""} disabled selected>Number of image</option>
          {Array(5).fill("").map(((item, index) => (
            <option value={index + 1}>{index + 1}</option>
          )))}
        </select>
        <button type='submit'>View Images</button>
      </form>

      {/* show result */}

      <div className="container app_body">
        <div className="row">
          {breed.map(item => (
            <div className="card">
              <img src={item} alt={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default App;