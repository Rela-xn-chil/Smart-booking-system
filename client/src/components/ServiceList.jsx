import React, { useEffect, useState } from 'react';

const ServiceList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Available Services</h2>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            <strong>{service.name}</strong> - {service.category} (${service.price}) <br />
            {service.description} | Slots: {service.availableSlots}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
