/**
 * Main entry point for the portfolio website application.
 * Sets up React root with theme provider and imports necessary styles.
 */

import { createRoot } from "react-dom/client";
import Studio from "./studio/Studio.tsx";
import "./studio/studio.css";

createRoot(document.getElementById("root")!).render(<Studio />);
