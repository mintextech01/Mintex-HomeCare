/**
 * Full Firestore SDK (real-time listeners, latency-compensated writes) for the admin panel only.
 * Import it statically from admin code, or with import() from code shared with the public site,
 * so public visitors never download it. Use with functions imported from "firebase/firestore".
 */
import { getFirestore } from "firebase/firestore";
import { app } from "./firebase";

export const fullDb = getFirestore(app);
