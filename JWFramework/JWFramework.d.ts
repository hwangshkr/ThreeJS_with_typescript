declare namespace JWFramework {
    class CollisionComponent {
        constructor(gameObject: GameObject);
        CreateBoundingBox(x: number, y: number, z: number): void;
        CreateOrientedBoundingBox(center?: THREE.Vector3, halfSize?: THREE.Vector3): void;
        CreateBoundingSphere(): void;
        CreateRaycaster(): void;
        get BoundingBox(): THREE.Box3;
        get BoxHelper(): THREE.Box3Helper;
        get OBB(): THREE.OBB;
        get ObbBoxHelper(): THREE.Mesh;
        get BoundingSphere(): THREE.Sphere;
        get Raycaster(): THREE.Raycaster;
        DeleteCollider(): void;
        Update(): void;
        private sizeAABB;
        private gameObject;
        terrain: HeightmapTerrain;
        private boundingBox;
        private orientedBoundingBox;
        private boundingSphere;
        private raycaster;
        private boundingBoxInclude;
        private orientedBoundingBoxInlcude;
        private boundingSphereInclude;
        private raycasterInclude;
        private boxHelper;
        private obbBoxHelper;
    }
}
declare namespace JWFramework {
    class ExportComponent {
        constructor(gameObject: GameObject);
        MakeJsonObject(): Object;
        private gameObject;
    }
}
declare namespace JWFramework {
    class GraphComponent {
        constructor(gameObject: GameObject);
        SetRenderOnOff(renderSwitch: boolean): void;
        private GameObject;
        private renderSwitch;
    }
}
declare namespace JWFramework {
    class GUIComponent {
        constructor(gameObject: GameObject);
        UpdateDisplay(): void;
        ShowGUI(show: boolean): void;
        private gameObject;
    }
}
declare namespace JWFramework {
    class CameraManager {
        private static instance;
        static getInstance(): CameraManager;
        get CameraMode(): CameraMode;
        SetCameraSavedPosition(cameraMode: CameraMode): void;
        private ChangeThridPersonCamera;
        private ChangeOrbitCamera;
        private cameraMode;
    }
}
declare namespace JWFramework {
    class PhysicsComponent {
        constructor(gameObject: JWFramework.GameObject);
        get Up(): THREE.Vector3;
        get Right(): THREE.Vector3;
        get Look(): THREE.Vector3;
        set Up(vec3Up: THREE.Vector3);
        set Right(vec3Right: THREE.Vector3);
        set Look(vec3Look: THREE.Vector3);
        SetPostion(x: number, y: number, z: number): void;
        SetPostionVec3(vec3: THREE.Vector3): void;
        SetScale(x: number, y: number, z: number): void;
        SetScaleScalar(scalar: number): void;
        MoveFoward(distance: number): void;
        MoveDirection(direction: THREE.Vector3, distance: number): void;
        GetPosition(): THREE.Vector3;
        GetRotateEuler(): THREE.Euler;
        GetRotateMatrix3(): THREE.Matrix3;
        GetScale(): THREE.Vector3;
        GetMatrix4(): any;
        SetRotate(x: number, y: number, z: number): void;
        Rotate(x: number, y: number, z: number): void;
        RotateVec3(axis: THREE.Vector3, angle: number): void;
        UpdateMatrix(): void;
        private gameince;
        private vec3Right;
        private vec3Up;
        private vec3Look;
        private vec3Position;
        private GameObject;
    }
}
declare namespace JWFramework {
    class GameObject {
        InitializeAfterLoad(): void;
        get Type(): ObjectType;
        get Name(): string;
        set Name(name: string);
        get IsClone(): boolean;
        set IsClone(isClone: boolean);
        get IsPlayer(): boolean;
        set IsPlayer(flag: boolean);
        get PhysicsComponent(): PhysicsComponent;
        get GraphicComponent(): GraphComponent;
        get GUIComponent(): GUIComponent;
        get ExportComponent(): ExportComponent;
        get CollisionComponent(): CollisionComponent;
        get AnimationMixer(): THREE.AnimationMixer;
        set AnimationMixer(animationMixer: THREE.AnimationMixer);
        get PhysicsCompIncluded(): boolean;
        get GraphicCompIncluded(): boolean;
        set PhysicsCompIncluded(isIncluded: boolean);
        set GraphicCompIncluded(isIncluded: boolean);
        set Picked(picked: boolean);
        get Picked(): boolean;
        get GameObjectInstance(): any;
        set GameObjectInstance(gameObjectInstance: any);
        get ModelData(): THREE.GLTF;
        set ModelData(anim: THREE.GLTF);
        get IsDead(): boolean;
        set IsDead(flag: boolean);
        get IsRayOn(): boolean;
        set IsRayOn(flag: boolean);
        CollisionActive(value?: any): void;
        CollisionDeActive(value?: any): void;
        Animate(): void;
        DeleteObject(): void;
        protected gameObjectInstance: any;
        protected modelData: THREE.GLTF;
        protected type: ObjectType;
        protected name: string;
        protected isClone: boolean;
        protected isDead: boolean;
        protected isPlayer: boolean;
        protected isRayOn: boolean;
        protected physicsComponent: PhysicsComponent;
        protected graphicComponent: GraphComponent;
        protected guiComponent: GUIComponent;
        protected exportComponent: ExportComponent;
        protected collisionComponent: CollisionComponent;
        protected animationMixer: THREE.AnimationMixer;
        private physicsCompIncluded;
        private graphicCompIncluded;
        private picked;
    }
}
declare namespace JWFramework {
    class EditObject extends GameObject {
        constructor();
        InitializeAfterLoad(): void;
        CreateCollider(): void;
        CollisionActive(): void;
        CollisionDeActive(): void;
        Animate(): void;
        currentVelocity: THREE.Vector3;
        private previousPosition;
        private missileOrientation;
        private isTarget;
        private testpos;
        private axisHelper;
    }
}
declare namespace JWFramework {
    class Define {
        static readonly SCREEN_WIDTH: number;
        static readonly SCREEN_HEIGHT: number;
    }
    class ModelSceneBase {
        private static instance;
        static getInstance(modelSceneType: string): any;
        constructor();
        get ModelScene(): ModelSet[];
        get ModelNumber(): number;
        protected sceneModelData: ModelSet[];
        protected modelNumber: number;
    }
    class ModelSceneEdit extends ModelSceneBase {
        constructor();
        private helmet;
        private mig23;
        private mig29;
        private f_5e;
        private anim;
    }
    class ModelSceneStage {
        private static instance;
        static getInstance(): ModelSceneStage;
        constructor();
        get ModelScene(): ModelSet[];
        get ModelNumber(): number;
        private F16;
        private sceneTestModel;
        private modelNumber;
    }
    interface ModelSet {
        model: GameObject;
        url: string;
    }
    interface ObjectSet {
        GameObject: GameObject;
        Name: string;
    }
    interface KeySet {
        KeyCode: number;
        KeyName: string;
        KeyEvent: boolean;
        KeyDown: boolean;
        KeyPressed: boolean;
        KeyUp: boolean;
    }
}
declare namespace JWFramework {
    enum SceneType {
        SCENE_EDIT = 0,
        SCENE_START = 1,
        SCENE_STAGE = 2,
        SCENE_END = 3
    }
    enum ObjectType {
        OBJ_TERRAIN = 0,
        OBJ_OBJECT3D = 1,
        OBJ_OBJECT2D = 2,
        OBJ_AIRCRAFT = 3,
        OBJ_CAMERA = 4,
        OBJ_END = 5
    }
    enum LightType {
        LIGHT_DIRECTIONAL = 0,
        LIGHT_AMBIENT = 1
    }
    enum PickMode {
        PICK_MODIFY = 0,
        PICK_CLONE = 1,
        PICK_TERRAIN = 2,
        PICK_REMOVE = 3
    }
    enum TerrainOption {
        TERRAIN_UP = 0,
        TERRAIN_DOWN = 1,
        TERRAIN_BALANCE = 2,
        TERRAIN_LOAD = 3,
        TERRAIN_END = 4
    }
    enum CameraMode {
        CAMERA_ORBIT = 0,
        CAMERA_3RD = 1
    }
    enum KeyState {
        KEY_DOWN = 0,
        KEY_PRESS = 1,
        KEY_UP = 2
    }
}
declare namespace JWFramework {
    class GUI_Base {
        constructor();
        protected CreateFolder(name: string): void;
    }
}
declare namespace JWFramework {
    class GUI_Select extends GUI_Base {
        constructor();
        protected CreateFolder(): void;
        protected AddElement(): void;
        GetSelectObjectName(): string;
        private datGui;
        private objectListFolder;
        private exportButtonFolder;
        private makeJson;
        private List;
    }
}
declare namespace JWFramework {
    class GUI_SRT extends GUI_Base {
        constructor(gameObject: GameObject);
        protected CreateFolder(): void;
        protected AddElement(): void;
        SetGameObject(gameObject: GameObject): void;
        UpdateDisplay(): void;
        ShowGUI(show: boolean): void;
        private datGui;
        private gameObject;
        private positionFolder;
        private rotateFolder;
        private scaleFolder;
        private isPlayerFolder;
        private isPlayerFunc;
    }
}
declare namespace JWFramework {
    class GUI_Terrain extends GUI_Base {
        constructor();
        protected CreateFolder(): void;
        protected AddElement(): void;
        GetTerrainOption(): TerrainOption;
        GetHeightOffset(): number;
        ChangeHeightOffset(): void;
        ChangeTerrainOption(): void;
        private SetTerrainOptionFromEnum;
        SetTerrainOptionList(): void;
        private datGui;
        private terrainOptionFolder;
        private propList;
        private terrainOption;
    }
}
declare namespace JWFramework {
    class Camera extends GameObject {
        constructor();
        get Fov(): number;
        set Fov(fov: number);
        get Aspect(): number;
        set Aspect(aspect: number);
        get Near(): number;
        set Near(near: number);
        get Far(): number;
        set Far(far: number);
        get CameraInstance(): THREE.PerspectiveCamera;
        private SetCameraElement;
        Animate(): void;
        get PhysicsComponent(): PhysicsComponent;
        private y;
        private fov;
        private aspect;
        private near;
        private far;
        private cameraInstance;
    }
}
declare namespace JWFramework {
    class ObjectManager {
        private static instance;
        constructor();
        static getInstance(): ObjectManager;
        GetObjectsFromType(): void;
        GetObjectFromName(name: string): GameObject;
        GetInSectorTerrain(): THREE.Group;
        get GetObjectList(): ObjectSet[][];
        ClearExportObjectList(): void;
        AddObject(gameObject: GameObject, name: string, type: ObjectType): void;
        MakeClone(selectObject: GameObject): GameObject;
        MakeJSONArray(): void;
        DeleteObject(gameObject: GameObject): void;
        DeleteAllObject(): void;
        private RenderOffObject;
        Animate(): void;
        Render(): void;
        private terrainList;
        private objectList;
        private exportObjectList;
    }
}
declare namespace JWFramework {
    class Picker {
        constructor();
        private CreateOrtbitControl;
        private GetParentName;
        private PickOffObject;
        Pick(): void;
        private GetCanvasReleativePosition;
        get MouseEvent(): MouseEvent;
        SetPickPosition(event: any): void;
        ClearPickPosition(): void;
        ChangePickModeModify(): void;
        ChangePickModeClone(): void;
        ChangePickModeTerrain(): void;
        ChangePickModeRemove(): void;
        get PickMode(): PickMode;
        get OrbitControl(): THREE.OrbitControls;
        GetPickParents(): GameObject;
        private mouseEvent;
        private pickMode;
        private raycaster;
        private pickedObject;
        private pickedParent;
        private pickPositionX;
        private pickPositionY;
        private orbitControl;
        private pickedParentName;
    }
}
declare namespace JWFramework {
    class SceneBase {
        constructor(sceneManager: SceneManager);
        protected BuildObject(): void;
        protected BuildLight(): void;
        protected BuildFog(): void;
        Animate(): void;
        get SceneManager(): SceneManager;
        get Picker(): Picker;
        SetPicker(): void;
        get NeedOnTerrain(): boolean;
        set NeedOnTerrain(flag: boolean);
        private sceneManager;
        private picker;
        private needOnTerrain;
        reloadScene: boolean;
    }
}
declare namespace JWFramework {
    class HeightmapTerrain extends GameObject {
        constructor(x: number, z: number, segmentWidth: number, segmentHeight: number);
        InitializeAfterLoad(): void;
        CreateBoundingBox(): void;
        CreateTerrainMesh(): void;
        get HeightIndexBuffer(): number[];
        get HeightBuffer(): number[];
        SetHeight(index: number, value?: number, option?: TerrainOption): void;
        CollisionActive(object: GameObject): void;
        CollisionDeActive(object: GameObject): void;
        Animate(): void;
        private planeMesh;
        private planeGeomatry;
        private material;
        private farmTexture;
        private mountainTexture;
        private factoryTexture;
        private cityTexture;
        private gradientmap;
        private terrainIndex;
        private width;
        private height;
        private segmentWidth;
        private segmentHeight;
        private heigtIndexBuffer;
        private heigtBuffer;
        inSectorObject: GameObject[];
        private vertexNormalNeedUpdate;
        inSecter: boolean;
        cameraInSecter: boolean;
    }
}
declare namespace JWFramework {
    class ModelLoadManager {
        private static instance;
        static getInstance(): ModelLoadManager;
        constructor();
        private SetLoadComplete;
        set LoadComplete(flag: boolean);
        get LoadComplete(): boolean;
        LoadScene(): void;
        LoadSceneStage(): void;
        private LoadModel;
        LoadHeightmapTerrain(): void;
        LoadSavedScene(): void;
        private loaderManager;
        private gltfLoader;
        animationMixer: THREE.AnimationMixer;
        anim: any;
        private loadCompletModel;
        private modelCount;
        private loadComplete;
        private modeltList;
        private terrain;
    }
}
declare namespace JWFramework {
    class Light extends GameObject {
        constructor(type: LightType);
        get Color(): number;
        SetColor(color: any): void;
        get Intensity(): number;
        set Intensity(intensity: number);
        private SetLightElement;
        private color;
        private intensity;
        private light;
    }
}
declare namespace JWFramework {
    class EditScene extends SceneBase {
        constructor(sceneManager: SceneManager);
        BuildObject(): void;
        BuildLight(): void;
        BuildFog(): void;
        Animate(): void;
        private light;
        private light2;
        private light3;
    }
}
declare namespace JWFramework {
    class SceneManager {
        private static instance;
        constructor();
        static getInstance(): SceneManager;
        get SceneInstance(): THREE.Scene;
        get CurrentScene(): SceneBase;
        get SceneType(): SceneType;
        MakeJSON(): void;
        BuildScene(): void;
        Animate(): void;
        private sceneThree;
        private sceneType;
        private scene;
        private objectManager;
    }
}
declare namespace JWFramework {
    class SplattingShader {
        constructor();
        vertexShader: string;
        fragmentShader: string;
    }
}
declare namespace JWFramework {
    class ShaderManager {
        private static instance;
        constructor();
        static getInstance(): ShaderManager;
        BuildMotuinBlurShader(): void;
        get SplattingShader(): SplattingShader;
        ShadedRender(): void;
        farmTexture: THREE.Texture;
        mountainTexture: THREE.Texture;
        factoryTexture: THREE.Texture;
        private composer;
        private renderPass;
        private savePass;
        private blendPass;
        private outputPass;
        private splattingShader;
        private renderTargetParameters;
    }
}
declare namespace JWFramework {
    class WorldManager {
        private static instance;
        private constructor();
        static getInstance(): WorldManager;
        InitializeWorld(): void;
        private CreateRendere;
        private ResizeView;
        private CreateMainCamera;
        private CreateScene;
        private CreateDeltaTime;
        GetDeltaTime(): number;
        get Canvas(): HTMLCanvasElement;
        get MainCamera(): JWFramework.Camera;
        get Renderer(): THREE.WebGLRenderer;
        Animate(): void;
        Render(): void;
        private renderer;
        private sceneManager;
        private camera;
        private clock;
        private delta;
    }
}
declare namespace JWFramework {
    class CollisionManager {
        private static instance;
        static getInstance(): CollisionManager;
        CollideRayToTerrain(sorce: ObjectSet[]): void;
        CollideBoxToBox(sorce: ObjectSet[], destination: ObjectSet[]): void;
        CollideObbToObb(sorce: any, destination: any): void;
        CollideObbToBox(sorce: ObjectSet[], destination: ObjectSet[]): void;
        CollideBoxToSphere(sorce: ObjectSet[], destination: ObjectSet[]): void;
        CollideSphereToSphere(sorce: ObjectSet[], destination: ObjectSet[]): void;
    }
}
declare namespace JWFramework {
    class GUIManager {
        private static instance;
        static getInstance(): GUIManager;
        get GUI_Select(): GUI_Select;
        get GUI_SRT(): GUI_SRT;
        get GUI_Terrain(): GUI_Terrain;
        private gui_Select;
        private gui_SRT;
        private gui_Terrain;
    }
}
declare namespace JWFramework {
    class InputManager {
        private static instance;
        static getInstance(): InputManager;
        constructor();
        private AddKey;
        private KeyPressedCheck;
        UpdateKey(): void;
        GetKeyState(keyName: string, keyState: KeyState): boolean;
        private keys;
    }
}
declare namespace JWFramework {
    class TestCube extends GameObject {
        constructor();
        InitializeAfterLoad(): void;
        get PhysicsComponent(): PhysicsComponent;
        get GraphComponent(): GraphComponent;
        Animate(): void;
        private y;
    }
}
declare namespace JWFramework {
    class AircraftObject extends GameObject {
        constructor();
        InitializeAfterLoad(): void;
        CreateCollider(): void;
        CollisionActive(): void;
        CollisionDeActive(): void;
        Animate(): void;
        protected throttle: number;
        protected afterBurner: boolean;
        protected acceleration: number;
    }
}
declare namespace JWFramework {
    class F16Object extends AircraftObject {
        constructor();
        InitializeAfterLoad(): void;
        CreateCollider(): void;
        CollisionActive(): void;
        CollisionDeActive(): void;
        Animate(): void;
    }
}
declare namespace JWFramework {
    class StageScene extends SceneBase {
        constructor(sceneManager: SceneManager);
        BuildObject(): void;
        BuildLight(): void;
        BuildFog(): void;
        Animate(): void;
        private light;
        private light2;
        private terrain;
    }
}
