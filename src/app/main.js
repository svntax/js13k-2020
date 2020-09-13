import { game } from './systems/game';

export function randRange(min, max) {
    return Math.random() * (max - min) + min;
}

AFRAME.registerComponent("hand-tool", {
	init: function () {
		var el = this.el;
		el.addEventListener("controllerconnected", function (evt) {
			// Controllers connected, remove the gaze cursor
			var gazeCursor = document.getElementById("gaze-cursor");
			if(gazeCursor){
				gazeCursor.parentNode.removeChild(gazeCursor);
			}
		});
	} 
});

AFRAME.registerComponent("debris", {
    schema: {
        duration: {type: "number", default: 1}
    },

    init: function(){
		var el = this.el;
		el.duration = this.data.duration;
		el.timeLeft = el.duration;
		el.isActive = true;
    },
    
    tick: function(time, deltaTime){
		var el = this.el;
		if(el.isActive){
			el.timeLeft -= deltaTime / 1000;
			if(el.timeLeft <= 0){
				el.isActive = false;
                this.el.parentNode.removeChild(this.el);
			}
		}
	}
});

AFRAME.registerComponent("velocity", {
	schema: {
		vel: {type: "vec3", default: {x: 0, y: 0, z: 0}},
		gravity: {type: "number", default: 0}
	},
	
	init: function(){
		var el = this.el;
		var data = this.data;
		// Assign variables to el so that they're editable from other components/entities
		el.vel = {x: data.vel.x, y: data.vel.y, z: data.vel.z};
		el.gravity = data.gravity;
		
		el.addEventListener("updateVelocity", function(e){
			el.vel = {x: e.detail.x, y: e.detail.y, z: e.detail.z};
		});
		el.addEventListener("updateGravity", function(e){
			el.gravity = e.detail.gravity;
		});
	},
	
	tick: function(time, deltaTime){
		var data = this.data;
		var el = this.el;
		var dt = deltaTime / 1000;
		el.object3D.position.x += el.vel.x * dt;
		el.object3D.position.y += el.vel.y * dt;
		el.object3D.position.z += el.vel.z * dt;
		
		el.vel.y += el.gravity * dt;
		if(el.vel.y < -16){
			el.vel.y = -16;
		}
	}
});

AFRAME.registerComponent("collectable", {
	schema: {
		rotationSpeed: {type: "number"},
		collected: {type: "boolean", default: false}
	},

	init: function(){
		var data = this.data;
		var el = this.el;
		// Randomize the starting rotation
		el.object3D.rotation.y += Math.random() * 2 * Math.PI;
		el.object3D.rotation.y %= 360;
		this.el.removalTimer = 0;
	},
	
	tick: function(time, deltaTime){
		var data = this.data;
		var el = this.el;
		el.object3D.rotation.y += THREE.Math.degToRad((data.rotationSpeed)) * (deltaTime / 1000);
		el.object3D.rotation.y %= 360;
		if(data.collected){
			el.removalTimer += (deltaTime / 1000);
			if(el.removalTimer >= 1.5){
				el.removalTimer = 0;
				el.parentNode.removeChild(el);
			}
		}
	}
});