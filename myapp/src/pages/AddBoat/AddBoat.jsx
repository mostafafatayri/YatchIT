import React, { useState } from 'react';
import './AddBoat.scss';
import { useDropzone } from 'react-dropzone';

const AddBoat = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [files, setFiles] = useState([]);

  const handleNext = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  const onDrop = acceptedFiles => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true
  });

  return (
    <div className="add-type-page">
      <div className="form-container">
        {currentStep === 1 && (
          <div className="step step-1">
            <h2>Step 1: Title and Type</h2>
            <form>
              <div className="input-group">
                <label>Now, lets give your boat a title</label>
                <input type="text" placeholder="Title" maxLength="24" />
                <small>0/24</small>
              </div>
              <div className="input-group">
                <label>What type of boat will you have?</label>
                <div className="boat-types">
                  <button type="button">
                    <img src="/img/motor-boat.png" alt="Motor Boat" /> Motor Boat
                  </button>
                  <button type="button">
                    <img src="/img/sail-boat.png" alt="Sailboat" /> Sailboat
                  </button>
                  <button type="button">
                    <img src="/img/jetski.png" alt="Jet Ski" /> Jet Ski
                  </button>
                  <button type="button">
                    <img src="/img/yatch.png" alt="Yacht" /> Yacht
                  </button>
                  <button type="button">
                    <img src="/img/dinghy.png" alt="Dinghy" /> Dinghy
                  </button>
                  <button type="button">
                    <img src="/img/catamaran.png" alt="Catamaran" /> Catamaran
                  </button>
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
                <input type="number" placeholder="$10" />
              </div>
            </form>
          </div>
        )}
        {currentStep === 3 && (
          <div className="step step-3">
            <h2>Step 3: Create your description</h2>
            <form>
              <div className="input-group">
                <label>Create your description</label>
                <textarea placeholder="Description" maxLength="450"></textarea>
                <small>0/450</small>
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
                  <button>-</button>
                  <input type="text" value="00" readOnly />
                  <button>+</button>
                </div>
                <div className="counter">
                  <label>Bathrooms</label>
                  <button>-</button>
                  <input type="text" value="00" readOnly />
                  <button>+</button>
                </div>
                <div className="counter">
                  <label>Guests</label>
                  <button>-</button>
                  <input type="text" value="01" readOnly />
                  <button>+</button>
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
              {files.map(file => (
                <div key={file.name} className="photo-preview">
                  <img src={file.preview} alt="preview" />
                </div>
              ))}
            </div>
          </div>
        )}
        {currentStep === 6 && (
          <div className="steps step-633">
          <h2>Step 6: Boat Specifications</h2>
          <form>
            <div className="input-group">
              <label>Engine</label>
              <input type="text" placeholder="Milwaukee-Eight 107" />
            </div>
            <div className="input-group">
              <label>Engine Torque</label>
              <input type="text" placeholder="111 ft-lb" />
            </div>
            <div className="input-group">
              <label>Fuel System</label>
              <input type="text" placeholder="Milwaukee-Eight 107" />
            </div>
            <div className="input-group">
              <label>Bore x Stroke</label>
              <input type="text" placeholder="111 ft-lb" />
            </div>
           
           
          <div className="input-group">
              <label>Luggage Capacity + Volume</label>
              <input type="text" placeholder="Milwaukee-Eight 107" />
            </div>

            <div className="input-group">
              <label>Weight</label>
              <input type="text" placeholder="Milwaukee-Eight 107" />
            </div>



            <div className="input-group">
              <label>Fuel Capacity</label>
              <input type="text" placeholder="Milwaukee-Eight 107" />
            </div>

      
            

          </form>
        </div>
        )}
        {currentStep === 7 && (
          <div className="step step-7">
            <h2>Step 7: On Board Equipment</h2>
            <div className="equipment-options">
              <div className="equipment-option">
                <img src="/img/motor.png" alt="Outboard Motor" />
                <label>Outboard Motor</label>
              </div>
              <div className="equipment-option">
                <img src="/img/water.png" alt="Hot Water" />
                <label>Hot Water</label>
              </div>
              <div className="equipment-option">
                <img src="/img/yacht.png" alt="Automatic Pilot" />
                <label>Automatic Pilot</label>
              </div>
              <div className="equipment-option">
                <img src="/img/shower.png" alt="Hot Water" />
                <label>Deck Shower</label>
              </div>
              <div className="equipment-option">
                <img src="/img/gps.png" alt="GPS" />
                <label>GPS</label>
              </div>
              <div className="equipment-option">
                <img src="/img/table.png" alt="Cockpit Table" />
                <label>Cockpit Table</label>
              </div>
              <div className="equipment-option">
                <img src="/img/wifi.png" alt="Wi Fi" />
                <label>Wi Fi</label>
              </div>
              <div className="equipment-option">
                <img src="/img/tv.png" alt="TV" />
                <label>TV</label>
              </div>
              <div className="equipment-option">
                <img src="/img/detector.png" alt="Fire Detector" />
                <label>Fire Detector</label>
              </div>
              <div className="equipment-option">
                <img src="/img/speakers.png" alt="Speakers" />
                <label>Speakers</label>
              </div>
              <div className="equipment-option">
                <img src="/img/ladder.png" alt="Boarding Ladder" />
                <label>Boarding Ladder</label>
              </div>
              <div className="equipment-option">
                <img src="/img/aid.png" alt="First Aid Kit" />
                <label>First Aid Kit</label>
              </div>
            </div>
          </div>
        )}
        <div className="navigation-buttons">
          {currentStep > 1 && <button onClick={handleBack}>Back</button>}
          {currentStep < 7 && <button onClick={handleNext}>Next</button>}
        </div>
      </div>
    </div>
  );
};

export default AddBoat;
/**
 * //

        
            <div className="input-group">
              <label>Fuel Capacity</label>
              <input type="text" placeholder="Milwaukee-Eight 107" />
            </div>
           
         
//
 */