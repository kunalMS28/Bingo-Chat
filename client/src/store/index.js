import { createAuthSlice } from "./slices/auth-slice";
import { createChatSlice} from "./slices/contact-slice";

import { create } from "zustand";

export const UseAppStore = create()((...a) => ({
    ...createAuthSlice(...a),
    ...createChatSlice(...a),
  }));