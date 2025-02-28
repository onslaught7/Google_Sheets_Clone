import React, { useState, useRef, useEffect } from "react";
import "./Toolbar.scss";
import { BiBold, BiItalic, BiUnderline, BiStrikethrough } from "react-icons/bi";
import { IoMdRedo, IoMdUndo } from "react-icons/io";
import { MdFormatAlignLeft, MdFormatAlignCenter, MdFormatAlignRight, MdOutlineFormatColorFill } from "react-icons/md";
import { AiOutlineFontColors, AiOutlineFontSize } from "react-icons/ai";
import useSheetStore from "@/store/store";
import { MdInvertColorsOff, MdContentCut, MdDeleteSweep, MdFindReplace } from "react-icons/md";

const Toolbar = () => {
  const [fontSize, setFontSize] = useState("12");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [showTextColorDropdown, setShowTextColorDropdown] = useState(false);
  const [showFillColorDropdown, setShowFillColorDropdown] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000"); // ✅ Store selected text color
  const [selectedBgColor, setSelectedBgColor] = useState("#FFFFFF");

  const { selectedCell, selectedCells, updateCellData, cellData, updateCellStyle } = useSheetStore();
  const textColorRef = useRef(null);
  const fillColorRef = useRef(null);

  // Apply styles to the selected cell
  const applyStyle = (styleKey, value) => {
    if (!selectedCells.length) return;
  
    selectedCells.forEach((cellId) => {
      const currentStyles = useSheetStore.getState().cellStyles[cellId] || {};
      const newValue = currentStyles[styleKey] === value ? "" : value; // Toggle styles
      updateCellStyle(cellId, styleKey, newValue);
    });
  }; 

  // ✅ Function to apply text color
  const applyTextColor = (color) => {
    if (color === "None") {
      setSelectedColor("#000000"); // Reset text to default (black)
      applyStyle("color", ""); // Remove applied color
    } else {
      setSelectedColor(color);
      applyStyle("color", color);
    }
  };

  // ✅ Function to apply background fill color
  const applyFillColor = (color) => {
    if (color === "None") {
      setSelectedBgColor("transparent"); // Reset background to default
      applyStyle("backgroundColor", ""); // Remove applied background color
    } else {
      setSelectedBgColor(color);
      applyStyle("backgroundColor", color);
    }
  };

  // ✅ Function to Trim text (Remove leading & trailing spaces)
  const applyTrim = () => {
    if (!selectedCells.length) return;

    selectedCells.forEach((cellId) => {
      if (cellData[cellId]) {
        updateCellData(cellId, cellData[cellId].trim()); // ✅ Trim spaces
      }
    });
  };

  // ✅ Function to Toggle Upper/Lower Case
  const toggleCase = () => {
    if (!selectedCells.length) return;

    selectedCells.forEach((cellId) => {
      if (cellData[cellId]) {
        const text = cellData[cellId];
        const isUpperCase = text === text.toUpperCase();
        updateCellData(cellId, isUpperCase ? text.toLowerCase() : text.toUpperCase());
      }
    });
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (textColorRef.current && !textColorRef.current.contains(event.target)) {
        setShowTextColorDropdown(false);
      }
      if (fillColorRef.current && !fillColorRef.current.contains(event.target)) {
        setShowFillColorDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="toolbar">
      {/* Undo/Redo */}
      <div className="toolbar-group">
        <button className="toolbar-btn"><IoMdUndo /></button>
        <button className="toolbar-btn"><IoMdRedo /></button>
      </div>

      {/* Font Family & Font Size */}
      <div className="toolbar-group">
        <select 
          className="toolbar-select" 
          value={fontFamily} 
          onChange={(e) => {
            setFontFamily(e.target.value),
            applyStyle("fontFamily", e.target.value);
          }}
          >
          <option>Arial</option>
          <option>Verdana</option>
          <option>Times New Roman</option>
          <option>Courier New</option>
          <option>Georgia</option>
          <option>Garamond</option>
          <option>Trebuchet MS</option>
          <option>Comic Sans MS</option>
          <option>Impact</option>
          <option>Tahoma</option>
          <option>Lucida Sans</option>
          <option>Franklin Gothic Medium</option>
          <option>Palatino Linotype</option>
          <option>Century Gothic</option>
          <option>Calibri</option>
          <option>Monospace</option>
          <option>Futura</option>
          <option>Cambria</option>
          <option>Didot</option>
          <option>Rockwell</option>
          <option>Helvetica</option>
          <option>Gill Sans</option>
          <option>Optima</option>
          <option>Brush Script MT</option>
        </select>
        <select 
          className="toolbar-select" 
          value={fontSize} onChange={(e) => {
            setFontSize(e.target.value);
            applyStyle("fontSize", `${e.target.value}px`);
            }
          }
        >
          {[10, 12, 14, 16, 18, 20, 24, 28, 32].map(size => (
            <option key={size}>{size}</option>
          ))}
        </select>
      </div>

      {/* Bold, Italic, Underline, Strikethrough */}
      <div className="toolbar-group">
        <button className="toolbar-btn" onClick={() => applyStyle("fontWeight", "bold")}><BiBold /></button>
        <button className="toolbar-btn" onClick={() => applyStyle("fontStyle", "italic")}><BiItalic /></button>
        <button className="toolbar-btn" onClick={() => applyStyle("textDecoration", "underline")}><BiUnderline /></button>
        <button className="toolbar-btn" onClick={() => applyStyle("textDecoration", "line-through")}><BiStrikethrough /></button>
      </div>

      {/* Text Color & Background Color */}
      <div className="toolbar-group">
      {/* Text Color */}
      <div className="dropdown-container" ref={textColorRef}>
        <button 
          className="toolbar-btn" 
          onClick={() => setShowTextColorDropdown(!showTextColorDropdown)}
          style={{ color: selectedColor }}
        >
          <AiOutlineFontColors />
        </button>
        {showTextColorDropdown && (
          <div className="color-dropdown">
          <div className="color-option none" onClick={() => applyTextColor("None")}><MdInvertColorsOff /></div>
            {["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00",
              "#FFA500", "#800080", "#FFC0CB", "#808080", "#00FFFF",
              "#008000", "#FF4500", "#8B4513", "#4B0082", "#FFD700",
              "#A52A2A", "#C0C0C0", "#F0E68C", "#DC143C"].map(color => (
              <div 
                key={color} 
                className="color-option" 
                style={{ backgroundColor: color }}
                onClick={() => applyTextColor(color)}
              >
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Background Fill Color */}
      <div className="dropdown-container" ref={fillColorRef}>
        <button 
          className="toolbar-btn" 
          onClick={() => setShowFillColorDropdown(!showFillColorDropdown)}
          style={{ backgroundColor: selectedBgColor }}
        >
          <MdOutlineFormatColorFill />
        </button>
        {showFillColorDropdown && (
          <div className="color-dropdown">
          <div className="color-option none" onClick={() => applyFillColor("None")}><MdInvertColorsOff /></div>
            {["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00",
              "#FFA500", "#800080", "#FFC0CB", "#808080", "#00FFFF",
              "#008000", "#FF4500", "#8B4513", "#4B0082", "#FFD700",
              "#A52A2A", "#C0C0C0", "#F0E68C", "#DC143C"].map(color => (
              <div 
                key={color} 
                className="color-option" 
                style={{ backgroundColor: color }}
                onClick={() => applyFillColor(color)}
              >
              </div>
            ))}
          </div>
        )}
      </div>
      </div>

      {/* Text Alignment */}
      <div className="toolbar-group">
        <button className="toolbar-btn"><MdFormatAlignLeft /></button>
        <button className="toolbar-btn"><MdFormatAlignCenter /></button>
        <button className="toolbar-btn"><MdFormatAlignRight /></button>
      </div>

      {/* Data Quality Functions */}
      <div className="toolbar-group">
        <div title="Trim">
          <button className="toolbar-btn" onClick={applyTrim}><MdContentCut /></button>
        </div>
        <div title="Toggle Upper/Lower Case">
          <button className="toolbar-btn" onClick={toggleCase}><AiOutlineFontSize /></button>
        </div>
        <div title="Remove Duplicates">
          <button className="toolbar-btn"><MdDeleteSweep /></button>
        </div>
        <div title="Find and Replace">
          <button className="toolbar-btn"><MdFindReplace /></button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
