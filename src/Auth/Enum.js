const Enums = {
    FACTORY: 'factory',
    QA: 'qa',
    AREA: 'area',
    IT:'it-officer',
    DEFAULT: JSON.parse(localStorage.getItem('role')),
  };
  
  export default Enums;
  