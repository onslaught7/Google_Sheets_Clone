import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import useSheetStore from "@/store/store";
import "./Footer.scss";

const Footer = () => {
  const { sheets, addSheet, activeSheet, setActiveSheet, updateSheetName, deleteSheet } = useSheetStore();
  const [deletePrompt, setDeletePrompt] = useState(null);

  return (
    <div className="footer">
      <div className="sheets-container">
        {sheets.map(sheet => (
          <SheetTab
            key={sheet.id}
            sheet={sheet}
            isActive={sheet.id === activeSheet}
            setActiveSheet={setActiveSheet}
            updateSheetName={updateSheetName}
            onDelete={() => setDeletePrompt(sheet.id)}
          />
        ))}

        <button className="add-sheet-btn" onClick={addSheet}>
          <IoMdAdd />
        </button>
      </div>

      {/* Delete Confirmation */}
      {deletePrompt !== null && (
        <div className="delete-confirmation">
          <p>Delete this sheet?</p>
          <button onClick={() => { deleteSheet(deletePrompt); setDeletePrompt(null); }}>Yes</button>
          <button onClick={() => setDeletePrompt(null)}>No</button>
        </div>
      )}
    </div>
  );
};

const SheetTab = ({ sheet, isActive, setActiveSheet, updateSheetName, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(sheet.name);

  return (
    <div className={`sheet-tab ${isActive ? "active" : ""}`} onClick={() => setActiveSheet(sheet.id)}>
      {isEditing ? (
        <input
          type="text"
          value={name}
          autoFocus
          onChange={(e) => setName(e.target.value)}
          onBlur={() => {
            updateSheetName(sheet.id, name.trim() || sheet.name);
            setIsEditing(false);
          }}
          onFocus={(e) => e.target.select()}
          className="sheet-input"
        />
      ) : (
        <span onDoubleClick={() => setIsEditing(true)}>{sheet.name}</span>
      )}

      {/* Delete Button */}
      <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
        <MdDelete />
      </button>
    </div>
  );
};

export default Footer;
