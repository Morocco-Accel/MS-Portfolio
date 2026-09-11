import * as THREE from 'three'
import { GLTF } from 'three-stdlib'
import { useGLTF } from '@react-three/drei'

type GLTFResult = GLTF & {
  nodes: { [name: string]: THREE.Mesh }
  materials: { [name: string]: THREE.Material }
}

export function Model(props: React.ComponentProps<'group'>) {
  const { nodes, materials } = useGLTF('/assets/3D/HomeOffice.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Back_Panel.geometry}
        material={materials['Plastic Black']}
        position={[6.329, 2.504, -4.399]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.127}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_1.geometry}
        material={materials.White}
        position={[0.078, 4.021, -0.021]}
        rotation={[3.133, 0, -Math.PI]}
        scale={[0.261, 0.338, 0.036]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_2.geometry}
        material={materials.White}
        position={[-0.036, 3.288, 1.218]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.336, 0.042]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3.geometry}
        material={materials.White}
        position={[0.079, 2.498, -0.973]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.339, 0.041]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3001.geometry}
        material={materials.White}
        position={[0.079, 2.28, 0.936]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.117, 0.122, 0.018]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3002.geometry}
        material={materials.White}
        position={[0.079, 2.533, -1.156]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.373, 0.127]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3003.geometry}
        material={materials.White}
        position={[0.079, 2.28, 0.976]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.127, 0.122, 0.018]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3004.geometry}
        material={materials.White}
        position={[0.079, 2.464, 0.028]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.304, 0.038]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3005.geometry}
        material={materials.White}
        position={[0.079, 2.459, 0.372]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.299, 0.042]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3006.geometry}
        material={materials.White}
        position={[0.079, 2.496, -0.643]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.337, 0.04]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3007.geometry}
        material={materials.White}
        position={[0.079, 2.484, -0.478]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.324, 0.043]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3008.geometry}
        material={materials.White}
        position={[0.079, 2.463, 0.113]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.304, 0.039]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3009.geometry}
        material={materials.White}
        position={[0.079, 2.441, 0.705]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.282, 0.035]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3010.geometry}
        material={materials.White}
        position={[0.079, 2.499, -0.811]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.339, 0.042]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3011.geometry}
        material={materials.White}
        position={[0.079, 2.444, 0.624]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.285, 0.04]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3012.geometry}
        material={materials.White}
        position={[0.079, 2.439, 0.867]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.28, 0.043]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3013.geometry}
        material={materials.White}
        position={[0.079, 2.48, -0.392]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.32, 0.039]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3014.geometry}
        material={materials.White}
        position={[0.079, 2.458, 0.458]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.299, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3015.geometry}
        material={materials.White}
        position={[0.079, 2.476, -0.309]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.316, 0.042]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3016.geometry}
        material={materials.White}
        position={[0.079, 2.474, -0.226]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.315, 0.036]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3017.geometry}
        material={materials.White}
        position={[0.079, 2.493, -0.561]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.334, 0.036]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3018.geometry}
        material={materials.White}
        position={[0.079, 2.449, 0.54]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.29, 0.042]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3019.geometry}
        material={materials.White}
        position={[0.079, 2.498, -0.727]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.338, 0.039]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3020.geometry}
        material={materials.White}
        position={[0.079, 2.458, 0.283]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.298, 0.042]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3021.geometry}
        material={materials.White}
        position={[0.079, 2.458, 0.196]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.298, 0.041]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3022.geometry}
        material={materials.White}
        position={[0.079, 2.439, 0.782]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.279, 0.039]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3023.geometry}
        material={materials.White}
        position={[0.079, 2.465, -0.058]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.305, 0.042]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3024.geometry}
        material={materials.White}
        position={[0.079, 2.499, -0.891]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.339, 0.036]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3025.geometry}
        material={materials.White}
        position={[0.079, 2.467, -0.144]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.308, 0.041]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3026.geometry}
        material={materials.White}
        position={[0.079, 2.273, 1.015]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.125, 0.114, 0.02]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3027.geometry}
        material={materials.White}
        position={[0.079, 2.283, 1.054]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.117, 0.125, 0.018]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3028.geometry}
        material={materials.White}
        position={[0.079, 2.297, 1.094]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.112, 0.139, 0.021]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3029.geometry}
        material={materials.White}
        position={[0.079, 2.284, 1.135]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.125, 0.126, 0.019]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3030.geometry}
        material={materials.White}
        position={[0.079, 2.297, 1.254]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.112, 0.139, 0.021]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3031.geometry}
        material={materials.White}
        position={[0.079, 2.273, 1.212]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.125, 0.114, 0.02]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3032.geometry}
        material={materials.White}
        position={[0.079, 2.28, 1.174]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.117, 0.122, 0.018]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3033.geometry}
        material={materials.White}
        position={[0.079, 2.297, 1.288]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.112, 0.139, 0.009]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3034.geometry}
        material={materials.White}
        position={[0.149, 2.004, 0.292]}
        rotation={[-1.523, 0, -Math.PI]}
        scale={[0.112, 0.139, 0.021]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_3035.geometry}
        material={materials.White}
        position={[0.028, 3.064, 0.978]}
        rotation={[-2.497, 0, Math.PI]}
        scale={[0.125, 0.114, 0.02]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_4.geometry}
        material={materials.White}
        position={[0.006, 1.674, -0.298]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.32, 0.048]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_5.geometry}
        material={materials.White}
        position={[0.015, 0.868, -0.807]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.261, 0.309, 0.048]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Books_Shelf.geometry}
        material={materials['Material.002']}
        position={[-0.031, 2.507, 0]}
        scale={[0.4, 2, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Chair.geometry}
        material={materials['Material.002']}
        position={[1.292, 1.099, -1.797]}
        rotation={[0, -0.723, 0]}
        scale={[0.418, 0.633, 0.418]}
      />
      <group position={[-0.431, 3.936, 2.468]} rotation={[0, 0, -Math.PI / 2]} scale={0.284}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle002.geometry}
          material={materials['Aluminom .001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle002_1.geometry}
          material={materials['Clock-Time']}
        />
        <group
          position={[-0.002, 0.048, -0.003]}
          rotation={[0, 0.192, Math.PI / 2]}
          scale={[1.807, 1.548, 3.025]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cone003.geometry}
            material={materials['Aluminom .001']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cone003_1.geometry}
            material={materials['Material.010']}
          />
        </group>
        <group
          position={[-0.002, 0.048, -0.003]}
          rotation={[Math.PI, 1.355, -Math.PI / 2]}
          scale={[1.807, 1.869, 2.504]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cone003.geometry}
            material={materials['Aluminom .001']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cone003_1.geometry}
            material={materials['Material.010']}
          />
        </group>
        <group
          position={[-0.002, 0.048, -0.003]}
          rotation={[-Math.PI, -1.047, -Math.PI / 2]}
          scale={[1.807, 2.191, 1.787]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cone003.geometry}
            material={materials['Aluminom .001']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cone003_1.geometry}
            material={materials['Material.010']}
          />
        </group>
      </group>
      <group position={[3.04, 1.764, 3.179]} rotation={[-2.543, -0.052, -3.106]} scale={0.203}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone005.geometry}
          material={materials['Aluminom ']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone005_1.geometry}
          material={materials['Glass.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone005_2.geometry}
          material={materials['Aluminom .001']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials['Aluminom ']}
        position={[1.839, 2.004, 3.881]}
        rotation={[0.308, -0.676, 0.196]}
        scale={[0.024, 0.024, 0.01]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials['Aluminom .001']}
        position={[-0.393, 0.521, 2.304]}
        scale={0.071}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={materials['Aluminom .001']}
        position={[4.646, 0.904, -4.493]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={0.071}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={materials['Aluminom .001']}
        position={[4.863, 0.904, -4.493]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={0.071}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={nodes.Cube004.material}
        position={[6.264, 2.125, -4.367]}
        scale={[0.098, 0.011, 0.025]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube006.geometry}
        material={materials['Material.001']}
        position={[5.933, 1.867, -0.758]}
        rotation={[Math.PI / 2, 0, 0.642]}
        scale={0.089}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube007.geometry}
        material={materials['Material.001']}
        position={[6.073, 1.237, -0.946]}
        rotation={[0, -0.642, 0]}
        scale={0.13}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials['Material.011']}
        position={[1.261, 0.337, -3.928]}
        scale={0.299}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder000.geometry}
        material={materials['Aluminom .001']}
        position={[6.073, 0.215, -0.946]}
        rotation={[0, 0.144, 0]}
        scale={[0.108, 0.046, 0.108]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder001.geometry}
        material={materials['Aluminom .001']}
        position={[6.073, 0.215, -0.946]}
        rotation={[0, -0.642, 0]}
        scale={0.046}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder002.geometry}
        material={materials['Aluminom .001']}
        position={[6.073, 0.215, -0.946]}
        rotation={[Math.PI, -0.929, Math.PI]}
        scale={0.046}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder003.geometry}
        material={materials['Aluminom .001']}
        position={[6.073, 0.215, -0.946]}
        rotation={[0, -0.642, 0]}
        scale={[0.108, 0.046, 0.108]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder004.geometry}
        material={materials['Aluminom .001']}
        position={[-0.421, 3.936, 2.467]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.021, 0.008, 0.021]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder005.geometry}
        material={materials['Aluminom .001']}
        position={[6.073, 0.215, -0.946]}
        rotation={[0, -1.427, 0]}
        scale={0.046}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006.geometry}
        material={materials['Aluminom .001']}
        position={[6.073, 0.215, -0.946]}
        rotation={[0, 0.144, 0]}
        scale={0.046}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007.geometry}
        material={materials['Aluminom .001']}
        position={[6.073, 0.216, -0.946]}
        rotation={[0, -0.642, 0]}
        scale={0.03}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder008.geometry}
        material={materials['Aluminom .001']}
        position={[1.261, 0.337, -3.928]}
        scale={[0.316, 0.299, 0.316]}
      />
      <group position={[6.151, 2.335, -4.355]} rotation={[-Math.PI / 2, 0, 0]} scale={0.035}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_1.geometry}
          material={materials['Plastic white']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_2.geometry}
          material={materials['Plastic Black']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_3.geometry}
          material={materials['Material.007']}
        />
      </group>
      <group position={[6.211, 2.091, -3.279]} rotation={[-Math.PI / 2, 0, 0]} scale={0.041}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000_1.geometry}
          material={materials['Plastic white']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000_2.geometry}
          material={materials['Plastic Black']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000_3.geometry}
          material={materials['Material.007']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000_4.geometry}
          material={materials['Material.009']}
        />
      </group>
      <group position={[6.211, 1.789, -3.279]} rotation={[-Math.PI / 2, 0, 0]} scale={0.041}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002_1.geometry}
          material={materials['Plastic white']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002_2.geometry}
          material={materials['Plastic Black']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002_3.geometry}
          material={materials['Material.007']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002_4.geometry}
          material={materials['Material.009']}
        />
      </group>
      <group position={[-0.424, 3.589, -2.863]} rotation={[0, 0, -Math.PI / 2]} scale={[0.5, 1, 1]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane003_1.geometry}
          material={materials['Material.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane003_2.geometry}
          material={materials['Frame-Image']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.front_mesh.geometry}
        material={materials['Plastic Black']}
        position={[6.221, 1.935, -3.271]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.131}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.front_mesh002.geometry}
        material={materials['Plastic Black']}
        position={[6.198, 2.642, -4.399]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.131}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Front_Panel.geometry}
        material={materials['Plastic Black']}
        position={[6.221, 2.473, -3.28]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.127}
      />
      <group position={[6.221, 2.473, -3.28]} rotation={[Math.PI / 2, 0, 0]} scale={0.127}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane002_1.geometry}
          material={materials.Cobol}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane002_2.geometry}
          material={materials['Plastic Black']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane002_3.geometry}
          material={materials['USB BLUE']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane002_4.geometry}
          material={materials['switch light blue']}
        />
      </group>
      <group position={[6.221, 2.473, -3.28]} rotation={[Math.PI / 2, 0, 0]} scale={0.127}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane012.geometry}
          material={materials.Cobol}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane012_1.geometry}
          material={materials['Plastic Black']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GP_Layer.geometry}
        material={materials['Aluminom .001']}
        position={[1.22, 0.193, 4.193]}
        rotation={[0, -0.248, 0]}
        scale={0.858}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GP_Layer001.geometry}
        material={materials['Aluminom .001']}
        position={[4.088, 0.8, -4.156]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GP_Layer002.geometry}
        material={materials['Aluminom .001']}
        position={[5.686, 1.113, -4.401]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GP_Layer003.geometry}
        material={materials['Aluminom .001']}
        position={[5.354, 1.766, -4.114]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GP_Layer004.geometry}
        material={materials['Aluminom .001']}
        position={[5.369, 1.736, -3.871]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Handle.geometry}
        material={materials['Plastic Black']}
        position={[5.957, 2.097, -3.464]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.535, 0.48, 0.48]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Handle-Door'].geometry}
        material={materials['Plastic Black']}
        position={[5.957, 2.097, -3.464]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.535, 0.48, 0.48]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Handle-Door001'].geometry}
        material={materials['Plastic Black']}
        position={[6.486, 2.089, -3.449]}
        rotation={[0, 0, Math.PI / 2]}
        scale={[0.535, 0.48, 0.48]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Handle001.geometry}
        material={materials['Plastic Black']}
        position={[6.486, 2.089, -3.449]}
        rotation={[0, 0, Math.PI / 2]}
        scale={[0.535, 0.48, 0.48]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Honeycomb_Front.geometry}
        material={materials['Plastic Black']}
        position={[6.034, 2.208, -3.273]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={0.127}
      />
      <group
        position={[4.341, 1.624, -3.012]}
        rotation={[-1.428, 0.049, 0.326]}
        scale={[0.116, 0.116, 0.13]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016.geometry}
          material={materials.Keyboard}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_1.geometry}
          material={materials['Material.003']}
        />
      </group>
      <group
        position={[4.257, 2.171, -3.645]}
        rotation={[Math.PI / 2, 0, 2.813]}
        scale={[0.07, 0.07, 0.071]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane004_1.geometry}
          material={materials['Aluminom .001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane004_2.geometry}
          material={materials['Material.013']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mouse.geometry}
        material={materials.White}
        position={[5.478, 1.574, -3.074]}
        rotation={[-Math.PI, 1.26, Math.PI / 2]}
        scale={[0.03, 0.057, 0.057]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mouse_Pad.geometry}
        material={materials['Mouse-Pad']}
        position={[5.548, 1.568, -3.212]}
        rotation={[0, 0.364, 0]}
        scale={[0.37, 0.1, 0.37]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials.Material}
        position={[4.428, 0.036, 0.694]}
        rotation={[0, 1.055, 0]}
        scale={[0.7, 1, 1]}
      />
      <group position={[2.317, 0.425, 2.151]} rotation={[0, -0.699, 0]} scale={0.219}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials['Material.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_1.geometry}
          material={materials['Aluminom .001']}
        />
      </group>
      <group position={[1.439, 1.258, 3.194]} rotation={[-1.22, -0.281, -0.649]} scale={0.219}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials['Material.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_1.geometry}
          material={materials['Aluminom .001']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane003.geometry}
        material={nodes.Plane003.material}
        position={[0.901, -0.215, -3.927]}
        scale={10.334}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane004.geometry}
        material={materials['Material.012']}
        position={[1.401, 1.12, -1.773]}
        scale={[0.199, 0.199, 0.28]}
      />
      <group position={[7.553, 4.034, 3.451]} scale={[8, 4, 8]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_1.geometry}
          material={materials.White}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_2.geometry}
          material={materials['Wood-Floor']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.shelf.geometry}
        material={materials['Material.005']}
        position={[2.473, 3.936, -4.223]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.534}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Side_Panel_glass_.geometry}
        material={materials['side Panel']}
        position={[6.477, 2.089, -3.932]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={0.234}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Side_Panel_Plastic.geometry}
        material={materials['Plastic white']}
        position={[6.467, 2.098, -3.919]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.535, 0.48, 0.48]}
      />
      <group position={[5.007, 0.92, -3.506]} scale={[1.5, 0.998, 1.5]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane001_1.geometry}
          material={materials['Material.006']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane001_2.geometry}
          material={materials['Material.008']}
        />
      </group>
      <group position={[6.221, 2.659, -3.813]} rotation={[0, 0, -Math.PI]} scale={0.224}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane013.geometry}
          material={materials['Plastic white']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane013_1.geometry}
          material={materials['Plastic Black']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Torus.geometry}
        material={materials['Aluminom .001']}
        position={[6.073, 0.228, -0.946]}
        rotation={[0, -0.642, 0]}
        scale={0.241}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Wall_soket.geometry}
        material={materials.White}
        position={[4.756, 0.903, -4.532]}
        scale={[0.11, 0.11, 0.01]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Wall_soket001.geometry}
        material={materials.White}
        position={[-0.433, 0.525, 2.195]}
        rotation={[0, -1.571, 0]}
        scale={[0.11, 0.094, 0.01]}
      />
      <group position={[4.961, 3.085, -4.613]} scale={[1.417, 1.071, 0.915]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube176.geometry}
          material={materials['Aluminom ']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube176_1.geometry}
          material={materials.Glass}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/3D/HomeOffice.glb')


