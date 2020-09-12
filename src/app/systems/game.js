import {Box} from "../entities/Box";
import {Terrain} from "../entities/Terrain";

AFRAME.registerSystem('game', {
    schema: {},

    init: function () {
        this.terrain = new Terrain();
    },

    tick(time, timeDelta){
        this.terrain.update(time, timeDelta);
    }
});
