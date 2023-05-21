enum EYES {
    //% block="Open"
    OPEN,
    //% block="Sad"
    SAD,
    //% block="Shut"
    SHUT,
    //% block="Mad"
    MAD,
    //% block="Up"
    UP,
    //% block="Pop"
    POP,
    //% block="Left"
    LEFT,
    //% block="Right"
    RIGHT,
    //% block="Wink"
    WINK,
    //% block="Flip"
    FLIP
}
enum MOUTHS {
    //% block="Flat"
    FLAT,
    //% block="OK"
    OK,
    //% block="Grin"
    GRIN,
    //% block="Sulk"
    SULK,
    //% block="Hmmm"
    HMMM,
    //% block="Open"
    OPEN,
    //% block="Left"
    LEFT,
    //% block="Right"
    RIGHT,
    //% block="Shout"
    SHOUT,
    //% block="Laugh"
    LAUGH,
    //% block="Smirk"
    SMIRK,
    //% block="Kiss"
    KISS,
    //% block="Flip"
    FLIP
}
enum MOODS {
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
    //% block="Asleep"
    ASLEEP,
    //% block="Snoring"
    SNORING,
    //% block="Shiver"
    SHIVER,
    //% block="Tickle"
    TICKLE,
    //% block="Dead"
    DEAD
}
namespace Emote {

    // ensure these constants match the enum ordering!
    const all_eyes = [
        891,  //"Open"
        874,  //"Sad"
        864,  //"Shut"
        347,  //"Mad"
        27,   //"Up"
        561,  //"Pop"
        873,  //"Left"
        882,  //"Right"
        867,  //"Wink"
        324   //"Flip"
    ]

    const all_mouths = [
        448,    //"Flat"
        4416,   //"OK"
        14880,  //"Grin"
        17856,  //"Sulk"
        14464,  //"Hmmm"
        4420,   //"Open"
        6240,   //"Left"
        13056,  //"Right"
        14660,  //"Shout"
        15204,  //"Laugh"
        6944,   //"Smirk"
        128,    //"Kiss"
        28512   //"Flip"
    ]

    let main_eyes = 0
    let main_mouth = 0
    let alt_eyes = 0
    let alt_mouth = 0
    let switching = false
    let switch_gap = 0;
    let switch_time = 0
    let switch_vary = 0

    //% block="show eyes as $eyes"
    //% weight=20
    export function show_eyes(eyes: EYES) {
        switching = false
        show_bitmap(all_eyes[eyes], 0, 2)
    }

    //% block="show mouth as $mouth"
    //% weight=10
    export function show_mouth(mouth: MOUTHS) {
        switching = false
        show_bitmap(all_mouths[mouth], 2, 5)
    }

    //% block="show face with eyes= $eyes, mouth= $mouth"
    //% weight=30
    export function emote(eyes: EYES, mouth: MOUTHS) {
        switching = false
        show_bitmap(all_eyes[eyes], 0, 2)
        show_bitmap(all_mouths[mouth], 2, 5)
    }

    //% block="react as $mood"
    //% weight=50
    export function new_mood(mood: MOODS) {
        // constrain to currently defined values
        if (mood == MOODS.SNORING) {
            set_mood(EYES.SHUT, MOUTHS.FLAT, EYES.SHUT, MOUTHS.OPEN, 2000, 2000, 0)
        } else if (mood == MOODS.ASLEEP) {
            set_mood(EYES.SHUT, MOUTHS.FLAT, EYES.SHUT, MOUTHS.HMMM, 3000, 500, 0)
        } else if (mood == MOODS.NONE) {
            set_mood(EYES.OPEN, MOUTHS.FLAT, EYES.SHUT, MOUTHS.FLAT, 600, 300, 2)
        } else if (mood == MOODS.HAPPY) {
            set_mood(EYES.OPEN, MOUTHS.GRIN, EYES.WINK, MOUTHS.SMIRK, 1500, 400, 2)
        } else if (mood == MOODS.SAD) {
            set_mood(EYES.SAD, MOUTHS.SULK, EYES.SHUT, MOUTHS.SULK, 4000, 600, 1)
        } else if (mood == MOODS.ANGRY) {
            set_mood(EYES.MAD, MOUTHS.HMMM, EYES.MAD, MOUTHS.SHOUT, 2000, 800, 1)
        } else if (mood == MOODS.SURPRISED) {
            set_mood(EYES.POP, MOUTHS.OPEN, EYES.OPEN, MOUTHS.OPEN, 1600, 400, 0)
        } else if (mood == MOODS.SHIVER) {
            set_mood(EYES.LEFT, MOUTHS.RIGHT, EYES.RIGHT, MOUTHS.LEFT, 150, 150, 0)
        } else if (mood == MOODS.TICKLE) {
            set_mood(EYES.OPEN, MOUTHS.OK, EYES.FLIP, MOUTHS.FLIP, 750, 250, 0)
        }
        if (mood == MOODS.DEAD) {
            basic.showIcon(IconNames.Skull)
        }
    }

    //% block="stop reacting"
    //% weight=40
    export function cease() {
        switching = false
    }

    function set_mood(eyes: EYES, mouth: MOUTHS, other_eyes: EYES, other_mouth: MOUTHS, gap: number, time: number, vary: number) {
        switching = false
        main_eyes = eyes
        main_mouth = mouth
        alt_eyes = other_eyes
        alt_mouth = other_mouth
        /*
        In most moods, we sporadically switch between two faces.
        So we may be blinking, snoring, shivering or laughing etc.
        These are controlled by two time-periods: "switch_gap" governs how often, 
            and "switch_time" says how long, --to show the alternate Face2.
        A non-zero "switch_vary" allows for extension of the gap
            by an unpredictable multiple.
        */
        switch_gap = gap
        switch_time = time
        switch_vary = vary
        switching = true
        show_bitmap(all_eyes[main_eyes], 0, 2)
        show_bitmap(all_mouths[main_mouth], 2, 5)
        control.inBackground(function () {
            while (switching) {
                show_bitmap(all_eyes[alt_eyes], 0, 2)
                show_bitmap(all_mouths[alt_mouth], 2, 5)
                pause(switch_time)
                show_bitmap(all_eyes[main_eyes], 0, 2)
                show_bitmap(all_mouths[main_mouth], 2, 5)
                pause(switch_gap + randint(0, switch_vary) * switch_gap)
            }
        })
    }
    
    function show_bitmap(bitmap: number, start: number, stop: NumberFormat) {
        for (let y = start; y < stop; y++) {
            for (let x = 0; x < 5; x++) {
                if (bitmap & 1) {
                    led.plot(x, y)
                } else {
                    led.unplot(x, y)
                }
                bitmap >>= 1
            }
        }
    }
}
