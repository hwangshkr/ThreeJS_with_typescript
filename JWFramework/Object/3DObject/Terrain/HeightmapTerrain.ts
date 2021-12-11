﻿namespace JWFramework {
    export class HeightmapTerrain extends GameObject {
        constructor(x: number, z: number, segmentWidth: number, segmentHeight: number) {
            super();
            this.width = x;
            this.height = z;
            this.segmentWidth = segmentWidth;
            this.segmentHeight = segmentHeight;
            //this.name = "Terrain" + ObjectManager.getInstance().GetObjectList[ObjectType.OBJ_TERRAIN].length;
            this.name = "Terrain" + ObjectManager.getInstance().GetObjectList[ObjectType.OBJ_TERRAIN].length;
            this.terrainIndex = ObjectManager.getInstance().GetObjectList[ObjectType.OBJ_TERRAIN].length;
            this.type = ObjectType.OBJ_TERRAIN;

            this.physicsComponent = new PhysicsComponent(this);
            this.graphicComponent = new GraphComponent(this);
            this.exportComponent = new ExportComponent(this);
            this.collisionComponent = new CollisionComponent(this);

            this.CreateTerrainMesh();
        }

        public InitializeAfterLoad() {
            this.PhysicsComponent.SetPostion(this.width, 0, this.height);

            this.CreateBoundingBox();

            SceneManager.getInstance().SceneInstance.add(this.gameObjectInstance);
            SceneManager.getInstance().SceneInstance.add(this.CollisionComponent.BoxHelper);
            ObjectManager.getInstance().AddObject(this, this.name, this.type);
        }

        public CreateBoundingBox() {
            this.CollisionComponent.CreateBoundingBox(300, 5000, 300);
            this.CollisionComponent.BoxHelper.box.setFromCenterAndSize(new THREE.Vector3(this.width, 2500, this.height), new THREE.Vector3(300, 5000, 300));
        }

        public CreateTerrainMesh() {
            this.planeGeomatry = new THREE.PlaneGeometry(300, 300, this.segmentWidth, this.segmentHeight);
            this.material = new THREE.MeshToonMaterial();
            this.texture = new THREE.TextureLoader().load("Model/Heightmap/TerrainTexture.jpg");
            this.texture.wrapS = THREE.RepeatWrapping;
            this.texture.wrapT = THREE.RepeatWrapping;
            this.texture.repeat.set(128, 128);
            this.material.map = this.texture;
            //this.material.normalMap = new THREE.TextureLoader().load("Model/Heightmap/TerrainTexture_N.png");
            this.material.wireframe = false;

            let rotation = new THREE.Matrix4().makeRotationX(-Math.PI / 2);
            this.planeGeomatry.applyMatrix4(rotation);

            this.planeGeomatry.computeBoundingSphere();
            this.planeGeomatry.computeVertexNormals();

            this.planeMesh = new THREE.Mesh(this.planeGeomatry, this.material);
            this.planeMesh.receiveShadow = true;
            this.planeMesh.castShadow = true;

            this.gameObjectInstance = this.planeMesh;
            this.GameObjectInstance.name = this.name;

            this.InitializeAfterLoad();
        }

        public get HeightIndexBuffer(): number[] {
            return this.heigtIndexBuffer;
        }

        public get HeightBuffer(): number[] {
            this.heigtIndexBuffer.forEach(element =>
                this.heigtBuffer.push(this.planeGeomatry.getAttribute('position').getY(element)));
            return this.heigtBuffer;
        }

        public SetHeight(index: number) {
            this.planeGeomatry.getAttribute('position').needsUpdate = true;
            let height: number = this.planeGeomatry.getAttribute('position').getY(index);
            this.planeGeomatry.getAttribute('position').setY(index, height += 1);

            let objectList = ObjectManager.getInstance().GetObjectList;
            let endPointIndex = this.planeGeomatry.getAttribute('position').count - 1;


            if (this.planeGeomatry.getAttribute('position').getX(index) == 300 / 2) {
                if (objectList[ObjectType.OBJ_TERRAIN][this.terrainIndex + 1]) {
                    let terrain = objectList[ObjectType.OBJ_TERRAIN][this.terrainIndex + 1].GameObject;
                    (terrain as unknown as HeightmapTerrain).planeGeomatry.getAttribute('position').needsUpdate = true;
                    let height: number = (terrain as unknown as HeightmapTerrain).planeGeomatry.getAttribute('position').getY(index - this.segmentHeight);
                    (terrain as unknown as HeightmapTerrain).planeGeomatry.getAttribute('position').setY(index - this.segmentHeight, height += 1);
                    console.log(index - this.segmentHeight);

                    if (index == endPointIndex) {
                        if (objectList[ObjectType.OBJ_TERRAIN][this.terrainIndex + 11]) {
                            let terrain = objectList[ObjectType.OBJ_TERRAIN][this.terrainIndex + 11].GameObject;
                            (terrain as unknown as HeightmapTerrain).planeGeomatry.getAttribute('position').needsUpdate = true;
                            let height: number = (terrain as unknown as HeightmapTerrain).planeGeomatry.getAttribute('position').getY(0);
                            (terrain as unknown as HeightmapTerrain).planeGeomatry.getAttribute('position').setY(0, height += 1);
                        }
                    }

                    else if (index == this.segmentWidth) {
                        if (objectList[ObjectType.OBJ_TERRAIN][this.terrainIndex - 9]) {
                            let terrain = objectList[ObjectType.OBJ_TERRAIN][this.terrainIndex - 9].GameObject;
                            (terrain as unknown as HeightmapTerrain).planeGeomatry.getAttribute('position').needsUpdate = true;
                            let height: number = (terrain as unknown as HeightmapTerrain).planeGeomatry.getAttribute('position').getY(endPointIndex - this.segmentWidth);
                            (terrain as unknown as HeightmapTerrain).planeGeomatry.getAttribute('position').setY(endPointIndex - this.segmentWidth, height += 1);
                        }
                    }
                }
            }

            if (this.planeGeomatry.getAttribute('position').getX(index) == -(300 / 2)) {
                if (objectList[ObjectType.OBJ_TERRAIN][this.terrainIndex - 1]) {
                    let terrain = objectList[ObjectType.OBJ_TERRAIN][this.terrainIndex - 1].GameObject;
                    (terrain as unknown as HeightmapTerrain).planeGeomatry.getAttribute('position').needsUpdate = true;
                    let height: number = (terrain as unknown as HeightmapTerrain).planeGeomatry.getAttribute('position').getY(index + this.segmentHeight);
                    (terrain as unknown as HeightmapTerrain).planeGeomatry.getAttribute('position').setY(index + this.segmentHeight, height += 1);
                }

                if (index == 0) {
                    if (objectList[ObjectType.OBJ_TERRAIN][this.terrainIndex - 11]) {
                        let terrain = objectList[ObjectType.OBJ_TERRAIN][this.terrainIndex - 11].GameObject;
                        (terrain as unknown as HeightmapTerrain).planeGeomatry.getAttribute('position').needsUpdate = true;
                        let height: number = (terrain as unknown as HeightmapTerrain).planeGeomatry.getAttribute('position').getY(endPointIndex);
                        (terrain as unknown as HeightmapTerrain).planeGeomatry.getAttribute('position').setY(endPointIndex, height += 1);
                    }
                }

                else if (index == endPointIndex - this.segmentWidth) {
                    if (objectList[ObjectType.OBJ_TERRAIN][this.terrainIndex + 9]) {
                        let terrain = objectList[ObjectType.OBJ_TERRAIN][this.terrainIndex + 9].GameObject;
                        (terrain as unknown as HeightmapTerrain).planeGeomatry.getAttribute('position').needsUpdate = true;
                        let height: number = (terrain as unknown as HeightmapTerrain).planeGeomatry.getAttribute('position').getY(this.segmentWidth);
                        (terrain as unknown as HeightmapTerrain).planeGeomatry.getAttribute('position').setY(this.segmentWidth, height += 1);
                    }
                }
            }

            if (this.planeGeomatry.getAttribute('position').getZ(index) == 300 / 2) {
                if (objectList[ObjectType.OBJ_TERRAIN][this.terrainIndex + 10]) {
                    let terrain = objectList[ObjectType.OBJ_TERRAIN][this.terrainIndex + 10].GameObject;
                    (terrain as unknown as HeightmapTerrain).planeGeomatry.getAttribute('position').needsUpdate = true;
                    let height: number = (terrain as unknown as HeightmapTerrain).planeGeomatry.getAttribute('position').getY(index - (endPointIndex - this.segmentWidth));
                    (terrain as unknown as HeightmapTerrain).planeGeomatry.getAttribute('position').setY(index - (endPointIndex - this.segmentWidth), height += 1);
                }
            }

            if (this.planeGeomatry.getAttribute('position').getZ(index) == -(300 / 2)) {
                if (objectList[ObjectType.OBJ_TERRAIN][this.terrainIndex - 10]) {
                    let terrain = objectList[ObjectType.OBJ_TERRAIN][this.terrainIndex - 10].GameObject;
                    (terrain as unknown as HeightmapTerrain).planeGeomatry.getAttribute('position').needsUpdate = true;
                    let height: number = (terrain as unknown as HeightmapTerrain).planeGeomatry.getAttribute('position').getY(index + (endPointIndex - this.segmentWidth));
                    (terrain as unknown as HeightmapTerrain).planeGeomatry.getAttribute('position').setY(index + (endPointIndex - this.segmentWidth), height += 1);
                }
            }

            //로컬좌표
            //console.log(this.planeGeomatry.getAttribute('position').getX(index));


            //월드좌표
            //let vertex = new THREE.Vector3();
            //vertex.fromBufferAttribute(this.planeGeomatry.getAttribute('color'), index);
            //console.log(this.planeMesh.localToWorld(vertex));

            //for (let i = 33; i < 66; ++i) {
            //    console.log(i);
            //    this.planeGeomatry.getAttribute('position').needsUpdate = true;
            //    let height: number = this.planeGeomatry.getAttribute('position').getY(i);
            //    this.planeGeomatry.getAttribute('position').setY(i, height += 20);
            //} 

            if (this.heigtIndexBuffer.indexOf(index) == -1)
                this.heigtIndexBuffer.push(index);
            this.vertexNormalNeedUpdate = true;

        }

        public CollisionActive(value: ObjectType) {
            if (value == ObjectType.OBJ_CAMERA) {
                this.cameraInSecter = true;
                this.material.opacity = 0.9;
                this.planeGeomatry.computeVertexNormals();
            }
            else
                this.inSecter = true;
        }

        public CollisionDeActive(value: ObjectType) {
            if (value == ObjectType.OBJ_CAMERA) {
                this.cameraInSecter = false;
                this.material.opacity = 1;
            }
            else
                this.inSecter = false;
        }

        public Animate() {
            if (/*SceneManager.getInstance().CurrentScene.Picker.PickMode != PickMode.PICK_TERRAIN &&*/ this.vertexNormalNeedUpdate) {
                this.planeGeomatry.computeVertexNormals();
                this.vertexNormalNeedUpdate = false;
            }
        }

        private planeMesh: THREE.Mesh;
        private planeGeomatry: THREE.PlaneGeometry;
        private material: THREE.MeshToonMaterial;
        private texture: THREE.Texture;

        private terrainIndex: number;
        private width: number;
        private height: number;
        private segmentWidth: number;
        private segmentHeight: number;

        private heigtIndexBuffer: number[] = [];
        private heigtBuffer: number[] = [];

        private vertexNormalNeedUpdate: boolean = false;

        public inSecter: boolean = false
        public cameraInSecter: boolean = false;
    }
}