
enum EYES {
    //% block="Left"
    LEFT = 873,
    //% block="Mad"
    MAD = 347,
    //% block="Open"
    OPEN = 891,
    //% block="Pop"
    POP = 561,
    //% block="Right"
    RIGHT = 882,
    //% block="Sad"
    SAD = 874,
    //% block="Shut"
    SHUT = 864,
    //% block="Up"
    UP = 27,
    //% block="Flip"
    FLIP = 324
}

enum MOUTHS {
    //% block="Flat"
    FLAT = 448,
    //% block="Grin"
    GRIN = 14880,
    //% block="Hmmm"
    HMMM = 14464,
    //% block="Left"
    LEFT = 6240,
    //% block="OK"
    OK = 4416,
    //% block="Open"
    OPEN = 4420,
    //% block="Right"
    RIGHT = 13056,
    //% block="Shout"
    SHOUT = 14660,
    //% block="Sulk"
    SULK = 17856,
    //% block="Laugh"
    LAUGH = 15204,
    //% block="Kiss"
    KISS = 132,
    //% block="Flip"
    FLIP = 28512
}


enum MOODS {
    //% block="Snoring"
    SNORING,
    //% block="Asleep"
    ASLEEP,
    //% block="None"
    NONE,
    //% block="Happy"
    HAPPY,
    //% block="Sad"
    SAD,
    //% block="Angry"
    ANGRY,
    //% block="Surprised"
    SURPRISED,
    //% block="Shiver"
    SHIVER,
    //% block="Tickle"
    TICKLE,
    //% block="Dead"
    DEAD
}



//% color="#4080e0" icon="\uf118"
namespace Emote {
    class Face {
        eyes: EYES;
        mouth: MOUTHS;
        pixels: number;
        constructor(eyes: EYES, mouth: MOUTHS) {
            this.eyes = 0
            this.mouth = 0
            this.pixels = 0
        }
        build(eyes: EYES, mouth: MOUTHS) {
            this.eyes = eyes
            this.mouth = mouth
            this.pixels = this.mouth * 1024 + this.eyes
        }
        show() {
            let pixels = this.pixels
            let x = 0
            let y = 0
            while (pixels) {
                if (pixels & 1) {
                    led.plot(x, y)
                } else {
                    led.unplot(x, y)
                }
                pixels >>= 1
                x++
                if (x > 4) {
                    y++
                    x = 0
                }
            }
        }
    }


    const Face1 = new Face(0, 0);
    const Face2 = new Face(0, 0);

    let switching = false
    let switch_gap = 0;
    let switch_time = 0
    let switch_vary = 0
    let my_mood: MOODS = -1

    //% block="Show face with eyes= $eyes, mouth= $mouth"
    export function emote(eyes: EYES, mouth: MOUTHS) {
        switching = false
        Face1.build(eyes, mouth)
        Face1.show()
    }

    //% block="React as $mood"
    export function new_mood(mood: MOODS) {
        if (my_mood != mood) {
            my_mood = mood
            if (my_mood == MOODS.SNORING) {
                set_mood(EYES.SHUT, MOUTHS.FLAT, EYES.SHUT, MOUTHS.OPEN, 2000, 2000, 0)
            } else if (my_mood == MOODS.ASLEEP) {
                set_mood(EYES.SHUT, MOUTHS.FLAT, EYES.SHUT, MOUTHS.HMMM, 3000, 500, 0)
            } else if (my_mood == MOODS.NONE) {
                set_mood(EYES.OPEN, MOUTHS.FLAT, EYES.SHUT, MOUTHS.FLAT, 600, 300, 2)
            } else if (my_mood == MOODS.HAPPY) {
                set_mood(EYES.OPEN, MOUTHS.GRIN, EYES.UP, MOUTHS.KISS, 1500, 400, 2)
            } else if (my_mood == MOODS.SAD) {
                set_mood(EYES.SAD, MOUTHS.SULK, EYES.SHUT, MOUTHS.SULK, 4000, 600, 1)
            } else if (my_mood == MOODS.ANGRY) {
                set_mood(EYES.MAD, MOUTHS.HMMM, EYES.MAD, MOUTHS.SHOUT, 2000, 800, 1)
            } else if (my_mood == MOODS.SURPRISED) {
                set_mood(EYES.POP, MOUTHS.OPEN, EYES.OPEN, MOUTHS.OPEN, 1600, 400, 0)
            } else if (my_mood == MOODS.SHIVER) {
                set_mood(EYES.LEFT, MOUTHS.RIGHT, EYES.RIGHT, MOUTHS.LEFT, 250, 250, 0)
            } else if (my_mood == MOODS.TICKLE) {
                set_mood(EYES.OPEN, MOUTHS.OK, EYES.FLIP, MOUTHS.FLIP, 750, 250, 0)
            }
            if (my_mood == MOODS.DEAD) {
                basic.showIcon(IconNames.Skull)
            } else {
                Face1.show()
            }
        }
    }

    function set_mood(eyes: EYES, mouth: MOUTHS, other_eyes: EYES, other_mouth: MOUTHS, gap: number, time: number, vary: number) {
        switching = false
        Face1.build(eyes, mouth)
        Face2.build(other_eyes, other_mouth)
        if (gap > 0) {
            // In most moods, we temporarily switch between two faces.
            // So we may be blinking, snoring, shivering or laughing etc.
            // These are controlled by two time-periods: switch_gap sets how often, 
            // and switch_time says how long to show the alternate face.
            switch_gap = gap
            switch_time = time
            switch_vary = vary
            switching = true
            control.inBackground(function () {
                while (switching) {
                    pause(randint(switch_gap, switch_vary * switch_gap))
                    Face2.show()
                    pause(switch_time)
                    Face1.show()
                }
            })
        }
    }
}