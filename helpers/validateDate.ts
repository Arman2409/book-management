const validateDateFormat = (dateStr:Date) => {
    // Convert generated date to any to ensure proper date validation 
    return !isNaN(new Date(dateStr.toString()) as any);
  }
export default validateDateFormat;