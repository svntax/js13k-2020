export class Terrain {
    constructor(x, y, z) {
        this.scene = document.querySelector('a-scene');
        this.el = document.createElement('a-entity');

        this.el.setAttribute('position', {
            x: 0,
            y: 0,
            z: -6
        });

        this.material = new THREE.MeshStandardMaterial({color: 0xfacade});

        var geometry = new THREE.PlaneGeometry(10,10,9,9);
        var plane = new THREE.Mesh(geometry, this.material);

        // Set height of vertices
        for(var i = 0; i < plane.geometry.vertices.length; i++){
            plane.geometry.vertices[i].z = Math.random() * 1;
        }
        
        this.el.setObject3D("mesh", plane);

        // Randomize face colors
        var terrainColors = [0xf6d7b0, 0xf2d2a9, 0xeccca2, 0xe7c496, 0xe1bf92];
        for(var i = 0; i < plane.geometry.faces.length; i++){
            var face = plane.geometry.faces[i]; 
            var choice = Math.floor(Math.random()*terrainColors.length);
            face.color.setHex(terrainColors[choice]);
        }
        plane.geometry.colorsNeedUpdate = true;
        plane.material.vertexColors = THREE.FaceColors;

        this.scene.appendChild(this.el);

        this.digTimer = 0;
    }

    update(time, timeDelta) {
        // TODO: placeholder vertices editing test
        this.digTimer += timeDelta;
        if(this.digTimer > 2000){
            this.digTimer = 0;
            var mesh = this.el.getObject3D("mesh");
            var geom = mesh.geometry;
            geom.vertices[0].z = Math.random() * 1;
            geom.vertices[1].z = Math.random() * 1;
            geom.verticesNeedUpdate = true;
            console.log(geom.vertices[0].z);
        }
    }
}