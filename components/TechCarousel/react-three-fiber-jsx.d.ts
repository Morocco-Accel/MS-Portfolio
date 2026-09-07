import type { ThreeElement } from "@react-three/fiber";
import type { BentPlaneGeometry, MeshSineMaterial } from "./util";

declare module "@react-three/fiber" {
  interface ThreeElements {
    bentPlaneGeometry: ThreeElement<typeof BentPlaneGeometry>;
    meshSineMaterial: ThreeElement<typeof MeshSineMaterial>;
  }
}
