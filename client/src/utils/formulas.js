export const evaluateFormula = (formula, cellData) => {
    try {
      if (!formula.startsWith("=")) return formula; // Return as normal text if not a formula
  
      const match = formula.match(/^=(\w+)\(([^)]+)\)$/);
      if (!match) return "ERROR: Invalid Syntax"; // Basic syntax check
  
      const [, funcName, range] = match;
      const cells = parseRange(range, cellData); // Get cell values from range
  
      if (!cells.length) return "ERROR: Invalid Range";
  
      switch (funcName.toUpperCase()) {
        case "SUM":
          return sum(cells);
        case "AVERAGE":
          return average(cells);
        case "MAX":
          return max(cells);
        case "MIN":
          return min(cells);
        case "COUNT":
          return count(cells);
        default:
          return "ERROR: Unknown Function";
      }
    } catch (error) {
      return "ERROR: Calculation Failed";
    }
  };
  
  // Parses range like "A1:A3" and returns the values
  const parseRange = (range, cellData) => {
    const cells = range.split(":");
    if (cells.length !== 2) return [];
  
    const [start, end] = cells;
    const startLetter = start.match(/[A-Z]+/)[0];
    const endLetter = end.match(/[A-Z]+/)[0];
    const startNumber = parseInt(start.match(/\d+/)[0]);
    const endNumber = parseInt(end.match(/\d+/)[0]);
  
    let values = [];
    for (let i = startNumber; i <= endNumber; i++) {
      const cellKey = `${startLetter}${i}`;
      if (cellData[cellKey] !== undefined) {
        const numValue = parseFloat(cellData[cellKey]);
  
        if (isNaN(numValue)) return "ERROR: Non-numeric Value Found"; // If any cell contains non-numeric value
        values.push(numValue);
      }
    }
    return values;
  };
  
  // Formula functions
  const sum = (values) => (Array.isArray(values) ? values.reduce((acc, val) => acc + val, 0) : values);
  const average = (values) => (Array.isArray(values) && values.length ? sum(values) / values.length : values);
  const max = (values) => (Array.isArray(values) && values.length ? Math.max(...values) : values);
  const min = (values) => (Array.isArray(values) && values.length ? Math.min(...values) : values);
  const count = (values) => (Array.isArray(values) ? values.filter((val) => !isNaN(val)).length : values);
  