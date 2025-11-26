import { onCall, HttpsError, onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import express, { Request, Response } from "express";
import cors from "cors";

initializeApp();
const db = getFirestore();


export const helloWorld = onCall((request) => {
  return { message: "Hello from Firebase!" };
});

export const createContact = onCall(async (request) => { console.log("Received data:", request.data); try { const { contact } = request.data; if (!contact) { throw new HttpsError("invalid-argument", "Contact is required"); } if (!contact.name || !contact.email || !contact.phone) { throw new HttpsError("invalid-argument", "Name, email, and phone are required"); } const db = getFirestore(); const docRef = db.collection("contacts").doc(); const newContact = { id: docRef.id, name: contact.name, email: contact.email, phone: contact.phone, address: contact.address || "" }; console.log("Saving contact:", newContact); await docRef.set(newContact); console.log(" Contact saved successfully"); return { success: true, contact: newContact }; } catch (error: any) { console.error(" Error:", error); if (error instanceof HttpsError) { throw error; } throw new HttpsError("internal", error.message || "Unknown error"); } });


const app = express();

app.use(cors({ origin: true }));
app.use(express.json());


app.get("/contacts", async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection("contacts").get();
    const contacts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return res.status(200).json({
      success: true,
      count: contacts.length,
      contacts
    });
  } catch (error: any) {
    console.error("Error getting contacts:", error);
    return res.status(500).json({ success: false, error: error.message || "Failed to get contacts" });
  }
});

app.get("/contacts/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const docRef = db.collection("contacts").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, error: "Contact not found" });
    }

    return res.status(200).json({ success: true, contact: { id: doc.id, ...doc.data() } });
  } catch (error: any) {
    console.error("Error getting contact:", error);
    return res.status(500).json({ success: false, error: error.message || "Failed to get contact" });
  }
});


app.post("/contacts", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, address } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, error: "Name, email, and phone are required" });
    }

    const docRef = db.collection("contacts").doc();
    const newContact = {
      id: docRef.id,
      name,
      email,
      phone,
      address: address || "",
      createdAt: new Date().toISOString()
    };

    await docRef.set(newContact);

    return res.status(201).json({ success: true, message: "Contact created successfully", contact: newContact });
  } catch (error: any) {
    console.error("Error creating contact:", error);
    return res.status(500).json({ success: false, error: error.message || "Failed to create contact" });
  }
});


app.put("/contacts/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;

    const docRef = db.collection("contacts").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, error: "Contact not found" });
    }

    const updateData: any = { updatedAt: new Date().toISOString() };
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;

    await docRef.update(updateData);
    const updatedDoc = await docRef.get();

    return res.status(200).json({ success: true, message: "Contact updated successfully", contact: { id: updatedDoc.id, ...updatedDoc.data() } });
  } catch (error: any) {
    console.error("Error updating contact:", error);
    return res.status(500).json({ success: false, error: error.message || "Failed to update contact" });
  }
});

app.delete("/contacts/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const docRef = db.collection("contacts").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, error: "Contact not found" });
    }

    await docRef.delete();
    return res.status(200).json({ success: true, message: "Contact deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting contact:", error);
    return res.status(500).json({ success: false, error: error.message || "Failed to delete contact" });
  }
});


export const api = onRequest(app);
