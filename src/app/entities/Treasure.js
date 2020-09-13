import {zzfx} from "../zzfx.js";

export class Treasure {
    constructor(x, y, z, rarity) {
        this.scene = document.querySelector("a-scene");
        this.el = document.createElement("a-entity");

        this.el.setAttribute("position", {
            x: x,
            y: y,
            z: z
        });

        var shapeType = "tetrahedron";
        var colorType = 0x007712;
        this.treasureType = rarity;
        if(rarity === 1){
            shapeType = "octahedron";
            colorType = 0x0070dd;
        }
        else if(rarity === 2){
            shapeType = "dodecahedron";
            colorType = 0xda77f2;
        }
        this.el.setAttribute("geometry", {
            primitive: shapeType,
            radius: 0.5
        });
        this.el.setAttribute("rotation", {
            x: rarity === 0 ? 35 : 0,
            y: rarity === 0 ? -30 : 0,
            z: rarity === 0 ? -45 : 0
        });
        this.el.setAttribute("material", {
            opacity: 1,
            shader: "standard",
            color: colorType
        });

        this.el.setAttribute("collectable", {
            rotationSpeed: 90
        });
        this.el.classList.add("clickables");
        
        this.scene.appendChild(this.el);

        var el = this.el;
        var self = this;
        this.collected = false;
        el.addEventListener("click", function(evt){
            if(!self.collected){
                self.collected = true;
                el.classList.remove("clickables");
                el.setAttribute("collectable", {
                    rotationSpeed: 640,
                    collected: true
                });

                var point = evt.detail.intersection.point;
                if(self.treasureType === 1){
                    zzfx(1,0,854,0,.1,.24,0,1.5,0,0,623,.03,.08,0,0,0,0,.76,.06,.01);
                }
                else if(self.treasureType === 2){
                    zzfx(1,0,720,0,.4,.34,0,1.7,0,0,720,0,.11,0,0,0,.16,.6,.25,.06);
                }
                else{
                    zzfx(1,0,1650,0,.04,.15,0,1.74,0,0,976,.07,0,0,0,0,0,.64,.02,.09);
                }
            }
        });
    }
}