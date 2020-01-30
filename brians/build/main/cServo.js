"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class cServo {
    constructor(id, position, totalTime) {
        if (position < 0)
            position = 0;
        else if (position > 180)
            position = 180;
        this.id = id;
        this.position = position;
        this.totalTime = totalTime;
        this.currentTime = 0;
    }
    getCurrentStep() {
        return this.currentTime <= this.totalTime ? 1 / this.totalTime * this.currentTime : 1;
    }
}
exports.cServo = cServo;
