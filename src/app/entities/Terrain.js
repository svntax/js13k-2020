export class Terrain {
    constructor(x, y, z) {
        this.scene = document.querySelector('a-scene');
        this.el = document.createElement('a-entity');

        this.el.setAttribute('position', {
            x: 0,
            y: 0,
            z: -3
        });

        this.material = new THREE.MeshPhongMaterial({color: 0xffffff});

        this.terrainWidth = 10;
        this.terrainHeight = 10;
        var geometry = new THREE.PlaneGeometry(this.terrainWidth,this.terrainHeight,9,9);
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

        var el = this.el;
        var self = this;
        el.addEventListener('click', function (evt) {
            var geom = el.getObject3D("mesh").geometry;

            // Transform the intersection point to the relative position
            var point = evt.detail.intersection.point;
            // Origin is the middle of the plane, so convert to top-left
            var pointInPlane = {
                x: Math.floor(point.x + self.terrainWidth / 2),
                y: Math.floor(self.terrainHeight - point.y - (self.terrainHeight / 2))
            };

            // Dig into the terrain
            self.dig(geom.vertices, pointInPlane.x, pointInPlane.y);
            geom.verticesNeedUpdate = true;
        });
    }

    dig(vertices, vx, vy){
        // Loop through the vertex and its neighbors
        for(var i = -1; i <= 1; i++){
            for(var j = -1; j <= 1; j++){
                var index = this.pointToIndex(vx + i, vy + j);
                if(index >= 0 && index < vertices.length){
                    if(i == 0 && j == 0){
                        // Center gets the most offset
                        vertices[index].z -= 0.5;
                    }
                    else if(Math.abs(i) == 1 && Math.abs(j) == 1){
                        // Corners get the least offset
                        vertices[index].z -= 0.1;
                    }
                    else{
                        vertices[index].z -= 0.3;
                    }
                }
            }
        }
    }

    pointToIndex(x, y){
        return y * this.terrainHeight + x;
    }

    update(time, timeDelta) {
        
    }
}