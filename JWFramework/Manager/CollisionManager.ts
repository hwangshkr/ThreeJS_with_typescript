﻿namespace JWFramework
{
    export class CollisionManager
    {

        private static instance: CollisionManager;

        static getInstance()
        {
            if (!CollisionManager.instance)
            {
                CollisionManager.instance = new CollisionManager;
            }
            return CollisionManager.instance;
        }

        public CollideRayToTerrain(sorce: ObjectSet[])
        {
            sorce.forEach(function (src)
            {
                let destination = (src.GameObject as HeightmapTerrain).inSectorObject;
                destination.forEach(function (dst)
                {
                    if (dst.CollisionComponent.Raycaster != null)
                        if ((src.GameObject != undefined && dst.IsClone == true && dst.IsRayOn == true) || SceneManager.getInstance().CurrentScene.NeedOnTerrain == true)
                        {
                            let intersect = dst.CollisionComponent.Raycaster.intersectObject(src.GameObject.GameObjectInstance);
                            if (intersect[0] != undefined)
                            {
                                if (intersect[0].distance < 1)
                                {
                                    dst.PhysicsComponent.SetPostion(intersect[0].point.x, intersect[0].point.y + 1, intersect[0].point.z);
                                }
                            }
                            else
                            {
                                dst.CollisionComponent.Raycaster.set(
                                    new THREE.Vector3(
                                        dst.PhysicsComponent.GetPosition().x,
                                        2000,
                                        dst.PhysicsComponent.GetPosition().z),
                                    new THREE.Vector3(0, -1, 0)
                                );
                                let intersect = dst.CollisionComponent.Raycaster.intersectObject(src.GameObject.GameObjectInstance);
                                if (intersect[0] != undefined)
                                {
                                    dst.PhysicsComponent.SetPostion(intersect[0].point.x, intersect[0].point.y + 1, intersect[0].point.z);
                                }
                                dst.CollisionComponent.Raycaster.set(dst.PhysicsComponent.GetPosition(), new THREE.Vector3(0, -1, 0))
                            }
                        }
                })
            })
        }

        public CollideBoxToBox(sorce: ObjectSet[], destination: ObjectSet[])
        {
            sorce.forEach(function (src)
            {
                destination.forEach(function (dst)
                {
                    if (src.GameObject.IsClone && dst.GameObject.IsClone)
                    {
                        if (src.GameObject != dst.GameObject)
                        {
                            if (src.GameObject.CollisionComponent.BoxHelper.box.intersectsBox(dst.GameObject.CollisionComponent.BoxHelper.box)) {
                                src.GameObject.CollisionActive(dst.GameObject);
                                dst.GameObject.CollisionActive();
                            }
                            else
                            {
                                src.GameObject.CollisionDeActive(dst.GameObject);
                                dst.GameObject.CollisionDeActive();
                            }
                        }
                    }
                })
            })
        }

        public CollideObbToObb(sorce, destination)
        {
            sorce.forEach(function (src)
            {
                destination.forEach(function (dst)
                {
                    if (src.IsClone && dst.IsClone)
                    {
                        if (src != dst)
                        {
                            if (src.CollisionComponent.OBB.intersectsOBB(dst.CollisionComponent.OBB))
                            {
                                if (!(dst.GameObject as HeightmapTerrain) || !(src.GameObject as HeightmapTerrain))
                                    src.CollisionActive(dst.Type);
                                dst.CollisionActive();
                            }
                            else
                            {
                                if (!(dst.GameObject as HeightmapTerrain) || !(src.GameObject as HeightmapTerrain))
                                    src.CollisionDeActive(dst.Type);
                                dst.CollisionDeActive();
                            }
                        }
                    }
                })
            })
        }

        public CollideObbToBox(sorce: ObjectSet[], destination: ObjectSet[])
        {
            sorce.forEach(function (src)
            {
                destination.forEach(function (dst)
                {
                    if (src.GameObject.IsClone && dst.GameObject.IsClone) {
                        if (src.GameObject != dst.GameObject) {
                            if (src.GameObject.CollisionComponent.OBB.intersectsBox3(dst.GameObject.CollisionComponent.BoundingBox))
                            {
                                if (!(dst.GameObject as HeightmapTerrain))
                                {
                                    src.GameObject.CollisionActive();
                                }
                                dst.GameObject.CollisionActive(src.GameObject);
                            }
                            else
                            {
                                if (!(dst.GameObject as HeightmapTerrain))
                                {
                                    src.GameObject.CollisionDeActive();
                                }
                                dst.GameObject.CollisionDeActive(src.GameObject);
                            }
                        }
                    }
                })
            })
        }

        public CollideBoxToSphere(sorce: ObjectSet[], destination: ObjectSet[])
        {

        }

        public CollideSphereToSphere(sorce: ObjectSet[], destination: ObjectSet[])
        {

        }
    }
}