import React, { useReducer, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddBoat.scss';
import { useDropzone } from 'react-dropzone';
import newRequest from '../../utils/newRequest';
import { boatReducer, INITIAL_STATE } from '../../reducers/YachtReducer.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import upload from '../../utils/upload';

const AddBoat = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [state, dispatch] = useReducer(boatReducer, INITIAL_STATE);
  const [uploading, setUploading] = useState(false);
  const [marinas, setMarinas] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMarinas = async () => {
      try {
        const response = await newRequest.get('/marina/getAllMarinas');
        setMarinas(response.data);
      } catch (error) {
        console.error('Failed to fetch marinas', error);
      }
    };

    fetchMarinas();
  }, []);

  const handleNext = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  const onDrop = acceptedFiles => {
    const filesWithPreview = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    dispatch({ type: 'ADD_FILES', payload: filesWithPreview });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true
  });

  const handleRemove = (file) => {
    dispatch({ type: 'REMOVE_FILE', payload: file });
  };

  const toggleEquipment = (item) => {
    dispatch({ type: 'TOGGLE_EQUIPMENT', payload: item });
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const images = await Promise.all(
        state.files.map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: images });
      return images;
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadedImages = await handleUpload();
    const boatData = {
      ...state,
      files: uploadedImages
    };
    mutation.mutate(boatData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price' || name === 'hours') {
      const numericValue = value === '' ? '' : Math.max(0, Math.min(Number(value), name === 'hours' ? 23 : Infinity));
      dispatch({ type: 'CHANGE_INPUT', payload: { name, value: numericValue } });
    } else {
      dispatch({ type: 'CHANGE_INPUT', payload: { name, value } });
    }
  };

  const handleMarinaChange = (e) => {
    dispatch({ type: 'SET_MARINA', payload: e.target.value });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (boatData) => {
      const headers = {
        'Content-Type': 'application/json',
      };

      console.log('Sending boatData:', boatData);

      newRequest.post('/yatch/actions/addYatch', boatData, { headers });
      
      navigate("/add");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["boats"]);
    },
  });

  const equipmentImages = {
    'Outboard Motor': '/img/motor.png',
    'Hot Water': '/img/water.png',
    'Automatic Pilot': '/img/yacht.png',
    'Deck Shower': '/img/shower.png',
    'GPS': '/img/gps.png',
    'Cockpit Table': '/img/table.png',
    'Wi Fi': '/img/wifi.png',
    'TV': '/img/tv.png',
    'Fire Detector': '/img/detector.png',
    'Speakers': '/img/speakers.png',
    'Boarding Ladder': '/img/ladder.png',
    'First Aid Kit': '/img/aid.png',
  };

  return (
    <div className="add-type-page">
      <div className="form-container">
        {currentStep === 1 && (
          <div className="step step-1">
            <h2>Step 1: Title and Type</h2>
            <form>
              <div className="input-group">
                <label>Now, lets give your boat a title</label>
                <input
                  type="text"
                  placeholder="Title"
                  maxLength="24"
                  name="title"
                  value={state.title}
                  onChange={handleInputChange}
                />
                <small>{state.title.length}/24</small>
              </div>
              <div className="input-group">
                <label>What type of boat will you have?</label>
                <div className="boat-types">
                  {['Motor Boat', 'Sailboat', 'JetSki', 'Yacht', 'Dinghy', 'Catamaran'].map(type => (
                    <button
                      type="button"
                      key={type}
                      className={state.boatType === type ? 'selected' : ''}
                      onClick={() => dispatch({ type: 'CHANGE_INPUT', payload: { name: 'boatType', value: type } })}
                    >
                      <img src={`/img/${type.toLowerCase().replace(' ', '-')}.png`} alt={type} /> {type}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>
        )}
        {currentStep === 2 && (
          <div className="step step-2">
            <h2>Step 2: Set your price</h2>
            <form>
              <div className="input-group">
                <label>Set your price</label>
                <input
                  type="number"
                  placeholder="$10"
                  name="price"
                  value={state.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Is this price per day or per hour?</label>
                <select
                  name="priceType"
                  value={state.priceType}
                  onChange={handleInputChange}
                >
                  <option value="per day">Per Day</option>
                  <option value="per hour">Per Hour</option>
                </select>
              </div>
              {state.priceType === 'per hour' && (
                <div className="input-group">
                  <label>Number of hours</label>
                  <div className="counter">
                    <button type="button" onClick={() => dispatch({ type: 'CHANGE_INPUT', payload: { name: 'hours', value: Math.max(1, state.hours - 1) } })}>-</button>
                    <input type="number" name="hours" value={state.hours} onChange={handleInputChange} />
                    <button type="button" onClick={() => dispatch({ type: 'CHANGE_INPUT', payload: { name: 'hours', value: Math.min(23, state.hours + 1) } })}>+</button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
        {currentStep === 3 && (
          <div className="step step-3">
            <h2>Step 3: Create your description</h2>
            <form>
              <div className="input-group">
                <label>Create your description</label>
                <textarea
                  placeholder="Description"
                  maxLength="450"
                  name="description"
                  value={state.description}
                  onChange={handleInputChange}
                ></textarea>
                <small>{state.description.length}/450</small>
              </div>
            </form>
          </div>
        )}
        {currentStep === 4 && (
          <div className="step step-4">
            <h2>Step 4: Share some basic info about your boat</h2>
            <form>
              <div className="input-group">
                <label>Basic info</label>
                <div className="counter">
                  <label>Bedrooms</label>
                  <div>
                    <button type="button" onClick={() => dispatch({ type: 'CHANGE_INPUT', payload: { name: 'bedrooms', value: Math.max(0, state.bedrooms - 1) } })}>-</button>
                    <input type="text" value={state.bedrooms} readOnly />
                    <button type="button" onClick={() => dispatch({ type: 'CHANGE_INPUT', payload: { name: 'bedrooms', value: state.bedrooms + 1 } })}>+</button>
                  </div>
                </div>
                <div className="counter">
                  <label>Bathrooms</label>
                  <div>
                    <button type="button" onClick={() => dispatch({ type: 'CHANGE_INPUT', payload: { name: 'bathrooms', value: Math.max(0, state.bathrooms - 1) } })}>-</button>
                    <input type="text" value={state.bathrooms} readOnly />
                    <button type="button" onClick={() => dispatch({ type: 'CHANGE_INPUT', payload: { name: 'bathrooms', value: state.bathrooms + 1 } })}>+</button>
                  </div>
                </div>
                <div className="counter">
                  <label>Guests</label>
                  <div>
                    <button type="button" onClick={() => dispatch({ type: 'CHANGE_INPUT', payload: { name: 'guests', value: Math.max(1, state.guests - 1) } })}>-</button>
                    <input type="text" value={state.guests} readOnly />
                    <button type="button" onClick={() => dispatch({ type: 'CHANGE_INPUT', payload: { name: 'guests', value: state.guests + 1 } })}>+</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
        {currentStep === 5 && (
          <div className="step step-5">
            <h2>Step 5: Add Photos</h2>
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <p>Drag your photos here or click to select files</p>
            </div>
            <div className="photos-preview">
              {state.files.map(file => (
                <div key={file.name} className="photo-preview">
                  <img src={file.preview} alt="preview" />
                  <button className="remove-button" onClick={() => handleRemove(file)}>X</button>
                </div>
              ))}
            </div>
          
          </div>
        )}
        {currentStep === 6 && (
          <div className="step step-6">
            <h2>Step 6: Boat Specifications</h2>
            <form>
              <div className="input-group">
                <label>Engine</label>
                <input
                  type="text"
                  placeholder="Milwaukee-Eight 107"
                  name="engine"
                  value={state.engine}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Engine Torque</label>
                <input
                  type="text"
                  placeholder="111 ft-lb"
                  name="torque"
                  value={state.torque}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Fuel System</label>
                <input
                  type="text"
                  placeholder="Electronic Sequential Port Fuel Injection (ESPFI)"
                  name="fuelSystem"
                  value={state.fuelSystem}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Bore x Stroke</label>
                <input
                  type="text"
                  placeholder="3.937 in. x 4.375 in."
                  name="boreStroke"
                  value={state.boreStroke}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Fuel Capacity</label>
                <input
                  type="text"
                  placeholder="6.00 gal (22.71 L)"
                  name="fuelCap"
                  value={state.fuelCap}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Luggage Capacity - Volume</label>
                <input
                  type="text"
                  placeholder="4.7 cu ft"
                  name="capacity"
                  value={state.capacity}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Fuel Economy</label>
                <input
                  type="text"
                  placeholder="43 mpg"
                  name="fuelEconomy"
                  value={state.fuelEconomy}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Weight</label>
                <input
                  type="text"
                  placeholder="As Shipped: 877.00 lb.; Running Order: 904 lb."
                  name="weight"
                  value={state.weight}
                  onChange={handleInputChange}
                />
              </div>
            </form>
         
          </div>
        )}
        {currentStep === 7 && (
          <div className="step step-7">
            <h2>Step 7: On Board Equipment</h2>
            <div className="equipment-options">
              {Object.keys(equipmentImages).map(item => (
                <div
                  key={item}
                  className={`equipment-option ${state.equipment.includes(item) ? 'selected' : ''}`}
                  onClick={() => toggleEquipment(item)}
                >
                  <img src={equipmentImages[item]} alt={item} />
                  <label>{item}</label>
                </div>
              ))}
            </div>
            
          </div>
        )}
        {currentStep === 8 && (
          <div className="step step-8">
            <h2>Step 8: Select Marina</h2>
            <form>
              <div className="input-group">
                <label>Select the marina where your boat is located</label>
                <select
                  name="marina"
                  value={state.marinaID}
                  onChange={handleMarinaChange}
                >
                  <option value="">Select Marina</option>
                  {marinas.map(marina => (
                    <option key={marina._id} value={marina._id}>
                      {marina.marinaName}
                    </option>
                  ))}
                </select>
              </div>
            </form>
            <div className="navigation-buttons">
              <button onClick={handleBack}>Back</button>
              <button onClick={handleSubmit}>Upload</button>
            </div>
          </div>
        )}
        <div className="navigation-buttons">
          {currentStep > 1 && currentStep < 8 && <button onClick={handleBack}>Back</button>}
          {currentStep < 8 && <button onClick={handleNext}>Next</button>}
        </div>
      </div>
    </div>
  );
};

export default AddBoat;
