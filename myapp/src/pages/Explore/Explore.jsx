import React, { useState, useEffect } from 'react';
import './Explore.scss';
import TopBoatRentals from '../../components/TopRent/Toprent';
import { MdFilterList } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest.js';

const Explore = () => {
  const location = useLocation();
  const initialFilter = location.state?.filter ? { marina: location.state.filter } : {};

  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [filters, setFilters] = useState({
    marina: initialFilter.marina || '',
    tripDate: '',
    boatType: '',
    priceRange: { min: '', max: '' },
    numberOfPeople: '',
    withCrew: false,
    freeCancellation: false,
    categories: {
      sailboat: false,
      motorboat: false,
      catamaran: false, //
      dinghy: false, //
      jetSki: false,
      yacht: false, //
    },
  });

  const { isLoading, error, data: marinas } = useQuery({
    queryKey: ['marinas'],
    queryFn: () =>
      newRequest.get(`/marina/getAllMarinas/`).then((res) => {
        return res.data;
      }),
  });

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setIsFilterVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleSelectOpen = () => {
    setIsSelectOpen(true);
  };

  const handleSelectClose = () => {
    setIsSelectOpen(false);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      categories: {
        ...prevFilters.categories,
        [field]: value,
      },
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching marinas</div>;
  }

  return (
    <div className="explore">
      <br />
      <br />
      <br />
      <br />
      <div className="explore-container">
        {isFilterVisible ? (
          <div className="filter-section visible">
            <div className="filter">
              <div className="header">
                <h2>Filters</h2>
                <button className="close-button" onClick={toggleFilterVisibility}>X</button>
              </div>
              <div className="filter-item">
                <label>
                  <h2>Search Destination</h2>
                </label>
                <div className={`custom-select ${isSelectOpen ? 'open' : ''}`}>
                  <select
                    onFocus={handleSelectOpen}
                    onBlur={handleSelectClose}
                    value={filters.marina}
                    onChange={(e) => handleFilterChange('marina', e.target.value)}
                  >
                    <option value="">Select Marina</option>
                    {marinas.map((marina) => (
                      <option key={marina._id} value={marina.marinaName}>
                        {marina.marinaName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="filter-item">
                <label>
                  <h2>Select Trip Date</h2>
                </label>
                <input
                  type="text"
                  placeholder="Fri 11/11/22 - Fri 18/11/20"
                  value={filters.tripDate}
                  onChange={(e) => handleFilterChange('tripDate', e.target.value)}
                />
              </div>
            
              <div className="filter-item">
                <label>
                  <h2>Price Range</h2>
                </label>
                <div className="price-range">
                  <input
                    type="text"
                    placeholder="Min"
                    value={filters.priceRange.min}
                    onChange={(e) => handleFilterChange('priceRange', { ...filters.priceRange, min: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Max"
                    value={filters.priceRange.max}
                    onChange={(e) => handleFilterChange('priceRange', { ...filters.priceRange, max: e.target.value })}
                  />
                </div>
              </div>
              <div className="filter-item">
                <label>
                  <h2>Number of People</h2>
                </label>
                <input
                  type="text"
                  placeholder="00"
                  value={filters.numberOfPeople}
                  onChange={(e) => handleFilterChange('numberOfPeople', e.target.value)}
                />
              </div>
              <div className="filter-item">
                <label>
                  <input
                    type="checkbox"
                    checked={filters.withCrew}
                    onChange={(e) => handleFilterChange('withCrew', e.target.checked)}
                  />
                  With Crew
                </label>
              </div>
              <div className="filter-item">
                <label>
                  <input
                    type="checkbox"
                    checked={filters.freeCancellation}
                    onChange={(e) => handleFilterChange('freeCancellation', e.target.checked)}
                  />
                  Free Cancellation
                </label>
              </div>
              <div className="filter-item categories">
                <label>
                  <h2>Categories</h2>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={filters.categories.sailboat}
                    onChange={(e) => handleCheckboxChange('sailboat', e.target.checked)}
                  />
                  Sailboat
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={filters.categories.motorboat}
                    onChange={(e) => handleCheckboxChange('motorboat', e.target.checked)}
                  />
                  Motorboat
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={filters.categories.catamaran}
                    onChange={(e) => handleCheckboxChange('catamaran', e.target.checked)}
                  />
                  Catamaran
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={filters.categories.yacht}
                    onChange={(e) => handleCheckboxChange('yacht', e.target.checked)}
                  />
                  Yacht
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={filters.categories.jetSki}
                    onChange={(e) => handleCheckboxChange('jetSki', e.target.checked)}
                  />
                  Jet Ski
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={filters.categories.dinghy}
                    onChange={(e) => handleCheckboxChange('dinghy', e.target.checked)}
                  />
                  Dinghy
                </label>
              </div>
              <button className="reset-button" onClick={() => setFilters({
                marina: '',
                tripDate: '',
                boatType: '',
                priceRange: { min: '', max: '' },
                numberOfPeople: '',
                withCrew: false,
                freeCancellation: false,
                categories: {
                  sailboat: false,
                  motorboat: false,
                  catamaran: false,
                  quiet: false,
                  jetSki: false,
                  houseboat: false,
                },
              })}>Reset</button>
            </div>
          </div>
        ) : (
          <div className="header">
            <h2>Explore Our Exclusive Fleet with Hundreds of Available Boats</h2>
            <div className="filter-toggle" onClick={toggleFilterVisibility}>
              <MdFilterList />
            </div>
          </div>
        )}
        <div className="boats-section">
          <div className="sort-by">
            <span>Sort By:</span>
            <select>
              <option>Recently Listed</option>
            </select>
          </div>
          <TopBoatRentals filters={filters} />
        </div>
      </div>
    </div>
  );
};

export default Explore;


/**
 import React, { useState, useEffect } from 'react';
import './Explore.scss';
import TopBoatRentals from '../../components/TopRent/Toprent';
import { MdFilterList } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest.js';

const Explore = () => {
  const location = useLocation();
  const filter = location.state?.filter; // Accessing the passed state
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedMarina, setSelectedMarina] = useState(filter ? filter : '');

  const { isLoading, error, data: marinas } = useQuery({
    queryKey: ['marinas'],
    queryFn: () =>
      newRequest.get(`/marina/getAllMarinas/`).then((res) => {
        return res.data;
      }),
  });

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setIsFilterVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleSelectOpen = () => {
    setIsSelectOpen(true);
  };

  const handleSelectClose = () => {
    setIsSelectOpen(false);
  };

  const handleMarinaChange = (event) => {
    setSelectedMarina(event.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching marinas</div>;
  }

  return (
    <div className="explore">
      <br />
      <br />
      <br />
      <br />
      <div className="explore-container">
        {isFilterVisible ? (
          <div className="filter-section visible">
            <div className="filter">
              <div className="header">
                <h2>Filters</h2>
                <button className="close-button" onClick={toggleFilterVisibility}>X</button>
              </div>
              <div className="filter-item">
                <label>
                  <h2>Search Destination</h2>
                </label>
                <div className={`custom-select ${isSelectOpen ? 'open' : ''}`}>
                  <select
                    onFocus={handleSelectOpen}
                    onBlur={handleSelectClose}
                    value={selectedMarina}
                    onChange={handleMarinaChange}
                  >
                    <option value="">Select Marina</option>
                    {marinas.map((marina) => (
                      <option key={marina._id} value={marina.marinaName}>
                        {marina.marinaName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="filter-item">
                <label>
                  <h2>Select Trip Date</h2>
                </label>
                <input type="text" placeholder="Fri 11/11/22 - Fri 18/11/20" />
              </div>
              <div className="filter-item">
                <label>
                  <h2>Select Boat Type</h2>
                </label>
                <div className={`custom-select ${isSelectOpen ? 'open' : ''}`}>
                  <select onFocus={handleSelectOpen} onBlur={handleSelectClose}>
                    <option>Choose Boat Type</option>
                    <option>Sail boat</option>
                    <option>Fishing boat</option>
                    <option>Bass boat</option>
                    <option>Cabin cruiser</option>
                    <option>Dinghies</option>
                  </select>
                </div>
              </div>
              <div className="filter-item">
                <label>
                  <h2>Price Range</h2>
                </label>
                <div className="price-range">
                  <input type="text" placeholder="Min" />
                  <input type="text" placeholder="Max" />
                </div>
              </div>
              <div className="filter-item">
                <label>
                  <h2>Number of People</h2>
                </label>
                <input type="text" placeholder="00" />
              </div>
              <div className="filter-item">
                <label>
                  <input type="checkbox" />
                  With Crew
                </label>
              </div>
              <div className="filter-item">
                <label>
                  <input type="checkbox" />
                  Free Cancellation
                </label>
              </div>
              <div className="filter-item categories">
                <label>
                  <h2>Categories</h2>
                </label>
                <label>
                  <input type="checkbox" />
                  Sailboat
                </label>
                <label>
                  <input type="checkbox" />
                  Motorboat
                </label>
                <label>
                  <input type="checkbox" />
                  Catamaran
                </label>
                <label>
                  <input type="checkbox" />
                  Quiet
                </label>
                <label>
                  <input type="checkbox" />
                  Jet Ski
                </label>
                <label>
                  <input type="checkbox" />
                  Houseboat
                </label>
              </div>
              <button className="reset-button">Reset</button>
            </div>
          </div>
        ) : (
          <div className="header">
            <h2>Explore Our Exclusive Fleet with Hundreds of Available Boats</h2>
            <div className="filter-toggle" onClick={toggleFilterVisibility}>
              <MdFilterList />
            </div>
          </div>
        )}
        <div className="boats-section">
          <div className="sort-by">
            <span>Sort By:</span>
            <select>
              <option>Recently Listed</option>
            </select>
          </div>
          <TopBoatRentals />
        </div>
      </div>
    </div>
  );
};

export default Explore;

 */