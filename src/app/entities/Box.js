export class Box {
    constructor(x, y, z, settings) {
        this.scene = document.querySelector("a-scene");
        this.el = document.createElement("a-entity");

        this.el.setAttribute("position", {
            x: x || 0,
            y: y || 0,
            z: z || 0
        });
        this.el.setAttribute("geometry", {
            primitive: "box",
            width: settings.width,
            height: settings.height,
            depth: settings.depth
        });
        this.el.setAttribute("rotation", {
            x: settings.rotX || 0,
            y: settings.rotY || 0,
            z: settings.rotZ || 0
        });

        this.el.setAttribute("material", {
            opacity: 1,
            shader: "standard",
            color: settings.color || 0xffffff
        });

        this.el.setAttribute("debris", "duration: " + settings.lifetime);
        this.el.setAttribute("velocity", {
            vel: {x: settings.velX, y: settings.velY, z: settings.velZ},
            gravity: settings.gravity
        });
        
        this.scene.appendChild(this.el);
    }
}