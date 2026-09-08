import type { ThreeElement } from "@react-three/fiber";
import type { BentPlaneGeometry } from "./util";

declare module "@react-three/fiber" {
  interface ThreeElements {
    bentPlaneGeometry: ThreeElement<typeof BentPlaneGeometry>;
  }
}
