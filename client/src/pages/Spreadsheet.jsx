import useSheetStore from "@/store/store";
import { useEffect, useRef, useState } from "react";
import "./Spreadsheet.scss";
import { evaluateFormula } from "@/utils/formulas.js"; // ✅ Added: Import formula evaluator

const INITIAL_ROWS = 20; // Initial visible rows
const INITIAL_COLS = 20; // Initial visible columns
const ROW_INCREMENT = 20; // Number of rows to add on scroll
const COL_INCREMENT = 5;  // Number of columns to add on scroll

// Generate column names (A-Z, AA, AB, etc.)
const generateColumnNames = (num) => {
  let columns = [];
  for (let i = 0; i < num; i++) {
    let name = "";
    let index = i;
    while (index >= 0) {
      name = String.fromCharCode(65 + (index % 26)) + name;
      index = Math.floor(index / 26) - 1;
    }
    columns.push(name);
  }
  return columns;
};

const Spreadsheet = () => {
  const { 
    cellData, 
    updateCellData, 
    cellStyles, 
    updateCellStyle, 
    selectedCell, 
    setSelectedCell, 
    selectedCells, 
    setSelectedCells 
  } = useSheetStore();
  
  const [numRows, setNumRows] = useState(INITIAL_ROWS);
  const [numCols, setNumCols] = useState(INITIAL_COLS);
  const [columns, setColumns] = useState(generateColumnNames(numCols));
  const [editingCell, setEditingCell] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);

  const tableRef = useRef(null);

  useEffect(() => {
    setColumns(generateColumnNames(numCols));
  }, [numCols]);

  // ✅ Ensure selectedCells is always an array
  useEffect(() => {
    if (!Array.isArray(selectedCells)) {
      setSelectedCells([]);
    }
  }, [selectedCells, setSelectedCells]);

  // ✅ Handles drag selection start
  const handleMouseDown = (cellId) => {
    setSelectedCells([cellId]); // ✅ Ensure it's an array
    setIsSelecting(true);
  };

  // ✅ Handles drag selection movement
  const handleMouseEnter = (cellId) => {
    if (isSelecting) {
      setSelectedCells((prevSelected) => Array.isArray(prevSelected) ? [...new Set([...prevSelected, cellId])] : [cellId]);
    }
  };

  // ✅ Handles drag selection end
  const handleMouseUp = () => {
    setIsSelecting(false);
  };

  // Event to load more rows and columns dynamically
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } = e.target;

    // Load more rows when scrolling near the bottom
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      setNumRows((prev) => prev + ROW_INCREMENT);
    }

    // Load more columns when scrolling near the right edge
    if (scrollLeft + clientWidth >= scrollWidth - 50) {
      setNumCols((prev) => prev + COL_INCREMENT);
    }
  };

  return (
    <div 
      className="spreadsheet" 
      onClick={() => {
        setSelectedCell(null);
        setSelectedCells([]);
      }}
      onMouseUp={handleMouseUp}
    >
      <div 
        className="table-container" 
        onScroll={handleScroll} 
        ref={tableRef} 
        onClick={(e) => e.stopPropagation()}
      >
        <table>
          <thead>
            <tr>
              <th onClick={() => setSelectedCell(null)}></th> {/* Empty top-left corner */}
              {columns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: numRows }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                <th>{rowIndex + 1}</th> {/* Row headers */}
                {columns.map((col, colIndex) => {
                  const cellId = `${col}${rowIndex + 1}`;
                  const isSelected = selectedCell === cellId;
                  const isEditing = editingCell === cellId;

                  // ✅ Extract cell value and process formulas
                  const value = cellData[cellId] || "";
                  const displayedValue = value.startsWith("=") && !isEditing ? evaluateFormula(value, cellData) : value;

                  return (
                    <td
                      key={cellId}
                      className={selectedCells.includes(cellId) ? "selected" : ""}
                      style={cellStyles[cellId] || {}} // ✅ Apply stored styles
                      onMouseDown={() => handleMouseDown(cellId)} // ✅ Start drag selection
                      onMouseEnter={() => handleMouseEnter(cellId)} // ✅ Continue drag selection
                      onMouseUp={handleMouseUp} // ✅ Stop drag selection
                      onClick={() => {
                        if (selectedCell === cellId) {
                          setEditingCell(cellId);
                        } else {
                          setSelectedCell(cellId);
                          setEditingCell(null);
                        }
                      }}
                      onDoubleClick={() => setEditingCell(cellId)}
                    >
                      {isEditing ? (
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => updateCellData(cellId, e.target.value)}
                          autoFocus
                          onBlur={() => setEditingCell(null)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              setEditingCell(null); // Exit editing mode
                            }
                          }}
                        />
                      ) : (
                        displayedValue
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Spreadsheet;
