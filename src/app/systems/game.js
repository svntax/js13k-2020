import {Box} from "../entities/Box";
import {Terrain} from "../entities/Terrain";

AFRAME.registerSystem('game', {
    schema: {},

    init: function () {
        // Example summon a custom entity
        this.box = new Box(0, -2, -5, {
           width: 2,
           height: 2,
           depth: 2
        });

        this.terrain = new Terrain();
    },

    tick(time, timeDelta){
        this.terrain.update(time, timeDelta);
    }
});
