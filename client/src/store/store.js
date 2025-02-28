import { create } from "zustand";
import { persist } from "zustand/middleware";

const getLocalStorageItem = (key, defaultValue) => {
  const item = localStorage.getItem(key);
  try {
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return defaultValue;
  }
};

const useSheetStore = create(
  persist(
    (set, get) => ({
      sheetName: localStorage.getItem("sheetName") || "Untitled Spreadsheet",

      sheets: getLocalStorageItem("sheets", [{ id: 1, name: "Sheet1" }]),
      sheetCount: getLocalStorageItem("sheetCount", 1),
      activeSheet: 1,

      setSheetName: (name) => {
        localStorage.setItem("sheetName", name);
        set({ sheetName: name });
      },

      addSheet: () => {
        const newSheet = { id: get().sheetCount + 1, name: `Sheet${get().sheetCount + 1}` };
        const updatedSheets = [...get().sheets, newSheet];

        localStorage.setItem("sheets", JSON.stringify(updatedSheets));
        localStorage.setItem("sheetCount", JSON.stringify(get().sheetCount + 1));

        set({ sheets: updatedSheets, sheetCount: get().sheetCount + 1 });
      },

      deleteSheet: (id) => {
        const updatedSheets = get().sheets.filter(sheet => sheet.id !== id);

        localStorage.setItem("sheets", JSON.stringify(updatedSheets));
        set({ sheets: updatedSheets });
      },

      updateSheetName: (id, name) => {
        const updatedSheets = get().sheets.map(sheet => sheet.id === id ? { ...sheet, name } : sheet);

        localStorage.setItem("sheets", JSON.stringify(updatedSheets));
        set({ sheets: updatedSheets });
      },

      setActiveSheet: (id) => set({ activeSheet: id }),

      cellData: getLocalStorageItem("cellData", {}),

      updateCellData: (cellId, value) => {
        const updatedData = { ...get().cellData, [cellId]: value };
        localStorage.setItem("cellData", JSON.stringify(updatedData));
        set({ cellData: updatedData });
      },

      // Track selected cell
      selectedCell: null,
      setSelectedCell: (cellId) => set({ selectedCell: cellId }),

      // ✅ Ensure `selectedCells` is always an array
      selectedCells: getLocalStorageItem("selectedCells", []),
      setSelectedCells: (cells) => {
        const validCells = Array.isArray(cells) ? cells : [];
        set({ selectedCells: validCells });
        localStorage.setItem("selectedCells", JSON.stringify(validCells));
      },

      // Stores formatting for each cell
      cellStyles: getLocalStorageItem("cellStyles", {}),

      // Function to update cell styles
      updateCellStyle: (cellId, styleKey, value) => {
        const updatedStyles = {
          ...get().cellStyles,
          [cellId]: {
            ...get().cellStyles[cellId],
            [styleKey]: value,
          },
        };
        localStorage.setItem("cellStyles", JSON.stringify(updatedStyles));
        set({ cellStyles: updatedStyles });
      },
    }),
    { name: "sheet-storage" }
  )
);

export default useSheetStore;
