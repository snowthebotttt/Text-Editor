import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  try {
    const db = await openDB("jate", 1);
    const tx = db.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
    await store.add(content);
    await tx.complete;
    console.log("Content added to database:", content);
  } catch (error) {
    console.error("Error adding content to database:", error);
  }
};

export const getDb = async () => {
  try {
    const db = await openDB("jate", 1);
    const tx = db.transaction("jate", "readonly");
    const store = tx.objectStore("jate");
    const content = await store.getAll();
    console.log("Content retrieved from database:", content);
    return content;
  } catch (error) {
    console.error("Error retrieving content from database:", error);
    return null;
  }
};

initdb();
