import useSheetStore from "@/store/store";
import { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdLockOutline } from "react-icons/md";
import "./Header.scss";

const menuItems = {
  File: ["New", "Open", "Save", "Download", "Rename"],
  Edit: ["Undo", "Redo", "Cut", "Copy", "Paste"],
  View: ["Zoom", "Fullscreen", "Gridlines", "Show Formula Bar"],
  Insert: ["Chart", "Image", "Table", "Function"],
  Format: ["Text Style", "Alignment", "Conditional Formatting"],
  Data: ["Sort", "Filter", "Pivot Table"],
  Tools: ["Spelling", "Extensions", "Scripting"],
  Extensions: ["Add-ons", "Script Editor"],
  Help: ["Docs", "Keyboard Shortcuts"],
};

const Header = () => {
  const { sheetName, setSheetName } = useSheetStore();
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(dropdownRefs.current).forEach((key) => {
        if (dropdownRefs.current[key] && !dropdownRefs.current[key].contains(event.target)) {
          setOpenDropdown(null);
        }
      });
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  return (
    <div className="header">
      {/* Upper Section: Logo + Document Name */}
      <div className="upper-header">
        <div className="logo-container">
          <img src="/google-sheets.png" alt="Logo" className="logo" />
          <div className="secondary-container">
            <input
              type="text"
              value={sheetName}
              onChange={(e) => setSheetName(e.target.value)}
              className="doc-name"
            />

            {/* Menu Bar */}
            <div className="menu-container">
              {Object.keys(menuItems).map((menu) => (
                <div className="menu-wrapper" key={menu} ref={(el) => (dropdownRefs.current[menu] = el)}>
                  <button
                    className="menu-button"
                    onClick={() => setOpenDropdown(openDropdown === menu ? null : menu)}
                  >
                    {menu}
                  </button>

                  {/* Dropdown */}
                  {openDropdown === menu && (
                    <div className="menu-dropdown">
                      {menuItems[menu].map((option, index) => (
                        <div key={index} className="menu-option">
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Share Button & Profile */}
      <div className="right-section">
        <button className="share-button">
          <MdLockOutline /> Share
        </button>
        <CgProfile className="profile-icon" />
      </div>
    </div>
  );
};

export default Header;
